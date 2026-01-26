interface GpsCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * EXIF 데이터에서 GPS 좌표 추출
 *
 * JPEG/TIFF 파일의 EXIF 메타데이터에서 GPS 정보를 파싱합니다.
 */
export const extractGpsFromExif = async (file: File): Promise<GpsCoordinates | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const dataView = new DataView(arrayBuffer);

    // JPEG 시그니처 확인 (0xFFD8)
    if (dataView.getUint16(0) !== 0xffd8) {
      return null;
    }

    let offset = 2;
    const length = dataView.byteLength;

    while (offset < length) {
      if (dataView.getUint8(offset) !== 0xff) {
        break;
      }

      const marker = dataView.getUint8(offset + 1);

      // APP1 마커 (0xE1) - EXIF 데이터 포함
      if (marker === 0xe1) {
        const exifData = parseExifData(dataView, offset + 4);
        if (exifData) {
          return exifData;
        }
      }

      // 마커 길이 읽기
      const markerLength = dataView.getUint16(offset + 2);
      offset += 2 + markerLength;
    }

    return null;
  } catch {
    return null;
  }
};

const parseExifData = (dataView: DataView, offset: number): GpsCoordinates | null => {
  // EXIF 헤더 확인 ("Exif\0\0")
  const exifHeader =
    String.fromCharCode(dataView.getUint8(offset)) +
    String.fromCharCode(dataView.getUint8(offset + 1)) +
    String.fromCharCode(dataView.getUint8(offset + 2)) +
    String.fromCharCode(dataView.getUint8(offset + 3));

  if (exifHeader !== 'Exif') {
    return null;
  }

  const tiffOffset = offset + 6;

  // 바이트 오더 확인 (II = little endian, MM = big endian)
  const byteOrder = dataView.getUint16(tiffOffset);
  const littleEndian = byteOrder === 0x4949;

  // TIFF 마커 확인 (0x002A)
  if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002a) {
    return null;
  }

  // IFD0 오프셋
  const ifd0Offset = dataView.getUint32(tiffOffset + 4, littleEndian);
  const gpsIfdPointer = findGpsIfdPointer(dataView, tiffOffset, ifd0Offset, littleEndian);

  if (!gpsIfdPointer) {
    return null;
  }

  return parseGpsIfd(dataView, tiffOffset, gpsIfdPointer, littleEndian);
};

const findGpsIfdPointer = (
  dataView: DataView,
  tiffOffset: number,
  ifdOffset: number,
  littleEndian: boolean
): number | null => {
  const entries = dataView.getUint16(tiffOffset + ifdOffset, littleEndian);

  for (let i = 0; i < entries; i++) {
    const entryOffset = tiffOffset + ifdOffset + 2 + i * 12;
    const tag = dataView.getUint16(entryOffset, littleEndian);

    // GPS IFD 포인터 태그 (0x8825)
    if (tag === 0x8825) {
      return dataView.getUint32(entryOffset + 8, littleEndian);
    }
  }

  return null;
};

const parseGpsIfd = (
  dataView: DataView,
  tiffOffset: number,
  gpsIfdOffset: number,
  littleEndian: boolean
): GpsCoordinates | null => {
  const entries = dataView.getUint16(tiffOffset + gpsIfdOffset, littleEndian);

  let latitudeRef: string | null = null;
  let latitude: number | null = null;
  let longitudeRef: string | null = null;
  let longitude: number | null = null;

  for (let i = 0; i < entries; i++) {
    const entryOffset = tiffOffset + gpsIfdOffset + 2 + i * 12;
    const tag = dataView.getUint16(entryOffset, littleEndian);
    const valueOffset = dataView.getUint32(entryOffset + 8, littleEndian);

    switch (tag) {
      case 0x0001: // GPSLatitudeRef (N/S)
        latitudeRef = String.fromCharCode(dataView.getUint8(entryOffset + 8));
        break;
      case 0x0002: // GPSLatitude
        latitude = parseGpsCoordinate(dataView, tiffOffset + valueOffset, littleEndian);
        break;
      case 0x0003: // GPSLongitudeRef (E/W)
        longitudeRef = String.fromCharCode(dataView.getUint8(entryOffset + 8));
        break;
      case 0x0004: // GPSLongitude
        longitude = parseGpsCoordinate(dataView, tiffOffset + valueOffset, littleEndian);
        break;
    }
  }

  if (latitude === null || longitude === null) {
    return null;
  }

  // 남반구/서경인 경우 음수로 변환
  if (latitudeRef === 'S') {
    latitude = -latitude;
  }
  if (longitudeRef === 'W') {
    longitude = -longitude;
  }

  return { latitude, longitude };
};

const parseGpsCoordinate = (
  dataView: DataView,
  offset: number,
  littleEndian: boolean
): number => {
  // GPS 좌표는 도/분/초 형식의 RATIONAL 3개로 저장됨
  const degrees = readRational(dataView, offset, littleEndian);
  const minutes = readRational(dataView, offset + 8, littleEndian);
  const seconds = readRational(dataView, offset + 16, littleEndian);

  return degrees + minutes / 60 + seconds / 3600;
};

const readRational = (dataView: DataView, offset: number, littleEndian: boolean): number => {
  const numerator = dataView.getUint32(offset, littleEndian);
  const denominator = dataView.getUint32(offset + 4, littleEndian);

  return denominator === 0 ? 0 : numerator / denominator;
};

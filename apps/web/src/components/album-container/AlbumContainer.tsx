import { Photo } from '@/types/album.type';
import * as S from './AlbumContainer.styles';
import {
  ALBUM_CONTAINER_TYPE,
  AlbumContainerType,
  MAX_GRID_PHOTOS,
} from './AlbumContainer.constants';

interface AlbumContainerProps {
  /** 앨범 제목 */
  title: string;
  /** 앨범 타입 (small: 사진 개수 숨김) */
  type?: AlbumContainerType;
  /** 사진 목록 */
  photoList: Photo[];
  /** 총 사진 수 */
  photoCount: number;
  /** 앨범 클릭 시 콜백 */
  onClick?: () => void;
}

const AlbumContainer = ({
  title,
  type = ALBUM_CONTAINER_TYPE.MEDIUM,
  photoList,
  photoCount,
  onClick,
}: AlbumContainerProps) => {
  const displayPhotos = photoList.slice(0, MAX_GRID_PHOTOS);
  const remainingCount = photoCount - MAX_GRID_PHOTOS;
  const hasMorePhotos = remainingCount > 0;

  const renderPhotoGrid = () => {
    const gridItems = [];

    for (let i = 0; i < MAX_GRID_PHOTOS; i++) {
      const photo = displayPhotos[i];
      const isLastPhoto = i === MAX_GRID_PHOTOS - 1;
      const showOverlay = isLastPhoto && hasMorePhotos;

      gridItems.push(
        <S.PhotoWrapper key={photo?.photoId ?? `empty-${i}`}>
          {photo ? (
            <>
              <S.Photo src={photo.src} alt={`photo-${photo.photoId}`} />
              {showOverlay && (
                <S.MoreOverlay type={type}>+{remainingCount}</S.MoreOverlay>
              )}
            </>
          ) : (
            <S.EmptyPhoto />
          )}
        </S.PhotoWrapper>
      );
    }

    return gridItems;
  };

  return (
    <S.Container type={type} onClick={onClick}>
      <S.PhotoGrid type={type}>{renderPhotoGrid()}</S.PhotoGrid>

      <S.InfoSection type={type}>
        <S.Title>{title}</S.Title>
        {type === ALBUM_CONTAINER_TYPE.MEDIUM && (
          <S.PhotoCount>{photoCount}</S.PhotoCount>
        )}
      </S.InfoSection>
    </S.Container>
  );
};

export default AlbumContainer;

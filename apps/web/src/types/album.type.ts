export interface Photo {
  photoId: string;
  src: string;
}

export interface Album {
  id: number;
  title: string;
  photoList: Photo[];
  photoCount: number;
}

//TODO: SelectableAlbum 타입 임시 수정
export interface SelectableAlbum {
  id: string;
  title: string;
  thumbnail: string;
  photoCount: number;
}

export interface AlbumDetailPhoto {
  id: number;
  url: string;
  date?: string;
}

export interface AlbumDetailData {
  id: number;
  title: string;
  photos: AlbumDetailPhoto[];
}

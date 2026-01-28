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

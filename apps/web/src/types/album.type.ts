export interface Photo {
  photoId: string;
  src: string;
}

export interface Album {
  title: string;
  photoList: Photo[];
}

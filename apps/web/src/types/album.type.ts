export interface Photo {
  photoId: string;
  src: string;
}

export interface Album {
  id: string;
  title: string;
  thumbnail: string;
  photoCount: number;
}

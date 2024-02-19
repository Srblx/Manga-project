export interface MangaImageModel {
  jpg: { image_url: string };
}

export interface MangaAuthorModel {
  name: string;
}

export interface MangaModel {
  mal_id: number;
  title: string;
  images: MangaImageModel;
  synopsis: string;
  authors: MangaAuthorModel[];
}

export interface SingleMangaGenre {
  name: string;
}

export interface SingleMangaTheme {
  name: string;
}

export interface SingleMangaModel {
  synopsis: string;
  background: string;
  title: string;
  images: MangaImageModel;
  rank: number;
  genres: SingleMangaGenre[];
  status: string;
  themes: SingleMangaTheme[];
  authors: MangaAuthorModel[];
  popularity: number;
  scored: number;
  members: number;
  url: string;
}

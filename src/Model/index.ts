export interface MovieModel {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
export interface TVModel {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface Result {
  results: Array<MovieModel>;
}

export interface ResultMovieModel {
  page: number;
  results: Array<MovieModel>;
  total_pages: number;
  total_results: number;
}

export interface ResultTVModel {
  page: number;
  results: Array<TVModel>;
  total_pages: number;
  total_results: number;
}
export interface SearchItemModel {
  poster_path: any;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: any; 
  vote_average: number;
  media_type: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: any[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

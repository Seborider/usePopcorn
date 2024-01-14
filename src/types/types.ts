export interface MovieType {
  Poster: string;
  Title: string;
  Year: string;
  imdbID?: string;
  Runtime?: string;
  imdbRating?: number;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
}

export interface WatchedMovie extends MovieType {
  userRating?: number;
  userRatingDecisions?: number;
}

import { MovieType, WatchedMovie } from "./types";
import { ReactNode } from "react";

export interface BaseProps {
  children?: ReactNode;
}
export interface MovieProps {
  movie: MovieType;
  onSelectMovie: ((id: string) => void) | undefined;
}

export interface MoviesProps extends BaseProps {
  movies?: MovieType[];
  onSelectMovie?: (id: string) => void;
}

export interface WatchedMovieProps {
  movie: WatchedMovie;
  onDeleteWatched: (id: string) => void;
}

export interface WatchedMovieSummaryProps {
  watched?: WatchedMovie[];
}

export interface NavBarProps extends BaseProps {}

export interface ErrorMessageProps {
  message: string;
}

export interface WatchedMovielistProps {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

export interface MovieDetailsProps {
  selectedId: string | null;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}

export interface SearchbarProps {
  query: string;
  setQuery: (query: string) => void;
}

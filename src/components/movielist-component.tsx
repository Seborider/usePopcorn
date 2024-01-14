import Movie from "./movie-component";
import { MoviesProps } from "../types/props";
import { MovieType } from "../types/types";

export default function MovieList({ movies, onSelectMovie }: MoviesProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie: MovieType) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        ></Movie>
      ))}
    </ul>
  );
}

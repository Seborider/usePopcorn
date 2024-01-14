import WatchedMovie from "./watchedmovie-component";
import { MovieType } from "../types/types";
import { WatchedMovielistProps } from "../types/props";

export default function WatchedMovielist({
  watched,
  onDeleteWatched,
}: WatchedMovielistProps) {
  return (
    <ul className="list">
      {watched?.map((movie: MovieType) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        ></WatchedMovie>
      ))}
    </ul>
  );
}

import { useEffect, useRef, useState } from "react";
import StarRating from "./starrating-component";
import Loader from "./loader-component";
import { MovieType, WatchedMovie } from "../types/types";
import { useKey } from "../hooks/useKey";
import { MovieDetailsProps } from "../types/props";

const KEY = "7ba978d4";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.some(
    (movie: MovieType) => movie.imdbID === selectedId,
  );

  const watchedUserRating = watched.find(
    (movie: MovieType) => movie.imdbID === selectedId,
  )?.userRating;

  const userRatingDecisions = useRef(0);

  useEffect(
    function () {
      if (userRating) userRatingDecisions.current++;
    },
    [userRating],
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  function handleAdd() {
    if (typeof onAddWatched === "function" && selectedId) {
      const newWatchedMovie: WatchedMovie = {
        imdbID: selectedId,
        Title: title as string,
        Year: year as string,
        Poster: poster as string,
        imdbRating: Number(imdbRating) as number,
        Runtime: Number(runtime?.split(" ").at(0)) as unknown as string,
        userRating,
        userRatingDecisions: userRatingDecisions.current,
      };

      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId],
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKey(onCloseMovie, "Escape");

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header className="header">
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${movie}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>{released}</p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDB Rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated with movie {watchedUserRating} <span>⭐️</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}

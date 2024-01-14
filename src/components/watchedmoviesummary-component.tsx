import { average } from "../consts/consts";
import { WatchedMovie } from "../types/types";
import { WatchedMovieSummaryProps } from "../types/props";

export default function WatchedMovieSummary({
  watched,
}: WatchedMovieSummaryProps) {
  const avgImdbRating = average(
    (watched || []).map((movie: WatchedMovie) => movie.imdbRating),
  );
  const avgUserRating = average(
    (watched || []).map((movie: WatchedMovie) => movie.userRating),
  );
  const avgRuntime = average(
    (watched || []).map((movie: WatchedMovie) => movie.Runtime),
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}

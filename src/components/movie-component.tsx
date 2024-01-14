import { MovieProps } from "../types/props";

export default function Movie({ movie, onSelectMovie }: MovieProps) {
  const handleClick = () => {
    if (movie.imdbID) {
      onSelectMovie?.(movie.imdbID);
    } else {
      console.error("Error: imdbID is undefined");
    }
  };

  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

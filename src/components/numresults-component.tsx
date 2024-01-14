import { MoviesProps } from "../types/props";

export default function NumResults({ movies }: MoviesProps) {
  return (
    <p className="num-results">
      Found <strong>{movies && movies.length}</strong> results
    </p>
  );
}

import { useEffect, useState } from "react";
import { MovieType } from "../types/types"; // Adjust the import path as needed

const KEY = "7ba978d4";

export function useMovies(query: string, callback?: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }

    callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(
            query,
          )}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Network response was not ok.");
        const data = await res.json();

        if (data.Response === "False")
          throw new Error(data.Error || "Movie not found");
        setMovies(data.Search);
      } catch (err) {
        const error = err as Error; // Type assertion
        if (error.name !== "AbortError") {
          setIsError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, isError };
}

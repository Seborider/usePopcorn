import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MovieType } from "../types/types";

export function useLocalStorageStage(
  initialState: MovieType[],
  key: string,
): [MovieType[], Dispatch<SetStateAction<MovieType[]>>] {
  const [value, setValue] = useState<MovieType[]>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

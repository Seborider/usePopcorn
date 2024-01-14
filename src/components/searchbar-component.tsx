import React, { useRef } from "react";
import { useKey } from "../hooks/useKey";
import { SearchbarProps } from "../types/props";

export default function Searchbar({ query, setQuery }: SearchbarProps) {
  const searchInputElement = useRef<HTMLInputElement>(null);

  useKey(function () {
    if (document.activeElement === searchInputElement.current) return;
    searchInputElement.current?.focus();
    setQuery("");
  }, "Enter");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInputElement}
    />
  );
}

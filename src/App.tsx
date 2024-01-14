import NavBar from "./components/navbar-component";
import Main from "./components/main-component";
import { useState } from "react";
// import { tempMovieData, tempWatchedData } from "./consts/consts";
import Searchbar from "./components/searchbar-component";
import NumResults from "./components/numresults-component";
import ListBox from "./components/listbox-component";
import MovieList from "./components/movielist-component";
import WatchedMovieSummary from "./components/watchedmoviesummary-component";
import WatchedMovielist from "./components/watchedmovielist-component";
// import StarRating from "./components/starrating-component";
import Loader from "./components/loader-component";
import ErrorMessage from "./components/errormessage-component";
import MovieDetails from "./components/moviedetails";
import { WatchedMovie } from "./types/types";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageStage } from "./hooks/useLocalStorageStage";

// function Test() {
//   const [rating, setRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={10} onSetRating={setRating} />
//       <p>{rating} Stars</p>
//     </div>
//   );
// }

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, isError } = useMovies(query, handleMovieClose);
  const [watched, setWatched] = useLocalStorageStage([], "watched");

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleMovieClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      {/*<Test></Test>*/}
      {/*<StarRating*/}
      {/*  maxRating={5}*/}
      {/*  messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}*/}
      {/*></StarRating>*/}
      {/*<StarRating*/}
      {/*  maxRating={10}*/}
      {/*  size={24}*/}
      {/*  color={"green"}*/}
      {/*  className="test"*/}
      {/*  messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}*/}
      {/*  defaultRating={5}*/}
      {/*></StarRating>*/}

      <NavBar>
        <Searchbar query={query} setQuery={setQuery}></Searchbar>
        <NumResults movies={movies}></NumResults>
      </NavBar>
      <Main movies={movies}>
        <ListBox>
          {/*{isLoading ? <Loader /> : <MovieList movies={movies}></MovieList>}*/}
          {isLoading && <Loader></Loader>}
          {!isLoading && !isError && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
          {isError && <ErrorMessage message={isError}></ErrorMessage>}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleMovieClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched}></WatchedMovieSummary>
              <WatchedMovielist
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedMovielist>
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

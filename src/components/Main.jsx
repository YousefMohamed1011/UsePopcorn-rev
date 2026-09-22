import { useEffect } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import MovieDetail from "./MovieDetail";
import useLocalStorage from "../Hooks/useLocalStorage";

const WATCHED_STORAGE_KEY = "watched";

export default function  Main({ movies , selectedMovie, setSelectedMovie }) {
  const [watched, setWatched] = useLocalStorage(WATCHED_STORAGE_KEY, []);

  function handleAddWatchedMovie(movie) {
    setWatched((currentWatched) => {
      const isAlreadyWatched = currentWatched.some(
        (watchedMovie) => watchedMovie.imdbID === movie.imdbID
      );

      return isAlreadyWatched ? currentWatched : [...currentWatched, movie];
    });
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") setSelectedMovie(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedMovie]);
  return (
    <main className="main">
      <Box element={<MovieList movies={movies} setSelectedMovie={setSelectedMovie} handleAddWatchedMovie={handleAddWatchedMovie} />} />
      <Box
        element={
          <>
            {selectedMovie ? (
              <MovieDetail
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} />
              </>
            )}
          </>
        }
      />
    </main>
  );
}

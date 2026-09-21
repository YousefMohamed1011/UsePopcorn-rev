import { useEffect, useState } from "react";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import MovieDetail from "./MovieDetail";

const WATCHED_STORAGE_KEY = "watched";

function getStoredWatchedMovies() {
  try {
    const storedWatchedMovies = localStorage.getItem(WATCHED_STORAGE_KEY);
    const watchedMovies = storedWatchedMovies ? JSON.parse(storedWatchedMovies) : [];

    return Array.isArray(watchedMovies) ? watchedMovies : [];
  } catch {
    return [];
  }
}

export default function Main({ movies , selectedMovie, setSelectedMovie }) {
  const [watched, setWatched] = useState(getStoredWatchedMovies);

  function handleAddWatchedMovie(movie) {
    setWatched((currentWatched) => {
      const isAlreadyWatched = currentWatched.some(
        (watchedMovie) => watchedMovie.imdbID === movie.imdbID
      );

      return isAlreadyWatched ? currentWatched : [...currentWatched, movie];
    });
  }

  useEffect(() => {
    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watched));
  }, [watched]);

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

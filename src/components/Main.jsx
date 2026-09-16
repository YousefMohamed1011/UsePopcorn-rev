import { useState } from "react";
import { tempWatchedData } from "../data/movies";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";

export default function Main({ movies }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <Box element={<MovieList movies={movies} />} />
      <Box
        element={
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        }
      />
    </main>
  );
}

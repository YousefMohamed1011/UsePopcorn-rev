import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";

export default function App() {
  const KEY  = "83e644f5"
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  const abortController = new AbortController();
  let isCurrentRequest = true;

  async function fetchMovies() {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        { signal: abortController.signal }
      );
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();
      if (isCurrentRequest) setMovies(data.Search ?? []);
    } catch (error) {
      if (error.name !== "AbortError" && isCurrentRequest) {
        console.error(error.message);
        setError(error.message);
      }
    } finally {
      if (isCurrentRequest) setIsLoading(false);
    }
  }

  // Wait for typing to pause so a search is not sent for every keystroke.
  const searchTimer = setTimeout(fetchMovies, query.length < 3 ? 0 : 400);

  // Cancel the pending timer/request when the query changes or App unmounts.
  return () => {
    isCurrentRequest = false;
    clearTimeout(searchTimer);
    abortController.abort();
  };
}, [query]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} movies={movies} />
        {error && <p className="error">{error}</p>}
        { isLoading ? <Loader/> : <NumResults movies={movies} />}
      </Navbar>
      <Main movies={movies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
    </>
  );  
}

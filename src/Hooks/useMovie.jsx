import { useEffect, useState } from "react";

const KEY = "83e644f5";

export  function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

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

        if (isCurrentRequest) {
          setMovies(data.Search ?? []);
        }
      } catch (error) {
        if (error.name !== "AbortError" && isCurrentRequest) {
          setError(error.message);
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    }

    const searchTimer = setTimeout(fetchMovies, query.length < 3 ? 0 : 400);

    return () => {
      isCurrentRequest = false;
      clearTimeout(searchTimer);
      abortController.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
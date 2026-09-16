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
  const [query, setQuery] = useState("day");
  const [error, setError] = useState("");

useEffect(() => {
  setIsLoading(true);
    async  function fetchMovies() {
       try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
         if ( !res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
       }catch (error) {
       console.error(error.message);      
       setError(error.message);
       }
    }
    fetchMovies();
}, []);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} movies={movies} />
        {error && <p className="error">{error}</p>}
        { isLoading ? <Loader/> : <NumResults movies={movies} />}
      </Navbar>
      <Main movies={movies} />
    </>
  );  
}

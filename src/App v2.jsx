import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import { useMovie } from "./Hooks/useMovie";

export default function App() {


  const [query, setQuery] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
 const  { movies, isLoading, error } = useMovie(query)

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

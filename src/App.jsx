import { useState } from "react";

/* ============================================================
   COMPONENT COMPOSITION — الفكرة في الكود ده
   ============================================================
   الـ Composition بيحصل لما مكون (زي Box أو Navbar) بيستقبل
   "children" من برّه، وميكونش عنده أي فكرة عن إيه اللي جواه.
   ده بيخليه Reusable ومنفصل عن الـ logic بتاع أي مكون تاني.
   ============================================================ */

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

/* ------------------------------------------------------------
   Presentational components (بدون composition — data عادية جاية
   كـ props محددة زي movie أو movies)
   ------------------------------------------------------------ */

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery, movies }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

/* ------------------------------------------------------------
   ✅ COMPOSITION #1 — Navbar
   Navbar مش عارف إيه هو اللي هيتحط جواه (Logo؟ Search؟ أي حاجة).
   هو بس مسؤول عن الـ <nav className="nav-bar"> والـ styling.
   المحتوى بيتحدد من الـ caller (App) وقت الاستخدام.
   ------------------------------------------------------------ */
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

/* ------------------------------------------------------------
   ✅ COMPOSITION #2 — Box
   Box مسؤول بس عن حاجة واحدة: toggle الفتح/القفل (open/close).
   مش عارف هيعرض MovieList ولا WatchedSummary ولا أي حاجة تانية.
   ده بيخليه Reusable: بنستخدمه مرتين بمحتوى مختلف في Main.
   ------------------------------------------------------------ */
function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}

/* ------------------------------------------------------------
   مكونات عادية بتستقبل data عن طريق props صريحة (مش composition)
   ------------------------------------------------------------ */

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------
   ✅ COMPOSITION #3 (تطبيق عملي) — Main
   هنا بنركّب Box جوه بعضه مرتين بمحتوى مختلف كل مرة:
   المرة الأولى: MovieList
   المرة التانية: WatchedSummary + WatchedMoviesList
   ده الدليل العملي إن Box قابل لإعادة الاستخدام.
   ------------------------------------------------------------ */
function Main({ movies }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      {/* <Box>
        <MovieList movies={movies} />
      </Box> */}
      <Box element={<MovieList movies={movies} />} />

      <Box element={
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      } />
    </main>
  );
}

/* ------------------------------------------------------------
   ✅ COMPOSITION #4 (تطبيق عملي) — App
   هنا بنركّب Navbar بثلاث مكونات مختلفة جواه:
   Logo, Search, NumResults
   Navbar نفسه معندوش أي فكرة عنهم.
   ------------------------------------------------------------ */
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} movies={movies} />
        <NumResults movies={movies} />
      </Navbar>
      <Main movies={movies} />
    </>
  );
}

/* ============================================================
   خلاصة الفكرة:
   - Composition = تركيب مكونات جوه بعض عن طريق "children"
     بدل ما تكون hardcoded جوه بعض.
   - المكون الحاوي (Box / Navbar) بيبقى "غبي" (dumb) ومش عارف
     محتواه، وده بيخليه:
       1) قابل لإعادة الاستخدام (Reusable)
       2) بيفصل الـ logic (زي open/close) عن المحتوى الفعلي
       3) بيدّي مرونة للـ parent إنه يقرر يحط إيه جوه
   ============================================================ */
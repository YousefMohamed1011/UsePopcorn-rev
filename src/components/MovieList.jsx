function Movie({ movie, setSelectedMovie, handleAddWatchedMovie }) {
function handleClick() {
  setSelectedMovie((selectedMovie) =>
    selectedMovie ? null : movie
  );
 
}

  return (
    <li onClick={handleClick} className="movie">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
        <button
          className="btn-add-card"
          type="button"
          onClick={(e) => {
          e.stopPropagation();
          handleAddWatchedMovie(movie);
          }}
        >
          Add to Watched
        </button>
      </div>
    </li>
  );
}

export default function MovieList({ movies, setSelectedMovie, handleAddWatchedMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setSelectedMovie={setSelectedMovie} handleAddWatchedMovie={handleAddWatchedMovie} />
      ))}
    </ul>
  );
}

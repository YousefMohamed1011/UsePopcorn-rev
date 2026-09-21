function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating ?? "—"}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating ?? "—"}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime ? `${movie.runtime} min` : "—"}</span>
        </p>
      </div>
    </li>
  );
}

export default function WatchedMoviesList({ watched }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

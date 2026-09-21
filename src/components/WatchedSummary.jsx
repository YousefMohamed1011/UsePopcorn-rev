import { average } from "../utils/average";

export default function WatchedSummary({ watched }) {
  const imdbRatings = watched
    .map((movie) => Number(movie.imdbRating))
    .filter(Number.isFinite);
  const userRatings = watched
    .map((movie) => Number(movie.userRating))
    .filter(Number.isFinite);
  const runtimes = watched
    .map((movie) => Number(movie.runtime))
    .filter(Number.isFinite);

  const avgImdbRating = imdbRatings.length ? average(imdbRatings).toFixed(1) : "—";
  const avgUserRating = userRatings.length ? average(userRatings).toFixed(1) : "—";
  const avgRuntime = runtimes.length ? Math.round(average(runtimes)) : "—";

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
          <span>{avgRuntime === "—" ? avgRuntime : `${avgRuntime} min`}</span>
        </p>
      </div>
    </div>
  );
}

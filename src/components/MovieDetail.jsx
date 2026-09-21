import { useEffect, useState } from "react";
import Star from "../Star";
import Loader from "./Loader";

const MovieDetail = ({ selectedMovie, setSelectedMovie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    let isCurrentRequest = true;

    async function fetchMovieDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=83e644f5&i=${selectedMovie.imdbID}`,
          { signal: abortController.signal }
        );
        const data = await res.json();
        if (data.Response === "True") setMovieDetails(data);
      } catch (error) {
        if (error.name !== "AbortError") console.error(error);
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    }

    fetchMovieDetails();

    // React calls this before a new request and when the component unmounts.
    return () => {
      isCurrentRequest = false;
      abortController.abort();
    };
  }, [selectedMovie.imdbID]);

  useEffect(() => {
    document.title = `Movie | ${selectedMovie.Title}`;

     return () => {  //this is a clean up function 
      document.title = "usePopcorn";
    };
  }, [selectedMovie.Title]);

  const movie = movieDetails?.imdbID === selectedMovie.imdbID
    ? movieDetails
    : selectedMovie;

  const details = [
    ["Genre", movie.Genre],
    ["Director", movie.Director],
    ["Writer", movie.Writer],
    ["Actors", movie.Actors],
    ["Country", movie.Country],
    ["Language", movie.Language],
    ["Released", movie.Released],
    ["Awards", movie.Awards],
    ["Box office", movie.BoxOffice],
  ].filter(([, value]) => value && value !== "N/A");

  return (
    <div className="movie-detail">
      <button
        className="movie-detail__close"
        type="button"
        onClick={() => setSelectedMovie(null)}
        aria-label="Close movie details"
      >
        ×
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <div className="movie-detail__content">
            <h2>{movie.Title}</h2>
            <div className="movie-detail__meta">
              <span>{movie.Year}</span>
              <span>{movie.Type}</span>
              {movie.Rated && movie.Rated !== "N/A" && <span>{movie.Rated}</span>}
              {movie.Runtime && movie.Runtime !== "N/A" && <span>{movie.Runtime}</span>}
            </div>
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <p className="movie-detail__rating">
                <span>★</span> {movie.imdbRating} / 10
                {movie.imdbVotes && ` (${movie.imdbVotes} votes)`}
              </p>
            )}
            <div className="movie-detail__user-rating">
              <span>Your rating</span>
              <Star />
            </div>
            <button className="btn-add" type="button">
              + Add to watched
            </button>
            {movie.Plot && <p className="movie-detail__plot">{movie.Plot}</p>}
            <dl className="movie-detail__facts">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;

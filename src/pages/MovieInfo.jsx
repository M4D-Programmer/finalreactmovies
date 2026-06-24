import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/ui/Rating';

const API_KEY = '2f6b511a';

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then(r => r.json())
      .then(data => { if (mounted && data.Response === 'True') setMovie(data) })
      .finally(() => { if (mounted) setLoading(false) });
    return () => { mounted = false };
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!movie) return <div className="notfound">Movie not found</div>;

  return (
    <div id="movie__body">
      <main id="movie__main">
        <div className="container">
          <div className="row">
            <div className="movie__selected--top">
              <Link to="/movies" className="movie__link">← Back to movies</Link>
            </div>
            <div className="movie__selected">
              <figure className="movie__selected--figure">
                <img src={movie.Poster} alt={movie.Title} className="movie__selected--img" />
              </figure>
              <div className="movie__selected--description">
                <h2 className="purple">{movie.Title} ({movie.Year})</h2>
                <Rating rating={movie.imdbRating} />
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Cast:</strong> {movie.Actors}</p>
                <h3 className="purple">Plot</h3>
                <p className="movie__plot">{movie.Plot}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MovieInfo;

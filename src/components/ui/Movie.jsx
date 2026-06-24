import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Rating from './Rating.jsx'

const Movie = ({ movie }) => {
    const [img, setImg] = useState();
    const mountedRef = useRef(true);

    useEffect(() => {
        let timedOut = false;
        const image = new Image();
        const src = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '';
        image.src = src;
        const onLoad = () => {
            if (!timedOut && mountedRef.current) setImg(image);
        };
        image.onload = onLoad;

        const to = setTimeout(() => {
            timedOut = true;
            // if still not loaded, show fallback so user doesn't see blank
            if (mountedRef.current) setImg('fallback');
        }, 600);

        return () => { mountedRef.current = false; image.onload = null; clearTimeout(to); }
    }, [movie.Poster])

    return (
        <div className="movie">
            { img ? (
                <>
                <Link to={`/movies/${movie.imdbID}`}>
                    <figure className="movie__img--wrapper">
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    </figure>
                </Link>
                <div className="movie__title">
                    <Link to={`/movies/${movie.imdbID}`} className="movie__title--link">{movie.Title}</Link>
                </div>
                <div className="movie__bottom">
                    <Rating rating={movie.imdbRating} />
                    <div className="movie__director">{movie.Director}</div>
                </div>
                </>
            ) : (
                <div className="movie__img--skeleton">
                    <div className="skeleton movie__title--skeleton"></div>
                    <div className="skeleton movie__rating--skeleton"></div>
                    <div className="skeleton movie__meta--skeleton"></div>
                </div>
            )}
        </div>
    )
}

export default Movie;

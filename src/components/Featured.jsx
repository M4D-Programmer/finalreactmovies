import React, { useState, useEffect } from 'react';
import Movie from './ui/Movie';

const API_KEY = "2f6b511a";

const Featured = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const titles = [
            "The Shawshank Redemption","Inception","The Godfather","Pulp Fiction","The Dark Knight",
            "Forrest Gump","The Matrix","Fight Club","Interstellar","Gladiator","The Prestige","Back to the Future"
        ];

        Promise.all(titles.map(title =>
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
                .then(r => r.json())
                .catch(() => null)
        ))
        .then(results => {
            const valid = results.filter(r => r && r.Response === "True");
            setMovies(valid);
        })
    }, [])

    return (
        <section id="features">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">Featured <span className="purple">Movies</span></h2>
                    <div className="movies">
                        {movies.slice(0, 12).map(movie => (
                            <Movie movie={movie} key={movie.imdbID} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
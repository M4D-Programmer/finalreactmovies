import React, { useState } from 'react';
import Movie from '../components/ui/Movie';
import { useSearchParams } from 'react-router-dom';

const API_KEY = '2f6b511a';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [movies, setMovies] = useState([]); // full details
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  async function search(term, nextPage = 1, append = false) {
    if (!term) return;
    // update URL so back returns to this search
    setSearchParams({ q: term, page: String(nextPage) }, { replace: false });
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}&page=${nextPage}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setTotalResults(parseInt(data.totalResults, 10));
        // Fetch full details for each search result with 600ms timeout fallback
        const details = await Promise.all(data.Search.map(async (item) => {
          try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 600);
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}&plot=short`, { signal: controller.signal });
            clearTimeout(id);
            const d = await res.json();
            if (d && d.Response === 'True') return d;
            // fallback to search item minimal info
            return { Title: item.Title, Poster: item.Poster, imdbID: item.imdbID, Year: item.Year, Director: 'Unknown', imdbRating: 'N/A', Response: 'True' };
          } catch (e) {
            // timed out or failed, return minimal info so slot isn't blank
            return { Title: item.Title, Poster: item.Poster, imdbID: item.imdbID, Year: item.Year, Director: 'Unknown', imdbRating: 'N/A', Response: 'True' };
          }
        }));
        setMovies(prev => append ? [...prev, ...details] : details);
        setPage(nextPage);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  }

  // live search on each keypress (debounced)
  React.useEffect(() => {
    const t = setTimeout(() => { if (query) search(query, 1, false); else { setMovies([]); setSearchParams({}); } }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // random picks at bottom
  const [randomMovies, setRandomMovies] = React.useState([]);
  React.useEffect(() => {
    const pool = [
      'The Matrix','Fight Club','Interstellar','The Lord of the Rings: The Fellowship of the Ring',
      'The Empire Strikes Back','The Lion King','Gladiator','The Prestige','Se7en','Back to the Future',
      'Whiplash','The Departed','The Social Network','Parasite','Mad Max: Fury Road'
    ];
    const pick = [];
    while (pick.length < 6) {
      const t = pool[Math.floor(Math.random() * pool.length)];
      if (!pick.includes(t)) pick.push(t);
    }
    Promise.all(pick.map(title =>
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`).then(r => r.json()).catch(() => null)
    )).then(results => setRandomMovies(results.filter(r => r && r.Response === 'True')));
  }, []);

  async function loadMore() {
    const next = page + 1;
    const maxPages = Math.ceil(totalResults / 10);
    if (next <= maxPages) {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${next}`);
        const data = await res.json();
        if (data.Response === 'True') {
          const details = await Promise.all(data.Search.map(item =>
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}&plot=short`).then(r => r.json())
          ));
          setMovies(prev => [...prev, ...details.filter(d => d.Response === 'True')]);
          setPage(next);
        }
      } finally { setLoading(false) }
    }
  }

  // no automatic search on mount — user will type a query

  return (
    <div id="movies__body">
      <main id="movies__main">
        <section>
          <div className="movies__container container">
            <div className="row">
              <div className="movies__header">
                <h1 className="section__title">All Movies</h1>
                <form onSubmit="" style={{ display: 'flex', gap: 8 }}>
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies by title" />
                  <button className="btn">Search</button>
                </form>
              </div>
              <div className="movies">
                {movies.map(m => (<Movie movie={m} key={m.imdbID} />))}
              </div>
              {loading && <div className="loader">Loading...</div>}
              {movies.length > 0 && movies.length < totalResults && (
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <button className="btn" onClick={loadMore} disabled={loading}>Load more</button>
                </div>
              )}
              {randomMovies.length > 0 && (
                <>
                <h2 style={{ marginTop: 28 }}>Random Picks</h2>
                <div className="movies">
                  {randomMovies.map(m => (<Movie movie={m} key={m.imdbID} />))}
                </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Movies;

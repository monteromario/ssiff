import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import data from '../data.json';
import Icon from './Icon';
import MovieCard from './MovieCard';
import Nav from './Nav';

function Movies() {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('movie');
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('Todas');
  const sections = ['Todas', ...new Set(data.map((movie) => movie.Section))];

  const selectedMovie = selectedId ? data.find((movie) => movie.imdbID === selectedId) : null;
  const movies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return [...data]
      .filter((movie) => section === 'Todas' || movie.Section === section)
      .filter((movie) => {
        if (!normalizedQuery) return true;
        return [movie.Title, movie.Director, movie.Location]
          .some((field) => field.toLocaleLowerCase('es').includes(normalizedQuery));
      })
      .sort((a, b) => a.Title.localeCompare(b.Title, 'es'));
  }, [query, section]);

  return (
    <div className="app-shell">
      <Nav />
      <main className="page">
        {selectedMovie ? (
          <>
            <div className="page-heading page-heading--detail">
              <Link className="back-link" to="/movies">← Todas las películas</Link>
              <span className="section-kicker">FICHA DE PELÍCULA</span>
              <h1>{selectedMovie.Title}</h1>
            </div>
            <MovieCard movie={selectedMovie} detailed />
          </>
        ) : (
          <>
            <header className="page-heading">
              <span className="section-kicker">PROGRAMACIÓN 2026</span>
              <h1>Películas</h1>
              <p>Encuentra tu próxima historia por título, dirección o sala.</p>
            </header>

            <section className="catalog-controls" aria-label="Filtros de películas">
              <label className="search-field">
                <span className="sr-only">Buscar películas</span>
                <Icon name="search" size={20} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar película, dirección o sala"
                />
                {query && (
                  <button onClick={() => setQuery('')} type="button" aria-label="Borrar búsqueda">
                    <Icon name="close" size={18} />
                  </button>
                )}
              </label>
              <div className="filter-rail" role="group" aria-label="Filtrar por sección">
                {sections.map((item) => (
                  <button
                    aria-pressed={section === item}
                    className={`filter-chip${section === item ? ' is-active' : ''}`}
                    key={item}
                    onClick={() => setSection(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <div className="catalog-summary" aria-label={`${movies.length} ${movies.length === 1 ? 'película' : 'películas'}`} aria-live="polite">
              <strong>{movies.length}</strong> {movies.length === 1 ? 'película' : 'películas'}
            </div>

            {movies.length > 0 ? (
              <section className="movie-grid">
                {movies.map((movie) => {
                  const movieKey = [movie.imdbID, movie.DayID, movie.Time, movie.LocationID].join('-');
                  return <MovieCard key={movieKey} movie={movie} />;
                })}
              </section>
            ) : (
              <section className="empty-state">
                <span><Icon name="film" size={28} /></span>
                <h2>No encontramos coincidencias</h2>
                <p>Prueba con otro título o elimina los filtros.</p>
                <button className="button button--primary" onClick={() => { setQuery(''); setSection('Todas'); }} type="button">
                  Limpiar filtros
                </button>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Movies;

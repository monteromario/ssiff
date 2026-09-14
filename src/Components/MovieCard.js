import { Link } from 'react-router-dom';
import posterFallback from '../movie.png';
import Icon from './Icon';

function MovieCard({ movie, detailed = false }) {
  return (
    <article className={`movie-card${detailed ? ' movie-card--detailed' : ''}`}>
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.Poster}
          alt={`Cartel de ${movie.Title}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = posterFallback;
          }}
        />
        <span className="movie-card__section">{movie.Section}</span>
      </div>
      <div className="movie-card__content">
        <div className="movie-card__heading">
          <span className="movie-card__date">{movie.Day} · {movie.Time}</span>
          <h2>{movie.Title}</h2>
        </div>
        <div className="movie-card__meta">
          <span><Icon name="director" size={16} /> {movie.Director}</span>
          <span><Icon name="clock" size={16} /> {movie.Runtime}</span>
          <Link to={`/maps#${movie.LocationID}`}><Icon name="location" size={16} /> {movie.Location}</Link>
        </div>
        <p className="movie-card__plot">{movie.Plot}</p>
        <div className="movie-card__footer">
          {!detailed && (
            <Link className="movie-card__more" to={`/movies?movie=${movie.imdbID}`}>
              Ver ficha <Icon name="arrow" size={17} />
            </Link>
          )}
          <a className="movie-card__external" href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">
            IMDb <Icon name="external" size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;

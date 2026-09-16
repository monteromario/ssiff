import { Link } from 'react-router-dom';
import data from '../data.json';
import festivalDays from '../days.json';
import Icon from './Icon';
import Nav from './Nav';

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const difference = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
  return Math.floor(difference / 86400000);
}

function Home() {
  const today = dayOfYear(new Date());
  const activeDay = festivalDays.find((day) => Number(day.DayOfYear) === today);
  const nextDay = festivalDays.find((day) => Number(day.DayOfYear) >= today);
  const featuredDay = activeDay || nextDay || festivalDays[0];
  const sessions = data
    .filter((movie) => movie.DayID === featuredDay.DayID)
    .sort((a, b) => a.Time.localeCompare(b.Time));
  const locationCount = new Set(data.map((movie) => movie.LocationID)).size;

  return (
    <div className="app-shell">
      <Nav />
      <main className="page home-page">
        <section className="hero">
          <div className="hero__content">
            <div className="eyebrow"><span /> 18—26 septiembre · Donostia</div>
            <h1>Tu festival,<br /><em>bajo control.</em></h1>
            <p>Películas, horarios y salas en una guía sencilla para disfrutar del SSIFF sin perderte nada.</p>
            <div className="hero__actions">
              <Link className="button button--primary" to="/calendar">
                Ver agenda <Icon name="arrow" size={19} />
              </Link>
              <Link className="button button--ghost" to="/movies">Explorar películas</Link>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="festival-card">
              <span className="festival-card__edition">74</span>
              <span className="festival-card__label">edición</span>
              <div className="festival-card__dates">18 — 26<br />09 · 2026</div>
              <div className="festival-card__city">SAN SEBASTIÁN</div>
            </div>
            <div className="hero__disc hero__disc--one" />
            <div className="hero__disc hero__disc--two" />
          </div>
        </section>

        <section className="festival-stats" aria-label="Datos del festival">
          <div><strong>{data.length}</strong><span>películas</span></div>
          <div><strong>{festivalDays.length}</strong><span>días</span></div>
          <div><strong>{locationCount}</strong><span>salas</span></div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="section-kicker">EN CARTELERA</span>
              <h2>{activeDay ? 'La agenda de hoy' : `Próximo: ${featuredDay.DayName}`}</h2>
            </div>
            <Link className="text-link" to={`/calendar#${featuredDay.DayString}`}>
              Ver día completo <Icon name="arrow" size={17} />
            </Link>
          </div>

          <div className="session-list">
            {sessions.slice(0, 4).map((movie) => (
              <Link className="session-row" key={movie.imdbID} to={`/movies?movie=${movie.imdbID}`}>
                <span className="session-row__time">{movie.Time}</span>
                <span className="session-row__body">
                  <strong>{movie.Title}</strong>
                  <span><Icon name="location" size={15} /> {movie.Location} · {movie.Runtime}</span>
                </span>
                <span className="session-row__section">{movie.Section}</span>
                <Icon className="session-row__arrow" name="chevron" size={19} />
              </Link>
            ))}
          </div>
        </section>

        <section className="quick-grid" aria-label="Accesos rápidos">
          <Link className="quick-card quick-card--dark" to="/maps">
            <span className="quick-card__icon"><Icon name="map" size={24} /></span>
            <span><small>MUÉVETE POR DONOSTIA</small><strong>Salas y lugares</strong></span>
            <Icon name="arrow" size={22} />
          </Link>
          <Link className="quick-card quick-card--accent" to="/login">
            <span className="quick-card__icon"><Icon name="vote" size={24} /></span>
            <span><small>HAZ TU ELECCIÓN</small><strong>Accede y vota</strong></span>
            <Icon name="arrow" size={22} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Home;

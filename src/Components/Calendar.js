import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import data from '../data.json';
import days from '../days.json';
import posterFallback from '../movie.png';
import Icon from './Icon';
import Nav from './Nav';

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) / 86400000);
}

function Calendar() {
  const today = getDayOfYear(new Date());
  const todayEntry = days.find((day) => Number(day.DayOfYear) === today);
  const { hash } = useLocation();

  useEffect(() => {
    const targetId = hash.replace('#', '') || todayEntry?.DayString;
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash, todayEntry]);

  return (
    <div className="app-shell">
      <Nav />
      <main className="page calendar-page">
        <header className="page-heading">
          <span className="section-kicker">18—26 SEPTIEMBRE</span>
          <h1>Agenda</h1>
          <p>Nueve días de cine. Consulta horarios y organiza tu recorrido.</p>
        </header>

        <nav className="day-rail" aria-label="Ir a un día del festival">
          {days.map((day) => {
            const isToday = Number(day.DayOfYear) === today;
            return (
              <a className={`day-chip${isToday ? ' is-today' : ''}`} href={`#${day.DayString}`} key={day.DayID}>
                <small>{isToday ? 'HOY' : `DÍA ${day.DayNum}`}</small>
                <strong>{day.DayName.split(' ')[1]}</strong>
                <span>{day.DayName.split(' ')[0].slice(0, 3)}</span>
              </a>
            );
          })}
        </nav>

        <div className="agenda-days">
          {days.map((day) => {
            const dayMovies = data
              .filter((movie) => movie.DayID === day.DayID)
              .sort((a, b) => a.Time.localeCompare(b.Time));
            const isToday = Number(day.DayOfYear) === today;

            return (
              <section className={`agenda-day${isToday ? ' is-today' : ''}`} id={day.DayString} key={day.DayID}>
                <header className="agenda-day__header">
                  <span className="agenda-day__number">{day.DayNum.padStart(2, '0')}</span>
                  <div>
                    <span>{isToday ? 'HOY · ' : ''}DÍA {day.DayNum}</span>
                    <h2>{day.DayName}</h2>
                  </div>
                  <small>{dayMovies.length} {dayMovies.length === 1 ? 'sesión' : 'sesiones'}</small>
                </header>

                <div className="timeline">
                  {dayMovies.map((movie) => (
                    <article className="timeline-item" key={movie.imdbID}>
                      <time>{movie.Time}</time>
                      <img
                        src={movie.Poster}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = posterFallback;
                        }}
                      />
                      <div className="timeline-item__content">
                        <span className="timeline-item__section">{movie.Section}</span>
                        <h3><Link to={`/movies?movie=${movie.imdbID}`}>{movie.Title}</Link></h3>
                        <div className="timeline-item__meta">
                          <span><Icon name="clock" size={15} /> {movie.Runtime}</span>
                          <Link to={`/maps#${movie.LocationID}`}><Icon name="location" size={15} /> {movie.Location}</Link>
                        </div>
                        <details>
                          <summary>Sinopsis</summary>
                          <p>{movie.Plot}</p>
                        </details>
                      </div>
                      <Link className="timeline-item__arrow" to={`/movies?movie=${movie.imdbID}`} aria-label={`Ver ${movie.Title}`}>
                        <Icon name="chevron" size={20} />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Calendar;

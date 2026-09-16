import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './Icon';
import Nav from './Nav';

const places = [
  {
    id: 'casa',
    category: 'Casa',
    name: 'Casa',
    address: 'C. de Arrasate, 48, 20005 Donostia',
    query: 'Calle de Arrasate 48, Donostia',
    action: 'Llévame a casa',
  },
  {
    id: '02',
    alias: '03',
    category: 'Cines',
    name: 'Kursaal',
    address: 'Zurriola Hiribidea, 1, 20002 Donostia',
    query: 'Palacio de Congresos y Auditorio Kursaal, Donostia',
    action: 'Cómo llegar al Kursaal',
  },
  {
    id: '01',
    category: 'Cines',
    name: 'Teatro Victoria Eugenia',
    address: 'Argentinar Errepublika, 2, 20004 Donostia',
    query: 'Teatro Victoria Eugenia, Donostia',
    action: 'Cómo llegar al Victoria Eugenia',
  },
  {
    id: '05',
    category: 'Cines',
    name: 'Teatro Principal',
    address: 'Kale Nagusia, 3, 20003 Donostia',
    query: 'Teatro Principal, Donostia',
    action: 'Cómo llegar al Principal',
  },
  {
    id: '04',
    category: 'Cines',
    name: 'Cines Príncipe',
    address: 'San Juan Kalea, 10, 20003 Donostia',
    query: 'Cines Príncipe, Donostia',
    action: 'Cómo llegar a los Cines Príncipe',
  },
  {
    id: '06',
    category: 'Cines',
    name: 'Cines Antiguo Berri',
    address: 'Zarautz Kalea, 2, 20018 Donostia',
    query: 'Cines Antiguo Berri, Donostia',
    action: 'Cómo llegar al Antiguo Berri',
  },
  {
    id: 'ramuntxo',
    category: 'Restaurantes',
    name: 'Ramuntxo Berri',
    address: 'Peña y Goñi Kalea, 10, 20002 Donostia',
    query: 'Ramuntxo Berri Restaurante, Donostia',
    action: 'Cómo llegar al Ramuntxo Berri',
  },
  {
    id: 'gandarias',
    category: 'Restaurantes',
    name: 'Restaurante Gandarias',
    address: '31 de Agosto Kalea, 23, 20003 Donostia',
    query: 'Restaurante Gandarias, Donostia',
    action: 'Cómo llegar a Gandarias',
  },
];

const categories = [
  { id: 'casa', label: 'Casa', icon: 'home' },
  { id: 'theatres', label: 'Cines', icon: 'film' },
  { id: 'food', label: 'Restaurantes', icon: 'location' },
];

function Maps() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.replace('#', ''))?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="app-shell">
      <Nav />
      <main className="page">
        <header className="page-heading">
          <span className="section-kicker">DONOSTIA · SAN SEBASTIÁN</span>
          <h1>Salas y lugares</h1>
          <p>Todo lo importante a mano para llegar sin complicaciones.</p>
        </header>

        <nav className="filter-rail map-filter" aria-label="Categorías de lugares">
          {categories.map((category) => (
            <a className="filter-chip" href={`#${category.id}`} key={category.id}>
              <Icon name={category.icon} size={17} /> {category.label}
            </a>
          ))}
        </nav>

        <div className="places-list">
          {categories.map((category) => (
            <section className="places-section" id={category.id} key={category.id}>
              <div className="places-section__heading">
                <span><Icon name={category.icon} size={20} /></span>
                <h2>{category.label}</h2>
              </div>
              <div className="places-grid">
                {places.filter((place) => place.category === category.label).map((place) => {
                  const encodedQuery = encodeURIComponent(place.query);
                  return (
                    <article className="place-card" id={place.id} key={place.id}>
                      {place.alias && <span className="anchor-alias" id={place.alias} />}
                      <iframe
                        src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
                        title={`Mapa de ${place.name}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="place-card__content">
                        <h3>{place.name}</h3>
                        <p><Icon name="location" size={16} /> {place.address}</p>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`} target="_blank" rel="noreferrer">
                          {place.action} <Icon name="external" size={16} />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Maps;

import { Link } from 'react-router-dom';
import Icon from './Icon';
import Nav from './Nav';

function Error() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="page">
        <section className="empty-state empty-state--large">
          <span><Icon name="film" size={30} /></span>
          <span className="section-kicker">ERROR 404</span>
          <h1>Esta sesión no está en cartelera</h1>
          <p>La página que buscas no existe o ha cambiado de dirección.</p>
          <Link className="button button--primary" to="/">Volver al inicio <Icon name="arrow" size={19} /></Link>
        </section>
      </main>
    </div>
  );
}

export default Error;

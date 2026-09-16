import { Link } from 'react-router-dom';
import Icon from './Icon';
import Nav from './Nav';

function Voting() {
  const user = window.localStorage.getItem('SSIFFuser');

  return (
    <div className="app-shell">
      <Nav />
      <main className="page voting-page">
        {!user ? (
          <section className="empty-state empty-state--large">
            <span><Icon name="vote" size={30} /></span>
            <h1>Accede para votar</h1>
            <p>Necesitamos saber quién eres antes de mostrar tu formulario de votación.</p>
            <Link className="button button--primary" to="/login">Iniciar sesión <Icon name="arrow" size={19} /></Link>
          </section>
        ) : (
          <>
            <header className="page-heading page-heading--compact">
              <span className="section-kicker">PARTICIPA · {user.toUpperCase()}</span>
              <h1>Mis votos</h1>
              <p>Valora las películas que has visto durante el festival.</p>
            </header>
            <section className="voting-frame">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf25Xq5h6BeVRpqF6n5AtLfS_QD-fPQXez2uD_nxKLhwUhTyg/viewform?embedded=true"
                title="Formulario de votación"
              >
                Cargando…
              </iframe>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Voting;

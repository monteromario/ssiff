import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ico from '../ssiff.svg';
import Icon from './Icon';

const mainLinks = [
  { to: '/', label: 'Inicio', icon: 'home', end: true },
  { to: '/calendar', label: 'Agenda', icon: 'calendar' },
  { to: '/movies', label: 'Películas', icon: 'film' },
  { to: '/maps', label: 'Mapas', icon: 'map' },
];

function readUser() {
  return window.localStorage.getItem('SSIFFuser');
}

function Nav() {
  const [user, setUser] = useState(readUser);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUser = () => setUser(readUser());
    window.addEventListener('storage', refreshUser);
    window.addEventListener('ssiff-user-change', refreshUser);
    return () => {
      window.removeEventListener('storage', refreshUser);
      window.removeEventListener('ssiff-user-change', refreshUser);
    };
  }, []);

  const logout = () => {
    window.localStorage.removeItem('SSIFFuser');
    window.dispatchEvent(new Event('ssiff-user-change'));
    setUser(null);
    navigate('/');
  };

  const linkClass = ({ isActive }) => `desktop-nav__link${isActive ? ' is-active' : ''}`;
  const mobileLinkClass = ({ isActive }) => `bottom-nav__link${isActive ? ' is-active' : ''}`;

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="brand" to="/" aria-label="SSIFF, ir al inicio">
            <img src={ico} alt="SSIFF" />
            <span>2026</span>
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {mainLinks.map((item) => (
              <NavLink key={item.to} className={linkClass} end={item.end} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            {user && <NavLink className={linkClass} to="/voting">Votar</NavLink>}
          </nav>

          <div className="account-actions">
            <Link className="account-link" to="/login" aria-label={user ? `Cuenta de ${user}` : 'Iniciar sesión'}>
              <span className="account-link__icon"><Icon name="user" size={18} /></span>
              <span className="account-link__label">{user || 'Entrar'}</span>
            </Link>
            {user && (
              <button className="icon-button logout-button" onClick={logout} type="button" aria-label="Cerrar sesión">
                <Icon name="logout" size={19} />
              </button>
            )}
          </div>
        </div>
      </header>

      <nav className="bottom-nav" aria-label="Navegación móvil">
        {mainLinks.map((item) => (
          <NavLink key={item.to} className={mobileLinkClass} end={item.end} to={item.to}>
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <NavLink className={mobileLinkClass} to={user ? '/voting' : '/login'}>
          <Icon name={user ? 'vote' : 'user'} size={21} />
          <span>{user ? 'Votar' : 'Entrar'}</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Nav;

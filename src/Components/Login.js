import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import Nav from './Nav';

const users = ['Cristina H.', 'Cristina S.', 'Germán', 'Javier', 'Leire', 'Mario', 'Invitado'];

function Login() {
  const [user, setUser] = useState(() => window.localStorage.getItem('SSIFFuser'));
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    window.localStorage.setItem('SSIFFuser', selectedUser);
    window.dispatchEvent(new Event('ssiff-user-change'));
    setUser(selectedUser);
    navigate('/voting');
  };

  const logout = () => {
    window.localStorage.removeItem('SSIFFuser');
    window.dispatchEvent(new Event('ssiff-user-change'));
    setUser(null);
    setSelectedUser('');
  };

  return (
    <div className="app-shell auth-page-shell">
      <Nav />
      <main className="page auth-page">
        <section className="auth-intro">
          <span className="auth-intro__icon"><Icon name="spark" size={28} /></span>
          <span className="section-kicker">TU ESPACIO SSIFF</span>
          <h1>{user ? `Hola, ${user}` : 'Entra y participa'}</h1>
          <p>{user ? 'Tu sesión está activa. Ya puedes acceder a la votación del festival.' : 'Identifícate para guardar y enviar tus votos.'}</p>
        </section>

        <section className="auth-card">
          {!user ? (
            <form onSubmit={login}>
              <label className="form-field" htmlFor="user">
                <span>Usuario</span>
                <select id="user" required value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)}>
                  <option value="" disabled>Selecciona tu usuario</option>
                  {users.map((name) => <option key={name} value={name}>{name === 'Invitado' ? '— Invitado —' : name}</option>)}
                </select>
              </label>
              <label className="form-field" htmlFor="password">
                <span>Contraseña</span>
                <input id="password" type="password" autoComplete="current-password" placeholder="Tu contraseña" required />
              </label>
              <button className="button button--primary button--full" type="submit">
                Acceder <Icon name="arrow" size={19} />
              </button>
              <p className="form-note">El acceso está reservado al grupo del festival.</p>
            </form>
          ) : (
            <div className="profile-card">
              <span className="profile-card__avatar">{user.charAt(0).toUpperCase()}</span>
              <div><small>SESIÓN ACTIVA</small><strong>{user}</strong></div>
              <Link className="button button--primary button--full" to="/voting">
                Ir a mis votos <Icon name="arrow" size={19} />
              </Link>
              <button className="button button--quiet button--full" onClick={logout} type="button">
                <Icon name="logout" size={18} /> Cerrar sesión
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Login;

import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';

function Login() {

  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  let login = (e) => {
    setLocalUser(selectedUser)
  }

  let logout = () => {
    setUser(null)
    setSelectedUser(null)
    clearLocalUser()
  }

  let getLocalUser = () => {
    return localStorage.getItem('SSIFFuser');
  }

  let clearLocalUser = () => {
    localStorage.removeItem('SSIFFuser');
  }

  let setLocalUser = (e) => {
    localStorage.setItem('SSIFFuser', e);
  }

  let handleSelection = (e) => {
    setSelectedUser(e.target.value)
  }

  useEffect(() => {
    setUser(getLocalUser())
  }, [])

  return (
    <div>
      <Nav />
      <p className="m-3">You're @ Login {user}</p>
      {
        !user ?
          <div className="m-3">
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">Usuario</label>
                <select id="user" className="form-select" defaultValue="" required onChange={handleSelection}>
                  <option value=""> </option>
                  <option id="Cristina H.">Cristina H.</option>
                  <option id="Cristina S.">Cristina S.</option>
                  <option id="Germán">Germán</option>
                  <option id="Javier">Javier</option>
                  <option id="Leire">Leire</option>
                  <option id="Mario">Mario</option>
                  <option id="Invitado">-- invitado --</option>
          </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" autoComplete="password" required/>
            </div>
            <button type="submit" className="btn btn-dark">Acceder</button>
          </form>
          </div>
        :
        <div className="m-3">
          <p>Welcome</p>
          <button type="submit" className="btn btn-danger" onClick={logout}>Desconectar</button>
        </div>
      }
        </div>
  );
}

export default Login;

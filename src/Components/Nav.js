import '../App.css';
import ico from '../ssiff.svg'
import React, { useState, useEffect } from 'react';


function Nav() {

  const [user, setUser] = useState(null);

  let logout = () => {
    setUser(null)
    clearLocalUser()
  }

  let getLocalUser = () => {
    return localStorage.getItem('SSIFFuser');
  }

  let clearLocalUser = () => {
    localStorage.removeItem('SSIFFuser');
  }

  useEffect(() => {
    setUser(getLocalUser())
  }, [])


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
              <img src={ico} alt="Logo" width="" height="25" className="d-inline-block align-text-top"></img>
            </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="./">Inicio</a>
            <a className="nav-link" href="./calendar">Calendario</a>
            <a className="nav-link" href="./movies">Películas</a>
            <a className="nav-link" href="./maps">Mapas</a>
            { user ? <p className="nav-link" onClick={logout}>Salir</p> : <a className="nav-link" href="./login">Login</a> }
          </div>
        </div>
      </div>
</nav>
  );
}

export default Nav;

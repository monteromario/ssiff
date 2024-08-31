import Nav from './Nav';
import '../App.css';
import Login from '../equipo.png'
import Calendar from '../calendario.png'
import Movies from '../cine.png'
import Map from '../mapas.png'
import Logout from '../power-off.png'
import React, { useState, useEffect } from 'react';

function Home() {

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
    <div><Nav />
    <p className="m-3">You're @ Home</p>
      <div className="row row-cols-2 row-cols-md-2 g-4 m-3 text-center">
        <div className="col">
        <a className="nav-link" href="/calendar"><div className="card">
            <img src={Calendar} className="card-img-top p-4" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Calendario</h5>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/movies"><div className="card">
            <img src={Movies} className="card-img-top p-4" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Películas</h5>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/maps"><div className="card">
            <img src={Map} className="card-img-top p-4" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Mapas</h5>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        { user ? 
          <div className="nav-link" onClick={logout}><div className="card">
            <img src={Logout} className="img-fluid Home-Icon p-4" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Salir</h5>
            </div>
          </div>
          </div>
        : 
          <a className="nav-link" href="/login"><div className="card">
            <img src={Login} className="img-fluid Home-Icon p-4" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Login</h5>
            </div>
          </div>
          </a>
        }
        </div>
      </div>
    </div>
  );
}

export default Home;

import Nav from './Nav';
import '../App.css';
import Login from '../equipo.png'
import Calendar from '../calendario.png'
import Vote from '../voto.png'
import Movies from '../cine.png'
import Map from '../mapas.png'
import Logout from '../power-off.png'
import data from '../data.json'
import startDays from '../days.json'
import spinner from '../spinner.svg'
import dots from '../dots.svg'
import React, { useState, useEffect } from 'react';

function Home() {

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState(null);
  const [days, setDays] = useState(null);
  const [dayOfYear, setDayOfYear] = useState(null);

  let calculateDay = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    setDayOfYear(day);
  }

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
    setTimeout(() => {
      setMovies(data.sort(function(a, b){
        if (a.Time < b.Time) {
          return -1;
        }
        if (a.Time > b.Time) {
          return 1;
        }
        return 0;
    }));
    setDays(startDays);
    calculateDay();
    //setDayOfYear(1);
    }, "1000");
  }, [])


  return (
    <div><Nav />
    <div className="row row-cols-4 row-cols-md-4 g-2 mx-3 my-2 text-center">
        <div className="col">
        <a className="nav-link" href="/calendar"><div className="card">
            <img src={Calendar} className="card-img-top p-2" alt="..."></img>
            <div className="card-body p-0">
              <small className="card-title">Calendario</small>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/movies"><div className="card">
            <img src={Movies} className="card-img-top p-2" alt="..."></img>
            <div className="card-body p-0">
              <small className="card-title">Películas</small>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/maps"><div className="card">
            <img src={Map} className="card-img-top p-2" alt="..."></img>
            <div className="card-body p-0">
              <small className="card-title">Mapas</small>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        { user ? 
          <a className="nav-link" href="/voting"><div className="card">
            <img src={Vote} className="img-fluid Home-Icon p-3" alt="..."></img>
            <div className="card-body p-0">
              <small className="card-title">Votar</small>
            </div>
          </div>
          </a>
        : 
          <a className="nav-link" href="/login"><div className="card">
            <img src={Login} className="img-fluid Home-Icon p-2" alt="..."></img>
            <div className="card-body p-0">
              <small className="card-title">Login</small>
            </div>
          </div>
          </a>
        }
        </div>
      </div>
    { !days ? 
      <div>
        <div className="m-5 d-flex justify-content-center">
        <img src={spinner} className="App-spinner" alt="loading"/>
        </div>
        <div className="m-5 d-flex justify-content-center">
            <p>
                <strong>cargando datos</strong><span className="m-1 align-bottom"><img src={dots} className="" alt="loading" /></span>
            </p>
        </div>
      </div>
    : <div id="agenda">
        <p className="mx-4 mb-2 mt-3">Agenda: { new Date().toLocaleDateString("es-ES") } (día: { dayOfYear })</p>
        <div className="card border-dark mx-4 mb-3">
          <div className="card-header d-flex justify-content-end py-1">Hoy</div>
            { movies.filter(movie => movie.DayID == dayOfYear).map((movie) => (<a key={movie.Title} href={"/movies?movie="+movie.imdbID} className="App-link">
                <div className="row m-1">
                  <h3 className="card-text"><small><i className="fa-solid fa-clapperboard"/></small> {movie.Title}</h3>
                </div>
                <div className="row m-1">
                  <div className="col-8 lh-1 w-100">
                    <p className="card-text"><i className="fa-solid fa-school-flag"></i> {movie.Location} ({movie.Time}h)</p>
                    <hr className="row m-1 pb-2"/>
                  </div>
                </div>
              </a>
              ))
            } 
          </div>
        <div className="card border-dark mx-4 transp">
          <div className="card-header d-flex justify-content-end py-1">Mañana</div>
          { movies.filter(movie => movie.DayID == (dayOfYear+2)).map((movie) => (<a key={movie.Title} href={"/movies?movie="+movie.imdbID} className="App-link">
                <div className="row m-1">
                  <h3 className="card-text"><small><i className="fa-solid fa-clapperboard"/></small> {movie.Title}</h3>
                </div>
                <div className="row m-1">
                  <div className="col-8 lh-1 w-100">
                    <p className="card-text"><i className="fa-solid fa-school-flag"></i> {movie.Location} ({movie.Time}h)</p>
                    <hr className="row m-1 pb-2"/>
                  </div>
                </div>
              </a>
              ))
            }
      </div>
      </div>
     } 
      
    </div>
  );
}

export default Home;

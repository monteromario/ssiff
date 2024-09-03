import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';
import data from '../data.json'
import startDays from '../days.json'
import spinner from '../spinner.svg'
import dots from '../dots.svg'


function Calendar() {

  const [movies, setMovies] = useState(null);
  const [days, setDays] = useState(null);
  const [dayOfYear, setDayOfYear] = useState(null);
  const urlPrefix = "https://www.imdb.com/title/";

  let calculateDay = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    setDayOfYear(day);
  }

  let calculatePosition = (today) => {
    switch (today-264) {
      case 0:
          return 'one';

      case 1:
        return 'two';
      case 2:
        return 'three';
      case 3:
        return 'four';
      case 4:
        return 'five';
      case 5:
        return 'six';
      case 6:
        return 'seven';
      case 7:
        return 'eight';
      case 8:
        return 'nine';
      default:
        return 'one';
    }
  }

  let scrollTo = (position) => {
    if (document.querySelector('#'+position)) {
      document.querySelector('#'+position).scrollIntoView();
    } else {
      console.log('dom not ready to scroll')
    }
  }

  let autoScroll = () => {
    setTimeout(() => {
      scrollTo(calculatePosition(dayOfYear))
    }, "500");  
}

  useEffect(() => {  
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
    }, "1000");
  }, []);

  return (
    <div><Nav />
    <span className="m-3"><i className="fa-solid fa-circle-info"></i> Today: { new Date().toLocaleDateString("es-ES") } ({ dayOfYear })</span>
    <div className="mx-2 mt-2 d-flex flex-wrap justify-content-evenly">
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#one">Día <b>1</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#two">Día <b>2</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#three">Día <b>3</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#four">Día <b>4</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#five">Día <b>5</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#six">Día <b>6</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#seven">Día <b>7</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#eight">Día <b>8</b></a>
    <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#nine">Día <b>9</b></a>
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
: 
  <div className="card-group m-3" onLoad={autoScroll()}>
  { days.map(item => (
        <div className="card border-dark mb-4" key={item.DayID} id={item.DayString}>
          <div className="row m-3">
          <h3 className="card-title">Día {item.DayNum}: {item.DayName} { item.DayOfYear.toString() === dayOfYear.toString() ? <span className="text-success mx-1"><i className="fa-solid fa-calendar-day"></i> Hoy</span> : <></> }</h3>
          { movies.filter(movie => movie.DayID === item.DayID).map((movie) => (
          <div className="card border-dark mb-3" key={movie.imdbID}>
          <div className="card-header"><i className="fa-regular fa-clock"></i> <b>{movie.Time}</b></div>
          <div className="row">
          <h1 className="card-title">{movie.Title}</h1>
          </div>
          <div className="row m-1">
            <div className="col-4"><img src={movie.Poster} className="card-img-top" alt={movie.Title}/></div>
            <div className="col-8 lh-1">
            <p className="card-text"><i className="fa-solid fa-clapperboard"></i> {movie.Director}</p>
            <p className="card-text"><i className="fa-solid fa-tag"></i> {movie.Section}</p>
            <p className="card-text"><i className="fa-solid fa-stopwatch"></i> {movie.Runtime}</p>
            <p className="card-text"><i className="fa-solid fa-school-flag"></i> {movie.Location}</p>
            </div>
          </div>
          <div className="row m-1 pb-2">
          <small className="text-muted"><a className="App-link" data-bs-toggle="collapse" href={'#plot'+movie.imdbID} role="button" aria-expanded="false" aria-controls={'#plot'+movie.imdbID}>Sinopsis <i className="fa-solid fa-square-caret-down"></i></a></small>
          <small className="text-muted collapse" id={'plot'+movie.imdbID}><em>{movie.Plot} </em><a href={urlPrefix+movie.imdbID} className="ml-5"><i className="fa-solid fa-up-right-from-square"></i></a></small>
          </div>
        </div>
    ))}
    </div>
  </div>
  )) }
  </div>
}

    </div>
  );
}

export default Calendar;

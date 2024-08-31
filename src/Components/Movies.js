import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';
import data from '../data.json'
import spinner from '../spinner.svg'
import dots from '../dots.svg'

function Movies() {

  const urlPrefix = "https://www.imdb.com/title/"

  const [movies, setMovies] = useState(null);
  const [filter, setFilter] = useState(null);

  let filterMovies = (e) => {
    let text = e.target.value
    if (text.length === 0) {
      getAllMovies()
    } else {
      setMovies(movies.filter((movie) => movie.Title.toLowerCase().includes(text.toLowerCase())))
      setFilter(text)
    }
  }

  let getAllMovies = () => {
    if (filter) {
    } else {
      setMovies(data.sort(function(a, b){
        if (a.Title < b.Title) {
          return -1;
        }
        if (a.Title > b.Title) {
          return 1;
        }
        return 0;
      }))
    }
  }

useEffect(() => {  
  setTimeout(() => {
    getAllMovies()
  }, "1000");
}, []);

  return (
    <div><Nav />
    <span className="m-3"><i className="fa-solid fa-circle-info"></i> You're @ Movies</span>
    <form className="d-flex m-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" onChange={filterMovies}/>
        { filter ? 
        <button className="btn btn-dark" type="submit">Borrar</button>
        :
        <div className="btn btn-dark" type="submit">Buscar</div>
        }
      </form>
      { movies ? movies.length == '0' ? <span className="m-3">No hay resultados. <a href="?">Busca de nuevo.</a></span> : <></> : <></> }
    { movies ? 
      <div className="card-group m-3">
      { movies.map((movie) => (
      <div className="card border-dark mb-4" key={movie.imdbID}>
        <div className="card-header d-flex justify-content-end"><small><i className="fa-solid fa-tag"></i> {movie.Section}</small></div>
        <div className="row m-1">
        <h1 className="card-title">{movie.Title}</h1>
        </div>
        <div className="row m-1">
          <div className="col-4"><img src={movie.Poster} className="card-img-top" alt={movie.Title}/></div>
          <div className="col-8 lh-1">
          <p className="card-text"><i className="fa-solid fa-clapperboard"></i> {movie.Director}</p>
          <p className="card-text">{movie.Day}</p>
          <p className="card-text">{movie.Time} ({movie.Runtime})</p>
          <p className="card-text"><i className="fa-solid fa-school-flag"></i> {movie.Location}</p>
          </div>
        </div>
        <div className="row m-1 pb-2">
        <small className="text-muted"><em>{movie.Plot} </em><a href={urlPrefix+movie.imdbID} className="ml-5"><i className="fa-solid fa-up-right-from-square"></i></a></small>
        </div>
      </div>
      )) }
      </div>
    : 
      <div>
      <div className="m-5 d-flex justify-content-center">
      <img src={spinner} className="App-spinner" alt="loading"/>
      </div>
      <div className="m-5 d-flex justify-content-center">
          <p>
              <strong>loading contents</strong><span className="m-1 align-bottom"><img src={dots} className="" alt="loading" /></span>
          </p>
      </div>
      </div>
    } 
    </div>
  );
}

export default Movies;

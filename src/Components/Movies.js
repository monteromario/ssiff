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
  const [sections, setSections] = useState(null);
  const [filteredSections, setFilteredSections] = useState(null);
  const [urlParam, setUrlParam] = useState(null);

  let filterMovies = (e) => {
    let text = e.target.value
    if (text.length === 0) {
      getAllMovies()
    } else {
      setMovies(movies.filter((movie) => movie.Title.toLowerCase().includes(text.toLowerCase())))
      setFilter(text)
    }
  }

  let filterSections = (e) => {
    let text = e.target.id
    if (text.length === 0) {
      getAllMovies()
    } else {
      setMovies(movies.filter((movie) => movie.Section.toLowerCase().includes(text.toLowerCase())))
      setFilteredSections(text)
    }
  }

  let getSections = (data) => {
    let uniq = (a) => {
      return Array.from(new Set(a));
    }
    let push = (array) => {
      let values = []
      array.forEach(element => {
        values.push(element.Section)
      });
      return values
    }
    setSections(uniq(push(data)))
  }

  let getAllMovies = () => {
      setMovies(data.sort(function(a, b){
        if (a.Title < b.Title) {
          return -1;
        }
        if (a.Title > b.Title) {
          return 1;
        }
        return 0;
      }))
    getSections(data)
  }

  let getUrlParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('movie')) {
      return urlParams.get('movie')
    } else {}
  }

  let setUrlParams = (id) => {
    if (id) {
      setMovies(data.filter((movie) => movie.imdbID === id))
      setUrlParam(id)
    } else {
      getAllMovies()
    }
  }

useEffect(() => {  
  setTimeout(() => {
    getAllMovies()
    getSections(data)
    setUrlParams(getUrlParams())
  }, "1000");
}, []);

  return (
    <div><Nav />
    { !urlParam ? <form className="d-flex m-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" onChange={filterMovies}/>
        { filter ? 
        <button className="btn btn-dark" type="submit">Borrar</button>
        :
        <div className="btn btn-dark" type="submit">Buscar</div>
        }
    </form>
    :
    <div></div>
    }
    
    { !urlParam ?
    <div className="mx-2 mt-2 d-flex justify-content-evenly">
          { sections ? !filteredSections ? sections.map((section) => ( <span className="badge rounded-pill text-bg-dark mx-1 chip" onClick={filterSections} key={section} id={section}>{section}</span> )) : <span><small><i className="fa-solid fa-filter"></i></small> {filteredSections} <a href="?" className="badge rounded-pill text-bg-dark mx-1 chip">Ver todas las secciones</a></span> : <></>}
    </div>
    :
    <div></div>
    }

      { movies ? movies.length == '0' ? <div className="m-3"><span className="my-3">No hay resultados. <a href="?">Busca de nuevo.</a></span></div> : <></> : <></> }
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
          <a href={"/maps#"+movie.LocationID} className="card-text App-link"><i className="fa-solid fa-school-flag"></i> {movie.Location}</a>
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
              <strong>cargando datos</strong><span className="m-1 align-bottom"><img src={dots} className="" alt="loading" /></span>
          </p>
      </div>
      </div>
    }
    { urlParam ? urlParam.length != '0' ? <div className="m-3 text-center"><span className="my-3"><a href="?">Ver todas las películas</a></span></div> : <></> : <></> }
    </div>
  );
}

export default Movies;

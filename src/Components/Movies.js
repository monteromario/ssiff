import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';
// import axios, * as others from 'axios';
import data from '../data.json'
import spinner from '../spinner.svg'
import dots from '../dots.svg'


// let baseUrl = 'https://imdb146.p.rapidapi.com/v1/title/'
// let baseUrl = 'https://www.omdbapi.com/'
// let apiKey = 'af474d0b'
// let movieId = 'tt6263850'
// https://www.omdbapi.com/?i=tt23468450&apikey=af474d0b

function Movies() {

  const [movies, setMovies] = useState(null);
  const urlPrefix = "https://www.imdb.com/title/"
/*
  useEffect(() => {  
      axios.get(baseUrl, {
        headers: {
            'X-RapidAPI-Host': 'imdb146.p.rapidapi.com',
            'X-RapidAPI-Key': '76c5653635msh335a6b889d0bb76p153645jsn9f338c6e4b08'
        },
        params: {
          id: 'tt14225838'
        }
    })
    .then((res) => setMovie(res.data))
    .catch((err) => console.error(err));
    }, []);
*/

/*
  useEffect(() => {  
    axios.get(baseUrl, {
      headers: {},
      params: {
        i: movieId,
        apikey: apiKey
      }
  })
  .then((res) => setMovie(res.data))
  .catch((err) => console.error(err));
  }, []);
*/

useEffect(() => {  
  setTimeout(() => {
    setMovies(data.sort(function(a, b){
      //return a.DayID - b.DayID;
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
  }));
  }, "1000");
}, []);

  return (
    <div><Nav />
    <span className="m-3"><i className="fa-solid fa-circle-info"></i> You're @ Movies</span>
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

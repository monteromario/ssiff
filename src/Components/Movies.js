import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import data from '../data.json'
import spinner from '../spinner.svg'
import dots from '../dots.svg'


// let baseUrl = 'https://imdb146.p.rapidapi.com/v1/title/'
let baseUrl = 'https://www.omdbapi.com/'
let apiKey = 'af474d0b'
let movieId = 'tt6263850'

function Movies() {

  const [movie, setMovie] = useState(null);
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
    setMovie(data);
  }, "5000");
}, []);

  return (
    <div><Nav />
    <p className="m-3">You're @ Movies</p>
    { movie ? 
      <div>
      <p className="m-3">{movie.Title}</p> 
      <p className="m-3">{movie.Director}</p> 
      <p className="m-3">{movie.Runtime}</p>
      <img src={movie.Poster} className="m-3 card h-100" />
      </div>
    : 
            <div>
            <div className="m-5 d-flex justify-content-center">
            <img src={spinner} className="App-spinner" alt="loading" />
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

import Nav from './Nav';
import '../App.css';
import Login from '../login.jpeg'
import Calendar from '../calendar.jpeg'
import Movies from '../movie.png'
import Map from '../map.jpeg'

function Home() {
  return (
    <div><Nav />
    <p className="m-3">You're @ Home</p>
      <div className="row row-cols-2 row-cols-md-2 g-4 m-3 text-center">
        <div className="col">
          <a className="nav-link" href="/login"><div className="card">
            <img src={Login} className="img-fluid" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Login</h5>
            </div>
          </div>
          </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/calendar"><div className="card">
            <img src={Calendar} className="card-img-top py-3" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Calendar</h5>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/movies"><div className="card">
            <img src={Movies} className="card-img-top p-3" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Movies</h5>
            </div>
          </div>
            </a>
        </div>
        <div className="col">
        <a className="nav-link" href="/maps"><div className="card">
            <img src={Map} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Maps</h5>
            </div>
          </div>
            </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

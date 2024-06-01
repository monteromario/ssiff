import Nav from './Nav';
import '../App.css';

function Login() {
  return (
    <div>
      <Nav />
      <p className="m-3">You're @ Login</p>
      <div className="m-3 text-center">
        <button type="button" className="btn btn-primary btn-lg m-2">Large button</button>
        <button type="button" className="btn btn-secondary btn-lg m-2">Large button</button>
        <button type="button" className="btn btn-secondary btn-lg m-2">Large button</button>
        <button type="button" className="btn btn-secondary btn-lg m-2">Large button</button>
        <button type="button" className="btn btn-secondary btn-lg m-2">Large button</button>
        <button type="button" className="btn btn-secondary btn-lg m-2">Large button</button>
      </div>
    </div>
  );
}

export default Login;

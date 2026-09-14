import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Calendar from './Components/Calendar';
import Error from './Components/Error';
import Home from './Components/Home';
import Login from './Components/Login';
import Maps from './Components/Maps';
import Movies from './Components/Movies';
import Voting from './Components/Voting';
import './App.css';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

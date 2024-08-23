import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Title from './pages/Title';
import D_infor from './pages/D_infor';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import './styles/App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/D_infor/:id" element={<D_infor />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie-detail" element={<MovieDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;

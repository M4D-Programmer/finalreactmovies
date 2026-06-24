import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieInfo from './pages/MovieInfo';


function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

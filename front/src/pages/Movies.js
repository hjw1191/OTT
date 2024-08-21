import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const apiKey = 'b45a7315ca4d5041ba8599149d363b40';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`;

  const genreIds = {
    SF: 878,
    공포: 27,
    액션: 28,
    로맨스: 10749,
    코미디: 35,
    드라마: 18,
    판타지: 14,
    애니메이션: 16,
    다큐멘터리: 99,
    스릴러: 53,
    모험: 12,
  };

  useEffect(() => {
    fetchMovies(popularMoviesUrl);
  }, []);

  const fetchMovies = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      fetchMovies(searchUrl + encodeURIComponent(query));
    }
  };

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie.title);
    localStorage.setItem('clickedMovieTitle', movie.title);
    window.location.href = `/movie-detail?id=${movie.id}`;
  };

  const handleGenreClick = (genre) => {
    const genreId = genreIds[genre];
    if (genreId) {
      const genreMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&with_genres=${genreId}`;
      fetchMovies(genreMoviesUrl);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="search-and-buttons">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
            />
            <button className="btn btn-danger ml-2" type="submit">
              Search
            </button>
          </form>
          <div className="btn-group">
            {Object.keys(genreIds).map((genre) => (
              <button
                key={genre}
                className="btn btn-outline-danger btn-sm mx-1"
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <ul id="movie-list" className="list-unstyled">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie)}
              />
            ))
          ) : (
            <p>No movies found. Please try a different search or select a genre.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Movies;

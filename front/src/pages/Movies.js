import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [genreSelected, setGenreSelected] = useState(false);

  const apiKey = 'b45a7315ca4d5041ba8599149d363b40';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`;
  const genreMoviesUrl = (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&with_genres=${genreId}&page=${page}`;

  const genreIds = {
    인기영상: 'popular',
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
    fetchMovies(popularMoviesUrl, setPopularMovies);
    fetchMovies(trendingMoviesUrl, setTrendingMovies);
    fetchMovies(popularMoviesUrl, setMovies);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }

      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50
        && !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (page > 1) {
      loadMoreMovies();
    }
  }, [page]);

  const fetchMovies = (url, setStateCallback) => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStateCallback((prevMovies) => [...prevMovies, ...data.results]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const loadMoreMovies = () => {
    if (genreSelected) {
      const currentGenre = Object.keys(genreIds).find((genre) => genreIds[genre]);
      const url = genreMoviesUrl(genreIds[currentGenre] || '');
      fetchMovies(url, setMovies);
    } else {
      fetchMovies(popularMoviesUrl, setMovies);
    }
  };

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie.title);
    localStorage.setItem('clickedMovieTitle', movie.title);
    window.location.href = `/movie-detail?id=${movie.id}`;
  };

  const handleGenreClick = (genre) => {
    if (genre === '인기영상') {
      setGenreSelected(false);
      setMovies(popularMovies); // 초기 화면으로 돌아감
    } else {
      const genreId = genreIds[genre];
      if (genreId) {
        setPage(1);
        setGenreSelected(true);
        const genreMoviesUrlWithPage = genreMoviesUrl(genreId);
        fetchMovies(genreMoviesUrlWithPage, setMovies);
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="btn-group mb-4">
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

        {!genreSelected && (
          <>
            <div className="popular-list-section">
              <h3>인기영상</h3>
              <Slider {...sliderSettings}>
                {popularMovies.map((movie) => (
                  <div key={movie.id} className="fade-slide">
                    <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="trend-section">
              <h3 className="mt-4">지금 뜨는 콘텐츠</h3>
              <Slider {...sliderSettings}>
                {trendingMovies.map((movie) => (
                  <div key={movie.id} className="fade-slide">
                    <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
                  </div>
                ))}
              </Slider>
            </div>
          </>
        )}

        <ul id="movie-list" className="list-unstyled mt-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
            ))
          ) : (
            <p>No movies found. Please try a different genre.</p>
          )}
        </ul>
        {isLoading && <p>Loading more movies...</p>}

        {showTopButton && (
          <button onClick={handleScrollToTop} className="top-button">
           ▲Top
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;

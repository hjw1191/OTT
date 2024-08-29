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
  const [searchQuery, setSearchQuery] = useState('');
  const [allMovies, setAllMovies] = useState([]); // 모든 영화를 저장할 새로운 상태

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
        && !isLoading && !searchQuery
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, searchQuery]);

  useEffect(() => {
    if (page > 1 && !searchQuery) {
      loadMoreMovies();
    }
  }, [page, searchQuery]);

  useEffect(() => {
    // 검색어가 변경될 때마다 영화 목록 업데이트
    if (searchQuery) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMovies(filteredMovies);
    } else {
      setMovies(allMovies);
    }
  }, [searchQuery, allMovies]);

  const fetchMovies = (url, setStateCallback, reset = false) => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const uniqueMovies = data.results.filter((movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
        );
        if (reset) {
          setStateCallback(uniqueMovies);
        } else {
          setStateCallback((prevMovies) => [...prevMovies, ...uniqueMovies]);
        }
        setAllMovies((prevMovies) => {
          const newMovies = [...prevMovies, ...uniqueMovies];
          return newMovies.filter((movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
          );
        });
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
    setSearchQuery(''); // 장르 클릭 시 검색어 초기화
    if (genre === '인기영상') {
      setGenreSelected(false);
      setMovies(popularMovies);
    } else {
      const genreId = genreIds[genre];
      if (genreId) {
        setPage(1);
        setGenreSelected(true);
        setMovies([]);
        const genreMoviesUrlWithPage = genreMoviesUrl(genreId);
        console.log(`Fetching movies for genre: ${genre}, URL: ${genreMoviesUrlWithPage}`);
        fetchMovies(genreMoviesUrlWithPage, setMovies, true);
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // 검색 시 페이지 리셋
  };

  const getFilteredMovies = () => {
    if (searchQuery) {
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return movies;
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

      <div className="container mt-3">
      <input
          type="text"
          placeholder="영어로 검색하세요.."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control mb-4 search"
        />

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

        

        {!searchQuery && !genreSelected && (
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
          {getFilteredMovies().length > 0 ? (
            getFilteredMovies().map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
            ))
          ) : (
            <p>No movies found. Please try a different search or genre.</p>
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
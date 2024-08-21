import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [clickedMovieTitle, setClickedMovieTitle] = useState('');

    const apiKey = 'b45a7315ca4d5041ba8599149d363b40';

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`;

        const storedTitle = localStorage.getItem('clickedMovieTitle');
        setClickedMovieTitle(storedTitle || '');

        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(movieDetailsUrl);
                const movie = await response.json();
                setMovieDetails(movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [apiKey]);

    return (
        <div>
            <Navbar />
            {movieDetails && (
                <div 
                    className="movie-detail" 
                    style={{ 
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})`
                    }}
                >
                    <div className="overlay"></div>
                    <div className="poster">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                            className="poster-image"
                        />
                    </div>
                    <div className="movie-info">
                        <h1 className="movie-title">{clickedMovieTitle}</h1>
                        <p className="genre">장르: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                        <p className="rating">
                            평점: {movieDetails.vote_average} 
                            <span className="star">&#9733;</span>
                        </p>
                        <p className="release-date">개봉일: {movieDetails.release_date}</p>
                        <div className="extra-info">
                            <div className="small-info-box">
                                <h3>OST</h3>
                               
                            </div>
                            <div className="small-info-box">
                                <h3>예고편</h3>
                             
                            </div>
                        </div>
                        <p className="description">{movieDetails.overview}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetail;

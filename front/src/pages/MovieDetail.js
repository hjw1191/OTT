import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OSTModal from '../components/OST'; 
import YoutubeModal from '../components/youtube'; 
import '../styles/MovieDetail.css';

const MovieDetail = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [clickedMovieTitle, setClickedMovieTitle] = useState('');
    const [showOSTModal, setShowOSTModal] = useState(false); // OST 모달 창 관리
    const [showTrailerModal, setShowTrailerModal] = useState(false); // 예고편 모달 창 관리

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

    const handleShowOSTModal = () => {
        setShowOSTModal(true); // OST 모달을 표시
    };

    const handleShowTrailerModal = () => {
        setShowTrailerModal(true); // 예고편 모달을 표시
    };

    const handleCloseModal = () => {
        setShowOSTModal(false); // 모든 모달을 닫기
        setShowTrailerModal(false);
    };

    return (
        <div>
         
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
                            <div className="small-info-box" onClick={handleShowOSTModal}>
                                <h3>OST</h3>
                            </div>
                            <div className="small-info-box" onClick={handleShowTrailerModal}>
                                <h3>예고편</h3>
                            </div>
                        </div>
                        <p className="description">{movieDetails.overview}</p>
                    </div>
                </div>
            )}
            {showOSTModal && (
                <OSTModal
                    clickedMovieTitle={clickedMovieTitle}
                    onClose={handleCloseModal} // 모달 닫기 핸들러 전달
                />
            )}
            {showTrailerModal && (
                <YoutubeModal
                    movieId={new URLSearchParams(window.location.search).get('id')}
                    clickedMovieTitle={clickedMovieTitle}
                    apiKey={apiKey}
                    onClose={handleCloseModal} // 모달 닫기 핸들러 전달
                />
            )}
        </div>
    );
};

export default MovieDetail;

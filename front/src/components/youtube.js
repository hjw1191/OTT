import React, { useEffect, useState } from 'react';
import '../styles/OST.css';

const YoutubeModal = ({ movieId, clickedMovieTitle, apiKey, onClose }) => {
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const movieVideosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

        const fetchMovieVideos = async () => {
            try {
                const response = await fetch(movieVideosUrl);
                const videos = await response.json();
                const foundTrailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailerUrl(foundTrailer ? `https://www.youtube.com/embed/${foundTrailer.key}` : null);
            } catch (error) {
                console.error('Error fetching movie videos:', error);
            }
        };

        fetchMovieVideos();
    }, [movieId, apiKey]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
               
                {trailerUrl ? (
                    <iframe
                        src={trailerUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '50vh' }}
                        title={`${clickedMovieTitle} Trailer`}
                    ></iframe>
                ) : (
                    <p>예고편을 찾을 수 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default YoutubeModal;

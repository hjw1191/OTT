import React, { useEffect } from 'react';
import '../styles/OST.css';

const OST = ({ clickedMovieTitle, onClose }) => {
    useEffect(() => {
        const formattedTitle = clickedMovieTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')  // 모든 비 알파벳 및 숫자 문자를 대시로 변환
            .replace(/(^-|-$)/g, '');      // 시작 또는 끝의 대시를 제거

        const tunefindURL = `https://www.tunefind.com/movie/${formattedTitle}-2024`;
        document.getElementById('tunefind-frame').src = tunefindURL;
    }, [clickedMovieTitle]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
               
                <iframe
                    id="tunefind-frame"
                    width="100%"
                    height="400px"
                    title="TuneFind Soundtrack"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default OST;

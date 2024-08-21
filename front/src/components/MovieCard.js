import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <li className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={onClick} // 이미지 클릭 시 onClick 이벤트 발생
        style={{ cursor: 'pointer' }}
      />
      <h5>{movie.title}</h5>
    </li>
  );
};

export default MovieCard;

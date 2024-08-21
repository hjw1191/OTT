import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'; 
import '../styles/D_infor.css'; 

function D_infor() {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/dramas/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setDrama(data))
        .catch(error => setError(error.message));
    } else {
      setError('Invalid ID provided');
    }
  }, [id]);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!drama) {
    return <div>Loading...</div>;
  }

  return (
    <div className="drama-detail">
      <Navbar />
      <div className="drama-background"></div>


      <div className="background-overlay" style={{ backgroundImage: `url(${drama.image_url})` }}></div>
      <div className="container drama-content">
        <div className="row">
          <div className="col-md-4">
            <img 
              src={drama.image_url} 
              alt={drama.title} 
              className="drama-poster"
            />
          </div>
          <div className="col-md-8 drama-info">
            <h1>{drama.title}</h1>
            <div className="mb-3 drama-meta">
              {drama.rating && <span className="badge badge-primary mr-2">{drama.rating}</span>}
              {drama.schedule && <span className="badge badge-secondary mr-2">{drama.schedule}</span>}
              {drama.genre && <span className="badge badge-warning mr-2">{drama.genre}</span>}
              {drama.network && <span className="badge badge-info mr-2">{drama.network}</span>}
              {drama.season && <span className="badge badge-dark mr-2">시즌 {drama.season}개</span>}
            </div>
            <div className="mb-3">
              {drama.link && <a href={drama.link} className="btn btn-danger mr-2">LINK</a>}
              {drama.subtitle && <button className="btn btn-outline-light mr-2">{drama.subtitle}</button>}
              {drama.ost && <button className="btn btn-outline-light">{drama.ost}</button>}
            </div>
            <p className="drama-description">{drama.description}</p>
            <div className="mt-3">
              {drama.creator && <h5>크리에이터: <span>{drama.creator}</span></h5>}
              {drama.cast && <h6>출연: <span>{drama.cast.join(', ')}</span></h6>}
              {drama.summary && <p>{drama.summary}</p>}
            </div>
            <div className="mt-5">
              <h3 className="drama-heading">줄거리</h3>
              <p>{drama.synopsis}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="drama-heading">OST</h3>
          <div className="iframe-container">
            <iframe 
              src={`https://vibe.naver.com/search/tracks?query=${encodeURIComponent(drama.title)} ost`} 
              title="OST 검색 결과"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default D_infor;

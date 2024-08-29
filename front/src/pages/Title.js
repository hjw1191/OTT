import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import '../styles/Drama.css';  
import '../styles/Title.css';
import L from '../components/L.png';
import I from '../components/I.png';
import N from '../components/N.png';
import K from '../components/K.png';

function DramaPage() {
  const [dramas, setDramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 데이터 로드
  useEffect(() => {
    console.log("Fetching dramas...");
    fetch('https://port-0-ott-m09fpvc47fc6ed1f.sel4.cloudtype.app/api/dramas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Dramas fetched successfully:", data);
        setDramas(data);
      })
      .catch(error => console.error('데이터 가져오기 오류:', error));
  }, []);

  // 검색어에 따라 드라마 목록 필터링
  const filteredDramas = dramas.filter(drama =>
    drama.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 슬라이더 컨텐츠 복제
  const extendedDramas = [...filteredDramas, ...filteredDramas, ...filteredDramas];

  // 이미지 클릭 시 페이지 이동 함수
  const handleImageClick = (dramaId) => {
    console.log("Clicked drama ID:", dramaId);
    navigate(`/D_infor/${dramaId}`);
  };

  return (
    <div>
      <Title />

      <div className="slider-container" style={{ marginTop: "50px" }}>
        <div className="slider-track">
          {extendedDramas.map((drama, index) => (
            <div className="slide" key={index}>
              <div className="card" style={{ width: '100%', height: '18em' }}>
                <img 
                  src={drama.image_url} 
                  className="card-img-top" 
                  alt={drama.title} 
                  style={{ width: '100%', height: '100%' }} 
                  onClick={() => handleImageClick(drama._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-container reverse" >
        <div className="slider-track">
          {extendedDramas.reverse().map((drama, index) => (
            <div className="slide" key={index}>
              <div className="card" style={{ width: '100%', height: '18em' }}>
                <img 
                  src={drama.image_url} 
                  className="card-img-top" 
                  alt={drama.title} 
                  style={{ width: '100%', height: '100%' }} 
                  onClick={() => handleImageClick(drama._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 비디오 섹션 추가 */}
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <figure className="wp-block-video">
          <figcaption className="wp-element-caption">Stable Video / ChatGPT / Midjourney를 활용하여 제작한 영화 예고편</figcaption>
          <video autoPlay muted controls src="https://smilegate.ai/wp-content/uploads/2024/05/@공허의-속삭임.mp4"></video>
        </figure>
      </div>
    </div>
  );
}

const Title = () => {
  const navigate = useNavigate()
  return (
    <div className="container-fluid p-0">
      <div className="main-image-container">
        <img
          src="https://cdn.pdjournal.com/news/photo/202308/75317_78301_044.jpg"
          alt="Main Background"
          className="background-image"
        />
        <div className="overlay-text">
          <h1>
            <div 
              className="link-container" 
              style={{ cursor: 'pointer' }} // 클릭 가능한 느낌을 주기 위해 포인터 커서 적용
            >
            <img src={L} alt="L" className="letter" />
              <img src={I} alt="I" className="letter" />
              <img src={N} alt="N" className="letter" />
              <img src={K} alt="K" className="letter" />
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DramaPage;

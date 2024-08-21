import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';  
import '../styles/Drama.css';  

function DramaPage() {
  const [dramas, setDramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 데이터 로드
  useEffect(() => {
    console.log("Fetching dramas..."); // API 호출 시작 시 로그
    fetch('http://localhost:8080/api/dramas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Dramas fetched successfully:", data); // API 응답 데이터 로그
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
    console.log("Clicked drama ID:", dramaId); // ID 확인용 로그
    navigate(`/D_infor/${dramaId}`); // 해당 드라마 ID를 기반으로 D_infor 페이지로 이동
  };

  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '40%',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div className="slider-container">
        <div className="slider-track">
          {extendedDramas.map((drama, index) => (
            <div className="slide" key={index}>
              <div className="card" style={{ width: '100%', height: '18em' }}>
                <img 
                  src={drama.image_url} 
                  className="card-img-top" 
                  alt={drama.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                  }} 
                  onClick={() => handleImageClick(drama._id)} // 클릭 시 페이지 이동
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-container reverse" style={{ marginTop: '50px' }}>
        <div className="slider-track">
          {extendedDramas.reverse().map((drama, index) => (
            <div className="slide" key={index}>
              <div className="card" style={{ width: '100%', height: '18em' }}>
                <img 
                  src={drama.image_url} 
                  className="card-img-top" 
                  alt={drama.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                  }} 
                  onClick={() => handleImageClick(drama._id)} // 클릭 시 페이지 이동
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DramaPage;

import React, { useEffect } from 'react';
import '../styles/Title.css';
import { Link } from 'react-router-dom';  // React Router Link 사용

const Title = () => {
  useEffect(() => {
    const fullText = "LINK";  // 타이핑 효과를 줄 텍스트
    let charIndex = fullText.length;  // 처음에 "INK"가 다 보이도록 설정
    let isDeleting = true;
    const speed = 150;  // 0.15초 간격으로 타이핑 및 지우기 (부드럽게 조정)
    const pauseTime = 700;  // 타이핑 후 일시 정지 시간

    function type() {
      const dynamicText = document.getElementById("dynamic-text");

      if (isDeleting) {
        // 지우기 중
        dynamicText.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;  // 다 지우면 타이핑 모드로 전환
          setTimeout(type, pauseTime);  // 타이핑 전 잠깐 멈춤
          return;
        }
      } else {
        // 타이핑 중
        dynamicText.textContent = fullText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === fullText.length) {
          isDeleting = true;  // 다 타이핑하면 지우기 모드로 전환
          setTimeout(type, pauseTime);  // 지우기 전 잠깐 멈춤
          return;
        }
      }

      setTimeout(type, speed);
    }

    type();  // 애니메이션 시작

  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="main-image-container">
        <img
          src="https://cdn.pdjournal.com/news/photo/202308/75317_78301_044.jpg"
          alt="Main Background"
        />
        <div className="overlay-text">
          <h1>
            <a href="./Drama" id="text"></a>
            <a href="./Drama" id="dynamic-text">LINK</a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Title;

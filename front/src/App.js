// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Title from './pages/Title';
import Navbar from './components/Navbar';
import Login from './components/Login';
import D_infor from './pages/D_infor';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import './styles/App.css';

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false); // 로그인 창 가시성 상태

  const openLogin = () => setIsLoginVisible(true);  // 로그인 창 열기
  const closeLogin = () => setIsLoginVisible(false); // 로그인 창 닫기

  return (
    <Router>
      <Navbar openLogin={openLogin} /> {/* openLogin 함수 전달 */}
      {isLoginVisible && <Login onClose={closeLogin} />} {/* Login 컴포넌트 렌더링 */}
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/D_infor/:id" element={<D_infor />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

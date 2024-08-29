// Login.js
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const firebaseConfig = {
  apiKey: "AIzaSyDkUcabxV1k9--AKVo8A8S4VorjSRUUmGk",
  authDomain: "sdfsdf-df9e6.firebaseapp.com",
  projectId: "sdfsdf-df9e6",
  storageBucket: "sdfsdf-df9e6.appspot.com",
  messagingSenderId: "371574525265",
  appId: "1:371574525265:web:a0e73555dd1c3405025770",
  measurementId: "G-3CFZ6H733G"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = ({ onClose }) => {  // onClose prop 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();  // 로그인 성공 시 창 닫기
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();  // 로그인 성공 시 창 닫기
      navigate('/move');  // /move 경로로 이동
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-content">
        <button className="login-close" onClick={onClose}> {/* X 버튼 클릭 시 창 닫기 */}
          <X size={24} />
        </button>
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleEmailLogin} className="login-form">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <div className="mt-4">
          <button onClick={handleGoogleLogin} className="google-login-button">
            Google로 로그인
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          계정이 없으신가요? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">회원가입</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

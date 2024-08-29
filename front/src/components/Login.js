import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import SignUp from './SignUp'; 

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

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);  // 회원가입 모달 표시 여부
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();  // 로그인 성공 시 창 닫기
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        setError('이메일 주소 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();  // 로그인 성공 시 창 닫기
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('비밀번호를 재설정할 이메일 주소를 입력해주세요.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.');
    } catch (error) {
      setError(error.message);
    }
  };

  if (showSignUp) {
    return <SignUp onClose={() => setShowSignUp(false)} onLoginClick={() => setShowSignUp(false)} />;
  }

  return (
    <div className="login-overlay">
      <div className="login-content">
        <button className="login-close" onClick={onClose}>
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
          {!isResetPassword && (
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
          )}
          {isResetPassword ? (
            <button type="button" onClick={handleResetPassword} className="login-button">
              비밀번호 재설정
            </button>
          ) : (
            <button type="submit" className="login-button">
              로그인
            </button>
          )}
        </form>
        {!isResetPassword && (
          <div className="mt-4">
            <button onClick={handleGoogleLogin} className="google-login-button">
              Google로 로그인
            </button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
       
        <p className="forgot-password-link">
          <button onClick={() => setIsResetPassword(!isResetPassword)} className="font-medium text-indigo-600 hover:text-indigo-500">
            {isResetPassword ? '로그인으로 돌아가기' : '비밀번호를 잊으셨나요?'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

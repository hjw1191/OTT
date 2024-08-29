import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { X } from 'lucide-react';
import '../styles/SignUp.css';

const SignUp = ({ onClose, onLoginClick, onSignUpSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUpSuccess();  // 회원가입 성공 시 호출
      onClose();  // 회원가입 성공 시 창 닫기
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-content">
        <button className="signup-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          이미 계정이 있으신가요? <button onClick={onLoginClick} className="login-link-button">로그인</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

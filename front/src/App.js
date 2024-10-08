import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Title from './pages/Title';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import D_infor from './pages/D_infor';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import './styles/App.css';

export const AuthContext = createContext(null); // Context 생성

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openSignup = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const closeModals = () => {
    setShowSignUp(false);
    setShowLogin(false);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    closeModals();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn }}> {/* 로그인 상태 전달 */}
      <Navbar isLoggedIn={isLoggedIn} openLogin={openLogin} openSignup={openSignup} handleLogout={handleLogout} />
      {showSignUp && (
        <SignUp onClose={closeModals} onLoginClick={openLogin} onSignUpSuccess={handleAuthSuccess} />
      )}
      {showLogin && (
        <Login onClose={closeModals} onSignUpClick={openSignup} onLoginSuccess={handleAuthSuccess} />
      )}
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/D_infor/:id" element={<D_infor />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
        </Routes>
      </AuthWrapper>
    </Router>
  );
}

export default App;

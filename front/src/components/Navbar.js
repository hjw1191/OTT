import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ openLogin }) => {
  const [query, setQuery] = useState('');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">LINK</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* 버튼 클릭 시 openLogin 함수 호출 */}
            <button className="nav-link btn btn-link" onClick={openLogin}>Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

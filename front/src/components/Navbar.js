import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, openLogin, openSignup, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LINK</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto but_container">
            {!isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={openSignup}>Join</button>
              </li>
            )}
            <li className="nav-item">
              {isLoggedIn ? (
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              ) : (
                <button className="nav-link btn btn-link" onClick={openLogin}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
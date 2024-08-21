import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">LINK</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="drama">Drama</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Movies">Movie</a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
    
          <li className="nav-item">
            <a className="login-link nav-link" href="#">login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

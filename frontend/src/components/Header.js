import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => navigate('/')}>
          <img src="/logo1.png" alt="Logo" className="logo-icon" />
          Restoran Delicije
        </h1>

        <nav className="nav-links">
          {isHomePage ? (
            <>
              <a href="#home">Početna</a>
              <a href="#about">O nama</a>
              <a href="#menu">Menu</a>
              <a href="#contact">Kontakt</a>
            </>
          ) : (
            <Link to="/">Početna</Link>
          )}
        </nav>

        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>Prijava</button>
          <button onClick={() => navigate('/register')}>Registracija</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

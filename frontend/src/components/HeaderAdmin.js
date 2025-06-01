import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function HeaderAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <img src="/logo1.png" alt="Logo" className="logo-icon" />
          Restoran Delicije
        </h1>

        <nav className="nav-links">
          <button className="nav-link-button" onClick={() => navigate('/moderator-reservation')}>
            Pregled rezervacija
          </button>
          <button className="nav-link-button" onClick={() => navigate('/admin-add-user')}>
            Dodaj korisnika
          </button>
        </nav>

        <div className="auth-buttons">
          <button onClick={handleLogout}>Odjava</button>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;

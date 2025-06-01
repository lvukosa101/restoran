import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function HeaderModerator() {
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
          <Link to="/" className="nav-link">Restoran</Link>
          <Link to="/rezervacija" className="nav-link">Rezervacija termina</Link>
          <Link to="/moderator-reservation" className="nav-link">Pregled rezervacija</Link>
          <Link to="/user-profile" className="nav-link">Profil</Link>
        </nav>

        <div className="auth-buttons">
          <button onClick={handleLogout}>Odjava</button>
        </div>
      </div>
    </header>
  );
}

export default HeaderModerator;

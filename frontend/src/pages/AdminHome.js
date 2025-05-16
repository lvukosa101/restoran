import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePregledRezervacija = () => {
    navigate('/moderator-reservation'); // ✅ ISPRAVNA RUTA!
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dobrodošli, {currentUser?.ime || 'korisniče'}!</h2>
      <p>Ovo je početna stranica za administratora (konobara).</p>

      {/* GUMB ZA PREGLED REZERVACIJA */}
      <button
        onClick={handlePregledRezervacija}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Pregled rezervacija
      </button>

      <br />

      {/* GUMB ZA ODJAVU */}
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminHome;

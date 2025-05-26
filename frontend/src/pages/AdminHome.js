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
    navigate('/moderator-reservation');
  };

  const handleDodajKorisnika = () => {
    navigate('/admin-add-user');
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2>Dobrodošli, {currentUser?.ime || 'Administrator'}!</h2>
      <p>Ovo je administratorska kontrolna ploča.</p>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={handlePregledRezervacija}
          style={buttonStyle('#28a745')}
        >
          📋 Pregled rezervacija
        </button>

        <button
          onClick={handleDodajKorisnika}
          style={buttonStyle('#007bff')}
        >
          ➕ Dodaj korisnika
        </button>

        <button
          onClick={handleLogout}
          style={buttonStyle('#dc3545')}
        >
          🚪 Odjava
        </button>
      </div>
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  padding: '12px 24px',
  margin: '10px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  minWidth: '200px'
});

export default AdminHome;

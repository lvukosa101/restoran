import React from 'react';
import '../styles/AuthButtons.css';

function AuthButtons() {
  return (
    <div id="auth">
      <h2>Prijava / Registracija</h2>
      <div className="auth-buttons-wrapper">
        <button className="auth-btn" onClick={() => alert('Prijava')}>Prijava</button>
        <button className="auth-btn" onClick={() => alert('Registracija')}>Registracija</button>
      </div>
    </div>
  );
}

export default AuthButtons;

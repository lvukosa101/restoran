import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Radno vrijeme</h4>
          <p>Pon – Ned (šank): 12:00 – 22:00</p>
          <p>Pon – Ned (kuhinja): 13:00 – 21:00</p>
        </div>

        <div className="footer-section">
          <h4>Pratite nas</h4>
          
          <p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              📘 Facebook
            </a>
          </p>
          <p>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              📸 Instagram
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Restoran Delicije. Sva prava pridržana.</p>
      </div>
    </footer>
  );
}

export default Footer;

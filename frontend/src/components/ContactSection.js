import React, { useState } from 'react';
import axios from 'axios';


function ContactSection() {
  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    telefon: '',
    poruka: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/kontakt', formData);
    alert('Poruka je uspješno poslana!');
    setFormData({ ime: '', email: '', telefon: '', poruka: '' });
  } catch (err) {
    alert('Greška pri slanju poruke.');
    console.error(err);
  }
  };


  return (
    <section
      id="contact"
      style={{
        padding: '4rem 1rem',
        backgroundImage: 'url("/kontakt-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Playfair Display', serif",
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '90%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          border: '1px solid #d2b48c',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: '2rem',
            color: '#5b3924',
            textShadow: '1px 1px 0 #fff',
          }}
        >
          KONTAKTIRAJTE NAS
        </h2>

        <p style={infoStyle}><strong>📍 Adresa:</strong> Ulica Okusa 12, 51000 Rijeka</p>
        <p style={infoStyle}><strong>📞 Telefon:</strong> +385 51 123 456</p>
        <p style={infoStyle}><strong>✉️ Email:</strong> info@delicije.hr</p>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#3b2f2f' }}>Pošaljite poruku</h3>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <input
            type="text"
            name="ime"
            placeholder="Vaše ime"
            value={formData.ime}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Vaš email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            name="telefon"
            placeholder="Broj mobitela"
            value={formData.telefon}
            onChange={handleChange}
            //required
            style={inputStyle}
          />
          <textarea
            name="poruka"
            placeholder="Napomena (opcionalno)"
            value={formData.poruka}
            onChange={handleChange}
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />
          <button type="submit" style={buttonStyle}>Pošalji poruku</button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  backgroundColor: '#fffefa',
  color: '#3b2f2f',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#cd7f32',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const infoStyle = {
  color: '#3b2f2f',
  marginBottom: '4px',
  textShadow: '1px 1px 2px rgba(255,255,255,0.6)',
};

export default ContactSection;

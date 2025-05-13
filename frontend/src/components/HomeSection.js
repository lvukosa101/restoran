import React from 'react';

function HomeSection() {
  return (
    <section
      id="home"
      style={{
        backgroundImage: 'url("/pozadina.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div
        style={{
          padding: '1rem 2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <h2
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: '3rem',
            color: '#5b3924', 
            textShadow: '1px 1px 2px rgba(255,255,255,0.7)',
            marginBottom: '1rem',
          }}
        >
          Dobrodošli u Restoran Delicije
        </h2>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            color: '#5b3924', 
            textShadow: '1px 1px 1px rgba(255,255,255,0.6)',
            marginBottom: 0,
          }}
        >
          Uživajte u vrhunskim jelima i nezaboravnom ambijentu.
        </p>
      </div>
    </section>
  );
}

export default HomeSection;

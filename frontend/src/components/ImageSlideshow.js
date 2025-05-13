import React, { useState, useEffect } from 'react';
import '../styles/ImageSlideshow.css';

const images = [
  '/beef.jpg',
  '/chicken.jpg',
  '/fish.jpg',
  '/pasta.jpg',
];

const captions = [
  'Ramstek s roštilja',
  'Piletina u umaku',
  'File brancina s povrćem',
  'Domaća tjestenina',
];

function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ padding: '3rem 1rem', backgroundColor: '#fffefb', textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', cursive",
          fontSize: '2rem',
          color: '#5b3924',
          textShadow: '1px 1px 0 #fff',
          marginBottom: '2rem',
        }}
      >
        Naše top 4 preporuke
      </h2>

      <div className="slideshow-container">
        <img
          src={images[index]}
          alt={captions[index]}
          className="slideshow-image"
        />
        <div className="slideshow-caption-overlay">{captions[index]}</div>
        <button className="nav-button left" onClick={prevImage}>‹</button>
        <button className="nav-button right" onClick={nextImage}>›</button>
      </div>
    </div>
  );
}

export default ImageSlideshow;

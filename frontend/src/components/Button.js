import React from 'react';
import '../styles/Button.css';

function Button({ text, onClick, type = "button" }) {
  return (
    <button className="custom-button" onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;

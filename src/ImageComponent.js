import React from 'react';
import './App.css';

function ImageWithText({ imageUrl, text }) {
  return (
    <div className="image-with-text">
    <h3 className="image-with-text__title">Reset Adventure</h3>
      <div className="image-with-text__content">
          <img src="./game.png" alt="Obraz" className="image-with-text__image" />
      </div>
    </div>
  );
}

export default ImageWithText;

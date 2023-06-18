import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function HorizontalMenu() {
  return (
    <nav className="menu">
      <ul className="menu-list">
        <li>
          <img src="./reset.png" alt="Logo" className="logo" />
        </li>
      <li className="menu-item">Reset GameDev</li>
        <li className="menu-item">
          <Link to="/">Strona główna</Link>
        </li>
        <li className="menu-item">
          <Link to="/Wyniki">Wyniki</Link>
        </li>
        <li className="menu-item">
          <Link to="/contact">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HorizontalMenu;

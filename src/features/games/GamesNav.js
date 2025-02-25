import React from 'react';
import { Link } from 'react-router-dom';

function GamesNav() {
  return (
    <nav className="gameBtnBox">
      <ul>
        <li><Link to="">Reaction <br /> Speed Game</Link></li>
        <li><Link to="/games/maze">Maze Game</Link></li>
        <li><Link to="/games/lotto">Lotto <br /> Machine</Link></li>
      </ul>
    </nav>
  );
}

export default GamesNav;

import React from 'react';
import '../../css/Games.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import JKCatchApp from './jujutsu-kaisen/JKCatchApp';
import MazeApp from './maze-game/MazeApp';

function Games() {
  return (
    <BrowserRouter>
      <div className="games-wrap">
        <nav className="gameBtnBox">
          <ul>
            <li><Link to="/">Jujutsu Kaisen <br /> Catch</Link></li>
            <li><Link to="/maze">Maze</Link></li>
          </ul>
        </nav>

        <div className="games-view">
          <Routes>
            <Route path="/" element={<JKCatchApp />} />
            <Route path="/maze" element={<MazeApp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default Games;

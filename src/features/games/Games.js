import React from 'react';
import '../../css/Games.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import GamesNav from './GamesNav';
import JKCatchApp from './jujutsu-kaisen/JKCatchApp';
import MazeApp from './maze-game/MazeApp';
import LottoApp from './lotto-machine/LottoApp';

function Games() {
  return (
      <div className="games-wrap">
        <figure className="bg">
          <img src={`${process.env.PUBLIC_URL}/img/noise-bg.jpg`} alt="noise-bg" />
        </figure>
        <h1>
          <img src={`${process.env.PUBLIC_URL}/img/jujutsu_kaisen_logo.png`} alt="jujutsu_kaisen_logo" />
        </h1>
        <GamesNav />

        <div className="games-view">
          <Routes>
            <Route path="/" element={<JKCatchApp />} />
            <Route path="/games/maze" element={<MazeApp />} />
            <Route path="/games/lotto" element={<LottoApp />} />
          </Routes>
          <Outlet />
        </div>
      </div>

  );
}

export default Games;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MediaNav from '../components/MediaNav';
import News from '../features/news/News';
import Weather from '../features/weather/Weather';
import Games from '../features/games/Games';
import JKCatchApp from '../features/games/jujutsu-kaisen/JKCatchApp';
import MazeApp from '../features/games/maze-game/MazeApp';
import LottoApp from '../features/games/lotto-machine/LottoApp';

function MediaHome() {
  return (
    <div className="media-wrap">
      <Header />
      <MediaNav />

      <div className="media-view">
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/games' element={<Games />} >
            <Route path="/games/" element={<JKCatchApp />} />
            <Route path="/games/maze" element={<MazeApp />} />
            <Route path="/games/lotto" element={<LottoApp />} />
          </Route>
        </Routes>
      </div>

    </div>

  );
}

export default MediaHome;

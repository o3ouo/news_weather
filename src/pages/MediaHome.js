import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MediaNav from '../components/MediaNav';
import News from '../features/news/News';
import Weather from '../features/weater/Weather';
import Games from '../features/games/Games';

function MediaHome() {
  return (
    <div className="media-wrap">
      <Header />
      <MediaNav />

      <div className="media-view">
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/games/*' element={<Games />} />
        </Routes>
      </div>
    </div>

  );
}

export default MediaHome;

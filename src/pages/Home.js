import React from 'react';
import Header from '../components/Header';
import News from '../features/news/News';
import Weather from '../features/weater/Weather';
import Games from '../features/games/Games';

function Home() {
  return (
    <div className="wrap">
      <Header />
      <div className="left-inner">
        <News />
      </div>
      <div className="right-inner">
        <Weather />
        <Games />
      </div>

      <button className="top-btn">↑</button>
    </div>

  );
}

export default Home;

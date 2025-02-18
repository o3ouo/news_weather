import React from 'react';
import Header from '../components/Header';
import News from '../features/news/News';
import Weather from '../features/weater/Weather';
import Games from '../features/games/Games';

function Home() {
  return (
    <div className="wrap">
      <div className="left-inner">
        <Header />
        <News />
      </div>
      <div className="right-inner">
        <Weather />
        <hr />
        <Games />
      </div>

    </div>
  );
}

export default Home;

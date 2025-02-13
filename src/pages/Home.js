import React from 'react';
import Header from '../components/Header';
import News from '../features/news/News';
import Weather from '../features/weater/Weather';

function Home() {
  return (
    <div className="wrap">
      <div className="left-inner">
        <Header />
        <News />
      </div>
      <div className="right-inner">
        <Weather />
      </div>

    </div>
  );
}

export default Home;

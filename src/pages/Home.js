import React from 'react';
import Header from '../components/Header';
import News from '../features/news/News';
import Weather from '../features/weather/Weather';
import Games from '../features/games/Games';
import ScrollToTop from '../components/ScrollToTop';
import useWindowDimensions from '../customHook/useWindowDimensions';

function Home() {
  const { width } = useWindowDimensions();
  const media = width >= 1440;

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
        {media ? <ScrollToTop /> : null}
        
      </div>
  );
}

export default Home;

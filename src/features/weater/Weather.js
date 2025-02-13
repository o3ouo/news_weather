import React from 'react';
import '../../css/Weather.css';


function Weather() {
  return (
    <div className="weather-wrap">
      <h2 className="title">WEATHER FORECAST</h2>

      <form>
        <figure className="search-icon">
          <img src="/icon/search.png" alt="search-icon" />
        </figure>
        <input type="text" placeholder="Find a City" />
      </form>

      <div className="weather-info">
        <div className="top-info">
          <div className="left">
            <h3 className="city">Daegu</h3>
            <p className="w-Condition">Sun</p>
          </div>
          <figure className="weather-icon">
            <img src="/icon/sun.png" alt="sun-icon" />
          </figure>
          <div className="right">
            <div className="h-l">
              <span className="h">H: +6°</span>
              <span className="l">L: -5°</span>
            </div>
            <div className="temperature">
              <p className="c">-1℃</p>
              <p className="f">30.2℉</p>
            </div>
          </div>
        </div>
        <div className="bottom-info">
          <div className="rain-wrap">
            <figure className="rain-icon">
              <img src="/icon/rain.png" alt="rain-icon" />
            </figure>
            <div className="text">
              <p className="name">RAIN</p>
              <p className="value">1%</p>
            </div>
          </div>
          <div className="hum-wrap">
            <figure className="rain-icon">
              <img src="/icon/hum.png" alt="hum-icon" />
            </figure>
            <div className="text">
              <p className="name">hum</p>
              <p className="value">46%</p>
            </div>
          </div>
          <div className="wind-wrap">
            <figure className="wind-icon">
              <img src="/icon/wind.png" alt="wind-icon" />
            </figure>
            <div className="text">
              <p className="name">wind</p>
              <p className="value">5 m/s</p>
            </div>
          </div>
        </div>

        <div className="next-text">
          <p className="today">Today</p>
          <p className="next">Next 7 Days</p>
        </div>

        <div className="today-time">
          <p className="time">12:00</p>
          <figure className="time-icon">
            <img src="/icon/sun-wind.png" alt="sun-wind-icon" />
          </figure>
          <p className="celsius">Now</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;

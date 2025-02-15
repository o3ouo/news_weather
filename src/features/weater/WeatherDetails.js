import React from 'react';

function WeatherDetails({ currentData, dailyRainProbability }) {
  if (!currentData || !currentData.main) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="weather-details">
      {/* 강수 정보 */}
      <div className="rain-wrap con">
        <figure className="rain-icon">
          <img src="/icon/rain.png" alt="rain-icon" />
        </figure>
        <div className="text">
          <p className="name">RAIN</p>
          <p className="value">{dailyRainProbability}%</p>
        </div>
      </div>
      {/* 습도 정보 */}
      <div className="hum-wrap con">
        <figure className="hum-icon">
          <img src="/icon/hum.png" alt="humidity-icon" />
        </figure>
        <div className="text">
          <p className="name">HUM</p>
          <div className="value">{currentData.main.humidity}%</div>
        </div>
      </div>
      {/* 바람 정보 */}
      <div className="wind-wrap con">
        <figure className="wind-icon">
          <img src="/icon/wind.png" alt="wind-icon" />
        </figure>
        <div className="text">
          <p className="name">WIND</p>
          <p className="value">{currentData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;

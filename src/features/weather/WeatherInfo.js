import React from 'react';

function WeatherInfo({ currentData, todayTemperatureStats }) {
  if (!currentData) return <p>No weather data available</p>;

  // currentData에서 필요한 정보를 구조 분해
  const { name, main, weather } = currentData;
  const weatherMain = weather[0].main;

  return (
    <div className="weather-info">
      <div className="left">
        <h3 className="city">{name}</h3>
        <p className="w-condition">{weatherMain}</p>
      </div>
      <figure className="weather-icon">
        <img src={ `/icon/${weather[0].icon}.png`} alt={weatherMain} />
      </figure>
      <div className="right">
        <div className="h-l">
          <span className="h">H: {todayTemperatureStats.maxTemp}°</span>
          <span className="l">L: {todayTemperatureStats.minTemp}°</span>
        </div>
        <div className="temperature">
          <p className="c">{Math.round(main.temp)}<sup>℃</sup></p>
          <p className="f">{Math.round(main.temp * 9 / 5) + 32}<sup>℉</sup></p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;

import React from 'react';

function WeatherInfo({ currentData, todayTemperatureStats }) {
  if (!currentData) return <p>No weather data available</p>;

  // currentData에서 필요한 정보를 구조 분해
  const { name, main, weather } = currentData;
  const weatherMain = weather[0].main;
  // 아이콘 URL: OpenWether에서 받은 아이콘 코드로 로컬 아이콘 결로 사용
  const weatherIcon = weather[0]?.icon ? `/icon/${weather[0].icon}.png` : "/icon/default.png";

  return (
    <div className="weather-info">
      <div className="left">
        <h3 className="city">{name}</h3>
        <p className="w-condition">{weatherMain}</p>
      </div>
      <figure className="weather-icon">
        <img src={weatherIcon} alt={weatherMain} />
      </figure>
      <div className="right">
        <div className="h-l">
          <span className="h">H: {todayTemperatureStats.maxTemp}°</span>
          <span className="l">L: {todayTemperatureStats.minTemp}°</span>
        </div>
        <div className="temperature">
          <p className="c">{Math.round(main.temp)}℃</p>
          <p className="f">{Math.round(main.temp * 9 / 5) + 32}℉</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;

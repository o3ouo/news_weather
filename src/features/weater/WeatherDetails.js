import React from 'react';

const WeatherDetails = React.memo(({ rainProbability, humidity, windSpeed }) => {

  return (
    <div className="weather-details">
      <div className="rain-wrap">
        <figure className="rain-icon">
          <img src="/icon/rain.png" alt="rain-icon" />
        </figure>
        <div className="text">
          <p className="name">RAIN</p>
          <p className="value">{rainProbability}%</p>
        </div>
      </div>
      <div className="hum-wrap">
        <figure className="hum-icon">
          <img src="/icon/hum.png" alt="hum-icon" />
        </figure>
        <div className="text">
          <p className="name">HUM</p>
          <p className="value">{humidity}%</p>
        </div>
      </div>
      <div className="wind-wrap">
        <figure className="wind-icon">
          <img src="/icon/wind.png" alt="wind-icon" />
        </figure>
        <div className="text">
          <p className="name">WIND</p>
          <p className="value">{windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
});

export default WeatherDetails;

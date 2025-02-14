import React from 'react';

const HourlyForecast = React.memo(({ hourlyData }) => {
  return (
    <div className="today-time">
      <ul>
        {hourlyData?.list?.slice(0, 5).map((hour, index) => (
          <li key={index}>
            <p className="time">{hour.dt_txt.substring(11, 16)}</p>
            <figure className="time-icon">
              <img src="/icon/sun-wind.png" alt="sun-wind-icon" />
            </figure>
            <p className="celsius">{Math.round(hour.main.temp)}℃</p>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default HourlyForecast;

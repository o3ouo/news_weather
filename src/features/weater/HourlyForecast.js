import React from 'react';

function HourlyForecast({ hourlyData }) {
  if (!hourlyData?.list) return <p>No hourly forecast available</p>;

  return (
    <div className="hourly-forecast">
      <ul>
        {hourlyData.list.slice(0, 5).map((hour) => (
          <li key={hour.dt}>
            {/* 시간 정보: dt_txt에서 시간 부분 추출 */}
            <p className="time">{hour.dt_txt.substring(11, 16)}</p>
            <figure className="time-icon">
              {/* 시간대별 날씨 아이콘 */}
              <img src={hour.dt_txt} alt={hour.dt_txt} />
            </figure>
            <p className="celsius">{Math.round(hour.main.temp)}℃</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HourlyForecast;

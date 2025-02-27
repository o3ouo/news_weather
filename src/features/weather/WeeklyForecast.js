import React from 'react';
import SearchBar from './SearchBar';

function WeeklyForecast({ sixDayWeatherStats, setCity, setShowWeekly }) {
  console.log("weeklyTemperatureStats:",sixDayWeatherStats);

  return (
    <div className="weekly-forecast">
      <div className="inner">
        <h2 className="title">5-DAY FORECAST</h2>
        <SearchBar setCity={setCity} />
        <ul>
          {sixDayWeatherStats && sixDayWeatherStats.length > 0 ? (
            sixDayWeatherStats.map((day) => (
              <li key={day.date}>
                <p className="week">{day.dayOfWeek}</p>
                <p className="w-temp">H: {Math.round(day.maxTemp)}°C / L: {Math.round(day.minTemp)}°C</p>
              </li>
            ))
          ) : (
            <p>No forecast data available</p>
          )}
        </ul>
        <button
              type="button"
              className="prevBtn"
              onClick={() => setShowWeekly(false)}
            >
              &lt; Back to Today
            </button>
      </div>
    </div>
  );
}

export default WeeklyForecast;

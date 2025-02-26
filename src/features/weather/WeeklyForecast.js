import React from 'react';
import SearchBar from './SearchBar';

function WeeklyForecast({ weeklyTemperatureStats, setCity, setShowWeekly }) {
  return (
    <div className="weekly-forecast">
      <div className="inner">
        <h2 className="title">5-DAY FORECAST</h2>
        <SearchBar setCity={setCity} />
        <ul>
          {weeklyTemperatureStats && weeklyTemperatureStats.length > 0 ? (
            weeklyTemperatureStats.map((day) => (
              <li key={day.date}>
                <p>{day.date}</p>
                <p>H: {Math.round(day.maxTemp)}°C / L: {Math.round(day.minTemp)}°C</p>
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

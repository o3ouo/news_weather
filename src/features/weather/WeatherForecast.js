import React from 'react';
import WeatherInfo from './WeatherInfo';
import WeatherDetails from './WeatherDetails';
import HourlyForecast from './HourlyForecast';
import SearchBar from './SearchBar';

function WeatherForecast({ setCity, activeWeatherData,todayTemperatureStats, dailyRainProbability, setShowWeekly, activeHourlyData }) {
  return (
    <div>
      <div className="inner">
        <h2 className="title">WEATHER FORECAST</h2>
        <SearchBar setCity={setCity} />

        <div className="info-details-box">
          {/* WeatherInfo 컴포넌트에 아이콘, 도시 이름, 날씨 설명, 온도, 최고/최저 기온 정보 전달 */}
          <WeatherInfo
            currentData={activeWeatherData}
            todayTemperatureStats={todayTemperatureStats}
          />
          {/* WeatherDatails 컴포넌트에 습도, 바람 속도, 강수 확률 정보 전달 */}
          <WeatherDetails
            currentData={activeWeatherData}
            dailyRainProbability={dailyRainProbability}
          />
        </div>

        {/* Next 7 Days */}
        <div className="days">
          <p className="today">Today</p>
          <button
            type='button'
            className="nextBtn"
            onClick={() => setShowWeekly(true)}
          >
            Next 5 Days &gt;
          </button>
        </div>

        {/* HourlyForecast 컴포넌트에 시간대별 날씨와 아이콘 정보를 전달 */}
        <HourlyForecast hourlyData={activeHourlyData} />
      </div>
    </div>
  );
}

export default WeatherForecast;

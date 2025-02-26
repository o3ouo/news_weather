import React, { useState, useEffect } from 'react';
import { useWeather } from "./useWeather";
import '../../css/Weather.css';
import WeatherInfo from './WeatherInfo';
import WeatherDetails from './WeatherDetails';
import HourlyForecast from './HourlyForecast';
import SearchBar from './SearchBar';

function Weather() {
  // 사용자 위치 정보 저장 (lat, lon)
  const [location, setLoaction] = useState({ lat: null, lon: null });
  // 사용자가 검색한 도시 이름 저장
  const [city, setCity] = useState("");

  // 컴포넌트가 마운트될 때 사용자의 위치 정보를 가져옴
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLoaction({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  const {
    activeWeatherData,
    activeHourlyData,
    todayTemperatureStats,
    dailyRainProbability,
    currentLoading,
    hourlyLoading,
    cityLoading,
    currentError,
    hourlyError,
    cityError,
  } = useWeather(location, city);

  // 로딩 및 에러 처리
  if (currentLoading || hourlyLoading || cityLoading) return <p>Loading weather information...</p>;
  if (currentError || hourlyError || cityError) {
    console.error("API 요청 실패:", { currentError, hourlyError, cityError });
    return <p>Failed to load weather information. Please try again later.</p>;
  }

  return (
    <div className="weather-wrap">
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
          <button type='button' className="nextBtn">Next 7 Days &gt; </button>
        </div>

        {/* HourlyForecast 컴포넌트에 시간대별 날씨와 아이콘 정보를 전달 */}
        <HourlyForecast hourlyData={activeHourlyData} />
      </div>
    </div>
  );
}

export default Weather;

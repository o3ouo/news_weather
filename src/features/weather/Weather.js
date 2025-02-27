import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from "./useWeather";
import '../../css/Weather.css';
import WeatherForecast from './WeatherForecast';
import WeeklyForecast from './WeeklyForecast';

function Weather() {
  // 사용자 위치 정보 저장 (lat, lon)
  const [location, setLoaction] = useState({ lat: null, lon: null });
  // 사용자가 검색한 도시 이름 저장
  const [city, setCity] = useState("");
  // 주간 날씨 보기 여부 상태
  const [showWeekly, setShowWeekly] = useState(false);

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
    dailyRainProbability,
    sixDayWeatherStats,
    currentLoading,
    hourlyLoading,
    cityLoading,
    cityHourlyLoading,
    currentError,
    hourlyError,
    cityError,
  } = useWeather(location, city);

  // 로딩 및 에러 처리
  if (currentLoading || hourlyLoading || cityLoading || cityHourlyLoading) return <p>Loading weather information...</p>;
  if (currentError || hourlyError || cityError) {
    console.error("API 요청 실패:", { currentError, hourlyError, cityError });
    return <p>Failed to load weather information. Please try again later.</p>;
  }

  return (
    <div className="weather-wrap">
      <motion.div
        className="card-box"
        initial={{ rotateY: "0deg" }}
        animate={{ rotateY: showWeekly ? "180deg" : "0deg" }}
        transition={{ duration: 0.3 }}
      >
        {!showWeekly ? (
          <div className="weather-content">
            {/* 현재 날씨 정보 */}
            <WeatherForecast
              setCity={setCity}
              activeWeatherData={activeWeatherData}
              sixDayWeatherStats={sixDayWeatherStats}
              dailyRainProbability={dailyRainProbability}
              setShowWeekly={setShowWeekly}
              activeHourlyData={activeHourlyData}
            />
          </div>
        ) : (
          <div className="weekly-content">
            {/* 5일 간의 최고 최저 기온 */}
            < WeeklyForecast
              sixDayWeatherStats={sixDayWeatherStats}
              setCity={setCity}
              setShowWeekly={setShowWeekly}
            />
          </div>
        )}
      </motion.div>
    </div >
  );
}

export default Weather;

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import '../../css/Weather.css';
import { fetchCurrentWeather, fetchHourlyWeather, fetchWeatherByCity } from "./WeatherAPI";
import WeatherInfo from './WeatherInfo';
import WeatherDetails from './WeatherDetails';
import HourlyForecast from './HourlyForecast';
import SearchBar from './SearchBar';

function Weather() {
  // 사용자 위치를 담고 있는 객체 / 위도(lat), 경도(lon)를 포함
  const [location, setLocation] = useState({ lat: null, lon: null });
  // 사용자가 검색한 도시의 이름을 담는 상태
  const [city, setCity] = useState("");

  // 렌더 시 위치가 성공적으로 받아지면 setLocation을 통해 위도, 경도 상태 업데이트
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  // 현재 날씨 정보 가져오기
  const { data: currentData, error: currentError, isLoading: currentLoading } = useQuery({
    queryKey: ["currentWeather", location.lat, location.lon],
    queryFn: fetchCurrentWeather,
    enabled: !!location.lat && !!location.lon,
  });

  // 시간대별 날씨 정보 가져오기
  const { data: hourlyData, error: hourlyError, isLoading: hourlyLoading } = useQuery({
    queryKey: ["hourlyWeather", location.lat, location.lon],
    queryFn: fetchHourlyWeather,
    enabled: !!location.lat && !!location.lon,
  });

  console.log("hourlyData:", hourlyData);

  // 도시 이름을 기반으로 날씨 정보 가져오기
  const { data: cityWeather, error: cityError, isLoading: cityLoading } = useQuery({
    queryKey: ["cityWeather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,
  });

  // 시간대별 데이터로 최고/최저 기온 계산 함수 (useCallback으로 함수 메모이제이션)
  const getTodayTemperatureStats = useCallback((hourlyData) => {
    if (!hourlyData?.list) return { maxTemp: 0, minTemp: 0 };

    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD)
    const todayTemps = hourlyData.list
      ?.filter((hour) => hour.dt_txt.startsWith(today))
      ?.map((hour) => hour.main.temp) || [];

    if (todayTemps.length === 0) return { maxTemp: 0, minTemp: 0 };

    return {
      maxTemp: Math.round(Math.max(...todayTemps)),
      minTemp: Math.round(Math.min(...todayTemps)),
    };
  }, []);

  // 강수 확률 계산 함수 (useCallback으로 함수 메모이제이션)
  const getDailyRainProbability = useCallback((hourlyData) => {
    if (!hourlyData?.list) return 0;

    const pops = hourlyData.list.map((hour) => hour.pop || 0);
    if (pops.length === 0) return 0;

    // const averagePop = pops.reduce((sum, pop) => sum + pop, 0) / pops.length;
    return Math.round((pops.reduce((sum, pop) => sum + pop, 0) / pops.length) * 100);
  }, []);

  // 데이터 로딩, 에러 메세지 표시
  if (currentLoading || hourlyLoading || cityLoading) return <p>Loading weather information...</p>;
  if (currentError || hourlyError || cityError) return <p>Failed to load weather information.</p>;

  // 최고, 최저 기온 / 강수 확률 계산 함수 호출 (hourlyData 또는 cityWeather 데이터 우선 사용)
  const { maxTemp, minTemp } = getTodayTemperatureStats(hourlyData?.list ? hourlyData : cityWeather);
  const rainProbability = getDailyRainProbability(hourlyData?.list ? hourlyData : cityWeather);

  console.log("currentData:", currentData)

  return (
    <div className="weather-wrap">
      <h2 className="title">WEATHER FORECAST</h2>
      <SearchBar setCity={setCity} />

      <WeatherInfo currentData={currentData || cityWeather} maxTemp={maxTemp} minTemp={minTemp} />
      <WeatherDetails rainProbability={rainProbability} humidity={currentData?.main?.humidity || cityWeather?.main?.humidity} windSpeed={currentData?.wind?.speed || cityWeather?.wind?.speed} />
      <HourlyForecast hourlyData={hourlyData || cityWeather} />
    </div>
  );
}

export default Weather;

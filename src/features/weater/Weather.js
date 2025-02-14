import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import '../../css/Weather.css';
import { fetchCurrentWeather, fetchHourlyWeather } from "./WeatherAPI";

function Weather() {
  const [location, setLocation] = useState({lat: null, lon: null});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const { data: currentData, error: currentError, isLoading: currentLoading } = useQuery({
    queryKey: ["currentWeather", location.lat, location.lon],
    queryFn: fetchCurrentWeather,
    enabled: !!location.lat && !!location.lon,
  });

  const { data: hourlyData, error: hourlyError, isLoading: hourlyLoading } = useQuery({
    queryKey: ["hourlWeather", location.lat, location.lon],
    queryFn: fetchHourlyWeather,
    enabled: !!location.lat && !!location.lon,
  });

  // 비 올 확률 계산 함수

  if (currentLoading || hourlyLoading) return <p>Loading weather information...</p>
  if (currentError || hourlyError) return <p>Failed to load weather information.</p>

  return (
    <div className="weather-wrap">
      <h2 className="title">WEATHER FORECAST</h2>

      <form>
        <figure className="search-icon">
          <img src="/icon/search.png" alt="search-icon" />
        </figure>
        <input type="text" placeholder="Find a City" />
      </form>

      <div className="weather-info">
        <div className="top-info">
          <div className="left">
            <h3 className="city">Daegu</h3>
            <p className="w-Condition">Sun</p>
          </div>
          <figure className="weather-icon">
            <img src="/icon/sun.png" alt="sun-icon" />
          </figure>
          <div className="right">
            <div className="h-l">
              <span className="h">H: +6°</span>
              <span className="l">L: -5°</span>
            </div>
            <div className="temperature">
              <p className="c">-1℃</p>
              <p className="f">30.2℉</p>
            </div>
          </div>
        </div>
        <div className="bottom-info">
          <div className="rain-wrap">
            <figure className="rain-icon">
              <img src="/icon/rain.png" alt="rain-icon" />
            </figure>
            <div className="text">
              <p className="name">RAIN</p>
              <p className="value">1%</p>
            </div>
          </div>
          <div className="hum-wrap">
            <figure className="rain-icon">
              <img src="/icon/hum.png" alt="hum-icon" />
            </figure>
            <div className="text">
              <p className="name">hum</p>
              <p className="value">46%</p>
            </div>
          </div>
          <div className="wind-wrap">
            <figure className="wind-icon">
              <img src="/icon/wind.png" alt="wind-icon" />
            </figure>
            <div className="text">
              <p className="name">wind</p>
              <p className="value">5 m/s</p>
            </div>
          </div>
        </div>

        <div className="next-text">
          <p className="today">Today</p>
          <p className="next">Next 7 Days</p>
        </div>

        <div className="today-time">
          <p className="time">12:00</p>
          <figure className="time-icon">
            <img src="/icon/sun-wind.png" alt="sun-wind-icon" />
          </figure>
          <p className="celsius">Now</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;

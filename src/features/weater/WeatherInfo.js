import React from 'react';

const WeatherInfo = React.memo(({ currentData, maxTemp, minTemp }) => {
  if (!currentData) {
    return <div className="weather-info">Loading weather data...</div>;
  }

  const cityName = currentData?.name || "Unknown Location";
  const weatherDescription = currentData?.weather?.[0]?.description || "No data available";
  const weatherIcon = currentData?.weather?.[0]?.icon ? `/icon/${currentData.weather[0].icon}.png` : "/icon/default.png";
  const temperatureC = currentData?.main?.temp ? Math.round(currentData.main.temp) : "--";
  const temperatureF = currentData?.main?.temp ? Math.round(currentData.main.temp * 9 / 5) + 32 : "--";

  return (
    <div className="weather-info">
      <div className="left">
        <h3 className="city">{cityName}</h3>
        <p className="w-condition">{weatherDescription}</p>
      </div>
      <figure className="weather-icon">
        <img src={weatherIcon} alt="weather-icon" />
      </figure>
      <div className="right">
        <div className="h-l">
          <span className="h">H: {maxTemp}°</span>
          <span className="l">L: {minTemp}°</span>
        </div>
        <div className="temperature">
          <p className="c">{temperatureC}℃</p>
          <p className="f">{temperatureF}℉</p>
        </div>
      </div>
    </div>
  );
});

export default WeatherInfo;

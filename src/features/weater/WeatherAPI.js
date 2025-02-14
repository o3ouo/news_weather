const API_KEY = '306ac41a9c80c8da01b5661152208f37';

export const fetchCurrentWeather = async ({ queryKey }) => {
  const [, lat, lon] = queryKey;

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error("현재 날씨 정보 가져오기 실패");
  }

  return response.json();
};

export const fetchHourlyWeather = async ({ queryKey }) => {
  const [, lat, lon] = queryKey;

  const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error("시간대별 날씨 정보 가져오기 실패");
  }

  return response.json();
};
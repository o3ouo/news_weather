const API_KEY = '306ac41a9c80c8da01b5661152208f37';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 현재 위치 기반 날씨 조회 
export const fetchCurrentWeather = async ({ queryKey }) => {
  const [, lat, lon] = queryKey;

  if (!lat || !lon) {
    throw new Error("위도와 경도가 필요함");
  }

  const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
  // 현재 OpenWeather API는 기본적으로 온도를 켈빈(K) 단위로 제공.
  //units=metric 파라미터를 추가하면 API가 온도를 섭씨(°C) 단위로 반환.

  if (!response.ok) {
    throw new Error("현재 날씨 정보 가져오기 실패");
  }

  return response.json();
};

// 현재 위치 기반 시간대별 날씨 조회
export const fetchHourlyWeather = async ({ queryKey }) => {
  const [, lat, lon] = queryKey;

  if (!lat || !lon) {
    throw new Error("위도와 경도 필요함");
  }

  const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);

  if (!response.ok) {
    throw new Error("시간대별 날씨 정보 가져오기 실패");
  }

  return response.json();
};

// 도시 이름을 기반으로 날씨 조회
export const fetchWeatherByCity = async (city) => {
  if (!city) {
    throw new Error("도시 이름 필요");
  }

  const response = await fetch(`${BASE_URL}//weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`);

  if (!response.ok) {
    throw new Error("도시 날씨 정보 가져오기 실패");
  }

  return response.json();
};
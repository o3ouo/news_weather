import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchCurrentWeather, fetchHourlyWeather, fetchWeatherByCity } from './WeatherAPI';

// 현재 위치 기반 날씨 데이터 가져오는 커스텀 훅
export const useWeather = (location, city) => {
  // 현재 위치 날씨
  const { data: currentData, error: currentError, isLoading: currentLoading } = useQuery({
    queryKey: ["currentWeather", location.lat, location.lon],
    queryFn: () => fetchCurrentWeather(location.lat, location.lon),
    enabled: !!location.lat && !!location.lon,
  });

  // 시간별 날씨
  const { data: hourlyData, error: hourlyError, isLoading: hourlyLoading } = useQuery({
    queryKey: ["hourlyWeather", location.lat, location.lon],
    queryFn: () => fetchHourlyWeather(location.lat, location.lon),
    enabled: !!location.lat && !!location.lon,
  });
 
  // 도시 검색 날씨
  const { data: cityWeather, error: cityError, isLoading: cityLoading } = useQuery({
    queryKey: ["cityWeather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,
  });

  // 도시 검색 날씨를 기반으로 위도/경도를 가져와서 시간대별 데이터 요청
  const { data: cityHourlyData, error: cityHourlyError, isLoading: cityHourlyLoading } = useQuery({
    queryKey: ["cityHourlyWeather", cityWeather?.coord?.lat, cityWeather?.coord?.lon],
    queryFn: () => fetchHourlyWeather(cityWeather.coord.lat, cityWeather.coord.lon),
    enabled: !!cityWeather?.coord?.lat && !!cityWeather?.coord?.lon,
  });

  // 도시 검색 결과가 있으면 우선, 없으면 현재 위치 데이터를 사용
  const activeWeatherData = useMemo(() => cityWeather || currentData, [cityWeather, currentData]);
  const activeHourlyData = useMemo(() => cityHourlyData || hourlyData, [cityHourlyData, hourlyData]);
  
  // 5일 동안의 최고/최저 온도 계산
  const weeklyTemperatureStats = useMemo(() => {
    if (!activeHourlyData?.list) return [];

    // 날짜별 최고/최저 온도를 저장할 객체
    const tempByDate = {};

    activeHourlyData.list.forEach((hour) => {
      const date = hour.dt_txt.split(" ")[0]; // YYYY-MM-DD 형식 추출
      if (!tempByDate[date]) {
        tempByDate[date] = { maxTemp: hour.main.temp, minTemp: hour.main.temp };
      } else {
        tempByDate[date].maxTemp = Math.max(tempByDate[date].maxTemp, hour.main.temp);
        tempByDate[date].minTemp = Math.min(tempByDate[date].minTemp, hour.main.temp);
      }
    });

    // 오늘 날짜 제외하고 5일치 데이터만 가져오기
    const today = new Date().toISOString().split("T")[0];
    return Object.entries(tempByDate)
    .filter(([date]) => date !== today)
    .slice(0, 5)
    .map(([date, temps]) => ({ date, ...temps }));
  }, [activeHourlyData]);


  // 오늘 날짜의 최고, 최저 기온 계산
  const todayTemperatureStats = useMemo(() => {
    if (!activeHourlyData?.list) return { maxTemp: 0, minTemp: 0 };

    const today = new Date().toISOString().split("T")[0];
    const todayTemps = activeHourlyData.list
      .filter((hour) => hour.dt_txt.startsWith(today))
      .map((hour) => hour.main.temp);

    return {
      maxTemp: todayTemps.length ? Math.round(Math.max(...todayTemps)) : 0,
      minTemp: todayTemps.length ? Math.round(Math.min(...todayTemps)) : 0,
    };
  }, [activeHourlyData]);

  // 오늘의 강수 확률 계산
  const dailyRainProbability = useMemo(() => {
    if (!activeHourlyData?.list) return 0;

    const pops = activeHourlyData.list.map((hour) => hour.pop || 0);
    return pops.length ? Math.round((pops.reduce((sum, pop) => sum + pop, 0) / pops.length) * 100) : 0;
  }, [activeHourlyData]);    

  return { 
    activeWeatherData,
    activeHourlyData,
    todayTemperatureStats,
    weeklyTemperatureStats,
    dailyRainProbability,
    currentError,
    hourlyError,
    cityError,
    cityHourlyError,
    currentLoading,
    hourlyLoading,
    cityLoading,
    cityHourlyLoading,
  };
};
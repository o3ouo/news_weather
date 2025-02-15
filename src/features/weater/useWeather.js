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

  // 도시 검색 결과가 있으면 우선, 없으면 현재 위치 데이터를 사용
  const activeWeatherData = useMemo(() => cityWeather || currentData, [cityWeather, currentData]);
  const activeHourlyData = useMemo(() => cityWeather || hourlyData, [cityWeather, hourlyData]);
  
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
    dailyRainProbability,
    currentError,
    hourlyError,
    cityError,
    currentLoading,
    hourlyLoading,
    cityLoading,
  };
};
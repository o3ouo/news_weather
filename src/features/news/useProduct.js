import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchNews = (category) => {
  const baseURL = "https://newsdata.io/api/1/latest?country=kr&apikey=pub_64517ea65789adb43dfbc3d97dfab94e83340";
  return axios.get(category && category !== "all" ? `https://newsdata.io/api/1/latest?country=kr&category=${category}&apikey=pub_64517ea65789adb43dfbc3d97dfab94e83340` : baseURL);
};

export const useProductQuery = (category) => {
  return useQuery({
    queryKey: ['products', category || "all"],
    queryFn: () => fetchNews(category),
    select: (data) => data.data.results,
    gcTime: 60000,
    staleTime: 30000,
  });
};

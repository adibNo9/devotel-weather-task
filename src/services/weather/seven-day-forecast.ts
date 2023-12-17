import { QueryFunctionContext, useQuery, UseQueryOptions } from "react-query";

import http from "../utils/http";
import { ICurrentWeatherData, QueryKey, QueryPayload } from "../utils/types";

export const fetchSevenDayForecastWeather = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const lat = queryKey[1].lat;
  const lon = queryKey[1].lon;
  const { data } = await http.get(
    `/forecast/daily/?key=${process.env.REACT_APP_API_KEY}&days=7&lat=${lat}&lon=${lon}`
  );

  return data.data;
};

export const useSevenDayForecastQuery = (
  payload: QueryPayload,
  options: UseQueryOptions
) => {
  const queryKey: QueryKey = ["seven-day-forecast", payload];
  return useQuery<
    ICurrentWeatherData[],
    Error,
    ICurrentWeatherData[],
    QueryKey
  >({
    queryKey,
    queryFn: fetchSevenDayForecastWeather,
    enabled: !!options.enabled,
  });
};

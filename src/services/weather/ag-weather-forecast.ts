import { QueryFunctionContext, useQuery, UseQueryOptions } from "react-query";

import http from "../utils/http";
import { ICurrentWeatherData, QueryKey, QueryPayload } from "../utils/types";

export const fetchAgWeatherForecastWeather = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const lat = queryKey[1].lat;
  const lon = queryKey[1].lon;
  const startDate = queryKey[1].startDate;
  const endDate = queryKey[1].endDate;
  const { data } = await http.get(
    `/history/daily/?key=${process.env.REACT_APP_API_KEY}&days=7&lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`
  );

  return data.data;
};

export const useAgWeatherForecastQuery = (
  payload: QueryPayload,
  options: UseQueryOptions
) => {
  const queryKey: QueryKey = ["ag-weather-forecast", payload];
  return useQuery<
    ICurrentWeatherData[],
    Error,
    ICurrentWeatherData[],
    QueryKey
  >({
    queryKey,
    queryFn: fetchAgWeatherForecastWeather,
    enabled: !!options.enabled,
  });
};

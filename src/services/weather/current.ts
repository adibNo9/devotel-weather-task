import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from 'react-query';

import http from '../utils/http';
import { ICurrentWeatherData, QueryKey, QueryPayload } from "../utils/types";

export const fetchCurrentWeather = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  const lat = queryKey[1].lat;
  const lon = queryKey[1].lon;
  const { data } = await http.get(
    `/current/?key=${process.env.REACT_APP_API_KEY}&lat=${lat}&lon=${lon}`
  );

  return data.data[0];
};

export const useCurrentWeatherQuery = (
  payload: QueryPayload,
  options: UseQueryOptions
) => {
  const queryKey: QueryKey = ["current", payload];
  return useQuery<ICurrentWeatherData, Error, ICurrentWeatherData, QueryKey>({
    queryKey,
    queryFn: fetchCurrentWeather,
    enabled: !!options.enabled,
  });
};

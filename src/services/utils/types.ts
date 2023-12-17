export type QueryPayload = { [key: string]: number | string | null };

export type QueryKey = [string, QueryPayload];

export interface ICurrentWeatherData {
  city_name: string;
  temp: number;
  weather: { description: string; icon: string };
  ob_time: string;
  pod: string;
  datetime: string;
  max_wind_spd?: number;
}

import HomeScreen from '../components/HomeScreen';
import { useCurrentWeatherQuery } from '../services/weather/current';

const WeatherContainer = () => {
  const { data } = useCurrentWeatherQuery(
    { lat: 35.7219, lon: 51.3347 },
    {
      enabled: true,
    }
  );

  console.log(data);

  return (
    <div className="relative">
      <div
        className={`${
          data?.pod === "n"
            ? "bg-night"
            : data?.pod === "d"
            ? "bg-day"
            : "bg-white"
        } bg-cover top-0 left-0 fixed w-full h-full -z-20`}
      />
      {data && (
        <div className="bg-black bg-cover top-0 left-0 fixed w-full h-full bg-opacity-40 -z-10" />
      )}
      <HomeScreen data={data} />
    </div>
  );
};

export default WeatherContainer;

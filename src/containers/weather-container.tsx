import cls from "classnames";
import { LuLoader2 } from "react-icons/lu";

import HomeScreen from "../components/HomeScreen";
import SevenDayForeCast from "../components/SevenDayForecast";
import WeatherHistory from "../components/WeatherHistory";
import { useCurrentWeatherQuery } from "../services/weather/current";

const WeatherContainer = () => {
  const { data, isLoading } = useCurrentWeatherQuery(
    { lat: 35.7219, lon: 51.3347 },
    {
      enabled: true,
    }
  );

  const windowWrapper = cls({
    "bg-night": data?.pod === "n",
    "bg-day": data?.pod === "d",
    "bg-cover top-0 left-0 fixed w-full h-full -z-20": !!data,
  });

  if (!data && isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center fixed">
        <LuLoader2 className="text-black text-5xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6">
      <div className={windowWrapper} />
      <div className="bg-black bg-cover top-0 left-0 fixed w-full h-full bg-opacity-40 -z-10" />
      <HomeScreen data={data} />
      <div className="flex flex-col sm:flex-row justify-center w-full md:w-4/5 lg:w-3/5 m-auto gap-2">
        <SevenDayForeCast />
        <WeatherHistory />
      </div>
    </div>
  );
};

export default WeatherContainer;

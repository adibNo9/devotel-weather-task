import { useEffect } from "react";

import cls from "classnames";

import Error from "../components/Error";
import HomeScreen from "../components/HomeScreen";
import Loader from "../components/Loader";
import SevenDayForeCast from "../components/SevenDayForecast";
import WeatherHistory from "../components/WeatherHistory";
import GetIP from "../hooks/getUserLocation";
import { useCurrentWeatherQuery } from "../services/weather/current";

const WeatherContainer = () => {
  const userLocation = GetIP();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useCurrentWeatherQuery(
      { lat: userLocation?.latitude, lon: userLocation?.longitude },
      {
        enabled: !!userLocation.latitude,
      }
    );

  useEffect(() => {
    userLocation.latitude && refetch();
  }, [userLocation, refetch]);

  const windowWrapper = cls({
    "bg-night": data?.pod === "n",
    "bg-day": data?.pod === "d",
    "bg-cover top-0 left-0 fixed w-full h-full -z-20": !!data,
  });

  if (!data || isLoading) return <Loader />;

  if (isError) return <Error errorMessage={error.message} />;

  return (
    <div className="relative flex flex-col gap-6">
      <div className={windowWrapper} />
      <div className="bg-black bg-cover top-0 left-0 fixed w-full h-full bg-opacity-40 -z-10" />
      <HomeScreen
        data={data}
        refetch={refetch}
        isLoading={isLoading || isRefetching}
      />
      <div className="flex flex-col sm:flex-row justify-center w-full md:w-4/5 lg:w-3/5 m-auto gap-2">
        <SevenDayForeCast />
        <WeatherHistory />
      </div>
    </div>
  );
};

export default WeatherContainer;

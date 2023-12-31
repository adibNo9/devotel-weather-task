import cls from "classnames";

import Error from "../Error";
import HomeScreen from "../HomeScreen";
import Loader from "../Loader";
import SevenDayForecast from "../SevenDayForecast";
import WeatherHistory from "../WeatherHistory";
import { useLogic } from "./useLogic";

const WeatherContainer = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    errorLocation,
  } = useLogic();

  const windowWrapper = cls({
    "bg-night": data?.pod === "n",
    "bg-day": data?.pod === "d",
    "bg-cover top-0 left-0 fixed w-full h-full -z-20": !!data,
  });

  if (isError || errorLocation)
    return (
      <Error
        errorMessage={
          error?.message || errorLocation || "Something went wrong!"
        }
      />
    );

  if (!data || isLoading) return <Loader />;

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
        <SevenDayForecast />
        <WeatherHistory />
      </div>
    </div>
  );
};

export default WeatherContainer;

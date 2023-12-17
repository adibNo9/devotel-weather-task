import { lazy, Suspense } from "react";

import cls from "classnames";

import { useLogic } from "./useLogic";

const Error = lazy(() => import("../Error"));
const HomeScreen = lazy(() => import("../HomeScreen"));
const Loader = lazy(() => import("../Loader"));
const SevenDayForecast = lazy(() => import("../SevenDayForecast"));
const WeatherHistory = lazy(() => import("../WeatherHistory"));

const WeatherContainer = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useLogic();

  const windowWrapper = cls({
    "bg-night": data?.pod === "n",
    "bg-day": data?.pod === "d",
    "bg-cover top-0 left-0 fixed w-full h-full -z-20": !!data,
  });

  if (!data || isLoading) return <Loader />;

  if (isError)
    return <Error errorMessage={error?.message || "Something went wrong!"} />;

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default WeatherContainer;

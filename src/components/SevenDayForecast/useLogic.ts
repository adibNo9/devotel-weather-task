import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { useSevenDayForecastQuery } from "../../services/weather/seven-day-forecast";

export const useLogic = () => {
  const [isOpenSevenDay, setOpenSevenDay] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>();
  const SevenDayContentRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isError } = useSevenDayForecastQuery(
    { lat: 35.7219, lon: 51.3347 },
    {
      enabled: isOpenSevenDay,
    }
  );

  useEffect(() => {
    isLoading &&
      !isError &&
      toast.loading("Please wait...", {
        duration: 1000,
      });
  }, [isLoading, isError]);

  useEffect(() => {
    data && setContentHeight(SevenDayContentRef.current?.scrollHeight);
  }, [data]);

  const sevenDayToggleHandler = () => {
    setOpenSevenDay((prevState) => !prevState);
  };

  return {
    data,
    SevenDayContentRef,
    isOpenSevenDay,
    contentHeight,
    sevenDayToggleHandler,
  };
};

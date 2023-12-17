import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { useAgWeatherForecastQuery } from "../../services/weather/ag-weather-forecast";

export const useLogic = () => {
  const weatherHistoryContentRef = useRef<HTMLDivElement | null>(null);
  const [isOpenWeatherHistory, setOpenWeatherHistory] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [contentHeight, setContentHeight] = useState<number>();

  function formatDate(date: Date | null) {
    if (!date) return null;
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const { data, isLoading, isError } = useAgWeatherForecastQuery(
    {
      lat: 35.7219,
      lon: 51.3347,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    {
      enabled: !!endDate && !!startDate,
    }
  );

  useEffect(() => {
    isLoading &&
      !isError &&
      toast.loading("Please wait...", {
        duration: 3000,
      });
  }, [isLoading, isError]);

  useEffect(() => {
    setContentHeight(weatherHistoryContentRef.current?.scrollHeight);
  }, [isOpenWeatherHistory, data]);

  const weatherHistoryToggleHandler = () => {
    setOpenWeatherHistory((prevState) => !prevState);
  };

  const onChangeDatePicker = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return {
    isOpenWeatherHistory,
    startDate,
    endDate,
    data,
    weatherHistoryContentRef,
    contentHeight,
    onChangeDatePicker,
    weatherHistoryToggleHandler,
  };
};

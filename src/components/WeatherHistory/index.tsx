import { useEffect, useRef, useState } from "react";

import cls from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { WiStrongWind } from "react-icons/wi";

import { useAgWeatherForecastQuery } from "../../services/weather/ag-weather-forecast";
import Accordion from "../Accordion";

const WeatherHistory = () => {
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

  const weatherHistoryContent = () => {
    return (
      <div
        ref={weatherHistoryContentRef}
        className="flex flex-col items-center gap-2"
      >
        <div className="pb-4">
          <label className="w-full">Select date range</label>
          <DatePicker
            selected={startDate}
            onChange={onChangeDatePicker}
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
        </div>
        {!data?.[0].temp && endDate ? (
          <p className="text-red-200 pb-4">No Data available!</p>
        ) : (
          data?.map((item, index) => {
            const length = data.length;
            const itemWrapper = cls({
              "flex justify-between py-2 w-full": true,
              "border-b": index !== length - 1,
            });
            if (!item.temp) return <></>;
            return (
              <div className={itemWrapper}>
                <p className="w-24">{moment(item?.datetime).format("dddd")}</p>
                <div className="flex gap-1">
                  <p>{item?.max_wind_spd}</p>
                  <WiStrongWind size={25} />
                </div>

                <p className="text-xl w-20 text-right">{item?.temp}°c</p>
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <>
      <Accordion
        contentHeight={contentHeight}
        ariaControls="Weather History"
        title="Weather History"
        content={weatherHistoryContent()}
        isOpen={isOpenWeatherHistory}
        toggleHandler={weatherHistoryToggleHandler}
      />
    </>
  );
};

export default WeatherHistory;

import cls from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";
import { WiStrongWind } from "react-icons/wi";

import Accordion from "../Accordion";
import { useLogic } from "./useLogic";

const WeatherHistory = () => {
  const {
    isOpenWeatherHistory,
    startDate,
    endDate,
    data,
    weatherHistoryContentRef,
    contentHeight,
    onChangeDatePicker,
    weatherHistoryToggleHandler,
  } = useLogic();

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
            if (!item.temp) return null;
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

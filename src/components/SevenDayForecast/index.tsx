import { useRef, useState } from "react";

import cls from "classnames";
import moment from "moment";

import { useSevenDayForecastQuery } from "../../services/weather/seven-day-forecast";
import Accordion from "../Accordion";

const SevenDayForeCast = () => {
  const { data } = useSevenDayForecastQuery(
    { lat: 35.7219, lon: 51.3347 },
    {
      enabled: true,
    }
  );

  const [isOpenSevenDay, setOpenSevenDay] = useState(false);
  const SevenDayContentRef = useRef<HTMLDivElement | null>(null);

  const sevenDayToggleHandler = () => {
    setOpenSevenDay((prevState) => !prevState);
  };

  const sevenDayForeCastContent = () => {
    return (
      <div ref={SevenDayContentRef}>
        {data?.map((item, index) => {
          const itemWrapper = cls({
            "flex justify-between py-2": true,
            "border-b": index !== 6,
          });
          return (
            <div className={itemWrapper}>
              <p className="w-24">
                {index === 0 ? "Today" : moment(item?.datetime).format("dddd")}
              </p>
              <img
                className="w-6"
                src={`/assets/icons/${item?.weather.icon}.png`}
                alt={item?.weather.description}
              />
              <p className="text-xl w-20 text-right">{item?.temp}°c</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Accordion
      ariaControls="7-Day Forecast"
      title="7-Day Forecast"
      contentHeight={SevenDayContentRef.current?.scrollHeight}
      content={sevenDayForeCastContent()}
      isOpen={isOpenSevenDay}
      toggleHandler={sevenDayToggleHandler}
    />
  );
};

export default SevenDayForeCast;

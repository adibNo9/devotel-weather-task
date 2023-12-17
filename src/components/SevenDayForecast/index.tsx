import cls from "classnames";
import moment from "moment";

import Accordion from "../Accordion";
import { useLogic } from "./useLogic";

const SevenDayForeCast = () => {
  const {
    data,
    SevenDayContentRef,
    isOpenSevenDay,
    contentHeight,
    sevenDayToggleHandler,
  } = useLogic();

  const sevenDayForeCastContent = () => {
    return (
      <div ref={SevenDayContentRef}>
        {data?.map((day, dayIndex) => {
          const itemWrapper = cls({
            "flex justify-between py-2": true,
            "border-b": dayIndex !== 6,
          });
          return (
            <div key={`day-${dayIndex + 1}`} className={itemWrapper}>
              <p className="w-24">
                {dayIndex === 0
                  ? "Today"
                  : moment(day?.datetime).format("dddd")}
              </p>
              <img
                className="w-6"
                src={`/assets/icons/${day?.weather.icon}.png`}
                alt={day?.weather.description}
              />
              <p className="text-xl w-20 text-right">{day?.temp}°c</p>
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
      contentHeight={contentHeight}
      content={sevenDayForeCastContent()}
      isOpen={isOpenSevenDay}
      toggleHandler={sevenDayToggleHandler}
    />
  );
};

export default SevenDayForeCast;

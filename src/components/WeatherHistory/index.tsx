import { useRef, useState } from "react";

import Accordion from "../Accordion";

const WeatherHistory = () => {
  const weatherHistoryContentRef = useRef<HTMLDivElement | null>(null);
  const [isOpenWeatherHistory, setOpenWeatherHistory] = useState(false);

  const weatherHistoryToggleHandler = () => {
    setOpenWeatherHistory((prevState) => !prevState);
  };

  return (
    <Accordion
      contentHeight={weatherHistoryContentRef.current?.scrollHeight}
      ariaControls="Weather History"
      title="Weather History"
      content={
        <div ref={weatherHistoryContentRef}>
          <p>asdasfasf</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
      }
      isOpen={isOpenWeatherHistory}
      toggleHandler={weatherHistoryToggleHandler}
    />
  );
};

export default WeatherHistory;

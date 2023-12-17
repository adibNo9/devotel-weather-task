import cls from "classnames";
import moment from "moment";
import { LuRefreshCw } from "react-icons/lu";

import { ICurrentWeatherData } from "../services/utils/types";

interface IProps {
  data?: ICurrentWeatherData;
  refetch: () => void;
  isLoading: boolean;
}

const HomeScreen = ({ data, refetch, isLoading }: IProps) => {
  const reloadBtn = cls({
    "animate-spin disabled:text-gray-400 disabled:cursor-not-allowed":
      isLoading,
    "hover:scale-125 active:scale-110 transition": !isLoading,
  });

  return (
    <div>
      <div className="flex gap-6 justify-center mt-16 mb-8 items-center">
        <h1 className="text-5xl font-light">{data?.city_name}</h1>
        <button disabled={isLoading} onClick={refetch} className={reloadBtn}>
          <LuRefreshCw size={30} />
        </button>
      </div>
      <div className="flex items-center flex-col">
        <div className="flex gap-2 text-lg">
          <p className="text-inherit">{moment(data?.ob_time).format("dddd")}</p>
          <p className="text-inherit">{moment(new Date()).format("HH:mm")}</p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={`/assets/icons/${data?.weather.icon}.png`}
            alt={data?.weather.description}
          />
          <p className="text-6xl">{data?.temp}°c</p>
        </div>
        <div>
          <p className="text-3xl">{data?.weather.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

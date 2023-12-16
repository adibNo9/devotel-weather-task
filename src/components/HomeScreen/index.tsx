import moment from 'moment';
import { LuRefreshCw } from 'react-icons/lu';

interface IProps {
  data: {
    city_name: string;
    temp: number;
    weather: { description: string; icon: string };
    ob_time: string;
    ts: number;
  };
}

const HomeScreen = ({ data }: IProps) => {
  const date = new Date(data?.ts * 1000);

  return (
    <div>
      <div className="flex gap-6 justify-center my-20 items-center">
        <h1 className="text-6xl font-light">{data?.city_name}</h1>
        <button className="hover:scale-125 active:scale-110 transition">
          <LuRefreshCw size={40} />
        </button>
      </div>
      <div className="flex items-center flex-col gap-6">
        <div className="flex gap-4 text-xl">
          <p className="text-inherit">{moment(data?.ob_time).format("dddd")}</p>
          <p className="text-inherit">
            <span>{date.getHours()}</span>
            <span>:</span>
            <span>{date.getMinutes()}</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
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

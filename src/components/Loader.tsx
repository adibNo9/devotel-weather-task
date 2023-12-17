import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center fixed">
      <LuLoader2 className="text-black text-5xl animate-spin" />
    </div>
  );
};

export default Loader;

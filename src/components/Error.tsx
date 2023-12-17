import { MdErrorOutline } from "react-icons/md";

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center drop-shadow-none text-black">
      <MdErrorOutline size={80} />
      <p className="font-bold" style={{ textShadow: "none" }}>
        {errorMessage}
      </p>
    </div>
  );
};

export default Error;

import { MdErrorOutline } from "react-icons/md";

const Error = ({ errorMessage }: { errorMessage: string }) => {
  const reloadHandler = () => {
    window.location.reload();
  };

  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center drop-shadow-none text-black">
      <MdErrorOutline size={80} />
      <p className="font-bold my-2" style={{ textShadow: "none" }}>
        {errorMessage}
      </p>

      <button
        className="bg-cyan-600 text-white px-3 py-1 rounded font-medium hover:bg-cyan-500 transition-colors"
        onClick={reloadHandler}
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;

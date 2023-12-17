import { ReactNode } from "react";

import cls from "classnames";
import { FaChevronDown } from "react-icons/fa";

interface IProps {
  content: ReactNode;
  isOpen: boolean;
  toggleHandler: () => void;
  contentHeight?: number;
  title: string;
  ariaControls: string;
}

const Accordion = ({
  content,
  isOpen,
  toggleHandler,
  contentHeight,
  title,
  ariaControls,
}: IProps) => {
  console.log(isOpen, "isopen");
  const buttonWrapper = cls({
    "w-full py-5 px-2 flex items-center justify-between font-medium text-xl bg-transparent border-none cursor-pointer":
      true,
    "text-gray-300": isOpen,
  });

  const iconButton = cls({
    "text-inherit transition-all duration-500": true,
    "rotate-180": isOpen,
  });

  return (
    <div className="overflow-hidden border-b bg-blue-600 rounded-lg bg-opacity-40 w-full h-fit">
      <div
        aria-expanded={isOpen}
        aria-controls={ariaControls}
        aria-label={(isOpen ? "hide " : "show ") + ariaControls}
        className={buttonWrapper}
        onClick={toggleHandler}
      >
        <p className="text-inherit transition-colors">{title}</p>
        <FaChevronDown className={iconButton} />
      </div>

      <div
        id={ariaControls}
        className="px-2 transition-all duration-500"
        style={isOpen ? { height: contentHeight } : { height: "0px" }}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;

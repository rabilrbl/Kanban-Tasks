import React from "react";
import Board from "./icons/Board";
import CombinedShape from "./icons/CombinedShape";

type buttonType = "fullGray" | "newBoard" | "newStage";

type Props = {
  type?: buttonType;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button = (props: Props) => {
  const { type, children, className, disabled, onClick } = props;
  switch (type) {
    case "fullGray":
      return (
        <div>
          <button
            className={
              "w-full px-4 py-2 bg-gray-700 rounded-md text-gray-50 hover:bg-gray-600 " +
              className
            }
            disabled={disabled}
          >
            {children}
          </button>
        </div>
      );
    case "newBoard":
      return (
        <button
          type="button"
          onClick={onClick}
          className={
            "text-zinc-100 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 " +
            className
          }
        >
          <CombinedShape h="18" w="18" />
          &nbsp;&nbsp;
          {children}
        </button>
      );
    case "newStage":
      return (
        <button
          type="button"
          onClick={onClick}
          className={
            "text-zinc-100 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 " +
            className
          }
        >
          <Board />
          &nbsp;&nbsp;
          {children}
        </button>
      );
    default:
      return (
        <div>
          <button className={className} disabled={disabled} onClick={onClick}>
            {children}
          </button>
        </div>
      );
  }
};

export default Button;

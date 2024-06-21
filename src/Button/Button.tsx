import React, { FC } from "react";
import Spinner from "@/components/Spinner/Spinner";

export type ButtonProps = {
  text: string;
  color: string;
  btnType: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
};
const Button: FC<ButtonProps> = ({
  text,
  color,
  btnType,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={btnType}
      onClick={onClick}
      className={`w-full cursor-pointer rounded border border-${color} bg-${color} p-2 text-white transition hover:bg-opacity-30`}
    >
      <div className="flex w-full items-center justify-center ">
        <div className=" font-medium capitalize"> {text}</div>
        <div>{disabled && <Spinner />}</div>
      </div>
    </button>
  );
};

export default Button;

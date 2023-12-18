import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const { title, variant, navigateTo } = props;
  const navigate = useNavigate();

  return (
    <div
      className={` h-[5vh] rounded-[10px] m-0 p-0 text-lg flex items-center justify-center mx-1 cursor-pointer ${
        variant === 1
          ? "bg-gradient-to-b from-[#8B7CFD] via-[#8B7CFD] to-[#159AFB]"
          : "border-2 border-[#4D8CFC]"
      } `}
      onClick={() => navigate(navigateTo)}
    >
      <h1 className={`px-3 m-0 p-0 ${variant === 1 ? "text-white": "text-[#4D8CFC]"}`}>{title}</h1>
    </div>
  );
};

export default Button;

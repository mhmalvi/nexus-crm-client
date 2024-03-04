import React, { useState } from "react";
import { useSelector } from "react-redux";

const Billing = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user);

  const [activeItem, setActiveItem] = useState("Method");
  return (
    <div className="flex items-start justify-center w-full h-screen py-8">
      <div className="flex flex-col flex-grow gap-4 w-full h-full mx-5 ">
        {/* MENU BAR */}
        <div className="flex justify-between w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-8">
          <div className="flex gap-8">
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Method"
                        ? "text-white font-semibold"
                        : "text-slate-300"
                    }`
                  : `hover:text-gray-800  ${
                      activeItem === "Method"
                        ? "text-gray-800 font-semibold"
                        : "text-gray-500"
                    }`
              } px-4 text-base`}
              onClick={() => {
                setActiveItem("Method");
              }}
            >
              Method
            </button>
            <button
              className={`${
                colorMode
                  ? `hover:text-white ${
                      activeItem === "Billing History"
                        ? "text-white font-semibold "
                        : "text-slate-300  "
                    }`
                  : `hover:text-gray-800 ${
                      activeItem === "Billing History"
                        ? "text-gray-800 font-semibold "
                        : "text-gray-500  "
                    }`
              } px-4 text-base`}
              onClick={() => {
                setActiveItem("Billing History");
              }}
            >
              Billing History
            </button>
          </div>
        </div>
        {/* MAIN BOX */}
        <div className="flex justify-between w-full h-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] p-8"></div>
      </div>
    </div>
  );
};

export default Billing;

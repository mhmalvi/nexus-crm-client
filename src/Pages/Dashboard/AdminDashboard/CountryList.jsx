import React from "react";
import { useSelector } from "react-redux";

const CountryList = ({ table_title }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className=" h-full w-full p-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11]">
      <h1
        className={`text-2xl text-${
          colorMode ? "slate-300" : "gray-800"
        } font-normal font-poppins pt-1`}
      >
        Countries
      </h1>
      {table_title === "Lead List" ? (
        <div className="grid grid-cols-2 items-center justify-center">
          <div className={`flex text-${colorMode ? "slate-300" : "gray-800"} `}>
            <div
              className={`bg-[#26D4AB7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="w-1/2">WA</p>
          </div>
          <div className={`flex text-${colorMode ? "slate-300" : "gray-800"} `}>
            <div
              className={`bg-[#F3E45B7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="w-1/2">Vietnam</p>
          </div>
          <div className={`flex text-${colorMode ? "slate-300" : "gray-800"} `}>
            <div
              className={`bg-[#FF8A8A7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="w-1/2">Philippines</p>
          </div>
          <div className={`flex text-${colorMode ? "slate-300" : "gray-800"} `}>
            <div
              className={`bg-[#2FA3F67f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="w-1/2">Others</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CountryList;

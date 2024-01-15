import React from "react";
import { useSelector } from "react-redux";

const CountryList = ({ table_title }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className=" h-full w-full p-3 rounded-xl shadow-xl backdrop-blur-2xl bg-[#ffffff11]">
      <h1
        className={`text-2xl text-${
          colorMode ? "white" : "gray-800"
        } font-normal font-poppins pt-1`}
      >
        Countries
      </h1>
      {table_title === "Lead List" ? (
        <div className="grid grid-cols-2 ">
          <div className={`flex text-${colorMode ? "white" : "gray-800"} `}>
            <div className="bg-[#fef08a] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">WA</p>
          </div>
          <div className={`flex text-${colorMode ? "white" : "gray-800"} `}>
            <div className="bg-[#f2d7ff] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">Vietnam</p>
          </div>
          <div className={`flex text-${colorMode ? "white" : "gray-800"} `}>
            <div className="bg-[#d7f7ff] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">Philippines</p>
          </div>
          <div className={`flex text-${colorMode ? "white" : "gray-800"} `}>
            <div className="bg-[#d9f99d] w-[30px] h-[20px] rounded-full mr-2"></div>
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

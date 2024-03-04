import React from "react";
import { useSelector } from "react-redux";

const CountryList = ({ table_title }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className="h-full px-8 py-4 w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
      <h1
        className={`3xl:text-lg text-base ${
          colorMode ? " text-slate-300" : " text-gray-800"
        } font-normal font-poppins  pt-1`}
      >
        <span className="text-base">Filter by</span> Location
      </h1>
      {table_title === "Lead List" ? (
        <div
          className="flex flex-wrap items-start gap-4"
        >
          <div
            className={` flex items-center 3xl:text-base text-sm ${
              colorMode ? "text-slate-300" : "text-gray-800"
            } `}
          >
            <div
              className={`bg-[#26D4AB7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="m-0 p-0">WA</p>
          </div>
          <div
            className={`flex items-center 3xl:text-base text-sm ${
              colorMode ? "text-slate-300" : "text-gray-800"
            } `}
          >
            <div
              className={`bg-[#F3E45B7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="m-0 p-0">Vietnam</p>
          </div>
          <div
            className={`flex items-center 3xl:text-base text-sm ${
              colorMode ? "text-slate-300" : "text-gray-800"
            } `}
          >
            <div
              className={`bg-[#FF8A8A7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="m-0 p-0">Philippines</p>
          </div>
          <div
            className={`flex items-center 3xl:text-base text-sm ${
              colorMode ? "text-slate-300" : "text-gray-800"
            } `}
          >
            <div
              className={`bg-transparent w-[25px] h-[25px] rounded-full mr-2 border-4 ${
                colorMode ? "border-slate-200" : "border-gray-800"
              }`}
            ></div>
            <p className="p-0 m-0">Others</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CountryList;

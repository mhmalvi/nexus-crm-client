import React from "react";

const CountryList = ({ table_title }) => {
  return (
    <div className=" h-full w-full p-3 rounded-xl shadow-xl backdrop-blur-2xl bg-[#ffffff11]">
      <h1 className="text-2xl text-white font-normal font-poppins pt-1">
        Countries
      </h1>
      {table_title === "Lead List" ? (
        <div className="grid grid-cols-2 ">
          <div className="flex  text-white">
            <div className="bg-[#fef08a] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">WA</p>
          </div>
          <div className="flex text-white">
            <div className="bg-[#f2d7ff] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">Vietnam</p>
          </div>
          <div className="flex text-white">
            <div className="bg-[#d7f7ff] w-[30px] h-[20px] rounded-full mr-2"></div>
            <p className="w-1/2">Philippines</p>
          </div>
          <div className="flex text-white">
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

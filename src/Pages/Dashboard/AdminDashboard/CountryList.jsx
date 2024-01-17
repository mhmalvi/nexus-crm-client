import React, { useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const CountryList = ({ table_title }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  // const [showCountrySettings, setShowCountrySettings] = useState(false);
  return (
    <div className=" h-full w-full p-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11]">
      {/* <Modal
        visible={showCountrySettings}
        onCancel={() => setShowCountrySettings(false)}
        footer={null}
      >
        <div className="">
          <div
            className={`font-poppins text-xl text-${
              colorMode ? "slate-300" : "gray-800"
            } mb-6`}
          >
            Edit Countries
          </div>
          <div></div>
        </div>
      </Modal> */}
      <div className="w-full flex justify-between items-center mb-3">
        <h1
          className={`text-2xl m-0 p-0 text-${
            colorMode ? "slate-300" : "gray-800"
          } font-normal font-poppins pt-1`}
        >
          Countries
        </h1>
        {/* <div
          className={`rounded-md cursor-pointer ease-in duration-100 ${
            colorMode
              ? "text-slate-300 hover:text-brand-color"
              : "text-gray-800 hover:text-brand-color"
          }`}
          onClick={() => {
            setShowCountrySettings(true);
          }}
        >
          <Icons.Edit />
        </div> */}
      </div>
      {table_title === "Lead List" ? (
        <div className="grid grid-cols-3 items-center justify-center">
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
              className={`bg-[#9ed8ff7f] w-[25px] h-[25px] rounded-full mr-2 border-4 ${
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

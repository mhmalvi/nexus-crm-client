import React from "react";
import { useSelector } from "react-redux";
const Packages = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className="w-full flex items-center justify-center gap-16">
      <div
        className={`w-1/3 h-full border flex items-centr justify-center flex-col ${
          colorMode ? "border-brand-color" : "border-gray-800"
        } rounded-md `}
      >
        <h1
          className={`flex items-center justify-center gap-2 w-full  m-0 py-2 px-4 text-6xl font-semibold ${
            colorMode ? "text-slate-300" : "text-gray-800 "
          }`}
        >
          30 days Free Trial
        </h1>
        <div className="p-4">
          <button
            className={`py-4 rounded-md w-full text-slate-300 font-semibold ${
              colorMode ? "bg-brand-color" : "bg-gray-800"
            }`}
          >
            Button
          </button>
        </div>
      </div>
      <div
        className={`w-1/3 h-full border flex flex-col justify-around ${
          colorMode ? "border-brand-color" : "border-gray-800"
        } rounded-md `}
      >
        <h1
          className={`flex items-center justify-center gap-2 w-full  m-0 py-2 px-4 text-6xl text-center font-semibold ${
            colorMode ? "text-slate-300" : "text-gray-800 "
          }`}
        >
          Standard Package
        </h1>
        <div>
          <h1
            className={`flex items-center justify-center gap-2 w-full  m-0 py-2 px-4 text-3xl font-semibold ${
              colorMode ? "text-slate-300" : "text-gray-800 "
            }`}
          >
            $15/Month
          </h1>

          <div className="px-4">
            <button
              className={`py-4 rounded-md w-full text-slate-300 font-semibold ${
                colorMode ? "bg-brand-color" : "bg-gray-800"
              }`}
            >
              Avail Monthly Package
            </button>
          </div>
        </div>
        <div>
          <h1
            className={`flex items-center justify-center gap-2 w-full  m-0 py-2 px-4 text-3xl font-semibold ${
              colorMode ? "text-slate-300" : "text-gray-800 "
            }`}
          >
            $135/Year (25% off)
          </h1>

          <div className="px-4">
            <button
              className={`py-4 rounded-md w-full text-slate-300 font-semibold ${
                colorMode ? "bg-brand-color" : "bg-gray-800"
              }`}
            >
              Avail Yearly Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;

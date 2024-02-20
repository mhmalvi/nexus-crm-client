import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const NotifyModal = ({ notificationData }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div
      className={`flex flex-col min-w-[25vw]  min-h-2/3 bg-[#ffffff11] border ${
        colorMode ? "border-slate-300" : "border-gray-800"
      } backdrop-blur-2xl p-8 rounded-md`}
    >
      <h1
        className={`text-xl ${colorMode ? "text-slate-300" : "text-gray-800"}`}
      >
        {notificationData?.title || "Title"}
      </h1>

      <div className="flex gap-4 items-center ">
        <p
          className={`font-extrabold ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Start :
        </p>
        <p
          className={`font-extrabold text-md bg-clip-text ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          {moment(notificationData?.start).format("D MMM YYYY h:mm A") ||
            `${new Date.now()}`}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <p
          className={`font-extrabold ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          End :
        </p>
        <p
          className={`font-extrabold text-md bg-clip-text ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          {moment(notificationData?.end).format("D MMM YYYY h:mm A") ||
            `${new Date.now()}`}
        </p>
      </div>

      <div>
        <h2
          className={`text-xl ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Description
        </h2>
        <p
          className={`text-xl ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          {notificationData?.description || "description"}
        </p>
      </div>
    </div>
  );
};

export default NotifyModal;

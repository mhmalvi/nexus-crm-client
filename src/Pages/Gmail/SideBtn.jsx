import React from "react";
import { useSelector } from "react-redux";
import {
  selectMailSidebarIsOpen,
} from "./features/mailSlice";

const SideBtn = ({ title, icon }) => {
  const isMailSidebarOpen = useSelector(selectMailSidebarIsOpen);
  return (
    <div className={`text-gray-600 flex items-center gap-2 ${isMailSidebarOpen? "justify-center": ""} `}>
      {icon}
      <p
        title={title}
        className={`font-semibold my-auto ${
          isMailSidebarOpen ? "hidden" : "block"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default SideBtn;

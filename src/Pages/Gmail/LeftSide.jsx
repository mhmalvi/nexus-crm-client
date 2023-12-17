import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaInbox, FaStar } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  closeMessageBox,
  openMessageBox,
  selectSendMessageIsOpen,
  selectMailSidebarIsOpen,
} from "./features/mailSlice";
import SideBtn from "./SideBtn";

const LeftSide = () => {
  const dispatch = useDispatch();
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  const isMailSidebarOpen = useSelector(selectMailSidebarIsOpen);

  const buttons = [
    { icon: <FaInbox className="w-[1.7rem]  h-[1.7rem]" />, title: "Inbox" },
    { icon: <FaStar className="w-[1.7rem]  h-[1.7rem]" />, title: "Starred" },
    {
      icon: <MdLabelImportant className="w-[1.7rem]  h-[1.7rem]" />,
      title: "Important",
    },
    { icon: <FaInbox className="w-[1.7rem]  h-[1.7rem]" />, title: "Draft" },
    { icon: <FaStar className="w-[1.7rem]  h-[1.7rem]" />, title: "Favorite" },
    {
      icon: <MdLabelImportant className="w-[1.7rem]  h-[1.7rem]" />,
      title: "Sent",
    },
    { icon: <FaInbox className="w-[1.7rem]  h-[1.7rem]" />, title: "Inbox" },
    { icon: <FaStar className="w-[1.7rem]  h-[1.7rem]" />, title: "Favorite" },
    {
      icon: <MdLabelImportant className="w-[1.7rem]  h-[1.7rem]" />,
      title: "Important",
    },
    { icon: <FaInbox className="w-[1.7rem]  h-[1.7rem]" />, title: "Inbox" },
    { icon: <FaStar className="w-[1.7rem]  h-[1.7rem]" />, title: "Favorite" },
    {
      icon: <MdLabelImportant className="w-[1.7rem]  h-[1.7rem]" />,
      title: "Important",
    },
  ];
  return (
    <div
    >
      {/* <Compose/> */}
      <div
        className="lg:block p-4 sticky top-20 h-full"
      >
        {/* Write Message */}
        <div
          onClick={() => {
            dispatch(isMessageOpen ? closeMessageBox() : openMessageBox());
          }}
          className="flex items-center justify-center rounded-2xl h-14 shadow-sm  shadow-gray-600 cursor-pointer px-3"
        >
          <BsPencilSquare className="w-5 h-5 mr-2" />
          <p className={`my-auto ${isMailSidebarOpen ? "hidden" : "block"}`}>Compose</p>
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-6">
          {buttons.map((button) => (
            <SideBtn icon={button.icon} title={button.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

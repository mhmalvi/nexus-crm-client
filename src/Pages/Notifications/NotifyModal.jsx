import React, { useState } from "react";
import { Button, Modal } from "antd";
import moment from "moment";
const NotifyModal = ({ isNotifyOpen, setIsNotifyOpen, notificationData }) => {
  console.log("the notifify data: ", notificationData);
  console.log("isNotifyOpen: ", isNotifyOpen);

  const handleOk = () => {
    setIsNotifyOpen(false);
  };

  const handleCancel = () => {
    setIsNotifyOpen(false);
  };
  return (
    <div className="bg-gradient-to-r from-[#56ab2f] to-[#a8e063]">
      <Modal
        title={<div className="flex justify-center items-center ">
          <p className="font-extrabold text-[35px]  text-[#56b0b0]" style={{paddingBottom:"15px", borderBottomStyle: "solid", borderBottomWidth: "3px", width:"fit-content"}}>Task Details</p>
        </div>}
        open={isNotifyOpen}
        visible={isNotifyOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="font-['Helvetica', 'Arial', 'sans-serif'] tracking-wider">
          
            
          <h1 style={{}} className="mt-[-20px] text-[35px] text-[#0fcece] font-extrabold">{notificationData?.title || "Title"}</h1>
          
          
          <div className="mt-2 mb-6">
            <div className="flex gap-6 items-center text-[19px]">
              <p className="font-extrabold text-[#56b0b0]">Start : </p>
              <p className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-[#56ab2f] to-[#a8e063]">{moment(notificationData?.start).format("D MMM YYYY h:mm A") || `${new Date.now()}`}</p>
            </div>
            <div className="flex gap-6 items-center text-[19px]">
              <p className="font-extrabold text-[#56b0b0]"><span className="ml-[12px]">End</span> : </p>
              <p className="font-extrabold text-transparent text-md bg-clip-text bg-gradient-to-r from-[#5375e4] to-[#b06ab4]">{moment(notificationData?.end).format("D MMM YYYY h:mm A") || `${new Date.now()}`}</p>
            </div>
          </div>
          <div className="my-6">
            <h2 className=" font-extrabold text-[#5baa60] my-3 text-[21px]">Description</h2>
            <p className="font-bold text-[#9a9896] my-3 text-[20px]">{notificationData?.description || "description"}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotifyModal;

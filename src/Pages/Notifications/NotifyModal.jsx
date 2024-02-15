import React from "react";
import { Modal } from "antd";
import moment from "moment";
const NotifyModal = ({ isNotifyOpen, setIsNotifyOpen, notificationData }) => {
  const handleOk = () => {
    setIsNotifyOpen(false);

  };

  const handleCancel = () => {
    setIsNotifyOpen(false);
  };
  return (
    <Modal
      title={
        <div className="flex justify-center items-center">
          <p className="text-2xl text-white">Task Details</p>
        </div>
      }
      open={isNotifyOpen}
      visible={isNotifyOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        style:{
          backgroundColor:"#238cea",
          borderRadius: "8px"
        }
      }}
      cancelButtonProps={{
        style:{
          backgroundColor:"#fff",
          borderRadius: "8px"
        }
      }}
      className="NotificationModal font-[Poppins]"
    >
      <div className="flex flex-col justify-around items-center">
        <h1 className="text-xl text-[#ffa500]">
          {notificationData?.title || "Title"}
        </h1>
        <div>
          <div className="flex gap-6 items-center text-[19px]">
            <p className="font-extrabold text-[#ffa500]">Start : </p>
            <p className="font-extrabold text-white text-md bg-clip-text">
              {moment(notificationData?.start).format("D MMM YYYY h:mm A") ||
                `${new Date.now()}`}
            </p>
          </div>
          <div className="flex gap-6 items-center text-[19px]">
            <p className="font-extrabold text-[#ffa500]">
              <span className="ml-[12px]">End</span> :{" "}
            </p>
            <p className="font-extrabold text-white text-md bg-clip-text">
              {moment(notificationData?.end).format("D MMM YYYY h:mm A") ||
                `${new Date.now()}`}
            </p>
          </div>
        </div>
        <div>
          <h2 className=" font-semibold text-[#ffa500] text-xl">Description</h2>
          <p className="font-normal text-white text-base">
            {notificationData?.description || "description"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default NotifyModal;

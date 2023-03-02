import React, { useState } from "react";
/* import { Modal } from "antd"; */

const Email = ({ emailId, expeditor, messageTitle, message, timestamp }) => {
/*   const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }; */
  return (
    <>
      <div
        key={emailId}
        /* onClick={showModal} */
        className="flex justify-between border-b py-1.5 px-6 bg-gray-100"
      >
        <p className="w-[5rem] font-semibold"> {expeditor}</p>
        <div className="flex items-center w-[16rem] sm:w-[30rem] truncate   lg:w-[40rem]">
          <p className="font-semibold  ">{messageTitle} -</p>
          <p className="pl-1 text-gray-500 truncate"> {message}</p>
        </div>

        <p className="text-gray-500 w-[6rem] text-end">
          {timestamp?.split("G", 1)}
        </p>
      </div>
{/*       <Modal
        className=""
        title={false}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
};

export default Email;

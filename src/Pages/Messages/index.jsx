import { Modal } from "antd";
import Icons from "../../Components/Shared/Icons";
// import React from "react";

const Message = ({ toggleMessage, setToggleMessage }) => {
  return (
    // <Modal
    //   title='20px to Top'
    //   style={{
    //     top: 20,
    //     left: -160,
    //   }}
    //   visible={toggleMessage}
    //   onOk={() => setToggleMessage(false)}
    //   onCancel={() => setToggleMessage(false)}
    // >
    //   <p>some contents...</p>
    //   <p>some contents...</p>
    //   <p>some contents...</p>
    // </Modal>

    <div
      className='fixed top-28 -mt-2 px-4 pt-13 pb-4 shadow bg-white'
      style={{
        width: "341px",
        left: "300px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <h1 className='text-xl leading-8 font-poppins font-semibold'>
          Massage
        </h1>
      </div>

      <div className='mt-7 pt-0.5'>
        <div className='flex justify-between items-start'>
          <h1 className='text-lg leading-7 font-poppins font-semibold'>
            Friends Reunion
          </h1>
          {/* Date & Time */}
          <div>
            <span
              className='font-medium text-opacity-50 leading-4 mr-1.5'
              style={{
                fontSize: "10px",
              }}
            >
              5:25pm
            </span>
            <span
              className='font-medium text-opacity-50 leading-4'
              style={{
                fontSize: "10px",
              }}
            >
              01.01.11
            </span>
          </div>
        </div>
        <div className='flex justify-between items-start'>
          <div>
            <p className='text-sm leading-6 font-medium font-poppins mb-0'>
              Hi Guys, Wassup!
            </p>
          </div>
          <div>
            <Icons.Read className='text-black text-opacity-25' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

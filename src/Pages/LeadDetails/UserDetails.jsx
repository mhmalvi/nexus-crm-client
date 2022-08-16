import { Modal } from "antd";
import React, { useState } from "react";
import ReactStars from "react-stars";
import Icons from "../../Components/Shared/Icons";

const UserDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="mx-6">
      <div>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Davidov Artur
        </h1>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          #659652
        </h1>
      </div>
      <div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          // isHalf={true}
          emptyIcon={<Icons.Star />}
          half={false}
          fullIcon={<Icons.Star />}
          color1="#E9E9E9"
          color2="#8C64D2"
        />
      </div>

      {/* User info */}
      <div className="mt-5">
        <div>
          <h4 className="text-lg leading-6 font-poppins font-semibold text-black text-opacity-80">
            Details
          </h4>
          <hr />
        </div>
        <div className="font-normal text-base leading-6 font-poppins flex items-center mt-3.5">
          <div>
            <span>Contact:&nbsp;</span>
            <span>01756414858</span>
          </div>

          {/* QR Generator */}
          <div className="ml-2">
            <Icons.QR
              className="w-4 cursor-pointer"
              onClick={showModal}
              title="Open QR Code"
            />
            <Modal
              visible={isModalVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                className="w-7/12 mx-auto py-18"
                src="https://qrcode.tec-it.com/API/QRCode?data=tel%3a+8801756414858&backcolor=%23ffffff"
                alt=""
              />
            </Modal>
          </div>
        </div>
        <div className="font-normal text-base leading-6 font-poppins flex items-center mt-2">
          <span>Email:&nbsp;</span>
          <span>art89@google.com</span>
        </div>
        <div className="font-normal text-base leading-6 font-poppins flex items-center mt-2">
          <span>Courses:&nbsp;</span>
          <span>Fashion Designing</span>
        </div>
        <div className="font-normal text-base leading-6 font-poppins flex items-center mt-2">
          <span>Country:&nbsp;</span>
          <span>Russia</span>
        </div>
        <div className="ml-4 mt-5">
          <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
            Edit
          </button>
          <button className="w-32 px-1.5 py-2 border border-red-500 text-red-500 ml-4 text-xs font-medium leading-4 font-poppins rounded-md">
            Suspend
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-12 pt-0.5">
        <div className="border-b mb-0 flex justify-between items-center">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
            Comment
          </h1>
          <Icons.PenUnderLine className="cursor-pointer" />
        </div>
        <div className="w-80 mt-5">
          <h1 className="text-base leading-6 font-semibold font-poppins text-black text-opacity-75">
            Welcome to OnlineConversion com. Convert just about anything to
            anything else. Thousands of units, and millions of conversions.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

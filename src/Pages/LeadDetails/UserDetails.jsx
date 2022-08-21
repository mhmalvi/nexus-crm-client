import { Modal } from "antd";
import React, { useState } from "react";
import ReactStars from "react-stars";
import Icons from "../../Components/Shared/Icons";

const UserDetails = () => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [addSealsman, setAddSealsman] = useState(false);
  const [toggleChcekList, setToggleChcekList] = useState(false);
  const [closeSealsman, setCloseSealsman] = useState(true);
  const [rating, setRating] = useState();

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleAddSealsman = () => {
    setAddSealsman(false);
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    setToggleChcekList(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="mx-6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl leading-8 font-poppins font-semibold mb-0">
            Davidov Artur
          </h1>
          <div className="relative">
            <Icons.People
              className="cursor-pointer"
              onClick={() => {
                !closeSealsman && setAddSealsman(true);
              }}
            />
            {closeSealsman && (
              <span
                className="absolute cursor-pointer -top-2 -right-2.5 text-xs px-1.5 border border-white pb-0.5 rounded-full bg-black text-white m-0"
                onClick={() => {
                  setCloseSealsman(!closeSealsman);
                }}
              >
                x
              </span>
            )}
          </div>
          <Modal
            visible={addSealsman}
            footer={null}
            onCancel={handleAddSealsman}
          >
            <div>
              <h1 className="font-poppins text-xl font-extrabold">
                Seals Team
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center py-6">
              <div className="flex items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>
              <div className="flex items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>
              <div className="flex items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>
              <div className="flex items-center my-2 cursor-pointer">
                <Icons.PeopleRounded />
                <div className="ml-2 text-lg font-poppins font-semibold">
                  Samin Hasan
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <h1 className="text-xl leading-8 font-poppins font-semibold mt-2">
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
        <div className="flex pt-4 pb-2">
          <div className="mt-1">
            <img
              className="w-16"
              src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${"+8801756414858"}&backcolor=%23ffffff`}
              alt=""
            />
            <div
              className="font-poppins my-2 text-center font-medium"
              style={{
                fontSize: "10px",
              }}
            >
              Scan To Call
            </div>
          </div>
          <div className="ml-5">
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins">
              <span>Contact:&nbsp;</span>
              <span>01756414858</span>
            </div>

            {/* QR Generator */}
            {/* <div className="ml-2">
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
              </div> */}
            {/* </div> */}
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Email:&nbsp;</span>
              <span>art89@google.com</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Courses:&nbsp;</span>
              <span className="whitespace-nowrap">Fashion Designing</span>
            </div>
            <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
              <span>Country:&nbsp;</span>
              <span>Russia</span>
            </div>
          </div>
        </div>
        <div className="xl:ml-4 mt-5 flex">
          <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
            Edit
          </button>
          <button className="w-32 px-1.5 py-2 border border-red-500 text-red-500 ml-4 text-xs font-medium leading-4 font-poppins rounded-md">
            Suspend
          </button>
        </div>

        {/* --------------- If user wants to Pay------------- */}
        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Application Form
            </h1>
          </div>
          <div className="xl:ml-4 mt-5 flex">
            <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
              View
            </button>
            <button className="w-32 px-1.5 py-2 border border-black text-black ml-4 text-xs font-medium leading-4 font-poppins rounded-md">
              Edit
            </button>
          </div>
        </div>

        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Payment
            </h1>
          </div>
          <div className="ml-4 mt-5">
            <button className="w-32 px-1.5 py-2 bg-green-500 text-white text-xs font-medium leading-4 font-poppins rounded-md">
              Pay
            </button>
          </div>
        </div>

        <div className="mt-7.5">
          <div>
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
              Chek list
            </h1>
          </div>
          <Modal
            visible={toggleChcekList}
            footer={null}
            onCancel={handleCancel}
          >
            <div>Check List</div>
          </Modal>
          <div className="ml-4 mt-5">
            <button
              className="w-32 px-1.5 py-2 border border-black text-black text-xs font-medium leading-4 font-poppins rounded-md"
              onClick={() => setToggleChcekList(true)}
            >
              View
            </button>
          </div>
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
        <div className="2xl:w-84 mt-5 ">
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

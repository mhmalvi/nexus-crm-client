import { Dropdown, Menu, Space } from "antd";
import React from "react";
import Icons from "../../Components/Shared/Icons";

const LeadStatus = ({ leadStatus }) => {
  const menu = (
    <Menu
      className="w-9"
      items={[
        {
          label: <div>2</div>,
          key: "1",
        },
        {
          label: <div>3</div>,
          key: "3",
        },
        {
          label: <div>4</div>,
          key: "4",
        },
      ]}
    />
  );

  return (
    <div
      className="pr-6 border-r"
      style={{
        width: "22.82rem",
      }}
    >
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          User Activity Timeline
        </h1>
      </div>
      <div className="flex items-center mt-5">
        <button
          className="py-1 bg-blue-500 text-white rounded-md text-base leading-6 font-semibold font-poppins"
          style={{
            width: "114px",
          }}
        >
          Called
        </button>
        <div>
          <Dropdown
            className="w-9 flex justify-center items-center cursor-pointer py-1.5 ml-2 bg-black text-white rounded-lg shadow-md"
            overlay={menu}
            trigger={["click"]}
          >
            <Space>1</Space>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center mt-8 ">
        <div className="w-full flex justify-between">
          <div className="flex">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.New_Lead ? "bg-green-500" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.New_Lead
                      ? "bg-green-500"
                      : "bg-gray-300 animate-custom-ping"
                  }`}
                ></div>
              </div>
              <div className="">
                <hr className="rotate-90 w-11 mt-7" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                New Lead
              </h6>
              <h6 className="mb-0 text-sm font-semibold font-poppins leading-6 mt-4">
                #course code
              </h6>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>

        <div className="w-full flex justify-between mt-7">
          <div className="flex">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.Skilled ? "bg-orange-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.Skilled
                      ? "bg-orange-400"
                      : "bg-gray-300 animate-custom-ping"
                  }`}
                ></div>
              </div>
              <div className="">
                <hr className="rotate-90 w-11 mt-7" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Skilled
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                Skilled / Un-skilled
              </h6>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-7">
          <div className="flex">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.Called ? "bg-blue-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.Called
                      ? "bg-blue-400"
                      : "bg-gray-300 animate-custom-ping"
                  }`}
                ></div>
              </div>
              <div className="">
                <hr className="rotate-90 w-11 mt-7" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Called
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                2nd Call
              </h6>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-7 ">
          <div className="flex -ml-3">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.Paid ? "bg-teal-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.Paid ? "bg-teal-400" : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <div>
                <hr className="rotate-90 w-17 mt-10" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Paid
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                30% paid
              </h6>
              <h6 className="mb-0 text-sm font-semibold font-poppins leading-6">
                Bank
              </h6>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-7 ">
          <div className="flex -ml-3">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.Verified ? "bg-violet-500" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.Verified
                      ? "bg-violet-500"
                      : "bg-gray-300 animate-custom-ping"
                  }`}
                ></div>
              </div>
              <div>
                <hr className="rotate-90 w-17 mt-10" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Verified
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                Verified / Un-verified
              </h6>
              <div className="flex mt-1">
                <Icons.PDF />
                <h6 className="mb-0 ml-1.5 text-sm font-semibold font-poppins leading-5">
                  Files
                </h6>
              </div>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-7">
          <div className="flex -ml-3">
            <div className="flex flex-col items-center">
              <div
                className={`cursor-pointer w-5 h-5 rounded-full ${
                  leadStatus.Completed ? "bg-red-500" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus.Completed
                      ? "bg-red-500"
                      : "bg-gray-300 animate-custom-ping"
                  }`}
                ></div>
              </div>
              <div>
                <hr className="rotate-90 w-17 mt-10" />
              </div>
            </div>
            <div className="ml-3">
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Completed
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                Certificate provide
              </h6>
              <div className="flex mt-1">
                <Icons.PDF />
                <h6 className="mb-0 ml-1.5 text-sm font-semibold font-poppins leading-5">
                  Files
                </h6>
              </div>
            </div>
          </div>
          <div>
            <p>02.08.22</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;

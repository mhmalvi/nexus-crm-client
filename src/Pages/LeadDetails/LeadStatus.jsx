import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import Icons from "../../Components/Shared/Icons";

// ---Default Values----
const statusData = [
  "New Lead",
  "Skilled",
  "Called",
  "Paid",
  "Verified",
  "Completed",
];

const LeadStatus = ({ leadStatus }) => {
  const [activeStatus, setActiveStatus] = useState(
    Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
  );
  const [leadStatusColor, setLeadStatusColor] = useState("color-green");
  const [callCount, setCallCount] = useState(1);

  const statusColor = [
    {
      lable: "New Lead",
      color: "#34C759",
      class: "color-green",
    },
    {
      lable: "Skilled",
      color: "#FF9500",
      class: "color-orange",
    },
    {
      lable: "Called",
      color: "#4F8DEA",
      class: "color-blue",
    },
    {
      lable: "Paid",
      color: "#17CDD9",
      class: "color-teal",
    },
    {
      lable: "Verified",
      color: "#7037FF",
      class: "color-violet",
    },
    {
      lable: "Completed",
      color: "#FF0000",
      class: "color-red",
    },
  ];

  useEffect(() => {
    setLeadStatusColor(
      statusColor.find(
        (i) =>
          i.lable ===
          statusData[
            Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
          ]
      ).class
    );
    setActiveStatus(
      statusData[Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1]
    );
  }, []);

  const handleProvinceChange = (value) => {
    setLeadStatusColor(statusColor.find((i) => i.lable === value)?.class);
    leadStatus[value] = true;
    setActiveStatus(value);
  };

  return (
    <div className="min-h-full pr-6 border-r">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          User Activity Timeline
        </h1>
      </div>
      <div className="flex items-center mt-5">
        <Select
          className={`lead_status ${leadStatusColor}`}
          defaultValue={
            statusData[
              Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
            ]
          }
          style={{
            width: "114px",
          }}
          onChange={handleProvinceChange}
        >
          {statusData.map((province) => (
            <Option
              style={{
                color: statusColor.find((i) => i.lable === province)?.color,
                padding: "8px 16px",
              }}
              key={province}
            >
              {province}
            </Option>
          ))}
        </Select>

        {activeStatus === "Called" && (
          <div className="lead_status ml-3 p-1.5 bg-gray-100 rounded-md flex items-center border">
            <div>
              <h1 className="w-6 text-center mb-0 text-sm leading-6 font-medium font-poppins">
                {callCount}
              </h1>
            </div>
            <div className="ml-3 mb-0 flex justify-center items-center">
              <button
                className="px-1.5 py-0.5 rounded-md bg-black text-white"
                onClick={() => setCallCount(callCount + 1)}
              >
                <Icons.PhoneVolume className="w-3 text-white py-1" />
              </button>
            </div>
          </div>
        )}

        {activeStatus === "Paid" && (
          <div className="ml-3 px-2 py-0.5 bg-gray-100 rounded-md flex items-center border">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-50">
              %
            </span>
            <input
              className="w-16 text-sm leading-8 font-medium font-poppins outline-none bg-transparent"
              type="text"
              name=""
              placeholder="Discount"
              id=""
            />
          </div>
        )}

        {(activeStatus === "Called" || activeStatus === "Paid") && (
          <div className="ml-3 px-2 py-0.5 bg-gray-100 rounded-md flex items-center border">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-50">
              $
            </span>
            <input
              className="w-14 text-sm leading-8 font-medium font-poppins outline-none bg-transparent"
              type="text"
              name=""
              placeholder="Amount"
              id=""
            />
          </div>
        )}
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
                    leadStatus["New Lead"]
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
                  leadStatus["Skilled"] ? "bg-orange-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus["Skilled"]
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
                {leadStatus["Skilled"] ? (
                  <span>Eligible</span>
                ) : (
                  <span>Non-eligible</span>
                )}
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
                  leadStatus["Called"] ? "bg-blue-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus["Called"]
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
                No. of Calls: {callCount}
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
                  leadStatus["Paid"] ? "bg-teal-400" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus["Paid"]
                      ? "bg-teal-400"
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
                  leadStatus["Verified"] ? "bg-violet-500" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus["Verified"]
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
                {leadStatus["Verified"] ? (
                  <span>Verified</span>
                ) : (
                  <span>Un-verified</span>
                )}
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
                  leadStatus["Completed"] ? "bg-red-500" : "bg-gray-300"
                } bg-opacity-20 flex justify-center items-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    leadStatus["Completed"]
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
                Certificate Provided
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

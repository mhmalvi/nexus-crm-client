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

const subStatusData = {
  "New Lead": [],
  Skilled: [],
  Called: ["1st", "2nd", "3rd"],
  Paid: ["30%", "70%", "100%"],
  Verified: [],
  Completed: [],
};

const LeadStatus = ({ leadStatus }) => {
  const [status, setStatus] = useState(
    subStatusData[
      statusData[Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1]
    ]
  );
  const [leadStatusColor, setLeadStatusColor] = useState("color-green");
  const [subStatus, setSubStatus] = useState(subStatusData[statusData[0]][0]);

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
  }, []);

  const handleProvinceChange = (value) => {
    setStatus(subStatusData[value]);
    setSubStatus(subStatusData[value][0]);
    setLeadStatusColor(statusColor.find((i) => i.lable === value)?.class);
    leadStatus[value] = true;
  };

  const onSecondCityChange = (value) => {
    setSubStatus(value);
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
                backgroundColor: statusColor.find((i) => i.lable === province)
                  ?.color,
                color: "#ffffff",
                padding: "8px 16px",
              }}
              key={province}
            >
              {province}
            </Option>
          ))}
        </Select>

        {status?.length > 0 && (
          <Select
            className="sub_lead_status"
            style={{
              width: 60,
            }}
            value={subStatus}
            onChange={onSecondCityChange}
          >
            {status.map((status) => (
              <Option key={status}>{status}</Option>
            ))}
          </Select>
        )}

        {leadStatus["Paid"] && (
          <div className=" ml-3 px-1.5 py-1 bg-gray-100 rounded-md flex items-center">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-50">
              $
            </span>
            <input
              className="w-14 text-sm leading-8 font-medium font-poppins outline-none bg-transparent"
              type="email"
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
                Eligible / Non-eligible
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

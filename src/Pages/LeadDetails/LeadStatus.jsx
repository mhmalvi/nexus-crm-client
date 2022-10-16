import { Dropdown, Menu, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleLeadStatusUpdate } from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";

// ----Default Values----
const LeadStatus = ({
  leadStatus,
  leadDetails,
  statusDetails,
  syncDetails,
  setSyncDetails,
}) => {
  const statusData = [
    "New Lead",
    "Skilled",
    "Called",
    "Paid",
    "Verified",
    "Completed",
  ];

  const userDetails = useSelector((state) => state?.user);

  const [activeStatus, setActiveStatus] = useState(
    Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
  );
  const [activeStatusTitle, setActiveStatusTitle] = useState();
  const [leadStatusColor, setLeadStatusColor] = useState("color-green");
  const [callCount, setCallCount] = useState(1);
  const [amount, setAmount] = useState();

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
    // if (Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1===1)
    // document.getElementsByClassName(
    //   "ant-select-selection-placeholder"
    // ).innerText =
    //   statusData[
    //     Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
    //   ];
    setActiveStatusTitle(
      statusData[Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1]
    );
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
  }, [leadStatus]);

  // const handleProvinceChange = (value) => {
  //   setLeadStatusColor(statusColor.find((i) => i.lable === value)?.class);
  //   leadStatus[value] = true;
  //   setActiveStatus(value);
  // };

  const onStatusChange = async ({ key }) => {
    // console.log(statusData[key]);
    leadStatus[statusData[key]] = true;
    setActiveStatusTitle(statusData[key]);
    setLeadStatusColor(
      statusColor.find((i) => i.lable === statusData[key])?.class
    );

    const statusUpdateResponse = await handleLeadStatusUpdate(
      leadDetails?.lead_id,
      parseInt(key) + 1,
      userDetails?.userInfo?.userId
    );

    if (statusUpdateResponse?.status) {
      message.success("Status Updated Successfully");
      setSyncDetails(!syncDetails);
    }
  };

  const handleStatusUpdateTime = (statusId) => {
    const status = statusDetails?.find(
      (status) => status?.lead_status === statusId
    )?.updated_at;

    if (status) {
      const customizedTime = status?.replace("T", " ")?.slice(0, 19);
      // setSyncDetails(!syncDetails);
      return customizedTime;
    } else {
      // setSyncDetails(!syncDetails);
      return "No Yet";
    }
  };

  // console.log("StatusDetails", statusDetails);
  // console.log(
  //   "leadStatusDetails",
  //   statusDetails?.find((status) => status?.lead_status === 5)?.updated_at
  // );

  const menu = (
    <Menu
      className="text-center text-base font-semibold"
      onClick={onStatusChange}
      items={[
        {
          label: "New Lead",
          key: 0,
        },
        {
          label: "Skilled",
          key: 1,
        },
        {
          label: "Called",
          key: 2,
        },
        {
          label: "Paid",
          key: 3,
        },
        {
          label: "Verified",
          key: 4,
        },
        {
          label: "Completed",
          key: 5,
        },
      ]}
    />
  );

  return (
    <div className="min-h-full pr-6 border-r">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          User Activity Timeline
        </h1>
      </div>
      <div className="lead_status flex items-center mt-5">
        {/* <Select
          id="status_title"
          className={`lead_status ${leadStatusColor}`}
          defaultValue={
            `${
              statusData[
                Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
              ]
            }`
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
        </Select> */}

        <Dropdown
          className={`cursor-pointer ${leadStatusColor}`}
          overlay={menu}
          trigger="click"
        >
          <div onClick={(e) => e.preventDefault()}>
            <Space>{activeStatusTitle}</Space>
          </div>
        </Dropdown>

        {activeStatusTitle === "Called" && (
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

        {/* {activeStatus === "Paid" && (
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
        )} */}

        {/* {(activeStatus === "Called" || activeStatus === "Paid") && ( */}
        {(activeStatusTitle === "Called" || activeStatusTitle === "Paid") && (
          <div className="ml-3 px-2 py-0.5 bg-gray-100 rounded-md flex items-center border">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-50">
              $
            </span>
            <input
              className="w-14 text-sm leading-8 font-medium font-poppins outline-none bg-transparent"
              type="text"
              name=""
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              id=""
            />
          </div>
        )}

        {activeStatusTitle === "Called" && (
          <div className="ml-3 px-2 py-1.5 rounded-md flex items-center border border-black border-opacity-40">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-90">
              Payable :
            </span>
            <span className="mr-0.5 font-poppins font-medium text-red-600 text-opacity-90">
              $ {amount > 0 ? amount : "Not Fixed Yet"}
            </span>
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
                # {leadDetails?.course_code}
              </h6>
            </div>
          </div>
          <div>
            <p>{handleStatusUpdateTime(1)}</p>
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
            <p>{handleStatusUpdateTime(2)}</p>
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
            <p>{handleStatusUpdateTime(3)}</p>
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
            <div>
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                Paid
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                0% paid
              </h6>
              <h6 className="mb-0 text-sm font-semibold font-poppins leading-6">
                Bank
              </h6>
            </div>
          </div>
          <div>
            <p>{handleStatusUpdateTime(4)}</p>
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
            <div>
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
            <p>{handleStatusUpdateTime(5)}</p>
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
            <div>
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
            <p>{handleStatusUpdateTime(6)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;

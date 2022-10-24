import { Dropdown, Menu, message, Space, DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleAddAmount,
  handleAddCall,
  handleLeadDetailsUpdate,
  handleLeadStatusUpdate,
} from "../../Components/services/leads";
import { handleRegistration } from "../../Components/services/auth";
import Icons from "../../Components/Shared/Icons";

// ----Default Values----
const LeadStatus = ({
  leadStatus,
  leadDetails,
  syncDetails,
  setSyncDetails,
  statusDateTime,
}) => {
  const statusData = [
    "Suspended",
    "New Lead",
    "Skilled",
    "Called",
    "Paid",
    "Verified",
    "Completed",
  ];

  const userDetails = useSelector((state) => state?.user);

  // const [activeStatus, setActiveStatus] = useState(
  //   Object.values(leadStatus).reduce((a, item) => a + item, 0) - 1
  // );
  const [activeStatusTitle, setActiveStatusTitle] = useState();
  const [leadStatusColor, setLeadStatusColor] = useState("color-green");
  // const [callCount, setCallCount] = useState(0);
  // const [leadCallHistory, setLeadCallHistory] = useState([]);
  const [callStart, setCallStart] = useState("Start Time");
  const [callEnd, setCallEnd] = useState("End Time");
  const [callRemark, setCallRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [isCallDetailsOpen, setIsCallDetailsOpen] = useState(false);
  const [isCallHistoryOpen, setIsCallHistoryOpen] = useState(false);
  const [isAmountHistoryOpen, setIsAmountHistoryOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  const statusColor = [
    {
      lable: "Suspended",
      color: "#000000",
      class: "color-black",
    },
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
    setActiveStatusTitle(
      leadDetails?.leadDetails?.lead_details_status === 0
        ? "Suspended"
        : statusData[Object.values(leadStatus).reduce((a, item) => a + item, 0)]
    );
    setLeadStatusColor(
      leadDetails?.leadDetails?.lead_details_status === 0
        ? "color-black"
        : statusColor.find(
            (i) =>
              i.lable ===
              statusData[
                Object.values(leadStatus).reduce((a, item) => a + item, 0)
              ]
          ).class
    );

    // setAmount(
    //   leadDetails?.leadAmountHistory.length > 0
    //     ? leadDetails?.leadAmountHistory[
    //         leadDetails?.leadAmountHistory?.length - 1
    //       ]?.amount
    //     : ""
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadStatus, leadDetails, statusData]);

  const onStatusChange = async ({ key }) => {
    leadStatus[statusData[key]] = true;
    setActiveStatusTitle(statusData[key]);
    setLeadStatusColor(
      statusColor.find((i) => i.lable === statusData[key])?.class
    );

    const statusUpdateResponse = await handleLeadStatusUpdate(
      leadDetails?.leadDetails?.lead_id,
      parseInt(key) + 1,
      userDetails?.userInfo?.user_id
    );

    if (statusUpdateResponse?.status) {
      message.success("Status Updated Successfully");
      setSyncDetails(!syncDetails);
    }
  };

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

  // Handeling Call Start and End functionality
  const onCallStartChange = (value, dateString) => {
    setCallStart(dateString);
  };

  const onCallStart = (value) => {
    setCallStart(value._d.toString().slice(4, 24));
  };

  const onCallEndChange = (value, dateString) => {
    setCallEnd(dateString);
  };

  const onCallEnd = (value) => {
    setCallEnd(value._d.toString().slice(4, 24));
  };

  const showCallDetailsModal = () => {
    setIsCallDetailsOpen(true);
  };

  const handleCallDetails = async () => {
    const response = await handleAddCall(
      leadDetails?.leadDetails?.lead_id,
      callStart,
      callEnd,
      callRemark
    );
    if (response) {
      setCallStart("Start Time");
      setCallEnd("End Time");
      setCallRemark("");
      setSyncDetails(!syncDetails);
      message.success("Call Details Added Successfully");
    }
    setIsCallDetailsOpen(false);
  };

  const handleAddLeadAmount = async (e) => {
    e.preventDefault();

    if (amount.length) {
      const response = await handleAddAmount(
        leadDetails?.leadDetails?.lead_id,
        parseInt(amount)
      );
      if (response) {
        setAmount("");
        setSyncDetails(!syncDetails);
        message.success("Amount Details Added Successfully");
      }
    }
  };

  console.log(leadDetails);
  console.log("leadStatus", leadStatus);

  const handleRegistrationReq = async () => {
    const registrationFormData = new FormData();

    registrationFormData.append(
      "email",
      leadDetails?.leadDetails?.student_email
    );
    registrationFormData.append("role_id", 3);
    registrationFormData.append(
      "contact_number",
      leadDetails?.leadDetails?.phone_number
    );
    registrationFormData.append(
      "full_name",
      leadDetails?.leadDetails?.full_name
    );
    registrationFormData.append(
      "qualification",
      leadDetails?.leadDetails?.form_data[6]?.values[0].replace("_", " ")
    );
    registrationFormData.append(
      "work_experiences",
      leadDetails?.leadDetails?.form_data[8]?.values[0].replace("_", " ")
    );
    registrationFormData.append(
      "location",
      leadDetails?.leadDetails?.work_location
    );

    const registrationResponse = await handleRegistration(registrationFormData);

    if (registrationResponse?.data?.status) {
      const leadUpdateResponse = await handleLeadDetailsUpdate(
        leadDetails?.leadDetails.lead_id,
        registrationResponse?.data?.data?.user_id
      );
      if (leadUpdateResponse?.status) {
        message.success("User Registered Successfully");
        setSyncDetails(!syncDetails);
      }
    } else {
      message.warning("Email Already Exist");
    }

    for (const value of registrationFormData.values()) {
      console.log(value);
    }
  };

  const handleCancel = () => {
    setIsCallDetailsOpen(false);
  };

  console.log("statusDateTime", statusDateTime);

  return (
    <div className="min-h-full pr-6 border-r">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          User Activity Timeline
        </h1>
      </div>
      <div className="lead_status flex flex-wrap items-center gap-y-3 mt-5">
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
          <div className="flex items-center">
            <div className="lead_status ml-3 p-1.5 bg-gray-100 rounded-md flex items-center border">
              <div>
                <h1 className="w-6 text-center mb-0 text-sm leading-6 font-medium font-poppins">
                  {leadDetails?.leadCallHistory?.length}
                </h1>
              </div>
              <div className="ml-3 mb-0 flex justify-center items-center">
                <button
                  className="px-1.5 py-0.5 rounded-md bg-black text-white"
                  onClick={showCallDetailsModal}
                >
                  <Icons.PhoneVolume className="w-3 text-white py-1" />
                </button>
              </div>
            </div>
            <div>
              <Icons.History
                className="w-5 mx-2 cursor-pointer"
                onClick={() => setIsCallHistoryOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Call Details Form */}
        <Modal
          visible={isCallDetailsOpen}
          onOk={handleCallDetails}
          onCancel={handleCancel}
          okText="Save"
        >
          <div>
            <div className="">
              <div className="font-poppins text-base font-semibold mb-6">
                Call Details
              </div>

              <div className="flex items-end mb-4">
                <div className="mr-4">
                  <h1 className="text-sm font-poppins">Duration:</h1>
                </div>
                <div className="flex items-start">
                  <Space
                    className=" border rounded-full text-base text-center py-1.5 bg-black text-white cursor-pointer font-poppins"
                    direction="vertical"
                    // size={12}
                    style={{
                      width: "10rem",
                    }}
                  >
                    <DatePicker
                      className="date-time-picker"
                      suffixIcon={callStart}
                      bordered={false}
                      showTime
                      onOk={onCallStart}
                      onChange={onCallStartChange}
                    />
                  </Space>

                  <div>
                    <span className="text-3xl font-semibold px-1 text-center">
                      -
                    </span>
                  </div>

                  <Space
                    className="border rounded-full text-base text-center py-1.5 bg-black text-white cursor-pointer font-poppins"
                    direction="vertical"
                    size={12}
                    style={{
                      width: "10rem",
                    }}
                  >
                    <DatePicker
                      className="date-time-picker"
                      suffixIcon={callEnd}
                      bordered={false}
                      showTime
                      onOk={onCallEnd}
                      onChange={onCallEndChange}
                    />
                  </Space>
                </div>
              </div>

              <div className="border-b flex justify-between items-center pb-1 mt-12 pt-0.5">
                <input
                  className="w-full font-poppins outline-none"
                  type="text"
                  placeholder="Write Remark"
                  name="remark"
                  id="remark"
                  value={callRemark}
                  onChange={(e) => setCallRemark(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* Call History Details */}
        <Modal
          visible={isCallHistoryOpen}
          onCancel={() => setIsCallHistoryOpen(false)}
          footer={false}
        >
          <div>
            <h1 className="font-poppins text-base font-semibold text-center pb-1 pt-4">
              Call History
            </h1>
          </div>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th className="w-16">No.</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Remark</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="">
            {leadDetails?.leadCallHistory?.length > 0 ? (
              <table
                className="custom-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  {leadDetails?.leadCallHistory.map((history, i) => (
                    <tr key={i}>
                      <td className="w-16">{i + 1}</td>
                      <td>{history.call_start_time}</td>
                      <td>{history.call_end_time}</td>
                      <td>{history.call_remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                <h1 className="text-xl font-light">No Call History</h1>
              </div>
            )}
          </div>
        </Modal>

        {/* {(activeStatus === "Called" || activeStatus === "Paid") && ( */}
        {(activeStatusTitle === "Called" || activeStatusTitle === "Paid") && (
          <div className="flex items-center">
            <form
              onSubmit={(e) => handleAddLeadAmount(e)}
              className="ml-3 px-2 py-0.5 bg-gray-100 rounded-md flex items-center border"
            >
              <span className="mr-0.5 font-poppins font-medium text-black text-opacity-50">
                $
              </span>
              <input
                className="w-14 text-sm leading-8 font-medium font-poppins outline-none bg-transparent"
                type="text"
                name=""
                defaultValue={
                  leadDetails?.leadAmountHistory[
                    leadDetails?.leadAmountHistory?.length - 1
                  ]?.amount
                }
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                id=""
              />
            </form>
            <div>
              <Icons.History
                className="w-5 mx-2 cursor-pointer"
                onClick={() => setIsAmountHistoryOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Amount History Details */}
        <Modal
          visible={isAmountHistoryOpen}
          onCancel={() => setIsAmountHistoryOpen(false)}
          footer={false}
        >
          <div>
            <h1 className="font-poppins text-base font-semibold text-center pb-1 pt-4">
              Amount History
            </h1>
          </div>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th className="w-16">No.</th>
                  <th>Date</th>
                  <th className="w-32">Amount</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="">
            {leadDetails?.leadAmountHistory?.length > 0 ? (
              <table
                className="custom-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  {leadDetails?.leadAmountHistory?.map((history, i) => (
                    <tr key={i}>
                      <td className="w-16">{i + 1}</td>
                      <td>
                        {history.created_at.replace("T", " ").slice(0, 19)}
                      </td>
                      <td className="w-32">${history.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                <h1 className="text-xl font-light">No Amount History</h1>
              </div>
            )}
          </div>
        </Modal>

        {activeStatusTitle === "Suspended" && (
          <div>
            <div className="ml-3">
              {new Date(statusDateTime["Suspended"]).toString().slice(0, 31)}
            </div>
          </div>
        )}

        {activeStatusTitle === "Called" &&
          (leadDetails?.leadDetails?.student_id === 0 ? (
            <div className="font-poppins">
              <button
                title="Register the user to this system"
                className="text-xs bg-black text-white px-3 py-2.5 rounded-lg ml-2"
                onClick={handleRegistrationReq}
              >
                Register
              </button>
            </div>
          ) : (
            <div>
              <button
                title="Register the user to this system"
                disabled
                className="text-xs bg-gray-200 cursor-not-allowed italic text-gray-500 px-3 py-2.5 rounded-lg ml-2"
                onClick={handleRegistrationReq}
              >
                Registered
              </button>
            </div>
          ))}

        {activeStatusTitle === "Called" && (
          <div className="ml-3 px-2 py-1.5 rounded-md flex items-center border border-black border-opacity-40">
            <span className="mr-0.5 font-poppins font-medium text-black text-opacity-90">
              Payable :
            </span>
            <span className="mr-0.5 font-poppins font-medium text-red-600 text-opacity-90">
              $
              {
                leadDetails?.leadAmountHistory[
                  leadDetails?.leadAmountHistory?.length - 1
                ]?.amount
              }
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
                # {leadDetails?.leadDetails?.course_code}
              </h6>
            </div>
          </div>
          <div>
            {leadDetails?.leadDetails?.lead_apply_date !== "Not Yet"
              ? new Date(leadDetails?.leadDetails?.lead_apply_date)
                  .toString()
                  .slice(0, 31)
              : "Not Yet"}
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
            {statusDateTime["Skilled"] !== "Not Yet"
              ? new Date(statusDateTime["Skilled"]).toString().slice(0, 31)
              : "Not Yet"}
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
                No. of Calls: {leadDetails?.leadCallHistory?.length}
              </h6>
            </div>
          </div>
          <div>
            {statusDateTime["Called"] !== "Not Yet"
              ? new Date(statusDateTime["Called"]).toString().slice(0, 31)
              : "Not Yet"}
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
            {statusDateTime["Paid"] !== "Not Yet"
              ? new Date(statusDateTime["Paid"]).toString().slice(0, 31)
              : "Not Yet"}
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
            <p>
              {statusDateTime["Verified"] !== "Not Yet"
                ? new Date(statusDateTime["Verified"]).toString().slice(0, 31)
                : "Not Yet"}
            </p>
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
            <p>
              {statusDateTime["Completed"] !== "Not Yet"
                ? new Date(statusDateTime["Completed"]).toString().slice(0, 31)
                : "Not Yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;

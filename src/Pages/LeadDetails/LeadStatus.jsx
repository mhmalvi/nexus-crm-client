import {
  DatePicker,
  Dropdown,
  Menu,
  message,
  Modal,
  Radio,
  Space,
  Tooltip,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleRegistration } from "../../Components/services/auth";
import {
  handleAddAmount,
  handleAddCall,
  handleCallResponseUpdate,
  handleLeadCertificatetDetailsUpdate,
  handleLeadStatusUpdate,
  handleLeadStudentDetailsUpdate,
} from "../../Components/services/leads";
import { handleConfirmRegistration } from "../../Components/services/mail";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../Components/services/utils";
import Icons from "../../Components/Shared/Icons";

// ----Default Values----
const LeadStatus = ({
  leadStatus,
  leadDetails,
  syncDetails,
  setSyncDetails,
  statusDateTime,
  paymentHistory,
  totalPaid,
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
  const [fileList, setFileList] = useState([]);
  const [activeStatusTitle, setActiveStatusTitle] = useState();
  const [leadStatusColor, setLeadStatusColor] = useState("color-green");
  const [callStart, setCallStart] = useState("Start Time");
  const [callEnd, setCallEnd] = useState("End Time");
  const [callRemark, setCallRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [isCallDetailsOpen, setIsCallDetailsOpen] = useState(false);
  const [isCallHistoryOpen, setIsCallHistoryOpen] = useState(false);
  const [isAmountHistoryOpen, setIsAmountHistoryOpen] = useState(false);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [certificate, setCertificate] = useState("");
  const [callResponse, setCallResponse] = useState();

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

  const tooltipMessages = {
    "New Lead": {
      message: "It's a new arrival",
    },
    Skilled: {
      message: "If the student is skilled enough",
    },
    Called: {
      message: "If you have communicated with the student",
    },
    Paid: {
      message: "If the student have paid any fee",
    },
    Verified: {
      message: "If the student's documents are verified",
    },
    Completed: {
      message: "If the student has completed the course and certificate issued",
    },
  };

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
    if (leadDetails?.leadDetails?.document_certificate_id) {
      (async () => {
        const fetchCertificateFIle = await handleFetchFile(
          leadDetails?.leadDetails?.document_certificate_id
        );

        setCertificate(
          process.env.REACT_APP_FILE_SERVER_URL +
            fetchCertificateFIle?.data?.[0]?.document_name
        );
      })();
    }
    if (leadDetails?.leadDetails?.lead_details_status >= 3) {
      console.log(
        leadDetails?.leadAllStatus?.filter(
          (status) => status?.lead_status === 3
        )?.[0]?.response
      );

      setCallResponse(
        leadDetails?.leadAllStatus?.filter(
          (status) => status?.lead_status === 3
        )?.[0]?.response
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadStatus, leadDetails, statusData]);

  console.log("paymentHistory?.data", paymentHistory);
  console.log("Total Paid", totalPaid);

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
    // console.log("statusUpdateResponse", statusUpdateResponse);
    if (statusUpdateResponse?.status) {
      message.success("Status Updated Successfully");
      setSyncDetails(!syncDetails);
    }
  };

  const handleTooltipMessage = (e) => {
    setTooltipMessage(tooltipMessages[e.target.outerText]?.message);
  };

  const onCallResponseChange = async (e) => {
    setCallResponse(e.target.value);
    const response = await handleCallResponseUpdate(
      leadDetails?.leadDetails?.lead_id,
      3,
      e.target.value
    );
    if (response.status === 200) {
      setSyncDetails(!syncDetails);
    }
  };

  const menu = (
    <Tooltip placement="top" title={tooltipMessage}>
      <Menu
        className="text-center text-base font-semibold"
        onClick={onStatusChange}
        onMouseOver={handleTooltipMessage}
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
    </Tooltip>
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

  const handleRegistrationReq = async () => {
    // For Registering Students
    const registrationFormData = new FormData();

    registrationFormData.append(
      "email",
      leadDetails?.leadDetails?.student_email
    );
    registrationFormData.append("role_id", 6);
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

    console.log("registrationResponse::::", registrationResponse);

    if (registrationResponse?.status === true) {
      // const lead
      // leadDetails?.leadDetails?.student_id=

      const leadUpdateResponse = await handleLeadStudentDetailsUpdate(
        leadDetails?.leadDetails.lead_id,
        registrationResponse?.data?.user_id
      );
      console.log("leadUpdateResponse", leadUpdateResponse);

      if (leadUpdateResponse?.status) {
        message.success("User Registered Successfully");

        const confirmRegistrationResponse = await handleConfirmRegistration(
          registrationResponse?.data?.user_name,
          registrationResponse?.data?.email,
          registrationResponse?.data?.password
        );

        if (confirmRegistrationResponse === "success") {
          message.success("An email sent with credentials");
        }

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

  const handleCertificateFileChange = async (e) => {
    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.user_id);
    fileFormData.append("client_id", leadDetails.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    const uploadFile = await handleUploadFile(fileFormData);

    console.log("File", uploadFile?.message?.data[0]?.id);

    const certificateUploadResponse = await handleLeadCertificatetDetailsUpdate(
      leadDetails?.leadDetails?.lead_id,
      uploadFile?.message?.data[0]?.id
    );

    if (certificateUploadResponse?.status) {
      setSyncDetails(!syncDetails);
    }
  };

  return (
    <div className="min-h-full pr-6 border-r">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          User Activity Timeline
        </h1>
      </div>
      <div className="lead_status flex flex-wrap items-center gap-y-3 mt-5">
        <Dropdown
          disabled={
            userDetails?.userInfo?.role_id === 1 ||
            userDetails?.userInfo?.role_id === 2 ||
            userDetails?.userInfo?.role_id === 6
              ? true
              : false
          }
          className={`cursor-pointer ${leadStatusColor}`}
          overlay={menu}
          trigger="click"
        >
          <div onClick={(e) => e.preventDefault()}>
            <Space>{activeStatusTitle}</Space>
          </div>
        </Dropdown>
        <div className="flex items-center">
          {/* For Counting Calls */}
          {activeStatusTitle === "Called" &&
            (userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5 ? (
              <Tooltip
                placement="top"
                title={"No. of phone calls you have made"}
              >
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
              </Tooltip>
            ) : null)}

          {/* For Call History */}
          {activeStatusTitle === "Called" || activeStatusTitle === "Paid" ? (
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5 ? (
              <Tooltip placement="top" title={"All Call Histories"}>
                <div>
                  <Icons.CallHistory
                    className="w-6 text-gray-700 mx-2 cursor-pointer"
                    onClick={() => setIsCallHistoryOpen(true)}
                  />
                </div>
              </Tooltip>
            ) : null
          ) : null}
        </div>

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
          width={800}
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
                  {leadDetails?.leadCallHistory?.map((history, i) => (
                    <tr key={i}>
                      <td className="w-16">{i + 1}</td>
                      <td>
                        {new Date(history.call_start_time)
                          .toString()
                          .slice(4, 21)}{" "}
                        {new Date(history.call_start_time)
                          .toString()
                          .slice(25, 31)}
                      </td>
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

        {/* Amount History Details */}
        <Modal
          visible={isAmountHistoryOpen}
          onCancel={() => setIsAmountHistoryOpen(false)}
          footer={false}
          width={500}
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
                        {new Date(history.created_at).toString().slice(4, 21)}{" "}
                        {new Date(history.created_at).toString().slice(25, 31)}
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

        {/* Payment History Details */}
        <Modal
          visible={isPaymentHistoryOpen}
          onCancel={() => setIsPaymentHistoryOpen(false)}
          footer={false}
          width={900}
        >
          <div>
            <h1 className="font-poppins text-base font-semibold text-center pb-1 pt-4">
              Payment History
            </h1>
          </div>
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th className="w-16">No.</th>
                  <th>Date Time</th>
                  <th className="w-24">Amount</th>
                  <th>Transaction ID</th>
                  <th className="w-24">Method</th>
                  <th>Invoice ID</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="">
            {paymentHistory?.length > 0 ? (
              <table
                className="custom-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  {paymentHistory?.map((payment, i) => (
                    <tr key={i}>
                      <td className="w-16">{i + 1}</td>
                      <td>{new Date(payment.created_at).toLocaleString()}</td>
                      <td className="w-24">{payment.payment_amount}</td>
                      <td>{payment.transaction_id}</td>
                      <td className="w-24">{payment.payment_method}</td>
                      <td>{payment.invoice_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 flex justify-center items-center">
                <h1 className="text-xl font-light">Not Paid Yet</h1>
              </div>
            )}
          </div>
        </Modal>

        {/* {(activeStatus === "Called" || activeStatus === "Paid") && ( */}
        {(activeStatusTitle !== "New Lead" ||
          activeStatusTitle !== "Skilled") && (
          <div className="flex items-center">
            {userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5 ? (
              <Tooltip placement="top" title={"Add amount add press enter"}>
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
                    defaultValue={leadDetails?.leadAmountHistory[0]?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    id=""
                  />
                </form>
              </Tooltip>
            ) : null}

            {/* For Amount History */}
            {userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5 ? (
              <Tooltip placement="top" title={"All Amount Histories"}>
                <div>
                  <Icons.AmountHistory
                    className="w-6 text-gray-700 mx-2 cursor-pointer"
                    onClick={() => setIsAmountHistoryOpen(true)}
                  />
                </div>
              </Tooltip>
            ) : null}
          </div>
        )}

        {activeStatusTitle === "Suspended" && (
          <div>
            <div className="ml-3">
              {new Date(statusDateTime["Suspended"]).toString().slice(0, 31)}
            </div>
          </div>
        )}
        {activeStatusTitle === "Called" &&
        (userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4 ||
          userDetails?.userInfo?.role_id === 5) ? (
          <>
            {leadDetails?.leadDetails?.student_id === 0 ? (
              <div className="font-poppins">
                <Tooltip
                  placement="top"
                  title={"Register the user to this system"}
                >
                  <button
                    className="text-xs bg-black text-white px-3 py-2.5 rounded-lg ml-2"
                    onClick={handleRegistrationReq}
                  >
                    Register
                  </button>
                </Tooltip>
              </div>
            ) : (
              <div>
                <button
                  title="Register the user to this system"
                  disabled
                  className="text-xs bg-gray-200 cursor-not-allowed italic text-gray-500 px-3 py-2.5 rounded-lg ml-2"
                >
                  Registered
                </button>
              </div>
            )}
          </>
        ) : null}
        {(activeStatusTitle !== "New Lead" ||
          activeStatusTitle !== "Skilled") &&
          (userDetails?.userInfo?.role_id === 6 ? (
            <div className="ml-3 px-2 py-1.5 rounded-md flex items-center border border-black border-opacity-40">
              <span className="mr-0.5 font-poppins font-medium text-black text-opacity-90">
                Payable :
              </span>
              <span className="mr-0.5 font-poppins font-medium text-red-600 text-opacity-90">
                ${leadDetails?.leadAmountHistory[0]?.amount - totalPaid}
              </span>
            </div>
          ) : null)}
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
                <span>New Lead</span>
                <Tooltip placement="top" title={"Its an new arrival lead."}>
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
              </h6>
              <h6 className="mb-0 text-sm font-semibold font-poppins leading-6 mt-4">
                # {leadDetails?.leadDetails?.course_code}
              </h6>
            </div>
          </div>
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {leadDetails?.leadDetails?.lead_apply_date !== "Not Yet"
                ? new Date(
                    leadDetails?.leadDetails?.lead_apply_date?.toString()
                  )?.toLocaleString()
                : "Not Yet"}
            </div>
          </Tooltip>
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
                <span>Skilled</span>
                <Tooltip
                  placement="top"
                  title={"If the student is skilled enough"}
                >
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
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
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {statusDateTime["Skilled"] !== "Not Yet"
                ? new Date(
                    statusDateTime["Skilled"]?.toString()
                  )?.toLocaleString()
                : "Not Yet"}
            </div>
          </Tooltip>
        </div>

        <div className="w-full flex justify-between mt-7">
          <div className="flex -ml-4">
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
                <hr className="rotate-90 w-19 mt-12" />
              </div>
            </div>
            <div>
              <h6 className="mb-0 text-base font-semibold font-poppins leading-6">
                <span>Called</span>
                <Tooltip
                  placement="top"
                  title={"If you have communicated with the student"}
                >
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                No. of Calls: {leadDetails?.leadCallHistory?.length}
              </h6>
              {activeStatusTitle === "Called" ? (
                <div className="my-2">
                  <Radio.Group
                    onChange={onCallResponseChange}
                    value={callResponse}
                    className="flex items-center"
                  >
                    <span>
                      <Radio value={1}>Responded</Radio>
                    </span>
                    <span>
                      <Radio value={0}>Not Responded</Radio>
                    </span>
                  </Radio.Group>
                  <div className="text-xs text-red-500 m-2 rounded-md">
                    Note: Selecting either option triggers sending email to the
                    student instantly. Choose option carefully.{" "}
                  </div>
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
            </div>
          </div>
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {statusDateTime["Called"] !== "Not Yet"
                ? new Date(
                    statusDateTime["Called"]?.toString()
                  )?.toLocaleString()
                : // new Date(statusDateTime["Called"]).toString().slice(4, 21) +
                  //   " " +
                  //   new Date(statusDateTime["Called"]).toString().slice(25, 31)
                  // new Date(statusDateTime["Called"]).toString().slice(0, 31)
                  "Not Yet"}
            </div>
          </Tooltip>
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
                <span>Paid</span>
                <Tooltip
                  placement="top"
                  title={"If the student have paid any fees"}
                >
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
              </h6>

              {userDetails?.userinfo?.role_id !== 1 ||
              userDetails?.userinfo?.role_id !== 2 ? (
                <div
                  className="flex items-center my-2 cursor-pointer"
                  onClick={() => setIsPaymentHistoryOpen(true)}
                >
                  <Icons.AmountHistory
                    className="w-5 text-gray-700 mr-2 cursor-pointer"
                    onClick={() => setIsAmountHistoryOpen(true)}
                  />
                  <h6 className="mb-0 text-sm font-semibold font-poppins leading-6">
                    Payment History
                  </h6>
                </div>
              ) : null}

              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                Paid ${totalPaid} of $
                {leadDetails?.leadAmountHistory[0]?.amount}(
                {(
                  (totalPaid / leadDetails?.leadAmountHistory[0]?.amount) *
                  100
                ).toFixed(2)}
                %)
              </h6>
              <h6 className="mb-0 text-sm font-semibold font-poppins leading-6">
                Bank
              </h6>
            </div>
          </div>
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {statusDateTime["Paid"] !== "Not Yet"
                ? new Date(statusDateTime["Paid"]?.toString())?.toLocaleString()
                : // new Date(statusDateTime["Paid"]).toString().slice(4, 21) +
                  //   " " +
                  //   new Date(statusDateTime["Paid"]).toString().slice(25, 31)
                  "Not Yet"}
            </div>
          </Tooltip>
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
                <span>Verified</span>
                <Tooltip
                  placement="top"
                  title={"If the student's documents are verified"}
                >
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                {leadStatus["Verified"] ? (
                  <span>Verified</span>
                ) : (
                  <span>Un-verified</span>
                )}
              </h6>
              <div className="flex mt-1">
                {/* <Icons.PDF /> */}
                <h6 className="mb-0 italic text-xs whitespace-nowrap font-medium font-poppins leading-5">
                  <span className="text-red-500">*</span> Please Check The
                  Checklist Section
                </h6>
              </div>
            </div>
          </div>
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {statusDateTime["Verified"] !== "Not Yet"
                ? new Date(
                    statusDateTime["Verified"]?.toString()
                  )?.toLocaleString()
                : // new Date(statusDateTime["Verified"]).toString().slice(4, 21) +
                  //   " " +
                  //   new Date(statusDateTime["Verified"]).toString().slice(25, 31)
                  // new Date(statusDateTime["Verified"]).toString().slice(0, 31)
                  "Not Yet"}
            </div>
          </Tooltip>
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
                <span>Completed</span>
                <Tooltip
                  placement="top"
                  title={
                    "If the user has completed the course and certificate issued"
                  }
                >
                  <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                    ?
                  </span>
                </Tooltip>
              </h6>
              <h6 className="mb-0 text-sm font-normal font-poppins leading-6 mt-4">
                {leadDetails?.leadDetails?.document_certificate_id > 0
                  ? "Certificate Provided"
                  : "Certificate Not Provided Yet"}
              </h6>
              <div className="flex mt-1">
                {leadStatus["Completed"] &&
                leadDetails?.leadDetails?.document_certificate_id === 0 ? (
                  userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4 ||
                  userDetails?.userInfo?.role_id === 5 ? (
                    <div className="bg-gray-100 px-2 py-0.5 shadow rounded-lg">
                      <Upload
                        onChange={handleCertificateFileChange}
                        fileList={fileList}
                      >
                        <div className="flex items-center">
                          <Icons.PDF />
                          <h6 className="mb-0 ml-1.5 text-sm font-semibold font-poppins leading-5">
                            Certificate
                          </h6>
                        </div>
                      </Upload>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Icons.PDF />
                      <h6 className="mb-0 ml-1.5 text-sm font-semibold font-poppins leading-5">
                        Not Provided Yet
                      </h6>
                    </div>
                  )
                ) : (
                  <div>
                    <a
                      id="certificate"
                      className="flex items-center"
                      href={certificate}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icons.PDF />
                      <h6 className="mb-0 ml-1.5 text-sm font-semibold font-poppins leading-5">
                        Download Certificate
                      </h6>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Tooltip placement="top" title={"Activity Time"}>
            <div className="text-[10px]">
              {statusDateTime["Completed"] !== "Not Yet"
                ? new Date(
                    statusDateTime["Completed"]?.toString()
                  )?.toLocaleString()
                : // new Date(statusDateTime["Completed"])
                  //     .toString()
                  //     .slice(4, 21) +
                  //   " " +
                  //   new Date(statusDateTime["Completed"]).toString().slice(25, 31)
                  // new Date(statusDateTime["Completed"]).toString().slice(0, 31)
                  "Not Yet"}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;

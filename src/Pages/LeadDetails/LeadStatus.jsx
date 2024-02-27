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
import { useDispatch, useSelector } from "react-redux";
import {
  handleCallResponseMail,
  handleLeadStatusChangeEmail,
} from "../../Components/services/mail";
import {
  handleAddAmount,
  handleAddCall,
  handleCallResponseUpdate,
  handleLeadCertificatetDetailsUpdate,
  handleLeadStatusUpdate,
} from "../../Components/services/leads";
import {
  handleFetchFile,
  handleUploadFile,
} from "../../Components/services/utils";
import Icons from "../../Components/Shared/Icons";
import { setLoader } from "../../features/user/userSlice";
import AddPaymentHistory from "./AddPaymentHistory";
import { handleDeletePaymentHistory } from "../../Components/services/payment";
import "./userDetails.css";

// ----Default Values----
const LeadStatus = (props) => {
  const {
    leadStatus,
    leadDetails,
    syncDetails,
    setSyncDetails,
    statusDateTime,
    paymentHistory,
    totalPaid,
    syncTotalPaid,
    setSyncTotalPaid,
  } = props;

  const dispatch = useDispatch();
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
  const companyDetails = useSelector((state) => state?.company.companyDetails);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
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
  const [isAddPaymentHistoryOpen, setIsAddPaymentHistoryOpen] = useState(false);
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
        : statusData[leadDetails?.leadDetails?.lead_details_status]
    );
    setLeadStatusColor(
      leadDetails?.leadDetails?.lead_details_status === 0
        ? "color-black"
        : statusColor[leadDetails?.leadDetails?.lead_details_status]?.class
    );
    if (leadDetails?.leadDetails?.document_certificate_id) {
      (async () => {
        const fetchCertificateFIle = await handleFetchFile(
          leadDetails?.leadDetails?.document_certificate_id
        );

        setCertificate(
          process.env.REACT_APP_FILE_SERVER_URL +
            "/public/" +
            fetchCertificateFIle?.data?.document_name
        );
      })();
    }
    if (leadDetails?.leadDetails?.lead_details_status >= 3) {
      setCallResponse(
        leadDetails?.leadAllStatus?.filter(
          (status) => status?.lead_status === 3
        )?.[0]?.response
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadStatus, leadDetails, statusData]);

  const onStatusChange = async ({ key }) => {
    setActiveStatusTitle(statusData[key]);
    setLeadStatusColor(
      statusColor.find((i) => i.lable === statusData[key])?.class
    );
    const data = {
      lead_id: leadDetails?.leadDetails?.lead_id,
      lead_status: parseInt(key) + 1,
      sales_user_id: userDetails?.userInfo?.user_id,
      response: null,
      to: leadDetails?.leadDetails?.student_email,
      course: leadDetails?.leadDetails?.course_title,
      client_id: userDetails?.userInfo?.client_id,
      name: leadDetails?.leadDetails?.full_name,
      student_id: leadDetails?.leadDetails?.student_id,
    };

    const statusUpdateResponse = await handleLeadStatusUpdate(data);

    console.log("statusUpdateResponse", statusUpdateResponse);
    console.log("leadDetails ......", leadDetails);

    if (statusUpdateResponse?.status === 201) {
      message.success("Status Updated Successfully");
      setSyncDetails(!syncDetails);

      if (
        leadDetails?.leadAllStatus?.filter(
          (status) => status?.lead_status === parseInt(key) + 1
        )?.length
      ) {
        console.log("Already Sent");
        return;
      } else {
        const sendMailResponse = await handleLeadStatusChangeEmail({
          to: leadDetails?.leadDetails?.student_email,
          lead_id: leadDetails?.leadDetails?.lead_id,
          course: leadDetails?.leadDetails?.course_title,
          client: companyDetails?.name,
          logo: (companyDetails?.logo).replace(
            `${process.env.REACT_APP_FILE_SERVER_URL}/public/`,
            ""
          ),
          name: leadDetails?.leadDetails?.full_name,
          student_id: leadDetails?.leadDetails?.student_id,
          lead_status: parseInt(key) + 1,
        });

        if (sendMailResponse === "success") {
          message.success("An email has been sent");
        } else {
          message.warn("Something went wrong");
        }
      }
    } else {
      message.warn("Something went wrong");
    }
  };

  const handleTooltipMessage = (e) => {
    console.log("e.target", e.target?.outerText);
    setTooltipMessage(tooltipMessages[`${e.target.outerText}`]?.message);
  };

  const onCallResponseChange = async (e) => {
    dispatch(setLoader(true));
    setCallResponse(e.target.value);
    const data = {
      lead_id: leadDetails?.leadDetails?.lead_id,
      lead_status: 3,
      response: e.target.value,
      to: leadDetails?.leadDetails?.student_email,
      name: leadDetails?.leadDetails?.full_name,
      course: leadDetails?.leadDetails?.course_title,
      client_id: userDetails?.userInfo?.client_id,
      student_id: leadDetails?.leadDetails?.student_id,
    };
    const response = await handleCallResponseUpdate(data);
    if (response.status === 200) {
      dispatch(setLoader(false));
      setSyncDetails(!syncDetails);

      const sendResponseMail = await handleCallResponseMail({
        to: leadDetails?.leadDetails?.student_email,
        lead_id: leadDetails?.leadDetails?.lead_id,
        name: leadDetails?.leadDetails?.full_name,
        course: leadDetails?.leadDetails?.course_title,
        client: companyDetails?.name,
        logo: (companyDetails?.logo).replace(
          `${process.env.REACT_APP_FILE_SERVER_URL}/public/`,
          ""
        ),
        student_id: leadDetails?.leadDetails?.student_id,
        response: e.target.value,
      });

      if (sendResponseMail === "success") {
        message.success("An email has been sent");
      } else {
        message.warn("Someting went wrong");
      }
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
        amount
      );

      if (response?.status) {
        setAmount("");
        setSyncDetails(!syncDetails);
        message.success("Amount Details Added Successfully");
      } else {
        message.warn("Something went wrong");
      }
    }
  };

  const handleCancel = () => {
    setIsCallDetailsOpen(false);
  };

  const handleCertificateFileChange = async (e) => {
    const fileFormData = new FormData();
    fileFormData.append("user_id", userDetails?.userInfo?.user_id);
    fileFormData.append("client_id", leadDetails?.leadDetails?.client_id);
    fileFormData.append("document_name", e?.file?.originFileObj);
    fileFormData.append("document_details", e?.file?.originFileObj?.name);

    const uploadFile = await handleUploadFile(fileFormData);

    if (uploadFile?.status === 200) {
      const certificateUploadResponse =
        await handleLeadCertificatetDetailsUpdate(
          leadDetails?.leadDetails?.lead_id,
          uploadFile?.data?.id
        );

      if (certificateUploadResponse?.status) {
        setSyncDetails(!syncDetails);
      }
    }
  };

  const handleDeletePaymentHistoryReq = async (phId) => {
    const deleteHistoryResp = await handleDeletePaymentHistory(phId);

    console.log("deleteHistoryResp", deleteHistoryResp);

    if (deleteHistoryResp?.status === 200) {
      message.success("History Deleted Successfully");
      setSyncTotalPaid(!syncTotalPaid);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-start rounded-md p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
      <div className="flex justify-center items-center gap-4">
        <h1
          className={`text-xl font-semibold font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          } m-0 p-0`}
        >
          User Activity Timeline
        </h1>
        <div className="lead_status flex items-center">
          <Dropdown
            disabled={
              userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 6
                ? true
                : false
            }
            className={`cursor-pointer ${leadStatusColor} `}
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
                  <div
                    className={`${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    } shadow-md backdrop-blur-2xl bg-[#ffffff11] ml-3 p-1.5 rounded-md flex items-center `}
                  >
                    <div>
                      <h1
                        className={`w-6 text-center mb-0 text-sm font-medium font-poppins ${
                          colorMode ? "text-slate-300" : "text-gray-800"
                        } `}
                      >
                        {leadDetails?.leadCallHistory?.length}
                      </h1>
                    </div>
                    <div className="ml-3 mb-0 flex justify-center items-center ">
                      <button
                        className="px-1.5 py-0.5 rounded-md bg-black text-slate-300"
                        onClick={showCallDetailsModal}
                      >
                        <Icons.PhoneVolume className="w-3 text-slate-300 py-1" />
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
                      className={`w-6 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }  mx-2 cursor-pointer`}
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
            className="callFormModal"
          >
            <div>
              <div className="flex flex-col gap-4">
                <div className="font-poppins text-lg font-semibold">
                  Call Details
                </div>
                <hr className="border-slate-300" />
                <div className="flex items-center justify-between">
                  <h1 className="w-1/3 text-base font-poppins m-0 p-0 text-slate-300">
                    Duration:
                  </h1>
                  <div className="flex items-center justify-center">
                    <Space className=" border border-slate-300 rounded-md text-base text-center bg-transparent !text-slate-300 cursor-pointer font-poppins">
                      <DatePicker
                        className="callDatePicker"
                        suffixIcon={callStart}
                        bordered={false}
                        // showTime
                        onOk={onCallStart}
                        onChange={onCallStartChange}
                      />
                    </Space>

                    <div className="text-xl font-semibold px-2 text-center">
                      -
                    </div>

                    <Space className=" border border-slate-300 rounded-md text-base text-center bg-transparent !text-slate-300 cursor-pointer font-poppins">
                      <DatePicker
                        className="callDatePicker"
                        suffixIcon={callEnd}
                        bordered={false}
                        // showTime
                        onOk={onCallEnd}
                        onChange={onCallEndChange}
                      />
                    </Space>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <input
                    className="w-full font-poppins outline-none bg-transparent border border-slate-300 rounded-md placeholder:!text-slate-300 text-slate-300"
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
            className="callFormModal"
          >
            <h1 className="font-poppins text-base font-semibold text-center text-slate-300">
              Call History
            </h1>
            <div className="!w-full">
              <table className="!w-full flex flex-col">
                <thead className="w-full">
                  <tr className="flex border-b border-brand-color">
                    <th className="w-full text-center">No.</th>
                    <th className="w-full text-center">Start Time</th>
                    <th className="w-full text-center">End Time</th>
                    <th className="w-full text-center">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {leadDetails?.leadCallHistory?.length > 0 ? (
                    <>
                      {leadDetails?.leadCallHistory?.map((history, i) => (
                        <tr
                          key={i}
                          className="flex items-center justify-center w-full border-b border-brand-color"
                        >
                          <td className="w-full text-slate-300 text-center">
                            {i + 1}
                          </td>
                          <td className="w-full text-slate-300 text-center border-x border-brand-color">
                            {new Date(history.call_start_time).toLocaleString()}
                          </td>
                          <td className="w-full text-slate-300 text-center border-r border-brand-color">
                            {new Date(history.call_end_time).toLocaleString()}
                          </td>
                          <td className="w-full text-slate-300 text-center">
                            {history.call_remark}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <h1 className="text-xl w-full pt-8 text-slate-300 font-light text-center">
                      No Call History
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </Modal>

          {/* Amount History Details */}
          <Modal
            visible={isAmountHistoryOpen}
            onCancel={() => setIsAmountHistoryOpen(false)}
            footer={false}
            className="callFormModal"
          >
            <div>
              <h1 className="font-poppins text-base font-semibold text-center text-slate-300">
                Amount History
              </h1>
            </div>
            <div className="w-full">
              <table className="w-full flex flex-col">
                <thead className="w-full">
                  <tr className="flex border-b border-brand-color">
                    <th className="w-full text-center">No.</th>
                    <th className="w-full text-center">Date</th>
                    <th className="w-full text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {leadDetails?.leadAmountHistory?.length > 0 ? (
                    <>
                      {leadDetails?.leadAmountHistory?.map((history, i) => (
                        <tr
                          key={i}
                          className="flex items-center justify-center w-full border-b border-brand-color"
                        >
                          <td className="w-full text-slate-300 text-center border-r border-brand-color">
                            {i + 1}
                          </td>
                          <td className="w-full text-slate-300 text-center  border-x border-brand-color">
                            {new Date(history.created_at)?.toLocaleString()}
                          </td>
                          <td className="w-full text-slate-300 text-center">
                            <span>${history.amount}</span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <h1 className="text-xl w-full pt-8 text-slate-300 font-light text-center">
                      No Amount History
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </Modal>

          {/* Payment History Details */}
          <Modal
            visible={isPaymentHistoryOpen}
            onCancel={() => setIsPaymentHistoryOpen(false)}
            footer={false}
            width={900}
            className="callFormModal"
          >
            <h1 className="font-poppins text-base font-semibold text-center text-slate-300">
              Payment History
            </h1>
            <div className="!w-full">
              <table className="!w-full flex flex-col">
                <thead className="w-full">
                  <tr className="flex border-b border-brand-color">
                    <th className="w-full text-center">No.</th>
                    <th className="w-full text-center">Date Time</th>
                    <th className="w-full text-center">Amount</th>
                    <th className="w-full text-center">Transaction ID</th>
                    <th className="w-full text-center">Invoice ID</th>
                    <th className="w-full text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory?.length > 0 ? (
                    <>
                      {paymentHistory?.map((payment, i) => (
                        <tr
                          key={i}
                          className=""
                          flex
                          items-center
                          justify-center
                          w-full
                          border-b
                          border-brand-color
                        >
                          <td className="w-full text-slate-300 text-center">
                            {i + 1}
                          </td>
                          <td className="w-full text-slate-300 text-center border-x border-brand-color">
                            {new Date(payment.created_at).toLocaleString()}
                          </td>
                          <td className="w-full text-slate-300 text-center border-r border-brand-color">
                            {payment.payment_amount}
                          </td>
                          <td className="w-full text-slate-300 text-center border-r border-brand-color">
                            {payment.transaction_id}
                          </td>
                          <td className="w-full text-slate-300 text-center border-r border-brand-color">
                            {payment.invoice_number}
                          </td>
                          <td className="w-full text-slate-300 text-center">
                            <Icons.Cross
                              className="w-2.5 text-red-600"
                              onClick={() =>
                                handleDeletePaymentHistoryReq(payment?.id)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <h1 className="text-xl w-full pt-8 text-slate-300 font-light text-center">
                      Not Paid Yet
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </Modal>

          {/* Add Payment History */}
          <Modal
            visible={isAddPaymentHistoryOpen}
            onCancel={() => setIsAddPaymentHistoryOpen(false)}
            footer={false}
            className="callFormModal"
          >
            <AddPaymentHistory
              leadDetails={leadDetails}
              setIsAddPaymentHistoryOpen={setIsAddPaymentHistoryOpen}
              syncDetails={syncDetails}
              setSyncDetails={setSyncDetails}
              syncTotalPaid={syncTotalPaid}
              setSyncTotalPaid={setSyncTotalPaid}
            />
          </Modal>

          {(activeStatusTitle === "Called" || activeStatusTitle === "Paid") && (
            <div className="flex justify-center items-center ">
              {userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5 ? (
                <Tooltip placement="top" title={"Add amount add press enter"}>
                  <form
                    onSubmit={(e) => handleAddLeadAmount(e)}
                    className="ml-3 px-2 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md flex items-center"
                  >
                    <span
                      className={`mr-0.5 font-poppins font-medium ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      $
                    </span>
                    <input
                      className={`w-14 text-sm font-medium font-poppins outline-none border-[0px] bg-transparent ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                      type="text"
                      name=""
                      defaultValue={
                        leadDetails?.leadAmountHistory.length
                          ? leadDetails?.leadAmountHistory[0]?.amount
                          : 0
                      }
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
                      className={`w-6 ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }  mx-2 cursor-pointer`}
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

          {(activeStatusTitle !== "New Lead" ||
            activeStatusTitle !== "Skilled") &&
            (userDetails?.userInfo?.role_id === 6 ? (
              <div className="ml-3 px-2 py-1.5 rounded-md flex items-center border border-black border-opacity-40">
                <span className="mr-0.5 font-poppins font-medium text-black text-opacity-90">
                  Payable :
                </span>
                <span className="mr-0.5 font-poppins font-medium text-red-600 text-opacity-90">
                  $
                  {leadDetails?.leadAmountHistory?.length
                    ? leadDetails?.leadAmountHistory[0]?.amount - totalPaid > 0
                      ? leadDetails?.leadAmountHistory[0]?.amount - totalPaid
                      : 0
                    : "Not Set Yet"}
                </span>
              </div>
            ) : null)}
        </div>
      </div>

      <div className="flex items-start justify-center mt-8 w-full">
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className=" w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div className="">
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus.New_Lead ? "bg-green-500" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["New Lead"]
                        ? "bg-green-500"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  New Lead
                </h6>
                <h6
                  className={`mb-0 text-sm font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  # {leadDetails?.leadDetails?.course_code}
                </h6>
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {leadDetails?.leadDetails?.lead_apply_date !== "Not Yet"
                      ? new Date(
                          leadDetails?.leadDetails?.lead_apply_date?.toString()
                        )
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
              </div>
              <Tooltip placement="top" title={"Its a new arrival lead."}>
                <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                  ?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div className="">
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus["Skilled"] ? "bg-orange-400" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["Skilled"]
                        ? "bg-orange-400"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  Skilled
                </h6>
                <h6
                  className={`mb-0 text-sm font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  {leadStatus["Skilled"] ? (
                    <span>Eligible</span>
                  ) : (
                    <span>Non-eligible</span>
                  )}
                </h6>
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {statusDateTime["Skilled"] !== "Not Yet"
                      ? new Date(statusDateTime["Skilled"]?.toString())
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
              </div>
              <Tooltip
                placement="top"
                title={"If the student is skilled enough"}
              >
                <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                  ?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div className="">
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus["Called"] ? "bg-blue-400" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["Called"]
                        ? "bg-blue-400"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  <span>Called</span>
                </h6>
                <h6
                  className={`mb-0 text-sm font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  No. of Calls: {leadDetails?.leadCallHistory?.length}
                </h6>
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {statusDateTime["Called"] !== "Not Yet"
                      ? new Date(statusDateTime["Called"]?.toString())
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
                {activeStatusTitle === "Called" &&
                (userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4 ||
                  userDetails?.userInfo?.role_id === 5) ? (
                  <div className="">
                    <Radio.Group
                      onChange={onCallResponseChange}
                      value={callResponse}
                      className="!flex items-center justify-center"
                    >
                      <span>
                        <Radio
                          className={` !text-xs
                            ${colorMode ? "!text-slate-300" : "!text-gray-800"}
                          `}
                          value={1}
                        >
                          Responded
                        </Radio>
                      </span>
                      <span>
                        <Radio
                          className={` !text-xs
                          ${colorMode ? "!text-slate-300" : "!text-gray-800"}
                        `}
                          value={0}
                        >
                          Not Responded
                        </Radio>
                      </span>
                    </Radio.Group>
                    <div className="text-xs text-red-500 mx-2 rounded-md">
                      Note: Selecting either option triggers sending email to
                      the student instantly. Choose option carefully.{" "}
                    </div>
                  </div>
                ) : // <div>&nbsp;</div>
                null}
              </div>
              <Tooltip
                placement="top"
                title={"If you have communicated with the student"}
              >
                <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                  ?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div className="">
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus["Paid"] ? "bg-teal-400" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["Paid"]
                        ? "bg-teal-400"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  Paid
                </h6>

                {userDetails?.userinfo?.role_id !== 1 ||
                userDetails?.userinfo?.role_id !== 2 ? (
                  activeStatusTitle !== "New Lead" &&
                  activeStatusTitle !== "Skilled" ? (
                    <Tooltip title="All Payment Histories">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsPaymentHistoryOpen(true)}
                      >
                        {/* <Icons.AmountHistory
                          className={`w-5 ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          } mr-2 cursor-pointer`}
                          onClick={() => setIsAmountHistoryOpen(true)}
                        /> */}
                        <h6
                          className={`mb-0 text-base font-normal font-poppins ${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          }`}
                        >
                          Payment History
                        </h6>
                      </div>
                    </Tooltip>
                  ) : (
                    <div
                      className={`mb-0 text-sm font-thin font-poppins ${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      }`}
                    >
                      No transaction
                    </div>
                  )
                ) : null}

                {leadDetails?.leadAmountHistory?.length ? (
                  <>
                    <h6
                      className={` ${
                        colorMode ? "!text-slate-300" : "!text-gray-800"
                      } mb-0 text-xs font-normal font-poppins`}
                    >
                      Paid ${totalPaid} of $
                      {leadDetails?.leadAmountHistory[0]?.amount}(
                      {(
                        (totalPaid /
                          leadDetails?.leadAmountHistory[0]?.amount) *
                        100
                      ).toFixed(2)}
                      %)
                    </h6>
                    <h6
                      className={` ${
                        colorMode ? "!text-white" : "!text-gray-800"
                      } text-xs font-thin font-poppins`}
                    >
                      Due: $
                      {leadDetails?.leadAmountHistory[0]?.amount - totalPaid}
                    </h6>
                  </>
                ) : null}

                {activeStatusTitle !== "New Lead" &&
                activeStatusTitle !== "Skilled" ? (
                  <div>
                    <button
                      className={`text-sm font-medium bg-slate-300 px-2 rounded-md border border-gray-200`}
                      onClick={() => setIsAddPaymentHistoryOpen(true)}
                    >
                      Add Payment History
                    </button>
                  </div>
                ) : null}
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {statusDateTime["Paid"] !== "Not Yet"
                      ? new Date(statusDateTime["Paid"]?.toString())
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
              </div>
              <Tooltip
                placement="top"
                title={"If the student have paid any fees"}
              >
                <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                  ?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div className="">
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus["Verified"] ? "bg-violet-500" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["Verified"]
                        ? "bg-violet-500"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  Verified
                </h6>
                <h6
                  className={`mb-0 text-sm font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  {leadStatus["Verified"] ? (
                    <span>Verified</span>
                  ) : (
                    <span>Un-verified</span>
                  )}
                </h6>

                <h6
                  className={`mb-0 text-xs font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  <span className="text-red-500">*</span> Please Check The
                  Checklist Section
                </h6>
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {statusDateTime["Verified"] !== "Not Yet"
                      ? new Date(statusDateTime["Verified"]?.toString())
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
              </div>
              <Tooltip
                placement="top"
                title={"If the student's documents are verified"}
              >
                <span className="ml-2 px-[5.5px] rounded-full border border-gray-400 cursor-help text-xs bg-gray-100">
                  ?
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
              <div>
                <div
                  className={`cursor-pointer w-5 h-5 rounded-full ${
                    leadStatus["Completed"] ? "bg-red-500" : "bg-gray-300"
                  } bg-opacity-20 flex justify-center items-center`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      leadStatus["Completed"]
                        ? "bg-red-500"
                        : `${
                            colorMode ? "bg-gray-400" : "bg-slate-400"
                          } animate-custom-ping`
                    }`}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <hr
                  className={`${
                    colorMode ? "border-slate-300" : "border-gray-800"
                  } w-full`}
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h6
                  className={`mb-0 text-base font-semibold font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  Completed
                </h6>
                <h6
                  className={`mb-0 text-sm font-thin font-poppins ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                >
                  {leadDetails?.leadDetails?.document_certificate_id > 0
                    ? "Certificate Provided"
                    : "Certificate Not Provided Yet"}
                </h6>
                {leadStatus["Completed"] && (
                  <div className="flex mt-1">
                    {leadDetails?.leadDetails?.document_certificate_id === 0 ? (
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
                                Upload Certificate
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
                          download
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
                )}
                <Tooltip placement="top" title={"Activity Time"}>
                  <div
                    className={`mb-0 text-xs font-thin font-poppins ${
                      colorMode ? "text-slate-300" : "text-gray-800"
                    }`}
                  >
                    {statusDateTime["Completed"] !== "Not Yet"
                      ? new Date(statusDateTime["Completed"]?.toString())
                          ?.toGMTString()
                          ?.replace("GMT", "")
                      : "Not Yet"}
                  </div>
                </Tooltip>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;

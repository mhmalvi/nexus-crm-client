import {
  Avatar,
  Button,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  handleAdmissionStatusChange,
  handleGetComments,
  handleGetStudentAdmissionRequests,
  handleGetStudentAdmissionRequestsDetails,
  handleInvoiceGenerate,
  handleSendComment,
  handleSendMailToInstitute,
  handleUploadCertificate,
} from "../../Components/services/utils";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  ReloadOutlined,
  SendOutlined,
} from "@ant-design/icons";
import paidPhoto from "../../assets/PNGS/paid.svg";
import { shallowEqual, useSelector } from "react-redux";
import "./checkDetailsModal.css"
const RequestDetailsModal = ({
  isModalOpen,
  setIsModalOpen,
  rId,
  setAllAdmissionRequests,
  setRequestListLoading,
}) => {
  const [AdmissionDetails, setAdmissionDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const [mendetroyfileList, setMendetoryFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [res, setRes] = useState({});
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [coursePrice, setCoursePrice] = useState(0.0);
  const [isSendingmail, setIssendingMail] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [certificate, setCetificate] = useState({});
  const [uploadCertificateLoading, setUploadCertificateLoading] =
    useState(false);

  const userDetails = useSelector((auth) => auth?.user?.userInfo, shallowEqual);
  const messageBoxRef = useRef(null);
  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdmissionRequestsDetails(rId);
      setLoading(true);
      console.log("agency :", res);
      if (res?.status === 200) {
        setLoading(false);

        setRes(res);

        setAdmissionDetails(res?.data);
        setFileList(res?.data?.files);
        setMendetoryFileList(res?.data?.mandatory_files);
      } else {
        setLoading(false);
      }
    })();
  }, [rId]);
  console.log("addmission details: ", AdmissionDetails);
  const SyncRefresh = async () => {
    const res = await handleGetStudentAdmissionRequestsDetails(rId);
    setIsRefreshing(true);
    setLoading(true);
    if (res?.status === 200) {
      setLoading(false);
      setIsRefreshing(false);
      setAdmissionDetails(res?.data);
      setFileList(res?.data?.files);
      setMendetoryFileList(res?.data?.mandatory_files);
    } else {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  const handleChangeStatus = async (fid, s, f) => {
    const data = {
      student_id: rId,
      file_id: fid,
      status: s,
      flag: f,
    };
    const res = await handleAdmissionStatusChange(data);
    if (res?.status === 201) {
      setLoading(true);
      const respons = await handleGetStudentAdmissionRequestsDetails(rId);

      if (respons?.status === 200) {
        setLoading(false);
        setAdmissionDetails(respons?.data);
        SyncRefresh();
      } else {
        setLoading(false);
      }
      setRequestListLoading(true);
      const response = await handleGetStudentAdmissionRequests();

      if (response?.status === 200) {
        setAllAdmissionRequests(response?.data);
        setRequestListLoading(false);
      } else {
        setRequestListLoading(false);
      }
    }
  };

  const sendMail = async () => {
    let res;
    if (subject && email) {
      setIssendingMail(true);
      res = await handleSendMailToInstitute(rId, { subject, to: email });
      if (res?.status === 200) {
        setIssendingMail(false);
        setSubject("");
        setEmail("");
        message.success("Mail sent successfully");
      } else {
        setIssendingMail(false);
        message.warn(res?.data?.message || "Failed");
      }
    } else {
      if (subject === "") {
        message.warn("Subject is required");
      } else if (email === "") {
        message.warn("Email is required");
      }
    }
  };

  const handleGenerateInvoice = async () => {
    setIsGeneratingPdf(true);
    const res = await handleInvoiceGenerate(rId, {
      price: parseFloat(coursePrice).toFixed(2),
    });
    if (res?.status === 201) {
      setCoursePrice(0.0);
      setIsGeneratingPdf(false);
      message.success("Successfully generated");
      window.open(`${res?.data?.file_path}`, "_blank");
    } else {
      setIsGeneratingPdf(false);
      message.warn(res?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCetificate({});
  };
  const handleCanclePopupMailbox = () => {
    setSubject("");
    setEmail("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [commentsData]);
  const onGetCommnets = async (fid) => {
    const res = await handleGetComments(fid);
    if (res?.status === 200) {
      setCommentsData(res?.data);
    }
  };

  const onSendComment = async (fid) => {
    const data = {
      user_id: userDetails?.user_id,
      comments: comment,
      file_id: fid,
      user_name: userDetails?.full_name,
    };
    const res = await handleSendComment(data);
    if (res?.status === 201) {
      setComment("");
      onGetCommnets(fid);

      message.success("Comment sent successfully");
      // scrollToBottom();
    } else {
      message.warn(res?.data?.message || "Failed/Someting went wrong");
    }
  };
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  async function handleCertificateUpload(e) {
    setCetificate(e.target.files[0]);
    if (e.target.files[0]) {
      setUploadCertificateLoading(true);
      const formData = new FormData();
      formData.append("student_id", AdmissionDetails?.id);
      formData.append("certificate", e.target.files[0]);
      const res = await handleUploadCertificate(formData);
      if (res?.status === 201) {
        setUploadCertificateLoading(false);
        message.success("Certificate uploaded successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);

        setCetificate({});
        e.target.files[0] = null;
      } else {
        setUploadCertificateLoading(false);

        message.warn(res?.data?.message || "Failed");
        e.target.files[0] = null;
        setCetificate({});
      }
    }
  }

  const columns = [
    {
      title: ()=>{
        return <h1 className="text-[20px] font-bold">File Name</h1>
      },
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: ()=>{
        return <h1 className="text-[20px] font-bold">File Status</h1>
      },
      dataIndex: "status",
      key: "status",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              {record?.status === 2 && <Tag color="cyan" className="!text-[17px] animate-pulse">Pending</Tag>}
              {record?.status === 1 && <Tag color="green" className="!text-[17px] animate-pulse">Complete</Tag>}
              {record?.status === 0 && (
                <div className="">
                  <div>
                    <Tag color="red" className="!text-[17px] animate-pulse">Incomplete</Tag>
                  </div>

                  <Popconfirm
                    className="mt-2 box-commnet"
                    icon=""
                    okButtonProps={{
                      className: "!hidden",
                    }}
                    cancelButtonProps={{
                      className: "!hidden",
                    }}
                    title={
                      <div className="w-[300px] ">
                        <div
                          className=" max-h-[300px] overflow-y-auto crm-scroll-none mb-2"
                          ref={messageBoxRef}
                        >
                          {/* <h1>Chat with studnet admin</h1> */}
                          <div className="">
                            {commentsData?.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className={`my-4 w-[70%] border rounded-3xl  px-3 py-[4px] text-white ${
                                    userDetails?.user_id === comment?.user_id &&
                                    "ml-auto"
                                  } ${
                                    userDetails?.user_id === comment?.user_id
                                      ? "bg-[#395698]"
                                      : "bg-[#3e35c4]"
                                  }`}
                                >
                                  <div
                                    className={`flex gap-[5px] ${
                                      userDetails?.user_id ===
                                        comment?.user_id && "flex-row-reverse"
                                    } `}
                                  >
                                    {userDetails?.user_id !==
                                      comment?.user_id && (
                                      <div className="">
                                        <Avatar
                                          icon={`${comment?.user_name[0]}`}
                                          className="w-full h-full !bg-[blueviolet]"
                                        />
                                      </div>
                                    )}

                                    <div
                                      className={`${
                                        userDetails?.user_id ===
                                          comment?.user_id && "ml-auto"
                                      }`}
                                    >
                                      <p
                                        className={`m-0 p-0 break-words ${
                                          userDetails?.user_id ===
                                            comment?.user_id && "text-right"
                                        }`}
                                      >
                                        {comment?.comments}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                          <Input
                            className=" !rounded-xl"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What's on your mind ?"
                          />
                          {comment && (
                            <SendOutlined
                              className="text-[25px] !text-green-600 cursor-pointer"
                              onClick={() => {
                                onSendComment(record?.id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    }
                  >
                    <Button
                      size="small"
                      className=" !bg-pink-500 !rounded !text-white !border-none"
                      onClick={() => {
                        // setInterval(() => {
                        onGetCommnets(record?.id);
                        // }, 1000);
                      }}
                    >
                      Place a comment``
                    </Button>
                  </Popconfirm>
                </div>
              )}
            </div>
          </>
        );
      },
    },

    {
      title: () => {
        return (
          <>
            <div className="flex justify-center items-center gap-4 !m-0 !p-0 text-[20px] font-bold">
              <div className="!mb-[10px]">
                <Tooltip title="Sync/Refresh" color="green">
                  <ReloadOutlined onClick={SyncRefresh} />
                </Tooltip>
              </div>

              <h1>Action</h1>
            </div>
          </>
        );
      },
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx}>
                <EyeOutlined
                  className="text-[25px]"
                  onClick={() => {
                    window.open(
                      `https://crmbtob.queleadscrm.com/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
              {AdmissionDetails?.pay_slip_status !== 1 && (
                <>
                  <Tooltip title="Complete File" color={"cyan"} key={idx}>
                    <CheckOutlined
                      onClick={() => {
                        handleChangeStatus(record?.id, 1, 1);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Incomplete File" color={"red"} key={idx}>
                    <CloseOutlined
                      onClick={() => {
                        handleChangeStatus(record?.id, 0, 1);
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];
  const mcolumns = [
    {
      title: ()=>{
        return <h1 className=" text-[20px] font-bold">File Type</h1>
      },
      dataIndex: "file_type",
      key: "file_type",
      render:(_,record,idx)=>{
        return(
          <h1 key={idx} className="text-[17px] font-bold">{record?.file_type}</h1>
        )
      }
    },
    {
      title: ()=>{
        return <h1 className="text-[20px] font-bold">File Name</h1>
      },
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: ()=>{
        return <h1 className="text-[20px] font-bold">File Status</h1>
      },
      dataIndex: "status",
      key: "status",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              {record?.status === 2 && <Tag color="cyan" className="!text-[17px] animate-pulse">Pending</Tag>}
              {record?.status === 1 && <Tag color="green" className="!text-[17px] animate-pulse">Complete</Tag>}

              {record?.status === 0 && (
                <div className="">
                  <div>
                    <Tag color="red" className="!text-[17px] animate-pulse">Incomplete</Tag>
                  </div>

                  <Popconfirm
                    className="mt-2 box-commnet"
                    icon=""
                    okButtonProps={{
                      className: "!hidden",
                    }}
                    cancelButtonProps={{
                      className: "!hidden",
                    }}
                    title={
                      <div className="w-[300px] ">
                        <div
                          className=" max-h-[300px] overflow-y-auto crm-scroll-none mb-2"
                          ref={messageBoxRef}
                        >

                          <div className="">
                            {commentsData?.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className={`my-4 w-[70%] border rounded-3xl  px-3 py-[4px] text-white ${
                                    userDetails?.user_id === comment?.user_id &&
                                    "ml-auto"
                                  } ${
                                    userDetails?.user_id === comment?.user_id
                                      ? "bg-[#395698]"
                                      : "bg-[#3e35c4]"
                                  }`}
                                >
                                  <div
                                    className={`flex gap-[5px] ${
                                      userDetails?.user_id ===
                                        comment?.user_id && "flex-row-reverse"
                                    } `}
                                  >
                                    {userDetails?.user_id !==
                                      comment?.user_id && (
                                      <div className="">
                                        <Avatar
                                          icon={`${comment?.user_name[0]}`}
                                          className="w-full h-full !bg-[blueviolet]"
                                        />
                                      </div>
                                    )}

                                    <div
                                      className={`${
                                        userDetails?.user_id ===
                                          comment?.user_id && "ml-auto"
                                      }`}
                                    >
                                      <p
                                        className={`m-0 p-0 break-words ${
                                          userDetails?.user_id ===
                                            comment?.user_id && "text-right"
                                        }`}
                                      >
                                        {comment?.comments}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                          <Input
                            className=" !rounded-xl"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What's on your mind ?"
                          />
                          {comment && (
                            <SendOutlined
                              className="text-[25px] !text-green-600 cursor-pointer"
                              onClick={() => {
                                onSendComment(record?.id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    }
                  >
                    <Button
                      size="small"
                      className=" !bg-pink-500 !rounded !text-white !border-none"
                      onClick={() => {
                        onGetCommnets(record?.id);
                      }}
                    >
                      Place a comment
                    </Button>
                  </Popconfirm>
                </div>
              )}
            </div>
          </>
        );
      },
    },

    {
      title: () => {
        return (
          <>
            <div className="flex justify-center items-center gap-4 !m-0 !p-0 text-[20px] font-bold">
              <div className="!mb-[10px]">
                <Tooltip title="Sync/Refresh" color="green">
                  <ReloadOutlined onClick={SyncRefresh} />
                </Tooltip>
              </div>

              <h1>Action</h1>
            </div>
          </>
        );
      },
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx}>
                <EyeOutlined
                  className="text-[25px]"
                  onClick={() => {
                    window.open(
                      `https://crmbtob.queleadscrm.com/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
              {AdmissionDetails?.pay_slip_status !== 1 && (
                <>
                  <Tooltip title="Complete File" color={"cyan"} key={idx}>
                    <CheckOutlined
                      onClick={() => {
                        handleChangeStatus(record?.id, 1, 0);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Incomplete File" color={"red"} key={idx}>
                    <CloseOutlined
                      onClick={() => {
                        handleChangeStatus(record?.id, 0, 0);
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Modal
          title="File details"
          open={isModalOpen}
          visible={isModalOpen}
          onCancel={handleCancel}
          width={"70%"}
          footer={[
            <Button
              className="!bg-red-500 !rounded !border-none !text-white"
              key={1}
              type="primary"
              onClick={handleCancel}
            >
              Close
            </Button>,
          ]}
        >
          <div className="mb-6 flex justify-between items-center gap-2">
            <div className="md:w-[60%] ">
              <div className="flex items-center gap-4 my-4">
                <span className="text-[20px] text-gray-600 m-0 p-0">
                  Agency Name:{" "}
                </span>
                <h1 className="text-[18px] font-bold m-0">{res?.agency}</h1>
              </div>
              <hr className=" translate-y-[-1px]"/>
              <div className="flex items-center gap-4 my-4">
                <span className="text-[20px] text-gray-600 m-0 p-0">
                  Student Name:{" "}
                </span>
                <h1 className="text-[18px] font-bold m-0">
                  {AdmissionDetails?.student_name}
                </h1>
              </div>
              <hr className=" translate-y-[-9px]"/>
              <div className="flex items-center gap-4">
                <span className="text-[20px] text-gray-600 ">
                  Course Name:{" "}
                </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.course_name}
                </h1>
              </div>
              <hr className=" translate-y-[6px]"/>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-[20px] text-gray-600 ">Status: </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.status === 2 && (
                    <Tag color="cyan" className="!text-[17px] animate-pulse">Pending</Tag>
                  )}
                  {AdmissionDetails?.status === 1 && (
                    <Tag color="green" className="!text-[17px] animate-pulse">Complete</Tag>
                  )}
                  {AdmissionDetails?.status === 0 && (
                    <Tag color="red" className="!text-[17px] animate-pulse">Incomplete</Tag>
                  )}
                </h1>
              </div>
              <hr className=" translate-y-[6px]"/>
            </div>
            {AdmissionDetails?.pay_slip_status === 1 && (
              <div className="md:w-[39%]">
                <img
                  className=" mx-auto  w-1/2"
                  src={paidPhoto}
                  alt=""
                 
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Popconfirm
              icon=""
              onConfirm={sendMail}
              onCancel={handleCanclePopupMailbox}
              okButtonProps={{
                size: "middle",
                className: "!rounded !bg-green-500 !text-white !border-none",
                type: "",
                loading: isSendingmail,
              }}
              cancelButtonProps={{
                size: "middle",
                className: "!rounded !bg-red-500 !text-white !border-none",
                type: "",
              }}
              okText={isSendingmail ? "Sending" : "Send"}
              cancelText="Cancel"
              title={
                <>
                  <div className="flex justify-center items-center gap-2">
                    <div className="mb-6 font-poppins">
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-sm text-gray-600"
                      >
                        Subject
                      </label>
                      <Input
                        size="large"
                        name="subject"
                        id="subject"
                        value={subject}
                        placeholder="Enter Subject"
                        className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                        onChange={(e) => setSubject(e?.target?.value)}
                        required
                      />
                    </div>
                    <div className="mb-6 font-poppins">
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-sm text-gray-600"
                      >
                        To
                      </label>
                      <Input
                        type="email"
                        size="large"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="Enter receiver email address"
                        className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                        onChange={(e) => setEmail(e?.target?.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              }
            >
              <button disabled={AdmissionDetails?.status !== 1} className="sendMailButton">Send Mail</button>
            </Popconfirm>
            <Popconfirm
              icon=""
              onConfirm={handleGenerateInvoice}
              onCancel={() => {
                setCoursePrice(0);
              }}
              okButtonProps={{
                size: "middle",
                className: "!rounded !bg-green-500 !text-white !border-none",
                type: "",
                // loading: isSendingmail,
              }}
              cancelButtonProps={{
                size: "middle",
                className: "!rounded !bg-red-500 !text-white !border-none",
                type: "",
              }}
              okText={isGeneratingPdf ? "Generating" : "Generate"}
              cancelText="Cancel"
              title={
                <>
                  <div className="">
                    <div className="mb-6 font-poppins">
                      <label
                        htmlFor="course_price"
                        className="block mb-2 text-sm text-gray-600"
                      >
                        Course Price
                      </label>
                      <Input
                        // type="password"
                        size="large"
                        name="course_price"
                        id="course_price"
                        value={coursePrice}
                        placeholder="Enter course price"
                        className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                        onChange={(e) => setCoursePrice(e?.target?.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              }
            >
              {/* <Button
                disabled={AdmissionDetails?.status !== 1}
                className=" !rounded !bg-green-500 !text-white !border-none"
              >
                Generate Invoice
              </Button> */}
              <button disabled={AdmissionDetails?.status !== 1} className="generateInvoiceButton" role="button">Generate Invoice</button>
            </Popconfirm>
            {AdmissionDetails?.pay_slip_status === 1 && (
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="certificate-upload"
                  onChange={handleCertificateUpload}
                  hidden
                />
                <label
                  htmlFor="certificate-upload"
                  className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer text-white border-none uploadCertificateButton"
                  style={{ border: "1px solid gray" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="m-0 p-0">
                    {uploadCertificateLoading
                      ? "Uploading Certificate"
                      : "Upload Certificate"}
                  </p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {certificate?.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div>
              <h1 className="mb-[-15px] p-0 text-lg font-bold">
                Mandatory Files
              </h1>
              <Table
                className="mt-3"
                loading={loading}
                columns={mcolumns || []}
                dataSource={mendetroyfileList || []}
                pagination
              />
            </div>
            <div>
              <h1 className="m-0 p-0 text-lg font-bold">Other Files</h1>
              <Table
                className="mt-3"
                loading={loading}
                columns={columns || []}
                dataSource={fileList || []}
                pagination
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RequestDetailsModal;

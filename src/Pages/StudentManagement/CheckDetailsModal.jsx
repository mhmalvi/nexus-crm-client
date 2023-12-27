import {
  CloseOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  SendOutlined,
} from "@ant-design/icons";
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
import { useEffect } from "react";
import { useState } from "react";
import {
  handleGetComments,
  handleGetStudentAdmissionDetailsAgency,
  handleGetStudentAdmissionRequestsDetails,
  handleGetStudentCompleteDetailsCheck,
  handleIncompleteUpdateStudentFile,
  handleRemoveFileAgencyCheck,
  handleSendComment,
  handleSendCommentAgency,
  handleUpdateStudentFile,
  handleUpoladPaySlip,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import { btob_dev } from "../../Components/services/environment";
import "./checkDetailsModal.css";

const CheckDetailsModal = ({
  checkModalOpen,
  setCheckModalOpen,
  rId,
  setStudentListLoading,
  setListData,
}) => {
  const userDetails = useSelector((auth) => auth?.user?.userInfo, shallowEqual);
  const [AdmissionDetails, setAdmissionDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const [mendetroyfileList, setMendetoryFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [payFile, setpayFIle] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [paySlipUploadLoading, setPaySlipUploadLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [inCompleteFile, setInCompleteFile] = useState({});
  const [fid, setFid] = useState(0);
  const [flg, setFlg] = useState(1);

  const messageBoxRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdmissionDetailsAgency(
        userDetails?.user_id,
        rId
      );
      setLoading(true);
      if (res?.status === 200) {
        setLoading(false);
        setAdmissionDetails(res?.data);
        setFileList(res?.data?.files);
        setMendetoryFileList(res?.data?.mandatory_files);
      } else {
        setLoading(false);
      }
    })();
  }, [rId]);
  const SyncRefresh = async () => {
    const res = await handleGetStudentAdmissionDetailsAgency(
      userDetails?.user_id,
      rId
    );
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
  const handleCheckListFile = (e) => {
    e.preventDefault();
    console.log("I entered file");

    const files = Object.values(e?.target?.files);
    setFiles(files);
    setFileName(files);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("student_file[]", file));
    const res = await handleUpdateStudentFile(rId, formData);
    if (res?.status === 201) {
      setIsUpdating(false);
      setLoading(true);
      const respons = await handleGetStudentAdmissionDetailsAgency(
        userDetails?.user_id,
        rId
      );
      if (respons?.status === 200) {
        setLoading(false);
        setAdmissionDetails(respons?.data);
        SyncRefresh();
      } else {
        setLoading(false);
      }
      setStudentListLoading(true);
      const response = await handleGetStudentCompleteDetailsCheck(
        userDetails?.user_id
      );
      if (response?.status === 200) {
        setListData(response?.data);
        setStudentListLoading(false);
      } else {
        setStudentListLoading(false);
      }
      setCheckModalOpen(false);
      setFiles([]);
      setFileName([]);
    } else {
      setIsUpdating(false);
      message.warn(res?.data?.message || "Something went wrong");
    }
  };
  const handleRemoveFile = async (fid, flag) => {
    const res = await handleRemoveFileAgencyCheck(fid, rId, flag);
    if (res?.status === 201) {
      setLoading(true);
      const respons = await handleGetStudentAdmissionDetailsAgency(
        userDetails?.user_id,
        rId
      );

      if (respons?.status === 200) {
        setLoading(false);
        setAdmissionDetails(respons?.data);
        SyncRefresh();
      } else {
        setLoading(false);
      }
      setStudentListLoading(true);
      const response = await handleGetStudentCompleteDetailsCheck(
        userDetails?.user_id
      );
      if (response?.status === 200) {
        setListData(response?.data);
        setStudentListLoading(false);
      } else {
        setStudentListLoading(false);
      }
    } else {
      message.warn("Something went wrong");
    }
  };

  const handleCheckInvoice = () => {
    AdmissionDetails?.invoice
      ? window.open(`${AdmissionDetails?.invoice?.file_path}`, "_blank")
      : message.warning("No invoice");
  };
  const handleClose = () => {
    setCheckModalOpen(false);
    setFiles([]);
    setFileName([]);
    setpayFIle({});
  };

  async function handlePayUpload(e) {
    if (!AdmissionDetails?.invoice) {
      message.warning("Please check invoice first");
    } else {
      setpayFIle(e.target.files[0]);
      if (payFile) {
        setPaySlipUploadLoading(true);
        const formData = new FormData();
        formData.append("student_id", rId);
        formData.append("pay_slip", e.target.files[0]);
        const res = await handleUpoladPaySlip(formData);
        if (res?.status === 201) {
          setPaySlipUploadLoading(false);
          message.success("PaySlip successfully sent");
          setpayFIle({});
          e.target.files[0] = {};
        } else {
          setPaySlipUploadLoading(false);
          message.warn("PaySlip failed to send something went wrong");
          message.error("Select again");
          setpayFIle({});
          e.target.files[0] = {};
        }
      }
    }
  }
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
    const res = await handleSendCommentAgency(data);
    if (res?.status === 201) {
      setComment("");
      onGetCommnets(fid);

      message.success("Comment sent successfully");
    } else {
      message.warn(res?.data?.message || "Failed/Someting went wrong");
    }
  };
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  const sendAndUploadIncompleteFile = async (e) => {
    e.preventDefault();
    console.log("my fid: ", fid);
    console.log("selec file is: ", e.target.files[0]);
    // setInCompleteFile(e.target.files[0]);
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await handleIncompleteUpdateStudentFile(fid, flg, formData);
      if (res?.status === 201) {
        message.success("File successfully uploaded");
        SyncRefresh();
        e.target.value = null;
        e.target.files[0] = null;
      } else {
        message.warn(
          res?.data?.message || "Error uploading/Something went wrong"
        );
        e.target.value = null;
        e.target.files[0] = null;
      }
    } else {
      message.warn("Please select file");
      e.target.value = null;
      e.target.files[0] = null;
    }
  };
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
              {record?.status === 2 && (
                <Tag color="cyan" className=" animate-pulse !text-[17px]">
                  Pending
                </Tag>
              )}
              {record?.status === 1 && (
                <Tag color="green" className=" animate-pulse !text-[17px]">
                  Complete
                </Tag>
              )}
              {record?.status === 0 && (
                <div className="">
                  <div>
                    <Tag color="red" className=" animate-pulse !text-[17px]">
                      Incomplete
                    </Tag>
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
      title: ()=>{
        return <h1 className="text-[20px] font-bold">Action</h1>
      },
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx + 1}>
                <EyeOutlined
                  onClick={() => {
                    window.open(
                      `https://crmbtob.queleadscrm.com/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                  className="text-[25px]"
                />
              </Tooltip>
              {AdmissionDetails?.pay_slip_status !== 1 && (
                <Tooltip title="Remove File" color={"red"} key={idx}>
                  <CloseOutlined
                    onClick={() => {
                      if (record?.status === 1) {
                        message.warn(
                          "Cannot remove completed file contact with ITEC manager"
                        );
                      } else {
                        handleRemoveFile(record?.id, 1);
                      }
                    }}
                    className="text-[25px]"
                  />
                </Tooltip>
              )}
              {record?.status !== 1 && (
                <Tooltip title="Upload file">
                  <input
                    type="file"
                    id="upload-incomplete"
                    onChange={(e) => {
                      sendAndUploadIncompleteFile(e);
                    }}
                    className="hidden"
                  />
                  <label htmlFor="upload-incomplete">
                    <CloudUploadOutlined
                      className="cursor-pointer text-[25px]"
                      onClick={() => {
                        setFid(record?.id);
                        setFlg(1);
                      }}
                    />
                  </label>
                </Tooltip>
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
        return <h1 className="text-[20px] font-bold">File Type</h1>
      },
      dataIndex: "file_type",
      key: "file_type",
      render: (_, record, idx) => {
        return (
          <h1 key={idx} className=" font-bold text-lg">
            {record?.file_type}
          </h1>
        );
      },
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
              {record?.status === 2 && (
                <Tag color="cyan" className=" animate-pulse !text-[17px]">
                  Pending
                </Tag>
              )}
              {record?.status === 1 && (
                <Tag color="green" className=" animate-pulse !text-[17px]">
                  Complete
                </Tag>
              )}
              {record?.status === 0 && (
                <div className="">
                  <div>
                    <Tag color="red" className=" animate-pulse !text-[17px]">
                      Incomplete
                    </Tag>
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
                    onConfirm={onSendComment}
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
      title: ()=>{
        return <h1 className="text-[20px] font-bold">Action</h1>
      },
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        console.log("main record: ", record);
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx}>
                <EyeOutlined
                  onClick={() => {
                    window.open(
                      `https://crmbtob.queleadscrm.com/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                  className="text-[25px]"
                />
              </Tooltip>
              {record?.status !== 1 && (
                <Tooltip title="Upload file">
                  <input
                    type="file"
                    id="upload-incomplete"
                    onChange={(e) => {
                      sendAndUploadIncompleteFile(e, 0);
                    }}
                    className="hidden"
                  />
                  <label htmlFor="upload-incomplete">
                    <CloudUploadOutlined
                      className="cursor-pointer text-[25px]"
                      onClick={() => {
                        setFid(record?.id);
                        setFlg(0);
                      }}
                    />
                  </label>
                </Tooltip>
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
          title=""
          width={"70%"}
          visible={checkModalOpen}
          onCancel={handleClose}
          footer={[
            <Button onClick={handleClose} type="primary">
              Close
            </Button>,
            <Button
              loading={isUpdating}
              className=" !bg-green-500 !text-white"
              onClick={handleUpdate}
            >
              {isUpdating ? "Updating" : "Update"}
            </Button>,
          ]}
        >
          <div className="my-6">
            <div className="flex justify-between items-center">
              <div className="w-[29%]">
                <h1 className="text-[30px] font-bold">File Details</h1>
              </div>
              <div className="flex items-center gap-4 flex-wrap mb-6 w-[69%]  ">
                <input
                  type="file"
                  name="file"
                  multiple
                  id="student-file-upload"
                  onChange={(e) => {
                    handleCheckListFile(e);
                  }}
                  style={{ display: "none" }}
                />
                <div className="flex gap-3 items-center mt-[5px] w-full flex-wrap ">
                  <label
                    htmlFor="student-file-upload"
                    className=" cursor-pointer bg-slate-700 text-white text-center !border-none rounded w-[29%] !ml-auto attchButton flex justify-between items-center !gap-3 !px-14"
                    style={{ border: "1px solid gray" }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                        />
                      </svg>
                    </div>

                    <h1 className="text-white">Attach Student File</h1>
                  </label>
                  {fileName.length > 0 ? (
                    <ul className="w-[69%] h-[70px] overflow-auto">
                      {fileName?.map((item, idx) => {
                        return (
                          <li
                            key={idx}
                            className="text-[green] text-[16px] mt-2"
                          >
                            {item?.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[20px] text-gray-600 m-0 p-0">
                  Student Name:{" "}
                </span>
                <div className="flex items-center gap-2">
                  <h1 className="text-[18px] font-bold m-0">
                    {AdmissionDetails?.student_name}
                  </h1>
                  {AdmissionDetails?.certificate && (
                    <Tag
                      title="Donwload Certificate"
                      color="red"
                      className=" translate-y-[-8px] !self-start w-[200px] !h-[30px] !flex !justify-center !items-center !text-[18px] cursor-pointer motion-safe:animate-pulse absolute top-6 left-[50%] translate-x-[-50%]"
                      onClick={() => {
                        window.open(
                          `${btob_dev}/public/${AdmissionDetails?.certificate}`
                        );
                      }}
                    >
                      Certificate Available
                    </Tag>
                  )}
                </div>
              </div>
              <hr className=" translate-y-[-4px]" />
              <div className="flex items-center gap-4">
                <span className="text-[20px] text-gray-600 ">
                  Course Name:{" "}
                </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.course_name}
                </h1>
              </div>
              <hr className=" translate-y-[3px]" />
              <div className="flex items-center gap-4 mt-2">
                <span className="text-[20px] text-gray-600 ">Status: </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.status === 2 && (
                    <Tag color="cyan" className=" animate-pulse !text-[17px]">
                      Pending
                    </Tag>
                  )}
                  {AdmissionDetails?.status === 1 && (
                    <Tag color="green" className=" animate-pulse !text-[17px]">
                      Complete
                    </Tag>
                  )}
                  {AdmissionDetails?.status === 0 && (
                    <Tag color="red" className=" animate-pulse !text-[17px]">
                      Incomplete
                    </Tag>
                  )}
                </h1>
              </div>
              <hr className=" translate-y-[4px]" />
              <div className="mt-3 flex gap-1 items-center">
                <button
                  className="checkInvoiceButton"
                  onClick={handleCheckInvoice}
                >
                  Check Invoice
                </button>

                <div className="">
                  <input
                    type="file"
                    name="file"
                    id="pay-upload"
                    onChange={handlePayUpload}
                    hidden
                    disabled={paySlipUploadLoading}
                  />
                  <label
                    htmlFor="pay-upload"
                    className="flex justify-center items-center gap-2  rounded bg-gradient-to-l from-green-400 to-green-700 cursor-pointer  text-white !border-none uploadPaySlipButton"
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
                      {paySlipUploadLoading
                        ? "Uploading Pay Slip"
                        : "Upload Pay Slip"}
                    </p>
                  </label>
                  <p className="text-[green] text-[16px] m-0 p-0">
                    {payFile?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            loading={isRefreshing}
            onClick={SyncRefresh}
            className=" float-right rounded-lg mb-3"
          >
            Sync/Refresh
          </Button>
          <div>
            <div>
              <h1 className="mb-[-15px] p-0 text-lg font-bold">
                Mandatory Files
              </h1>
              <Table
                loading={loading}
                columns={mcolumns || []}
                dataSource={mendetroyfileList || []}
                pagination
              />
            </div>
            <div>
              <h1 className="m-0 p-0 text-lg font-bold">Other Files</h1>
              <Table
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

export default CheckDetailsModal;

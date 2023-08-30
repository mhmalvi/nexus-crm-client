import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tag, Tooltip, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  handleGetStudentAdmissionDetailsAgency,
  handleGetStudentAdmissionRequestsDetails,
  handleGetStudentCompleteDetailsCheck,
  handleRemoveFileAgencyCheck,
  handleUpdateStudentFile,
  handleUpoladPaySlip,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";

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

  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "File Status",
      dataIndex: "status",
      key: "status",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              {record?.status === 2 && <Tag color="cyan">Pending</Tag>}
              {record?.status === 1 && <Tag color="green">Complete</Tag>}
              {record?.status === 0 && <Tag color="red">Incomplete</Tag>}
            </div>
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx}>
                <EyeOutlined
                  onClick={() => {
                    window.open(
                      `https://crmbtob.quadque.digital/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
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
                />
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
  const mcolumns = [
    {
      title: "File Type",
      dataIndex: "file_type",
      key: "file_type",
    },
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "File Status",
      dataIndex: "status",
      key: "status",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              {record?.status === 2 && <Tag color="cyan">Pending</Tag>}
              {record?.status === 1 && <Tag color="green">Complete</Tag>}
              {record?.status === 0 && <Tag color="red">Incomplete</Tag>}
            </div>
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Tooltip title="View File" color={"Green"} key={idx}>
                <EyeOutlined
                  onClick={() => {
                    window.open(
                      `https://crmbtob.quadque.digital/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
              <Tooltip title="Remove File" color={"red"} key={idx}>
                <CloseOutlined
                  onClick={() => {
                    if (record?.status === 1) {
                      message.warn(
                        "Cannot remove completed file contact with ITEC manager"
                      );
                    } else {
                      handleRemoveFile(record?.id, 0);
                    }
                  }}
                />
              </Tooltip>
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
                <div className="flex gap-3 items-center mt-[5px] w-full flex-wrap   ">
                  <label
                    htmlFor="student-file-upload"
                    className="py-[5px] px-[15px] cursor-pointer bg-slate-700 text-white text-center border border-slate-700 rounded w-[29%] ml-auto"
                    style={{ border: "1px solid gray" }}
                  >
                    Attach Student File
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
                <h1 className="text-[18px] font-bold m-0">
                  {AdmissionDetails?.student_name}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[20px] text-gray-600 ">
                  Course Name:{" "}
                </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.course_name}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[20px] text-gray-600 ">Status: </span>
                <h1 className="text-[18px] font-bold m-0 p-0">
                  {AdmissionDetails?.status === 2 && (
                    <Tag color="cyan">Pending</Tag>
                  )}
                  {AdmissionDetails?.status === 1 && (
                    <Tag color="green">Complete</Tag>
                  )}
                  {AdmissionDetails?.status === 0 && (
                    <Tag color="red">Incomplete</Tag>
                  )}
                </h1>
              </div>
              <div className="mt-3 flex gap-1 items-center">
                <Button
                  onClick={handleCheckInvoice}
                  className=" !rounded !bg-green-500 !text-white !border-none"
                >
                  Check Invoice
                </Button>

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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-green-400 to-green-700 cursor-pointer  text-white border-none"
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

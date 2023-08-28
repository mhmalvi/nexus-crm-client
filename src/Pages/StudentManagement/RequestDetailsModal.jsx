import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  handleAdmissionStatusChange,
  handleGetStudentAdmissionRequests,
  handleGetStudentAdmissionRequestsDetails,
  handleInvoiceGenerate,
  handleSendMailToInstitute,
} from "../../Components/services/utils";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

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
  const [status, setStatus] = useState(0);
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
  };
  const handleCanclePopupMailbox = () => {
    setSubject("");
    setEmail("");
  };
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
      title: () => {
        return (
          <>
            <div className="flex justify-center items-center gap-4 !m-0 !p-0">
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
                  onClick={() => {
                    window.open(
                      `https://crmbtob.quadque.digital/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
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
      title: () => {
        return (
          <>
            <div className="flex justify-center items-center gap-4 !m-0 !p-0">
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
                  onClick={() => {
                    window.open(
                      `https://crmbtob.quadque.digital/public/${record?.file_path}`,
                      "_blank"
                    );
                  }}
                />
              </Tooltip>
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
          <div className="my-6">
            <div className="flex items-center gap-4 my-4">
              <span className="text-[20px] text-gray-600 m-0 p-0">
                Agency Name:{" "}
              </span>
              <h1 className="text-[18px] font-bold m-0">{res?.agency}</h1>
            </div>
            <div className="flex items-center gap-4 my-4">
              <span className="text-[20px] text-gray-600 m-0 p-0">
                Student Name:{" "}
              </span>
              <h1 className="text-[18px] font-bold m-0">
                {AdmissionDetails?.student_name}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[20px] text-gray-600 ">Course Name: </span>
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
                        // type="password"
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
              <Button
                disabled={AdmissionDetails?.status !== 1}
                className=" !rounded !bg-green-500 !text-white !border-none"
              >
                Send Mail
              </Button>
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
              <Button
                disabled={AdmissionDetails?.status !== 1}
                className=" !rounded !bg-green-500 !text-white !border-none"
              >
                Generate Invoice
              </Button>
            </Popconfirm>
          </div>

          <div>
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

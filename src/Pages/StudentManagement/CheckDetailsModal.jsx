import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tag, Tooltip, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  handleGetStudentAdmissionRequestsDetails,
  handleRemoveFileAgencyCheck,
} from "../../Components/services/utils";

const CheckDetailsModal = ({ checkModalOpen, setCheckModalOpen, rId }) => {
  const [AdmissionDetails, setAdmissionDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdmissionRequestsDetails(rId);
      setLoading(true);
      if (res?.status === 200) {
        setLoading(false);
        setAdmissionDetails(res?.data);
        setFileList(res?.data?.files);
      } else {
        setLoading(false);
      }
    })();
  }, [rId]);
  const handleCheckListFile = (e) => {
    e.preventDefault();
    console.log("I entered file");

    const files = Object.values(e?.target?.files);
    setFiles(files);
    setFileName(files);
    console.log("fdatas: ", files);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append("student_file[]", file));
  };
  const handleRemoveFile = async (fid) => {
    const res = await handleRemoveFileAgencyCheck(fid);
    if (res?.status === 201) {
      setLoading(true);
      const respons = await handleGetStudentAdmissionRequestsDetails(rId);

      if (respons?.status === 200) {
        setLoading(false);
        setAdmissionDetails(respons?.data);
        setFileList(respons?.data?.files);
      } else {
        setLoading(false);
      }
    } else {
      message.warn("Something went wrong");
    }
  };
  const handleClose = () => {
    setCheckModalOpen(false);
    setFiles([]);
    setFileName([]);
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
                    handleRemoveFile(record?.id);
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
              className=" !bg-green-500 !text-white"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
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
              <div className="flex items-center gap-4 my-4">
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
            </div>
          </div>
          <Table
            loading={loading}
            columns={columns || []}
            dataSource={fileList || []}
            pagination
          />
        </Modal>
      </div>
    </>
  );
};

export default CheckDetailsModal;

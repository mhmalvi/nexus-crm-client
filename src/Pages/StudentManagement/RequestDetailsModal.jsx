import { Button, Modal, Table, Tag, Tooltip, message } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  handleAdmissionStatusChange,
  handleGetStudentAdmissionRequestsDetails,
} from "../../Components/services/utils";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";

const RequestDetailsModal = ({ isModalOpen, setIsModalOpen, rId }) => {
  const [AdmissionDetails, setAdmissionDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
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
  console.log("addmission details: ", AdmissionDetails);
  const handleChangeStatus = async (fid, s) => {
    const data = {
      student_id: rId,
      file_id: fid,
      status: s,
    };
    const res = await handleAdmissionStatusChange(data);
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
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
              <Tooltip title="Complete File" color={"cyan"} key={idx}>
                <CheckOutlined
                  onClick={() => {
                    handleChangeStatus(record?.id, 1);
                  }}
                />
              </Tooltip>
              <Tooltip title="Incomplete File" color={"red"} key={idx}>
                <CloseOutlined
                  onClick={() => {
                    handleChangeStatus(record?.id, 0);
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
            <Button key={1} type="primary" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <div className="my-6">
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

export default RequestDetailsModal;

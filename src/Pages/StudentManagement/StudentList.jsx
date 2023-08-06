import { EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handleGetStudentAdmissionRequests } from "../../Components/services/utils";
import RequestDetailsModal from "./RequestDetailsModal";

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rId, setRId] = useState();
  const [requestListLoading, setRequestListLoading] = useState(false);
  const [allAdmissionRequests, setAllAdmissionRequests] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdmissionRequests();
      setRequestListLoading(true);
      if (res?.status === 200) {
        setAllAdmissionRequests(res?.data);
        setRequestListLoading(false);
      } else {
        setRequestListLoading(false);
      }
    })();
  }, []);
  const showRequestAdmissionModal = (id) => {
    setRId(id);
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <Tooltip
              title="View Student for approval"
              color={"purple"}
              key={idx}
            >
              <EyeOutlined
                onClick={() => {
                  showRequestAdmissionModal(record?.id);
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="p-10 w-[95%] mx-auto mt-12">
        <h1 className="text-[30px] font-bold">Admission Requests</h1>
        <Table
          loading={requestListLoading}
          columns={columns || []}
          dataSource={allAdmissionRequests || []}
          pagination
        />
      </div>
      <RequestDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        rId={rId}
      />
    </>
  );
};

export default StudentList;

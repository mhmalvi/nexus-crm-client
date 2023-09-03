import { EyeOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip } from "antd";
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
      title: "Payment Status",
      dataIndex: "payment-status",
      key: "payment-status",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            {(record?.pay_slip_status === 0 || !record?.pay_slip_status) && (
              <Tag color="cyan">Pending</Tag>
            )}
            {record?.pay_slip_status === 1 && <Tag color="green">Approved</Tag>}
            {record?.pay_slip_status === 2 && <Tag color="red">Rejected</Tag>}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            {record?.status === 2 && <Tag color="cyan">Pending</Tag>}
            {record?.status === 1 && <Tag color="green">Complete</Tag>}
            {record?.status === 0 && <Tag color="red">Incomplete</Tag>}
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
        setAllAdmissionRequests={setAllAdmissionRequests}
        setRequestListLoading={setRequestListLoading}
      />
    </>
  );
};

export default StudentList;

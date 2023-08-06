import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import React from "react";
import { useState } from "react";
import CreateStudentModal from "./CreateStudentModal";
import CheckDetailsModal from "./CheckDetailsModal";
import { useEffect } from "react";
import { handleGetStudentCompleteDetailsCheck } from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";

const StudentdetailsAgency = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [rId, setRid] = useState();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await handleGetStudentCompleteDetailsCheck(
        userDetails?.user_id
      );
      if (res?.status === 200) {
        setListData(res?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, [userDetails?.user_id]);
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
            <Tooltip title="View approval details" color={"black"} key={idx}>
              <EyeOutlined
                onClick={() => {
                  setRid(record?.id);
                  setCheckModalOpen(true);
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];
  return (
    <div className="p-10 w-[95%] mx-auto mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Student list</h1>
        <Button
          className=" rounded"
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Create Student
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns || []}
        dataSource={listData || []}
        pagination
      />
      <CreateStudentModal
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
      />
      <CheckDetailsModal
        checkModalOpen={checkModalOpen}
        setCheckModalOpen={setCheckModalOpen}
        rId={rId}
      />
    </div>
  );
};

export default StudentdetailsAgency;

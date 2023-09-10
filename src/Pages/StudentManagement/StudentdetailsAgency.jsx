import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag, Tooltip } from "antd";
import React from "react";
import { useState } from "react";
import CreateStudentModal from "./CreateStudentModal";
import CheckDetailsModal from "./CheckDetailsModal";
import { useEffect } from "react";
import { handleGetStudentCompleteDetailsCheck, handleSearchStudent } from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import Search from "antd/lib/transfer/search";
import axios from "axios";

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
  const [search, setSearch] = useState("");
 


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
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: (_, record, idx) => {
        console.log("invoice has: ", record);
        return (
          <>
            {record?.invoice ? (
              <h1 className=" text-green-600">available</h1>
            ) : (
              <h1 className=" text-red-600">not available</h1>
            )}
          </>
        );
      },
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
            <Tooltip title="View approval details" color={"black"} key={idx}>
              <EyeOutlined
                className="!p-1 text-[25px]"
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

  const onSearch = async ()=>{
    
    if(search){
      setLoading(true);
      const res = await handleSearchStudent({name: search});
      if(res?.status === 200){
        setListData(res?.data)
        setLoading(false);
      }else{
        setLoading(false);
      }
    }else{
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
    }
    
  }
  return (
    <div className="p-10 w-[95%] mx-auto mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Student list</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {/* <label htmlFor="">Search Student</label> */}
            <Input
              value={search}
              placeholder="Search for students"
              style={{
                width: 200,
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchOutlined className=" cursor-pointer" onClick={onSearch} />
          </div>
          <div>
            <Button
              className=" rounded"
              onClick={() => {
                setCreateOpen(true);
              }}
            >
              Create Student
            </Button>
          </div>
        </div>
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
        setListData={setListData}
        setStudentListLoading={setLoading}
      />
      <CheckDetailsModal
        checkModalOpen={checkModalOpen}
        setCheckModalOpen={setCheckModalOpen}
        setListData={setListData}
        setStudentListLoading={setLoading}
        rId={rId}
      />
    </div>
  );
};

export default StudentdetailsAgency;

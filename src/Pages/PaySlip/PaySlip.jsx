import { EyeOutlined } from "@ant-design/icons";
import { Table, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleGetPaySlip } from "../../Components/services/utils";
import { btob_dev } from "../../Components/services/environment";

const PaySlip = () => {
  const [data, setData] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setGetLoading(true);
      const res = await handleGetPaySlip();
      if (res?.status === 200) {
        setGetLoading(false);
        setData(res?.data);
      } else {
        setGetLoading(false);
      }
    })();
  }, []);
  const column = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Agency Name",
      dataIndex: "agency_name",
      key: "agency_name",
    },
    {
      title: "Agency Email",
      dataIndex: "agency_email",
      key: "agency_email",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              <EyeOutlined
                onClick={() => {
                  if (record?.pay_slip) {
                    window.open(`${btob_dev}/public/${record?.pay_slip}`);
                  } else {
                    message.warning("Pay slip not available");
                  }
                }}
              />
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className=" mt-10 p-10">
        <div>
          <h1 className="text-[25px] font-bold">Payment Slip List</h1>
        </div>
        <Table
          loading={getLoading}
          className="!rounded-lg border"
          columns={column || []}
          dataSource={data || []}
          pagination
        />
      </div>
    </>
  );
};

export default PaySlip;

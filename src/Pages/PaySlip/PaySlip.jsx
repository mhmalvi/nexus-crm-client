import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Table, Tag, Tooltip, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  handleChangeStatusPaySlip,
  handleGetPaySlip,
} from "../../Components/services/utils";
import { btob_dev } from "../../Components/services/environment";

const PaySlip = () => {
  const [data, setData] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
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
  const onSyncGetPaySlips = async () => {
    setGetLoading(true);
    const res = await handleGetPaySlip();
    if (res?.status === 200) {
      setGetLoading(false);
      setData(res?.data);
    } else {
      setGetLoading(false);
    }
  };
  const onPlaySlipStatusChange = async (sid, status) => {
    setChangeStatusLoading(true);
    const data = {
      student_id: sid,
      status: status,
    };
    const res = await handleChangeStatusPaySlip(data);
    if (res?.status === 201) {
      setChangeStatusLoading(false);
      message.success(res?.data?.message || "Status changed successfully");
      onSyncGetPaySlips();
    } else {
      setChangeStatusLoading(false);
      message.warn(res?.data?.message || "Failed/ Something went wrong");
    }
  };
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record, idx) => {
        return (
          <>
            <div>
              {record?.pay_slip_status === 0 && <Tag color="blue">Pending</Tag>}
              {record?.pay_slip_status === 1 && (
                <Tag color="green">Approved</Tag>
              )}
              {record?.pay_slip_status === 2 && <Tag color="red">Rejected</Tag>}
            </div>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      align: "center",
      render: (_, record, idx) => {
        console.log("record student id");
        return (
          <>
            <div>
              {changeStatusLoading ? (
                <LoadingOutlined />
              ) : (
                <div className="flex gap-6 items-center justify-center">
                  <Tooltip title="Check Slip">
                    <EyeOutlined
                      className="!p-1 text-[25px]"
                      onClick={() => {
                        if (record?.pay_slip) {
                          window.open(`${btob_dev}/public/${record?.pay_slip}`);
                        } else {
                          message.warning("Pay slip not available");
                        }
                      }}
                    />
                  </Tooltip>
                  {record?.pay_slip_status !== 1 && (
                    <>
                      <Tooltip title="Approve" color="green">
                        <CheckOutlined
                          className="!p-1 cursor-pointer text-[25px]"
                          onClick={() => {
                            // 1 == approve
                            onPlaySlipStatusChange(record?.id, 1);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Reject" color="red">
                        <CloseOutlined
                          className="!p-1 cursor-pointer text-[25px]"
                          onClick={() => {
                            // 2 == reject
                            onPlaySlipStatusChange(record?.id, 2);
                          }}
                        />
                      </Tooltip>
                      </>
                  )}
                </div>
              )}
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

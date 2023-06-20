import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaLessThanEqual } from "react-icons/fa";
import {
  handleFetchLeadsBySalesId,
  handleFetchUnassignedLeadList,
} from "../../Components/services/utils";

const SalesModal = ({ openSalesModel, setOpenSalesModel, salesEmployeeId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [notAssignedLeadsData, setNotAssignedLeadsData] = useState([]);
  const [isByMe, setIsByMe] = useState(true);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenSalesModel(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpenSalesModel(false);
  };

  // leads data by sales employee id
  const assignedByLeadsDataId = async () => {
    const res = await handleFetchLeadsBySalesId(salesEmployeeId);
    setLeadsData(res ? (res?.data ? res?.data : []) : []);
  };
  const notAssignedLeadsDataId = async () => {
    const res = await handleFetchUnassignedLeadList();
    setNotAssignedLeadsData(res ? (res?.data ? res?.data : []) : []);
  };
  useEffect(() => {
    assignedByLeadsDataId();
  }, [salesEmployeeId]);
  useEffect(() => {
    notAssignedLeadsDataId();
  }, [salesEmployeeId]);

  const leadColumn = [
    {
      title: "Lead Name",
      dataIndex: "full_name",
    },
    {
      title: "Lead Id",
      dataIndex: "lead_id",
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      render: (_, record, idx) => {
        return (
          <>
            <div className=" cursor-pointer">
              <Popover content={isByMe ? "Remove" : "Assign"}>
                {isByMe ? <MinusOutlined /> : <PlusOutlined />}
              </Popover>
            </div>
          </>
        );
      },
    },
    //   {
    //     title: "Address",
    //     dataIndex: "address",
    //   },
  ];

  return (
    <div>
      <Modal
        width={1000}
        title="Title"
        open={openSalesModel}
        visible={openSalesModel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div className="flex justify-end gap-4 mb-4">
            <Button
              type={`${isByMe ? "primary" : "default"}`}
              onClick={() => {
                setIsByMe(true);
                // setIsNotByMe(false);
              }}
            >
              Assigned
            </Button>
            <Button
              type={`${!isByMe ? "primary" : "default"}`}
              onClick={() => {
                // setIsNotByMe(true);
                setIsByMe(false);
              }}
            >
              Not Assigned
            </Button>
          </div>
          <Table
            columns={leadColumn || []}
            dataSource={isByMe ? leadsData : notAssignedLeadsData || []}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SalesModal;

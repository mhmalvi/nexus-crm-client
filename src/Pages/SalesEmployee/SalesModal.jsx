import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaLessThanEqual } from "react-icons/fa";
import { handleFetchLeadsBySalesId } from "../../Components/services/utils";

const SalesModal = ({ openSalesModel, setOpenSalesModel, salesEmployeeId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [isByMe, setIsByMe] = useState(true);
  const [isNotByMe, setIsNotByMe] = useState(false);
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
  useEffect(() => {
    (async () => {
      const res = await handleFetchLeadsBySalesId(salesEmployeeId);
      console.log("leads res: ", res);
      setLeadsData(res ? (res?.data ? res?.data : []) : []);
    })();
  }, [salesEmployeeId]);
  console.log("leads by sales: ", leadsData);

  const leadColumn = [
    {
      title: "Lead Name",
      dataIndex: "full_name",
    },
    {
      title: "Lead Id",
      dataIndex: "lead_id",
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
                setIsNotByMe(false);
              }}
            >
              Assigned
            </Button>
            <Button
              type={`${isNotByMe ? "primary" : "default"}`}
              onClick={() => {
                setIsNotByMe(true);
                setIsByMe(false);
              }}
            >
              Not Assigned
            </Button>
          </div>
          <Table columns={leadColumn || []} dataSource={[]} />
        </div>
      </Modal>
    </div>
  );
};

export default SalesModal;

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, Table, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  handleFetchLeadsBySalesId,
  handleFetchUnassignedLeadList,
  handleSalesAssignLead,
  handleSalesRemoveLead,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";

const SalesModal = ({ openSalesModel, setOpenSalesModel, salesEmployeeId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [notAssignedLeadsData, setNotAssignedLeadsData] = useState([]);
  const [isByMe, setIsByMe] = useState(true);
  const userDetails = JSON.parse(localStorage.getItem("user_info"));
  const user = useSelector((state) => state?.user?.userInfo, shallowEqual);
  const handleOk = () => {
    setConfirmLoading(true);
    // setTimeout(() => {
    setOpenSalesModel(false);
    setConfirmLoading(false);
    // }, 1000);
    setIsByMe(true);
  };
  const handleCancel = () => {
    setOpenSalesModel(false);
    setIsByMe(true);
  };
  console.log("selsId: ", salesEmployeeId);

  // leads data by sales employee id
  const assignedByLeadsDataId = async () => {
    setIsLoading(true);
    const res = await handleFetchLeadsBySalesId(salesEmployeeId);
    setLeadsData(res ? (res?.data ? res?.data : []) : []);
    setIsLoading(false);
  };
  // leads data these are not assigned by anybody
  const notAssignedLeadsDataId = async () => {
    setIsLoading(true);
    const res = await handleFetchUnassignedLeadList(user?.client_id);
    setNotAssignedLeadsData(res ? (res?.data ? res?.data : []) : []);
    setIsLoading(false);
  };
  useEffect(() => {
    assignedByLeadsDataId();
  }, [salesEmployeeId]);
  useEffect(() => {
    notAssignedLeadsDataId();
  }, [salesEmployeeId]);

  //assigned leads by sales employee
  const LeadAssign = async (leadId) => {
    const data = {
      lead_id: leadId,
      sales_user_id: salesEmployeeId,
      assign_by: userDetails?.user_id,
    };
    let res = await handleSalesAssignLead(data);
    if (res?.status === 201) {
      message.success(res?.message);
      assignedByLeadsDataId();
      setIsByMe(true);
    } else {
      message.error(res?.message);
    }
  };

  // delete leads from selected employees
  const LeadRemove = async (leadId) => {
    const data = {
      lead_id: leadId,
      sales_user_id: salesEmployeeId,
    };
    let res = await handleSalesRemoveLead(data);
    if (res?.status === 201) {
      message.success(res?.message);
      assignedByLeadsDataId();
    } else {
      message.error(res?.message);
    }
    console.log("Remove Lead: ", res);
  };

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
      title: "Course",
      dataIndex: "course",
      render: (_, record, idx) => {
        return (
          <>
            <div className="">
              {record?.course ? record?.course : <p className="text-[red] m-0 p-0">This Lead has no course</p>}
            </div>
          </>
        );
      },
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
                {isByMe ? (
                  <MinusOutlined
                    onClick={() => {
                      LeadRemove(record.lead_id);
                    }}
                  />
                ) : (
                  <PlusOutlined
                    onClick={() => {
                      LeadAssign(record?.lead_id);
                    }}
                  />
                )}
              </Popover>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        width={1000}
        title={isByMe ? "Assigned Leads" : "Un-Assigned Leads"}
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
              All Leads
            </Button>
          </div>
          <Table
            columns={leadColumn || []}
            dataSource={isByMe ? leadsData : notAssignedLeadsData || []}
            loading={isLoading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SalesModal;

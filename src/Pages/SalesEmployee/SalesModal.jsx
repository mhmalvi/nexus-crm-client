import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popover, Table, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  handleFetchLeadsBySalesId,
  handleFetchUnassignedLeadList,
  handleSalesAssignLead,
  handleSalesRemoveLead,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SalesModal = ({ openSalesModel, setOpenSalesModel, salesEmployeeId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [notAssignedLeadsData, setNotAssignedLeadsData] = useState([]);
  const [isByMe, setIsByMe] = useState(true);
  const [searchName, setSearchName] = useState(
    searchParams.get("Search_Lead_Name") || ""
  );
  const [searchId, setSearchId] = useState(
    searchParams.get("Search_Lead_Id") || ""
  );
  const [searchCourse, setSearchCourse] = useState(
    searchParams.get("Search_Lead_Course") || ""
  );
  const userDetails = JSON.parse(localStorage.getItem("user_info"));
  const user = useSelector((state) => state?.user?.userInfo, shallowEqual);
  const companyId = useSelector(
    (state) => state?.user?.companyId,
    shallowEqual
  );
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
    const res = await handleFetchUnassignedLeadList(
      companyId || user?.client_id
    );
    setNotAssignedLeadsData(res ? (res?.data ? res?.data : []) : []);
    setIsLoading(false);
  };
  useEffect(() => {
    assignedByLeadsDataId();
  }, [salesEmployeeId]);
  useEffect(() => {
    notAssignedLeadsDataId();
  }, [salesEmployeeId]);

  // search features
  useEffect(() => {
    searchParams.set("Search_Lead_Name", searchName || "");
    searchParams.set("Search_Lead_Id", searchId || "");
    searchParams.set("Search_Lead_Course", searchCourse || "");
    setSearchParams(searchParams);
  }, [searchCourse, searchId, searchName, searchParams, setSearchParams]);

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
              {record?.course ? (
                record?.course
              ) : (
                <p className="text-[red] m-0 p-0">This Lead has no course</p>
              )}
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
          {/* Search section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-[24%]">
              <label htmlFor="#">Search By Name</label>
              <div className=" relative">
                <Input
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                  placeholder="Enter Employee Name"
                />
                {searchName ? (
                  <CloseOutlined
                    className=" cursor-pointer absolute right-[2%] top-[25%]"
                    onClick={() => {
                      setSearchName("");
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-[24%] ">
              <label htmlFor="#">Search By Id</label>
              <div className="relative">
                <Input
                  value={searchId}
                  onChange={(e) => {
                    setSearchId(e.target.value);
                  }}
                  placeholder="Enter Employee Email"
                />
                {searchId && (
                  <CloseOutlined
                    className=" cursor-pointer absolute right-[2%] top-[25%]"
                    onClick={() => {
                      setSearchId("");
                    }}
                  />
                )}
              </div>
            </div>
            <div className="w-[24%] ">
              <label htmlFor="#">Search By Course</label>
              <div className="relative">
                <Input
                  value={searchCourse}
                  onChange={(e) => {
                    setSearchCourse(e.target.value);
                  }}
                  placeholder="Enter Employee Email"
                />
                {searchCourse && (
                  <CloseOutlined
                    className=" cursor-pointer absolute right-[2%] top-[25%]"
                    onClick={() => {
                      setSearchCourse("");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/*  */}
          <Table
            columns={leadColumn || []}
            dataSource={
              isByMe
                ? leadsData?.length
                  ? leadsData
                  : []
                : notAssignedLeadsData?.length
                ? notAssignedLeadsData
                : [] || []
            }
            loading={isLoading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SalesModal;

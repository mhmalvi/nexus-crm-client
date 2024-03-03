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
import { useSearchParams } from "react-router-dom";
import ViewLeadCallDetails from "../../Pages/Dashboard/AdminDashboard/ViewLeadCallDetails";
import Loading from "../../Components/Shared/Loader";
import "./salesEmployee.css";

const SalesModal = ({ openSalesModel, setOpenSalesModel, salesEmployeeId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [notAssignedLeadsData, setNotAssignedLeadsData] = useState([]);
  const [isByMe, setIsByMe] = useState(true);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [searchName, setSearchName] = useState(
    searchParams.get("Search_Lead_Name") || ""
  );
  const [searchId, setSearchId] = useState(
    searchParams.get("Search_Lead_Id") || ""
  );
  const [searchCourse, setSearchCourse] = useState(
    searchParams.get("Search_Lead_Course") || ""
  );
  const [openCallCountDetailsModal, setOpenCallCountDetailsModal] =
    useState(false);
  const [clickedLeadId, setClickedLeadId] = useState();
  const userDetails = JSON.parse(localStorage.getItem("user_info"));
  const user = useSelector((state) => state?.user?.userInfo, shallowEqual);
  const companyId = useSelector(
    (state) => state?.user?.companyId,
    shallowEqual
  );
  const handleOk = () => {
    setConfirmLoading(true);
    setOpenSalesModel(false);
    setConfirmLoading(false);
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
    if (salesEmployeeId) {
      assignedByLeadsDataId();
    }
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
      title: "Call Counts",
      dataIndex: "call_count",
      render: (_, record, idx) => {
        return (
          <>
            <div className="items-center flex">
              {record?.call_count ? (
                <button
                  onClick={() => {
                    setClickedLeadId(record.lead_id);
                    setOpenCallCountDetailsModal(true);
                  }}
                  className="bg-zinc-700 text-center rounded-lg border-none text-white m-auto w-[50%]"
                >
                  {record?.call_count ? record?.call_count : 0}
                </button>
              ) : (
                <p className="text-[red] m-0 p-0">This Lead has no calls</p>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "Last Call",
      dataIndex: "last_call",
      render: (_, record, idx) => {
        return (
          <>
            <div className="items-center flex">
              {record?.last_call ? (
                new Date(
                  new Date(record?.last_call).getTime() + 6 * 60 * 60 * 1000
                )
                  ?.toString()
                  ?.slice(0, 24)
              ) : (
                <p className="text-[red] m-0 p-0">This Lead has no calls</p>
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
        );
      },
    },
  ];
  let locale = {
    emptyText: (
      <div className="min-h-[50vh] mt-24">
        <Loading />
      </div>
    ),
  };
  return (
    <div>
      <Modal
        className="salesModal"
        open={openCallCountDetailsModal}
        visible={openCallCountDetailsModal}
        confirmLoading={confirmLoading}
        onCancel={() => setOpenCallCountDetailsModal(false)}
        footer={false}
      >
        <ViewLeadCallDetails
          lead_id={clickedLeadId}
          setOpenCallCountDetailsModal={setOpenCallCountDetailsModal}
        />
      </Modal>
      <Modal
        width={1000}
        open={openSalesModel}
        visible={openSalesModel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="salesModal"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            {isByMe ? (
              <h1 className="m-0 p-0 text-slate-300">Assigned Leads</h1>
            ) : (
              <h1 className="m-0 p-0 text-slate-300">Un-Assigned Leads</h1>
            )}
            <div className="flex justify-end gap-4">
              <Button
                type={`${isByMe ? "primary" : "default"}`}
                onClick={() => {
                  setIsByMe(true);
                }}
              >
                Assigned
              </Button>
              <Button
                type={`${!isByMe ? "primary" : "default"}`}
                onClick={() => {
                  setIsByMe(false);
                }}
                className="!rounded-md"
              >
                All Leads
              </Button>
            </div>
          </div>
          {/* Search section */}
          <Table
            locale={locale}
            className={`${
              colorMode ? "updatedTableDark" : "updatedTableDark"
            }`}
            columns={leadColumn || []}
            dataSource={
              isByMe
                ? leadsData?.length
                  ? leadsData
                  : []
                : notAssignedLeadsData?.length
                ? notAssignedLeadsData
                : []
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default SalesModal;

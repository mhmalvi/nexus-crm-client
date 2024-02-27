import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleGetSalesAdmin } from "../../Components/services/utils";
import SalesModal from "./SalesModal";
import { shallowEqual, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./salesEmployee.css";
import Loading from "../../Components/Shared/Loader";

const Sales = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openSalesModel, setOpenSalesModel] = useState(false);
  const [salesEmployeeId, setSalesEmployeeId] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState();
  const [searchName, setSearchName] = useState(
    searchParams.get("salesEmployeeName") || ""
  );
  const [searchEmail, setSearchEmail] = useState(
    searchParams.get("salesEmployeeEmail") || ""
  );

  const showSalesModal = () => {
    setOpenSalesModel(true);
  };

  const user = useSelector((state) => state?.user?.userInfo, shallowEqual);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const companyId = useSelector(
    (state) => state?.user?.companyId,
    shallowEqual
  );

  useEffect(() => {
    (async () => {
      let response;
      if (companyId !== 0 || user?.client_id !== 0) {
        response = await handleGetSalesAdmin();
      }
      if (response) {
        if (response?.data) {
          setSalesData(response?.data);
        }
      }
    })();
  }, [companyId, user?.client_id]);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_info"));
    if (userDetails) {
      setUserData(userDetails);
    }
  }, []);

  // Search Features
  useEffect(() => {
    searchParams.set("salesEmployeeName", searchName || "");
    searchParams.set("salesEmployeeEmail", searchEmail || "");
    setSearchParams(searchParams);
  }, [searchEmail, searchName, searchParams, setSearchParams]);

  let salesColumn = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  let addLeads = [
    {
      title: "Assign Leads",
      dataIndex: "course_title",
      key: "course_title",
      align: "center",
      render: (_, record, i) => {
        return (
          <div key={i} className="flex gap-2 justify-center">
            {userData?.role_id === 1 || userData?.role_id === 3 ? (
              <Button
                key={i}
                icon={<PlusOutlined />}
                onClick={() => {
                  showSalesModal();
                  setSalesEmployeeId(record?.user_id);
                }}
              ></Button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
  if (userData?.role_id === 1 || userData?.role_id === 3) {
    salesColumn = salesColumn.concat(addLeads);
  }
  let locale = {
    emptyText: (
      <div className="min-h-[50vh] mt-24">
        <Loading />
      </div>
    ),
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="h-[90vh] w-full flex flex-col gap-4 mx-5 rounded-md p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <div
              className={`text-xl font-semibold ${
                colorMode ? "text-white" : "text-gray-800"
              }`}
            >
              All Sales Employees
            </div>
          </div>
          {/* Sales Employees */}
          <div>
            <Table
              locale={locale}
              className={`${
                colorMode ? "updatedTableDark" : "updatedTableLight"
              }`}
              columns={salesColumn || []}
              dataSource={salesData ? (salesData?.length ? salesData : []) : []}
              pagination={{
                defaultPageSize: 20,
                onChange: (pageNum) => {
                  setCurrentPage(pageNum);
                },
                current: currentPage,
              }}
              // loading
              showSorterTooltip={true}
              scroll={{
                x: 600,
                y: "calc(75vh - 5em)",
              }}
            />
          </div>
        </div>
      </div>
      <SalesModal
        salesEmployeeId={salesEmployeeId}
        openSalesModel={openSalesModel}
        setOpenSalesModel={setOpenSalesModel}
      />
    </>
  );
};

export default Sales;

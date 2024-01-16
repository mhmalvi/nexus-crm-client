import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleGetSalesAdmin } from "../../Components/services/utils";
import SalesModal from "./SalesModal";
import { shallowEqual, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const Sales = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openSalesModel, setOpenSalesModel] = useState(false);
  const [salesEmployeeId, setSalesEmployeeId] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      let response;
      if (companyId !== 0 || user?.client_id !== 0) {
        response = await handleGetSalesAdmin();
      }
      if (response) {
        if (response?.data) {
          setSalesData(response?.data);
        }
      }

      setIsLoading(false);
    })();
  }, []);
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

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
          <div className="w-full flex items-center justify-between mb-5">
            <div className={`text-xl font-semibold ${colorMode?"text-white":"text-gray-800"}`}>All Sales Employees</div>
          </div>
          {/* Sales Employees */}
          <div className="mb-6">
            <Table
              style={{
                textTransform: "uppercase",
              }}
              className="updatedTable bg-[#ffffff99] rounded-2xl"
              columns={salesColumn || []}
              dataSource={salesData ? (salesData?.length ? salesData : []) : []}
              pagination={true}
              // loading
              showSorterTooltip={true}
              scroll={{
                x: 600,
                y: 600,
              }}
              loading={isLoading}
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

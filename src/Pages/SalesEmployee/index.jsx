import {
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  handleGetSalesAdmin,
} from "../../Components/services/utils";
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
    // const queryParams = new URLSearchParams(window.location.search);
    // queryParams.set("salesEmployeeName", searchName);
    // queryParams.set("salesEmployeeEmail", searchEmail);
    // const url = "/salesEmployee?" + queryParams.toString();
    // navigate(url);

    searchParams.set("salesEmployeeName", searchName || "");
    searchParams.set("salesEmployeeEmail", searchEmail || "");
    setSearchParams(searchParams);
  }, [searchEmail, searchName, searchParams, setSearchParams]);


  let salesColumn = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",

      // ...getColumnSearchProps("full_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // ...getColumnSearchProps("email"),
    },
  ];
  let addLeads = [
    {
      title: "Assign Leads",
      dataIndex: "course_title",
      key: "course_title",
      align: "center",
      // ...getColumnSearchProps("course_title"),
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
      <div className="w-[90%] mx-auto">
        <div className="w-full flex items-center justify-between mt-18 mb-8">
          <div className="text-xl font-semibold">All Sales Employees</div>
        </div>
        {/* Sales Employees */}
        <div className="mb-6">
          <Table
            style={{
              textTransform: "uppercase",
            }}
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
      <SalesModal
        salesEmployeeId={salesEmployeeId}
        openSalesModel={openSalesModel}
        setOpenSalesModel={setOpenSalesModel}
      />
    </>
  );
};

export default Sales;

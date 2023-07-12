import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleFetchSales } from "../../Components/services/utils";
import SalesModal from "./SalesModal";
import { shallowEqual, useSelector } from "react-redux";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openSalesModel, setOpenSalesModel] = useState(false);
  const [salesEmployeeId, setSalesEmployeeId] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
        response = await handleFetchSales(
          companyId ? companyId : user?.client_id
        );
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
  console.log("sales: ", salesData);

  let salesColumn = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (course_code, i) => (
        <h4
          key={i}
          className="cursor-pointer uppercase"
          style={{
            textTransform: "uppercase",
          }}
        >
          {course_code?.toUpperCase()}
        </h4>
      ),
      // ...getColumnSearchProps("course_code"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // ...getColumnSearchProps("course_title"),
      render: (course_title, i) => (
        <h4 key={i} className="cursor-pointer uppercase">
          {course_title}
        </h4>
      ),
      // width: 150,
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
        console.log("record", record);
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

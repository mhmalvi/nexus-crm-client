import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleFetchSales } from "../../Components/services/utils";
import SalesModal from "./SalesModal";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openSalesModel, setOpenSalesModel] = useState(false);
  const [salesEmployeeId, setSalesEmployeeId] = useState();
  const showSalesModal = () => {
    setOpenSalesModel(true);
  };

  useEffect(() => {
    (async () => {
      const response = await handleFetchSales();
      console.log("res: ", response);
      setSalesData(response ? (response?.data ? response.data : []) : []);
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
            {userData?.role_id === 1 ||
              (userData?.role_id === 3 && (
                <Button
                  key={i}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    showSalesModal();
                    setSalesEmployeeId(record?.user_id);
                  }}
                ></Button>
              ))}
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
        <div className="">
          <Table
            style={{
              textTransform: "uppercase",
            }}
            columns={salesColumn || []}
            dataSource={salesData || []}
            pagination={false}
            // loading
            showSorterTooltip={true}
            scroll={{
              x: 600,
              y: 600,
            }}
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

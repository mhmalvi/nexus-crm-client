import { EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleFetchSales } from "../../Components/services/utils";
import SalesModal from "./SalesModal";
import { shallowEqual, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { useRef } from "react";

const Sales = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState({});
  const [openSalesModel, setOpenSalesModel] = useState(false);
  const [salesEmployeeId, setSalesEmployeeId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const tableSearchInput = useRef(null);
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

  // Table search features
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={tableSearchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm({ closeDropdown: false });
              handleReset(clearFilters);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => tableSearchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#8250FF",
            color: "white",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text?.toString() : ""}
        />
      ) : (
        text
      ),
  });

  let salesColumn = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",

      ...getColumnSearchProps("full_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
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

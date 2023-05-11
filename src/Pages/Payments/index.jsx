import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchClientsInvoiceHistory,
  handleFetchClientsPaymentHistory,
  handleFetchCompanyEmployees,
  handleFetchStudentsInvoiceHistory,
  handleFetchStudentsPaymentHistory,
} from "../../Components/services/company";
import { setLoader } from "../../features/user/userSlice";
import Calendar from "../Dashborad/AdminDashboard/Calendar";
import Filters from "../Dashborad/AdminDashboard/Filters";
import Table from "../Dashborad/AdminDashboard/Table";
import Highlighter from "react-highlight-words";
import { Avatar, Button, Input, Space } from "antd";

const Payment = () => {
  document.title = `Payments`;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userInfo);

  const [allPayments, setAllPayments] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [toggleTabs, setToggleTabs] = useState("payment");
  const [tableHeaders, setTableHeaders] = useState([]);
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);

  // For Search Table Data
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableSearchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm, selectedKeys, dataIndex) => {
    // confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
            onClick={() =>
              clearFilters && handleReset(clearFilters, selectedKeys, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button> */}
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
            backgroundColor: "#ffc069",
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

  useEffect(() => {
    (async () => {
      if (
        userDetails?.role_id === 3 ||
        userDetails?.role_id === 4 ||
        userDetails?.role_id === 5
      ) {
        const paymentHistoryResponse = await handleFetchClientsPaymentHistory(
          userDetails?.client_id
        );

        console.log("paymentHistoryResponse", paymentHistoryResponse);

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
          setAllPayments(paymentHistoryResponse?.data);
        }
      } else if (userDetails?.role_id === 6) {
        const paymentHistoryResponse = await handleFetchStudentsPaymentHistory(
          userDetails?.user_id
        );

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
          setAllPayments(paymentHistoryResponse?.data);
        }
      } else {
        return;
      }
    })();

    (async () => {
      if (
        userDetails?.role_id === 3 ||
        userDetails?.role_id === 4 ||
        userDetails?.role_id === 5
      ) {
        const invoiceHistoryResponse = await handleFetchClientsInvoiceHistory(
          userDetails?.client_id
        );

        console.log("invoiceHistoryResponse", invoiceHistoryResponse);

        if (invoiceHistoryResponse?.status === true) {
          setInvoiceHistory(invoiceHistoryResponse?.data);
          dispatch(setLoader(false));
        }
      } else if (userDetails?.role_id === 6) {
        const invoiceHistoryResponse = await handleFetchStudentsInvoiceHistory(
          userDetails?.user_id
        );

        console.log("invoiceHistoryResponse", invoiceHistoryResponse);

        if (invoiceHistoryResponse?.status === true) {
          setInvoiceHistory(invoiceHistoryResponse?.data);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, userDetails]);

  useEffect(() => {
    const headers = [
      {
        title: "Lead ID",
        dataIndex: "lead_id",
        key: "lead_id",
        fixed: true,
        render: (lead_id) => <h4 className="cursor-pointer">{lead_id}</h4>,
        width: 150,
        ...getColumnSearchProps("lead_id"),
      },
      {
        title: "Date",
        dataIndex: "lead_apply_date",
        key: "lead_apply_date",
        // ...getColumnSearchProps("lead_apply_date"),
        render: (lead_apply_date) => (
          <h4 className="cursor-pointer">
            {/* {new Date(lead_apply_date)
              ?.toString()
              .slice(4, 33)
              ?.replace("GMT", "")} */}
            {new Date(new Date(lead_apply_date).getTime() + 6 * 60 * 60 * 1000)
              ?.toString()
              ?.slice(0, 24)}
          </h4>
        ),
        width: 150,
      },
      {
        title: "Course Code",
        dataIndex: "course_code",
        key: "course_code",
        ...getColumnSearchProps("course_code"),
        render: (code) => <h4 className="cursor-pointer uppercase">{code}</h4>,
        width: 150,
      },
      {
        title: "Course Name",
        dataIndex: "course_title",
        key: "course_title",
        ...getColumnSearchProps("course_title"),
        render: (title) => (
          <h4 className="cursor-pointer uppercase">{title}</h4>
        ),
        width: 300,
      },
      {
        title: "Customer Name",
        dataIndex: "full_name",
        key: "full_name",
        ...getColumnSearchProps("full_name"),
        render: (full_name) => <h4 className="cursor-pointer">{full_name}</h4>,
        width: 150,
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        ...getColumnSearchProps("phone_number"),
        render: (phone_number) => (
          <h4 className="cursor-pointer">{phone_number}</h4>
        ),
        width: 150,
      },
      {
        title: "Location",
        dataIndex: "work_location",
        key: "work_location",
        ...getColumnSearchProps("work_location"),
        render: (location) => (
          <h4 className="cursor-pointer uppercase">{location}</h4>
        ),
        width: 100,
      },
      {
        title: "Campaign ID",
        dataIndex: "campaign_id",
        key: "campaign_id",
        ...getColumnSearchProps("campaign_id"),
        render: (campaign_id) => (
          <h4 className="cursor-pointer">{campaign_id}</h4>
        ),
        width: 150,
      },
      {
        title: "Lead Status",
        dataIndex: "lead_details_status",
        key: "lead_details_status",
        render: (lead_details_status) => (
          <div className="flex items-center">
            {statusColor
              .filter((status) => status.id === lead_details_status)
              .map((lead_status, i) => (
                <div
                  key={i}
                  className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                >
                  <div
                    className={`w-2 h-2 ${lead_status.color} rounded-full`}
                  ></div>
                  <div className="ml-1">{lead_status.title}</div>
                </div>
              ))}
          </div>
        ),
        width: 120,
      },
      {
        title: "Assigned To",
        dataIndex: "sales_user_id",
        key: "sales_user_id",
        render: (sales_user_id) => (
          <div className="flex items-center">
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5) &&
            sales_user_id !== 0 ? (
              <div className="ml-3">
                <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="30"
                  color="#1f262a"
                  name={
                    companyEmployeeList?.find(
                      (employee) => employee?.id === sales_user_id
                    )?.full_name
                  }
                />
              </div>
            ) : null}
          </div>
        ),
        width: 120,
      },
    ];

    setTableHeaders([...headers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyEmployeeList, userDetails?.userInfo]);
  
  useEffect(() => {
    if (filterDate.length) {
      setPaymentData(
        allPayments.filter(
          (payment) =>
            new Date(payment?.created_at)?.toDateString() ===
            new Date(filterDate)?.toDateString()
        )
      );
    } else {
      setPaymentData(allPayments);
    }
  }, [allPayments, filterDate]);

  useEffect(() => {
    (async()=>{
       const fetchEmployees = await handleFetchCompanyEmployees(
         userDetails?.userInfo?.client_id
       );
       if (fetchEmployees?.status === true) {
         setCompanyEmployeeList(fetchEmployees?.data);
       }
    })()
  }, [userDetails]);

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar filterDate={filterDate} setFilterDate={setFilterDate} />
      <Filters layout="Payment" setSearchInput={setSearchInput} />

      {/* <div className="mt-10">
        <button
          className={`${
            toggleTabs === "payment"
              ? "px-3 py-2 text-xs leading-4 font-medium font-poppins border border-black bg-black text-white rounded-full cursor-pointer"
              : "px-3 py-2 text-xs leading-4 font-medium font-poppins border border-black text-black rounded-full cursor-pointer"
          }`}
          onClick={() => setToggleTabs("payment")}
        >
          Payment History
        </button>
        <button
          className={`ml-3 ${
            toggleTabs === "invoice"
              ? "px-3 py-2 text-xs leading-4 font-medium font-poppins border border-black bg-black text-white rounded-full cursor-pointer"
              : "px-3 py-2 text-xs leading-4 font-medium font-poppins border border-black text-black rounded-full cursor-pointer"
          }`}
          onClick={() => setToggleTabs("invoice")}
        >
          Invoice History
        </button>
      </div> */}

      {toggleTabs === "payment" ? (
        <Table
          title="Payment History"
          tableHeaders={paymentHistoryTableHeaders}
          data={paymentData}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      ) : (
        <Table
          title="Invoice History"
          tableHeaders={invoiceHistoryTableHeaders}
          data={invoiceHistory}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}
    </div>
  );
};

export default Payment;

const paymentHistoryTableHeaders = [
  "Lead ID",
  "Date",
  // "Coustomer Name",
  // "Course Code",
  "Transaction ID",
  "Payment Via",
  "Amount",
  "Status",
];

const invoiceHistoryTableHeaders = [
  "Invoice ID",
  "Lead ID",
  "Payer Name",
  "Date",
  "Course Code",
  // "Course Code",
  // "Transaction ID",
  "Amount",
  "Payment Via",
];


const statusColor = [
  {
    id: 0,
    title: "Suspended",
    color: "bg-black",
  },
  {
    id: 1,
    title: "New Lead",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Skilled",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Called",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Paid",
    color: "bg-teal-500",
  },
  {
    id: 5,
    title: "Verified",
    color: "bg-violet-500",
  },
  {
    id: 6,
    title: "Completed",
    color: "bg-red-500",
  },
];

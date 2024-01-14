import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchClientsInvoiceHistory,
  handleFetchClientsPaymentHistory,
  handleFetchCompanyEmployees,
  handleFetchStudentsInvoiceHistory,
  handleFetchStudentsPaymentHistory,
} from "../../Components/services/company";
import { setLoader } from "../../features/user/userSlice";
// import Calendar from "../Dashborad/AdminDashboard/Calendar";
import NoticeForm from "../Dashborad/AdminDashboard/NoticeForm";
import Table from "../Dashborad/AdminDashboard/Table";
import UpdatedTable from "../Dashborad/AdminDashboard/UpdatedTable";
import CalendarSmall from "../Dashborad/AdminDashboard/CalendarSmall";

const Payment = () => {
  document.title = `Payments | Queleads CRM`;

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
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableSearchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm, selectedKeys, dataIndex) => {
    // confirm();
    clearFilters();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
              handleReset(clearFilters, selectedKeys, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Clear
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
            backgroundColor: "#8250FF",
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
      if (userDetails?.role_id === 6) {
        const paymentHistoryResponse = await handleFetchStudentsPaymentHistory(
          userDetails?.user_id
        );

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
          setAllPayments(paymentHistoryResponse?.data);
        }
      } else {
        const paymentHistoryResponse = await handleFetchClientsPaymentHistory(
          userDetails?.client_id
        );

        console.log("paymentHistoryResponse", paymentHistoryResponse);

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
          setAllPayments(paymentHistoryResponse?.data);
        }
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
        width: 100,
        ...getColumnSearchProps("lead_id"),
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        render: (created_at) => (
          <h4 className="cursor-pointer">
            {new Date(new Date(created_at).getTime() + 6 * 60 * 60 * 1000)
              ?.toString()
              ?.slice(0, 24)}
          </h4>
        ),
        width: 120,
      },
      {
        title: "Course Code",
        dataIndex: "course_code",
        key: "course_code",
        ...getColumnSearchProps("course_code"),
        render: (code) => <h4 className="cursor-pointer uppercase">{code}</h4>,
        width: 80,
      },
      {
        title: "Course Title",
        dataIndex: "course_title",
        key: "course_title",
        ...getColumnSearchProps("course_title"),
        render: (title) => (
          <h4 className="cursor-pointer uppercase">{title}</h4>
        ),
        width: 200,
      },
      {
        title: "Amount",
        dataIndex: "payment_amount",
        key: "payment_amount",
        ...getColumnSearchProps("payment_amount"),
        render: (payment_amount) => (
          <h4 className="cursor-pointer uppercase">{payment_amount}</h4>
        ),
        width: 50,
      },
      {
        title: "Transaction ID",
        dataIndex: "transaction_id",
        key: "transaction_id",
        ...getColumnSearchProps("transaction_id"),
        render: (transaction_id) => (
          <h4 className="cursor-pointer">{transaction_id}</h4>
        ),
        width: 150,
      },
      {
        title: "Payment Via",
        dataIndex: "payment_method",
        key: "payment_method",
        ...getColumnSearchProps("payment_method"),
        render: (payment_method) => (
          <h4 className="cursor-pointer">{payment_method}</h4>
        ),
        width: 150,
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
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    console.log("seletedDate", seletedDate);

    if (selectedDay && selectedMonth && selectedYear) {
      setPaymentData(
        allPayments.filter(
          (payment) => payment?.created_at?.slice(0, 10) === seletedDate
        )
      );
    } else {
      setPaymentData(allPayments);
    }
  }, [allPayments, selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    (async () => {
      const fetchEmployees = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.client_id
      );
      if (fetchEmployees?.status === true) {
        setCompanyEmployeeList(fetchEmployees?.data);
      }
    })();
  }, [userDetails]);

  console.log("allPayments", allPayments);
  console.log("paymentData ++++++", paymentData);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-xl backdrop-blur-2xl bg-[#ffffff11] overflow-hidden grid grid-cols-12 gap-4">
        <div className="col-span-9 rounded-xl px-5 shadow-xl backdrop-blur-2xl bg-[#ffffff11]">
          {toggleTabs === "payment" ? (
            <UpdatedTable
              table_title="Payment History"
              tableHeaders={tableHeaders}
              data={paymentData}
              companyEmployeeList={companyEmployeeList}
              filterOptions={null}
              ratings={null}
              activeFilter={1}
              searchInput={searchInput}
              handleSyncLeadsReq={null}
              setIsAddLeadFormOpen={null}
              setSyncLeads={null}
              syncLeads={null}
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
        <div className="col-span-3 flex flex-col justify-around items-center  gap-8 rounded-xl p-5 shadow-xl backdrop-blur-2xl bg-[#ffffff11]">
          <div className="w-full max-h-1/2">
          <NoticeForm layout="Payment" setSearchInput={setSearchInput} />
          </div>
          <div className="max-h-1/2">
          <CalendarSmall
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          /></div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

const invoiceHistoryTableHeaders = [
  "Invoice ID",
  "Lead ID",
  "Payer Name",
  "Date",
  "Course Code",
  "Amount",
  "Payment Via",
];

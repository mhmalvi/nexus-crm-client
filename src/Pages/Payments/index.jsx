import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchClientsInvoiceHistory,
  handleFetchClientsPaymentHistory,
  handleFetchStudentsInvoiceHistory,
  handleFetchStudentsPaymentHistory,
} from "../../Components/services/company";
import { setLoader } from "../../features/user/userSlice";
import Calendar from "../Dashborad/AdminDashboard/Calendar";
import Filters from "../Dashborad/AdminDashboard/Filters";
import Table from "../Dashborad/AdminDashboard/Table";

const Payment = () => {
  document.title = `Payments`;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userInfo);

  const [paymentData, setPaymentData] = useState([]);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toggleTabs, setToggleTabs] = useState("payment");

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
        }
      } else if (userDetails?.role_id === 6) {
        const paymentHistoryResponse = await handleFetchStudentsPaymentHistory(
          userDetails?.user_id
        );

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
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

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar />
      <Filters layout="Payment" setSearchInput={setSearchInput} />

      <div className="mt-10">
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
      </div>

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
  "Amount",
  "Payment Via",
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

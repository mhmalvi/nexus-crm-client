import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchClientsInvoiceHistory,
  handleFetchClientsPaymentHistory,
  handleFetchStudentsInvoiceHistory,
  handleFetchStudentsPaymentHistory,
} from "../../Components/services/company";
import { addPaymentsSlice } from "../../features/Leads/paymentsSlice";
import { setLoader } from "../../features/user/userSlice";
import Calendar from "../Dashborad/AdminDashboard/Calendar";
import Filters from "../Dashborad/AdminDashboard/Filters";
import Table from "../Dashborad/AdminDashboard/Table";

const Payment = () => {
  document.title = `Payments`;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userInfo);
  const payments = useSelector((state) => state?.payments?.payments);

  const [paymentData, setPaymentData] = useState([]);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toggleTabs, setToggleTabs] = useState("payment");

  useEffect(() => {
    dispatch(setLoader(true));

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
          dispatch(addPaymentsSlice(paymentHistoryResponse?.data));
          dispatch(setLoader(false));
        } else {
          setTimeout(() => {
            dispatch(setLoader(false));
          }, 3000);
        }
      } else if (userDetails?.role_id === 6) {
        const paymentHistoryResponse = await handleFetchStudentsPaymentHistory(
          userDetails?.user_id
        );

        console.log("paymentHistoryResponse", paymentHistoryResponse);

        if (paymentHistoryResponse?.status === true) {
          setPaymentData(paymentHistoryResponse?.data);
          dispatch(addPaymentsSlice(paymentHistoryResponse?.data));
          dispatch(setLoader(false));
        } else {
          setTimeout(() => {
            dispatch(setLoader(false));
          }, 3000);
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
          dispatch(addPaymentsSlice(invoiceHistoryResponse?.data));
          dispatch(setLoader(false));
        } else {
          setTimeout(() => {
            dispatch(setLoader(false));
          }, 3000);
        }
      } else if (userDetails?.role_id === 6) {
        const invoiceHistoryResponse = await handleFetchStudentsInvoiceHistory(
          userDetails?.user_id
        );

        console.log("invoiceHistoryResponse", invoiceHistoryResponse);

        if (invoiceHistoryResponse?.status === true) {
          setInvoiceHistory(invoiceHistoryResponse?.data);
          dispatch(addPaymentsSlice(invoiceHistoryResponse?.data));
          dispatch(setLoader(false));
        } else {
          setTimeout(() => {
            dispatch(setLoader(false));
          }, 3000);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (!searchInput.length) {
      setPaymentData(payments);
    } else {
      setPaymentData(
        payments.filter((lead) => lead?.lead_id.includes(searchInput))
      );
    }
  }, [payments, searchInput]);

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

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      {/* {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )} */}
      <Calendar />
      <Filters layout="Payment" setSearchInput={setSearchInput} />

      <div>
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
        />
      ) : (
        <Table
          title="Invoice History"
          tableHeaders={invoiceHistoryTableHeaders}
          data={invoiceHistory}
        />
      )}
    </div>
  );
};

export default Payment;

import React, { useEffect, useState } from "react";
import Calendar from "../Dashborad/AdminDashboard/Calendar";
import Filters from "../Dashborad/AdminDashboard/Filters";
import Table from "../Dashborad/AdminDashboard/Table";
import data from "./paymentData.json";

const Payment = () => {
  document.title = `Payments`;

  const [paymentData, setPaymentData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!searchInput.length) {
      setPaymentData(data);
    } else {
      setPaymentData(data.filter((lead) => lead.lead_id.includes(searchInput)));
    }
  }, [searchInput]);

  const tableHeaders = [
    "ID",
    "Date",
    "Coustomer Name",
    "Course Code",
    "Location",
    "Amount",
    "Payment Via",
  ];

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar />
      <Filters layout="Payment" setSearchInput={setSearchInput} />
      <Table
        title="Payment List"
        tableHeaders={tableHeaders}
        data={paymentData}
      />
    </div>
  );
};

export default Payment;

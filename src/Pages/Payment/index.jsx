import React, { useState } from "react";
import Calendar from "../Dashborad/Calendar";
import Filters from "../Dashborad/Filters";
import Table from "../Dashborad/Table";
import Pay from "./Pay";
import data from "./paymentData.json";

const Payment = () => {
  const [user, setUser] = useState(true);
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
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-24">
      {/* {user ? (
       */}
      <>
        <Pay />
      </>
      {/* 
      ) : ( */}
      <>
        <Calendar />
        <Filters layout="Payment" />
        <Table title="Payment List" tableHeaders={tableHeaders} data={data} />
      </>
      {/* )} */}
    </div>
  );
};

export default Payment;

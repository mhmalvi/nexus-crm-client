import React from "react";
import Calendar from "../Dashborad/Calendar";
import Filters from "../Dashborad/Filters";
import Table from "../Dashborad/Table";
import data from "../Dashborad/leadData.json";

const PaymentStatus = () => {
  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar />
      <Filters />
      <Table data={data} />
    </div>
  );
};

export default PaymentStatus;

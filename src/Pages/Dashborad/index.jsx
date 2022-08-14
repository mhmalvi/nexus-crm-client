import React from "react";
import Table from "./Table";
import data from "./leadData.json";
import Filters from "./Filters";
import Calendar from "./Calendar";

const Dashboard = () => {
  const tableHeaders = [
    "ID",
    "Date",
    "Coustomer Name",
    "Course Code",
    "Location",
    "Amount",
    "Order Status",
  ];

  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar />
      <Filters />
      <Table title="Lead List" tableHeaders={tableHeaders} data={data} />
    </div>
  );
};

export default Dashboard;

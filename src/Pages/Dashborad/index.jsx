import React, { useEffect, useState } from "react";
import Table from "./Table";
import data from "./leadData.json";
import Filters from "./Filters";
import Calendar from "./Calendar";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [leadData, setLeadData] = useState([]);

  const tableHeaders = [
    "ID",
    "Date",
    "Coustomer Name",
    "Course Code",
    "Location",
    "Amount",
    "Order Status",
  ];

  useEffect(() => {
    if (activeFilter === "All" || activeFilter === "Today's Task") {
      setLeadData(data);
    } else {
      setLeadData(data.filter((lead) => lead.order_status === activeFilter));
    }
  }, [activeFilter]);

  console.log(leadData);

  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <Calendar />
      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <Table title="Lead List" tableHeaders={tableHeaders} data={leadData} />
    </div>
  );
};

export default Dashboard;

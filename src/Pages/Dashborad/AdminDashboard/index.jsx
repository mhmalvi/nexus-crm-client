import React, { useEffect, useState } from "react";
import Table from "./Table";
import data from "./leadData.json";
import Filters from "./Filters";
import Calendar from "./Calendar";

const AdminDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeStars, setActiveStars] = useState();
  const [leadData, setLeadData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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


  return (
    <div>
      <Calendar />
      <Filters
        layout="Dashboard"
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeStars={activeStars}
        setActiveStars={setActiveStars}
        setSearchInput={setSearchInput}
      />
      <Table
        title="Lead List"
        tableHeaders={tableHeaders}
        data={leadData}
        activeFilter={activeFilter}
        searchInput={searchInput}
      />
    </div>
  );
};

export default AdminDashboard;

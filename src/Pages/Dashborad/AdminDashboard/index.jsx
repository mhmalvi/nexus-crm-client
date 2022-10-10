import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLeads } from "../../../features/Leads/leadsSlice";
import Calendar from "./Calendar";
import Filters from "./Filters";
import data from "./leadData.json";
import Table from "./Table";

const AdminDashboard = () => {
  const dispatch = useDispatch();

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
    "Campaign ID",
    "Lead Status",
  ];

  useEffect(() => {
    if (activeFilter === "All" || activeFilter === "Today's Task") {
      dispatch(addLeads(data));
      setLeadData(data);
    } else {
      setLeadData(data.filter((lead) => lead.order_status === activeFilter));
    }
  }, [activeFilter, dispatch]);

  // console.log(leadData);

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

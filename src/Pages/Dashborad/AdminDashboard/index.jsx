import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchLeads } from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import Calendar from "./Calendar";
import Filters from "./Filters";
import Table from "./Table";
import data from "./leadData.json";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeStars, setActiveStars] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads(userDetails?.userInfo?.client_id);
      if (response?.data) {
        dispatch(addLeads(response.data));
      } else {
        dispatch(addLeads(data));
      }
      setLeadData(response.data);
    })();
  }, [dispatch, userDetails?.userInfo?.client_id]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    console.log(seletedDate);

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
        )
      );
      console.log(
        "SELECTED DATE",
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
        )
      );
    } else {
      setLeadData(leadList);
    }
  }, [leadList, selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    if (filterDate.length) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === filterDate?.toString()
        )
      );
    } else {
      setLeadData(leadList);
    }
  }, [filterDate, leadList]);

  const handleFilterLeadList = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 0 || filterId === 7) {
      (async () => {
        const response = await handleFetchLeads(
          userDetails?.userInfo?.client_id
        );
        setLeadData(
          response.data.filter((lead) => lead?.lead_details_status !== 0)
        );
        dispatch(addLeads(response.data));
      })();
    } else if (filterId === 8) {
      setLeadData(
        leadList.filter(
          (lead) =>
            parseInt(lead.sales_user_id) ===
            parseInt(userDetails?.userInfo?.user_id)
        )
      );
    } else if (filterId === 9) {
      setLeadData(
        leadList.filter((lead) => parseInt(lead.lead_details_status) === 0)
      );
    } else {
      setLeadData(
        leadList.filter(
          (lead) => parseInt(lead.lead_details_status) === filterId
        )
      );
    }
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList.filter((lead) => parseInt(lead.star_review) === starFilterId - 9)
    );
  };

  return (
    <div>
      <Calendar
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <Filters
        layout="Dashboard"
        handleFilterLeadList={handleFilterLeadList}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeStars={activeStars}
        filterOptions={filterOptions}
        ratings={ratings}
        handleStaredLeadsFilter={handleStaredLeadsFilter}
        setActiveStars={setActiveStars}
        setSearchInput={setSearchInput}
      />
      <Table
        title="Lead List"
        tableHeaders={tableHeaders}
        data={leadData}
        filterOptions={filterOptions}
        ratings={ratings}
        activeFilter={activeFilter}
        searchInput={searchInput}
      />
    </div>
  );
};

export default AdminDashboard;

const filterOptions = [
  {
    id: 1,
    title: "New Lead",
  },
  {
    id: 2,
    title: "Skilled",
  },
  {
    id: 3,
    title: "Called",
  },
  {
    id: 4,
    title: "Paid",
  },
  {
    id: 5,
    title: "Verified",
  },
  {
    id: 6,
    title: "Completed",
  },
  {
    id: 8,
    title: "My Leads",
  },
  {
    id: 9,
    title: "Suspended",
  },
  {
    id: 0,
    title: "All",
  },
  {
    id: 7,
    title: "Today's Task",
  },
];

const ratings = [
  {
    id: 10,
    title: "1 Stars",
  },
  {
    id: 11,
    title: "2 Stars",
  },
  {
    id: 12,
    title: "3 Stars",
  },
  {
    id: 13,
    title: "4 Stars",
  },
  {
    id: 14,
    title: "5 Stars",
  },
];

const tableHeaders = [
  "ID",
  "Date",
  "Coustomer Name",
  "Course Code",
  "Location",
  "Campaign ID",
  "Lead Status",
];

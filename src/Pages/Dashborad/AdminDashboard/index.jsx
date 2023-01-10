import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import {
  handleFetchLeads,
  handleSyncLeads,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import { setLoader } from "../../../features/user/userSlice";
import Calendar from "./Calendar";
import Filters from "./Filters";
import Table from "./Table";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;

  const [activeFilter, setActiveFilter] = useState(
    userDetails?.userInfo?.role_id === 5 ? 1 : 0
  );
  const [activeStars, setActiveStars] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [syncLeads, setSyncLeads] = useState(false);

  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads({
        client_id: userDetails?.userInfo?.client_id,
      });
      if (response?.data) {
        dispatch(addLeads(response.data));
      }

      const fetchEmployees = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.client_id
      );

      if (fetchEmployees?.status === true) {
        setCompanyEmployeeList(fetchEmployees?.data);
      }

      setLeadData(response.data);
    })();
  }, [
    dispatch,
    userDetails?.userInfo?.client_id,
    syncLeads,
    userDetails?.userInfo.role_id,
    userDetails?.client_id,
  ]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    // console.log(seletedDate);

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
        )
      );
      // console.log(
      //   "SELECTED DATE",
      //   leadList.filter(
      //     (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
      //   )
      // );
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
      setLeadData(
        leadList?.filter((lead) => parseInt(lead?.lead_details_status) !== 0)
      );
    } else if (filterId === 8) {
      setLeadData(
        leadList
          .filter(
            (lead) =>
              parseInt(lead.sales_user_id) ===
              parseInt(userDetails?.userInfo?.user_id)
          )
          ?.sort(
            (date1, date2) =>
              new Date(date2.updated_at) - new Date(date1.updated_at)
          )
      );
    } else if (filterId === 9) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.lead_details_status) === 0)
          ?.sort(
            (date1, date2) =>
              new Date(date2.updated_at) - new Date(date1.updated_at)
          )
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

  const handleSyncLeadsReq = async () => {
    console.log("Here", userDetails?.userInfo?.client_id);
    console.log("Hereee", userDetails?.userInfo?.ac_k);

    dispatch(setLoader(true));
    console.log(
      (userDetails?.userInfo?.client_id, userDetails?.userInfo?.ac_k)
    );

    const syncResponse = await handleSyncLeads(
      userDetails?.userInfo?.client_id,
      userDetails?.userInfo?.ac_k
    );

    if (syncResponse?.status) {
      setSyncLeads(!syncLeads);
      dispatch(setLoader(false));
    }
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
        filterOptions={
          userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4
            ? adminFilterOptions
            : salesEmployeesFilterOptions
        }
        ratings={ratings}
        handleStaredLeadsFilter={handleStaredLeadsFilter}
        setActiveStars={setActiveStars}
        setSearchInput={setSearchInput}
      />
      <Table
        title="Lead List"
        tableHeaders={tableHeaders}
        data={leadData}
        companyEmployeeList={companyEmployeeList}
        filterOptions={
          userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4
            ? adminFilterOptions
            : salesEmployeesFilterOptions
        }
        ratings={ratings}
        activeFilter={activeFilter}
        searchInput={searchInput}
        handleSyncLeadsReq={handleSyncLeadsReq}
      />
    </div>
  );
};

export default AdminDashboard;

const adminFilterOptions = [
  {
    id: 0,
    title: "All",
  },
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
    id: 9,
    title: "Suspended",
  },
];

const salesEmployeesFilterOptions = [
  {
    id: 1,
    title: "New Lead",
  },
  // {
  //   id: 0,
  //   title: "All",
  // },
  {
    id: 8,
    title: "My Leads",
  },
  // {
  //   id: 7,
  //   title: "Today's Task",
  // },
];

const ratings = [
  {
    id: 10,
    title: "1 Star",
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
  "Course Code",
  "Customer Name",
  "Location",
  "Campaign ID",
  "Lead Status",
];

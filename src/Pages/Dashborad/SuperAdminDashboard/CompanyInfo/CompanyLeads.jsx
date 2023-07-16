import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchLeads,
  handleSyncLeads,
} from "../../../../Components/services/leads";
import { addLeads } from "../../../../features/Leads/leadsSlice";
import { setLoader } from "../../../../features/user/userSlice";
import Filters from "../../AdminDashboard/Filters";
import Table from "../../AdminDashboard/Table";
import { message } from "antd";

const CompanyLeads = ({ clientId }) => {
  const dispatch = useDispatch();
  const leadList = useSelector((state) => state.leads)?.leads;
  const userDetails = useSelector((state) => state.user);

  const [activeStars, setActiveStars] = useState(0);
  const [activeFilter, setActiveFilter] = useState(
    userDetails?.userInfo?.role_id === 5 ? 1 : 0
  );
  const [leads, setLeads] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [syncLeads, setSyncLeads] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads({
        client_id: clientId,
      });

      if (response?.data) {
        dispatch(addLeads(response.data));
        setLeads(response.data);
      }
    })();
  }, [clientId, dispatch, syncLeads]);

  const handleFilterLeadList = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 0 || filterId === 7) {
      setLeads(
        leadList?.filter((lead) => parseInt(lead?.lead_details_status) !== 0)
      );
    } else if (filterId === 8) {
      setLeads(
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
      setLeads(
        leadList
          .filter((lead) => parseInt(lead.lead_details_status) === 0)
          ?.sort(
            (date1, date2) =>
              new Date(date2.updated_at) - new Date(date1.updated_at)
          )
      );
    } else {
      setLeads(
        leadList.filter(
          (lead) => parseInt(lead.lead_details_status) === filterId
        )
      );
    }
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeads(
      leadList.filter((lead) => parseInt(lead.star_review) === starFilterId - 9)
    );
  };

  const handleSyncLeadsReq = async () => {
    dispatch(setLoader(true));

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
      <Filters
        layout="Dashboard"
        handleFilterLeadList={handleFilterLeadList}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeStars={activeStars}
        filterOptions={
          userDetails?.userInfo?.role_id === 1 ||
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
        data={leads}
        filterOptions={
          userDetails?.userInfo?.role_id === 1 ||
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

export default CompanyLeads;

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

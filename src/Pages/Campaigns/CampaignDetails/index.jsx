import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import activeImg from "../../../assets/Images/active.png";
import inactiveImg from "../../../assets/Images/inactive.png";
import campaignBg from "../../../assets/Images/campaign_bg.jpg";
import {
  handleFetchCampaigns,
  handleFetchLeads,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import Calendar from "../../Dashborad/AdminDashboard/Calendar";
import Filters from "../../Dashborad/AdminDashboard/Filters";
import Table from "../../Dashborad/AdminDashboard/Table";
import data from "../../Dashborad/AdminDashboard/leadData.json";
import campaignData from "../campaignsData.json";
import { addCampaigns } from "../../../features/Leads/campaignSlice";

const CampaignDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;
  const campaignList = useSelector((state) => state.campaigns)?.campaigns;

  // const [campaignList, setCampaignDetails] = useState();
  const [campaignDetails, setCampaignDetails] = useState();
  const [campaignCourses, setCampaignCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeStars, setActiveStars] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");
  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads(userDetails?.userInfo?.client_id);
      if (response?.data) {
        dispatch(addLeads(response?.data));
        console.log(
          "filtered",
          (response?.data).filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(id)
          )
        );
        setLeadData(
          (response?.data).filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(id)
          )
        );
      } else {
        setLeadData(data);
        dispatch(addLeads(data));
      }
    })();

    (async () => {
      const response = await handleFetchCampaigns(
        userDetails?.userInfo?.client_id
      );
      console.log(response.data);
      if (response?.data) {
        dispatch(addCampaigns(response?.data));
        // setCampaignList(response?.data);
      } else {
        dispatch(addCampaigns(campaignData));
        // setCampaignList(campaignData);
      }
    })();
  }, [dispatch, id, userDetails?.userInfo?.client_id]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .filter((lead) => lead.lead_apply_date.slice(0, 10) === seletedDate)
      );
    } else {
      setLeadData(
        leadList?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
      );
    }
  }, [id, leadList, selectedDay, selectedMonth, selectedYear]);

  console.log("leadData >>>>>>>", leadData);

  useEffect(() => {
    setCampaignDetails(
      campaignList?.find(
        (campaign) => parseInt(campaign.campaign_id) === parseInt(id)
      )
    );

    const unique = [
      ...new Set(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .map((item) => item.course_description)
      ),
    ];
    setCampaignCourses(unique);

    if (filterDate.length) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .filter(
            (lead) =>
              lead.lead_apply_date.slice(0, 10) === filterDate?.toString()
          )
      );
    } else {
      setLeadData(
        leadList?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
      );
    }
  }, [campaignList, filterDate, id, leadList]);

  console.log("campaignCourses", campaignCourses);

  // useEffect(() => {
  //   setCampaignCourses(leadList.filter(lead=>lead.campaign_id===id));
  // }, [input]);

  const handleFilterLeadList = (filterId) => {
    console.log("filterId....", filterId);

    setActiveFilter(filterId);
    if (filterId === 0 || filterId === 7) {
      (async () => {
        // const response = await handleFetchLeads(
        //   userDetails?.userInfo?.client_id
        // );
        setLeadData(
          leadList?.filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(id)
          )
        );
        // dispatch(addLeads(response.data));
      })();
    } else if (filterId === 8) {
      setLeadData(
        leadList
          ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          ?.filter(
            (lead) => lead.sales_user_id === userDetails?.userInfo?.user_id
          )
      );
    } else {
      setLeadData(
        leadList
          ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          ?.filter((lead) => parseInt(lead.lead_details_status) === filterId)
      );
    }
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
        ?.filter((lead) => parseInt(lead.star_review) === starFilterId - 8)
    );
  };

  const handleCourseWiseLeads = (course) => {
    console.log("course", course.length);
    console.log(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
        ?.filter((lead) => lead.course_description === course)
    );

    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
        ?.filter((lead) => lead.course_description === course)
    );
  };

  return (
    <div className="bg-white mt-18 2xl:mt-25 pt-1 mx-6 font-poppins">
      {/* Campaign Details */}
      <div
        className="rounded-xl mb-16"
        style={{
          backgroundImage: `url(${campaignBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 backdrop-blur-sm flex justify-between items-start p-16 rounded-xl">
          <div className="border rounded-2xl p-6 bg-white bg-opacity-70">
            <div>
              <h1 className="text-xl leading-8 font-poppins font-semibold">
                {campaignDetails?.campaign_name}
              </h1>
              <div className="mt-8">
                <h1 className="text-base leading-8 font-poppins font-medium">
                  Started Time: {campaignDetails?.start_time}
                </h1>
                <h1 className="text-base leading-8 font-poppins font-medium">
                  End Time: {campaignDetails?.stop_time}
                </h1>
                <div className="flex items-center">
                  <span className="text-base leading-8 font-poppins font-medium mr-2">
                    Status:
                  </span>
                  {campaignDetails?.campaign_status === "ACTIVE" ? (
                    <img className="w-6" src={activeImg} alt="" />
                  ) : (
                    <img className="w-6" src={inactiveImg} alt="" />
                  )}
                  <h1 className="text-base leading-8 font-poppins font-medium ml-1 mb-0">
                    {campaignDetails?.campaign_status}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl p-6 bg-white bg-opacity-70">
            {campaignCourses.map((course) => (
              <div onClick={() => handleCourseWiseLeads(course)}>
                <li className="list-disc rounded-lg font-poppins text-base font-semibold px-2 py-1 my-1 hover:bg-gray-50 hover:bg-opacity-50 transition-all delay-150 cursor-pointer">
                  {course}
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>

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
        layout="Campaign"
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

export default CampaignDetails;

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
    id: 9,
    title: "1 Stars",
  },
  {
    id: 10,
    title: "2 Stars",
  },
  {
    id: 11,
    title: "3 Stars",
  },
  {
    id: 12,
    title: "4 Stars",
  },
  {
    id: 13,
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

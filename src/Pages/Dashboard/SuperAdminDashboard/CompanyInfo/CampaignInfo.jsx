import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import activeImg from "../../../../assets/Images/active.png";
import inactiveImg from "../../../../assets/Images/inactive.png";
import campaignBg from "../../../../assets/Images/campaign_bg.jpg";
import {
  handleFetchCampaigns,
  handleFetchLeads,
} from "../../../../Components/services/leads";
import { addLeads } from "../../../../features/Leads/leadsSlice";
import Calendar from "../../../Dashboard/AdminDashboard/Calendar";
import Filters from "../../../Dashboard/AdminDashboard/Filters";
import Table from "../../../Dashboard/AdminDashboard/Table";
import data from "../../../Dashboard/AdminDashboard/leadData.json";
import { addCampaigns } from "../../../../features/Leads/campaignSlice";

const CampaignInfo = () => {
  const { id } = useParams();
  console.log(id);
  const clientId = id?.split("_")?.[0];
  const campaignId = id?.split("_")?.[1];

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;
  const campaignList = useSelector((state) => state.campaigns)?.campaigns;

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
      const response = await handleFetchLeads({
        client_id: clientId,
      });

      console.log("response", response);

      if (response?.data) {
        dispatch(addLeads(response?.data));
        setLeadData(
          (response?.data).filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
          )
        );
      } else {
        setLeadData(data);
        dispatch(addLeads(data));
      }
    })();

    (async () => {
      const response = await handleFetchCampaigns(clientId);
      console.log(response.data);
      if (response?.data) {
        dispatch(addCampaigns(response?.data));
      }
    })();
  }, [clientId, dispatch, campaignId]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
          .filter((lead) => lead.lead_apply_date.slice(0, 10) === seletedDate)
      );
    } else {
      setLeadData(
        leadList?.filter(
          (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
        )
      );
    }
  }, [campaignId, leadList, selectedDay, selectedMonth, selectedYear]);

  console.log("leadData >>>>>>>", leadData);

  useEffect(() => {
    setCampaignDetails(
      campaignList?.find(
        (campaign) => parseInt(campaign.campaign_id) === parseInt(campaignId)
      )
    );

    document.title = `Campaign - ${
      campaignList?.find(
        (campaign) => parseInt(campaign.campaign_id) === parseInt(campaignId)
      )?.campaign_name
    } | Queleads CRM`;

    const unique = [
      ...new Set(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
          .map((item) => item.course_description)
      ),
    ];

    if (unique[0] !== null) {
      setCampaignCourses(unique);
    } else {
      setCampaignCourses([]);
    }

    if (filterDate?.length) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
          .filter(
            (lead) =>
              lead.lead_apply_date.slice(0, 10) === filterDate?.toString()
          )
      );
    } else {
      setLeadData(
        leadList?.filter(
          (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
        )
      );
    }
  }, [campaignId, campaignList, filterDate, leadList]);

  console.log("campaignCourses", campaignCourses);

  // useEffect(() => {
  //   setCampaignCourses(leadList.filter(lead=>lead.campaign_id===campaignId));
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
            (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
          )
        );
        // dispatch(addLeads(response.data));
      })();
    } else if (filterId === 8) {
      setLeadData(
        leadList
          ?.filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
          )
          ?.filter(
            (lead) => lead.sales_user_id === userDetails?.userInfo?.user_id
          )
      );
    } else {
      setLeadData(
        leadList
          ?.filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(campaignId)
          )
          ?.filter((lead) => parseInt(lead.lead_details_status) === filterId)
      );
    }
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
        ?.filter((lead) => parseInt(lead.star_review) === starFilterId - 8)
    );
  };

  const handleCourseWiseLeads = (course) => {
    // console.log("course", course.length);
    // console.log(
    //   leadList
    //     ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
    //     ?.filter((lead) => lead.course_description === course)
    // );
    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(campaignId))
        ?.filter((lead) => lead.course_description === course)
    );
  };

  console.log("campaignCourses", campaignCourses?.length);

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
          <div className="border rounded-2xl p-6 bg-white bg-opacity-75">
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

                <h1 className="text-lg text-brand-color leading-8 font-poppins font-semibold pt-6">
                  Total Leads:{" "}
                  {
                    leadList?.filter(
                      (lead) =>
                        parseInt(lead.campaign_id) === parseInt(campaignId)
                    )?.length
                  }
                </h1>
              </div>
            </div>
          </div>

          {/* Courses */}
          {campaignCourses?.length > 0 ? (
            <div className="border rounded-2xl p-6 bg-white bg-opacity-75">
              {campaignCourses?.map((course) => (
                <div onClick={() => handleCourseWiseLeads(course)}>
                  <li className="list-disc rounded-lg font-poppins text-base font-semibold px-2 py-1 my-1 hover:bg-gray-50 hover:bg-opacity-50 transition-all delay-150 cursor-pointer">
                    <span>{course}</span>
                    <span className="text-brand-color ml-12 float-right italic">
                      {
                        leadList
                          ?.filter(
                            (lead) =>
                              parseInt(lead.campaign_id) ===
                              parseInt(campaignId)
                          )
                          ?.filter((lead) => lead.course_description === course)
                          ?.length
                      }
                    </span>
                  </li>
                </div>
              ))}
            </div>
          ) : null}
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

export default CampaignInfo;

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
];

const ratings = [
  {
    id: 9,
    title: "1 Star",
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
  "Course Code",
  "Customer Name",
  "Location",
  "Campaign ID",
  "Lead Status",
];

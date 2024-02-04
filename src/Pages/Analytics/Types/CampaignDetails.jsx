import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const CampaignDetails = ({ activeCompany, fullscreen, setFullScreen }) => {
  const [activeCampaign, setActiveCampaign] = useState();
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
  const [campaignsDetails, setCampaignsDetails] = useState([]);
  const [currentYearCampaign, setCurrentYearCampaign] = useState([]);
  const [leads, setLeads] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  useEffect(() => {
    if (getleads) {
      if (getleads?.length) {
        setLeads(getleads);
      }
    }
  }, [getleads, getleads?.length]);

  useEffect(() => {
    const curCampaign = [];

    campaigns?.forEach((cam) => {
      if (cam?.start_time?.toString()?.includes(new Date().getFullYear())) {
        curCampaign.push(cam);
      }
    });
    setCurrentYearCampaign(curCampaign);
  }, [campaigns]);

  useEffect(() => {
    setActiveCampaign(currentYearCampaign?.[0]?.campaign_id);
    setActiveCampaignSummary(currentYearCampaign?.[0]?.campaign_id);
  }, [currentYearCampaign]);

  useEffect(() => {
    // Campaigns Details
    const campaignsDetailsArray = [];
    campaigns?.forEach((campaign) => {
      if (
        campaign?.start_time?.toString()?.includes(new Date().getFullYear())
      ) {
        campaignsDetailsArray.push({
          campaign: campaign?.campaign_name,
          "New Lead": leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 1
            )?.length,
          skilled: leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 2
            )?.length,
          called: leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 3
            )?.length,
          paid: leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 4
            )?.length,
          verified: leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 5
            )?.length,
          completed: leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter(
              (filteredCampaign) => filteredCampaign?.lead_details_status === 6
            )?.length,
        });
      }
    });

    setCampaignsDetails(campaignsDetailsArray);
  }, [campaigns, leads]);
  const handleFullScreen = () => {
    setFullScreen("CampaignDetails");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <div className="w-full rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl p-4 flex flex-col ">
      <div className="flex items-center justify-between m-0">
        <h1
          className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Campaign Details
        </h1>
        <div className="flex items-center">
          <p
            className={`text-xs font-semibold px-4 m-0 py-0 font-poppins ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            This Year
          </p>
          <div
            onClick={handleFullScreen}
            className={`${
              colorMode ? "text-slate-300" : "text-gray-800"
            } hover:scale-110 ease-in duration-100 cursor-pointer`}
          >
            <Icons.Fullscreen />
          </div>
        </div>
      </div>
      <div>
        <rcElement.ResponsiveContainer
          width="100%"
          height={220}
          className="-ml-6"
        >
          <rcElement.BarChart
            width={"100%"}
            height={220}
            data={campaignsDetails}
            margin={{ left: 20 }}
          >
            <rcElement.CartesianGrid strokeDasharray="1 10" />
            <rcElement.XAxis dataKey="campaign" tick={false} axisLine={false} />
            <rcElement.YAxis />
            <rcElement.Tooltip />
            <rcElement.Legend />
            <rcElement.Bar dataKey="New Lead" stackId="lead" fill="#7037FF" />
            <rcElement.Bar dataKey="skilled" stackId="lead" fill="#2f77d6" />
            <rcElement.Bar dataKey="called" stackId="lead" fill="#c72d2d" />
            <rcElement.Bar dataKey="paid" stackId="lead" fill="#17CDD9" />
            <rcElement.Bar dataKey="verified" stackId="lead" fill="#ffa500" />
            <rcElement.Bar dataKey="completed" stackId="lead" fill="#34C759" />
          </rcElement.BarChart>
        </rcElement.ResponsiveContainer>
      </div>
      <Modal
        
        className="analyticModal"
        title="Campaign Details"
        footer={false}
        visible={fullscreen === "CampaignDetails"}
        // onOk={handleOk}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={
          <div className="flex items-center justify-center h-full w-full hover:scale-110">
            <Icons.Minimize />
          </div>
        }
      >
        <div className="h-[70vh]">
          <rcElement.ResponsiveContainer
            width="100%"
            height="100%"
            className="-ml-6"
          >
            <rcElement.BarChart
              width="100%"
              height="100%"
              data={campaignsDetails}
            >
              <rcElement.CartesianGrid strokeDasharray="1 10" />
              <rcElement.XAxis
                dataKey="campaign"
                tick={false}
                axisLine={false}
              />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend />

              <rcElement.Bar dataKey="New Lead" stackId="lead" fill="#7037FF" />
              <rcElement.Bar dataKey="skilled" stackId="lead" fill="#2f77d6" />
              <rcElement.Bar dataKey="called" stackId="lead" fill="#c72d2d" />
              <rcElement.Bar dataKey="paid" stackId="lead" fill="#17CDD9" />
              <rcElement.Bar dataKey="verified" stackId="lead" fill="#ffa500" />
              <rcElement.Bar
                dataKey="completed"
                stackId="lead"
                fill="#34C759"
              />
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetails;

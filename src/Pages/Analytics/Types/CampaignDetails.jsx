import React, { useEffect, useState, useMemo } from "react";
import Icons from "../../../Components/Shared/Icons";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
} from "recharts";
import { Modal } from "antd";
import Loading from "../../../Components/Shared/Loader";

const CampaignDetails = ({ fullscreen, setFullScreen }) => {
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const leads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [loading, setLoading] = useState(true);
  const [currentYearCampaign, setCurrentYearCampaign] = useState([]);

  const campaignsDetails = useMemo(() => {
    const details = [];
    campaigns?.forEach((campaign) => {
      if (campaign?.start_time?.toString().includes(new Date().getFullYear())) {
        const campaignLeads = leads.filter(
          (lead) => lead?.campaign_id === campaign?.campaign_id
        );
        details.push({
          campaign: campaign?.campaign_name,
          "New Lead": campaignLeads.filter((lead) => lead?.lead_details_status === 1).length,
          skilled: campaignLeads.filter((lead) => lead?.lead_details_status === 2).length,
          called: campaignLeads.filter((lead) => lead?.lead_details_status === 3).length,
          paid: campaignLeads.filter((lead) => lead?.lead_details_status === 4).length,
          verified: campaignLeads.filter((lead) => lead?.lead_details_status === 5).length,
          completed: campaignLeads.filter((lead) => lead?.lead_details_status === 6).length,
        });
      }
    });
    return details;
  }, [campaigns, leads]);

  useEffect(() => {
    const curYearCampaign = campaigns?.filter((cam) =>
      cam?.start_time?.toString().includes(new Date().getFullYear())
    );
    setCurrentYearCampaign(curYearCampaign);
  }, [campaigns]);

  useEffect(() => {
    if (campaigns && leads) {
      setLoading(false);
    }
  }, [campaigns, leads]);

  const handleFullScreen = () => {
    setFullScreen("CampaignDetails");
  };

  const handleMinimizeScreen = () => {
    setFullScreen("");
  };

  return (
    <div className="w-full rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11]  p-4 flex flex-col">
      <div className="flex items-center justify-between m-0">
        <h1 className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${colorMode ? "text-slate-300" : "text-gray-800"}`}>
          Campaign Details
        </h1>
        <div className="flex items-center">
          <p className={`text-xs font-semibold px-4 m-0 py-0 font-poppins ${colorMode ? "text-slate-300" : "text-gray-800"}`}>
            This Year
          </p>
          <div onClick={handleFullScreen} className={`${colorMode ? "text-slate-300" : "text-gray-800"} hover:scale-110 ease-in duration-100 cursor-pointer`}>
            <Icons.Fullscreen />
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <ResponsiveContainer width="100%" height={220} className="-ml-6">
            <BarChart width={"100%"} height={220} data={campaignsDetails} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="5 5"/>
              <XAxis dataKey="campaign" tick={false} axisLine={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="New Lead" stackId="lead" fill="#7037FF" />
              <Bar dataKey="skilled" stackId="lead" fill="#2f77d6" />
              <Bar dataKey="called" stackId="lead" fill="#c72d2d" />
              <Bar dataKey="paid" stackId="lead" fill="#17CDD9" />
              <Bar dataKey="verified" stackId="lead" fill="#ffa500" />
              <Bar dataKey="completed" stackId="lead" fill="#34C759" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <Modal
        className="analyticModal"
        title="Campaign Details"
        footer={false}
        visible={fullscreen === "CampaignDetails"}
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
          <ResponsiveContainer width="100%" height="100%" className="-ml-6">
            <BarChart width="100%" height="100%" data={campaignsDetails}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="campaign" tick={false} axisLine={false} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="New Lead" stackId="lead" fill="#7037FF" />
              <Bar dataKey="skilled" stackId="lead" fill="#2f77d6" />
              <Bar dataKey="called" stackId="lead" fill="#c72d2d" />
              <Bar dataKey="paid" stackId="lead" fill="#17CDD9" />
              <Bar dataKey="verified" stackId="lead" fill="#ffa500" />
              <Bar dataKey="completed" stackId="lead" fill="#34C759" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetails;

import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import Icons from "../../../Components/Shared/Icons";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const LeadConversionRatio = ({ activeCompany, fullscreen, setFullScreen }) => {
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getLeads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (getLeads && getLeads.length) {
      setLeads(getLeads);
    }
  }, [getLeads]);

  const campaignRatio = useMemo(() => {
    if (!campaigns || !leads.length) return [];
    
    return campaigns.map((campaign) => {
      const campaignLeads = leads.filter((lead) => lead?.campaign_id === campaign?.campaign_id);
      const conversionRate = campaignLeads.length > 0
        ? (campaignLeads.filter((lead) => lead?.lead_details_status === 6).length / campaignLeads.length * 100).toFixed(2)
        : 0;

      return {
        campaign_name: campaign?.campaign_name,
        rate: parseFloat(conversionRate),
      };
    });
  }, [campaigns, leads]);

  const handleFullScreen = () => {
    setFullScreen("LeadConversionRatio");
  };

  const handleMinimizeScreen = () => {
    setFullScreen("");
  };

  return (
    <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl flex flex-col ">
      <div className="flex items-center justify-between m-0">
        <h1 className={`2xl:text-base text-sm font-semibold 3xl:px-4 m-0 py-0 font-poppins ${colorMode ? "text-slate-300" : "text-gray-800"}`}>
          Lead Conversion Ratio
        </h1>
        <div className="flex items-center">
          <p className={`text-xs font-semibold 2xl:px-4 m-0 py-0 font-poppins ${colorMode ? "text-slate-300" : "text-gray-800"}`}>
            This Year
          </p>
          <div onClick={handleFullScreen} className={`${colorMode ? "text-slate-300" : "text-gray-800"} hover:scale-110 ease-in duration-100 cursor-pointer`}>
            <Icons.Fullscreen />
          </div>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={220} className="-ml-6">
          <BarChart
            width={"100%"}
            height={220}
            data={campaignRatio}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="campaign_name" tick={false} axisLine={false} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend color={`${colorMode ? "#cbd5e1" : "#7037ff"}`} />
            <Bar dataKey="rate" fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`} minPointSize={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Modal
        className="analyticModal"
        title="Lead Conversion Ratio"
        footer={false}
        visible={fullscreen === "LeadConversionRatio"}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={<div className="flex items-center justify-center h-full w-full hover:scale-110"><Icons.Minimize /></div>}
      >
        <div className="h-[70vh]">
          <ResponsiveContainer width="100%" height="100%" className="-ml-6">
            <BarChart
              width="100%"
              height="100%"
              data={campaignRatio}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="campaign_name" tick={false} axisLine={false} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend color={`${colorMode ? "#cbd5e1" : "#7037ff"}`} />
              <Bar dataKey="rate" fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`} minPointSize={1} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default LeadConversionRatio;

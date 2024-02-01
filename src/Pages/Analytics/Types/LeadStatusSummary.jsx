import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import * as chartUtils from "../utils";

const LeadStatusSummary = ({ activeCompany }) => {
  const { Option } = Select;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState();
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
  const [campaignSummary, setCampaignSummary] = useState([]);
  const [currentYearCampaign, setCurrentYearCampaign] = useState([]);
  const [leads, setLeads] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const COLORS = [
    "#34C759",
    "#FF9500",
    "#4F8DEA",
    "#17CDD9",
    "#7037FF",
    "#ff1c24",
  ];

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


  const handleCampaignSummary = (value) => {
    setActiveCampaignSummary(value);
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
  
    if (userDetails?.userInfo?.role_id !== 1) {
      setCampaignSummary([
        {
          status: "New Lead",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 1
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Skilled",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 2
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Called",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 3
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Paid",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 4
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Verified",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 5
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Completed",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 6
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
      ]);
    }
  }, [
    activeCampaign,
    activeCampaignSummary,
    leads,
    userDetails?.userInfo?.role_id,
  ]);


  return (
    <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl py-4 flex flex-col ">
    <div className="flex items-center justify-between m-0">
      <h1
        className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
          colorMode ? "text-slate-300" : "text-gray-800"
        }`}
      >
          Lead Status Summary
        </h1>
        <div className="font-light">
          <Select
            defaultValue={currentYearCampaign?.[0]?.campaign_name}
            placeholder={currentYearCampaign?.[0]?.campaign_name}
            style={{
              width: 240,
            }}
            onChange={handleCampaignSummary}
          >
            {currentYearCampaign?.map((campaign) => (
              <Option key={campaign?.id} value={campaign?.campaign_id}>
                {campaign?.campaign_name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="pt-4">
      <rcElement.ResponsiveContainer
         width="100%"
         height={220}
      >
        <rcElement.PieChart width="100%" height={220}>
          <rcElement.Pie
            activeIndex={activeIndex}
            activeShape={chartUtils.LeadStatusCustomizedLabel}
            data={campaignSummary}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="70%"
            fill={COLORS[activeIndex]}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            <rcElement.Legend />
          </rcElement.Pie>
        </rcElement.PieChart>
      </rcElement.ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadStatusSummary;

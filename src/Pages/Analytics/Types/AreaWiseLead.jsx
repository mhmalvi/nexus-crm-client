import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import { fetchCampaignwisePaymentDataOfCompany } from "../../../Components/services/payment";

const AreaWiseLead = ({ activeCompany }) => {
  const { Option } = Select;
  const [activeCampaign, setActiveCampaign] = useState();
  const [areawiseLeads, setAreawiseLeads] = useState([]);
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
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

  const handleAreaChange = (value) => {
    setActiveCampaign(value);
  };

  useEffect(() => {
    // For Areawise Lead Details
    if (userDetails?.userInfo?.role_id !== 1) {
      setAreawiseLeads([
        {
          city: "New South Wales",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "nsw"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#8884d8",
        },
        {
          city: "Victoria",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "vic"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#83a6ed",
        },
        {
          city: "Queensland",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "qld"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#8dd1e1",
        },
        {
          city: "Western Australia",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "wa"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#82ca9d",
        },
        {
          city: "South Australia",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "sa"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#d0ed57",
        },
        {
          city: "Tasmania",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "tas"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
        {
          city: "Capital Territory",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "act"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
        {
          city: "Northern Territory",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "nt"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
      ]);
    }
  }, [activeCampaign, leads, userDetails?.userInfo?.role_id]);

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

    // For Lead Quality Ratio
    const campaignQualityRatioArray = [];
    campaigns?.forEach((campaign) => {
      if (campaign?.start_time?.toString()?.includes(new Date().getFullYear()))
        campaignQualityRatioArray.push({
          campaign: campaign?.campaign_name,
          rate:
            leads?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === campaign?.campaign_id
                    )
                    ?.filter(
                      (filteredCampaign) => filteredCampaign?.star_review > 2
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === campaign?.campaign_id
                  )?.length
                ).toFixed(2) * 100
              : 0,
        });
    });
  }, [campaigns, leads]);

  useEffect(() => {
    const campaignwiseRevenueData = [];

    (async () => {
      const campaignwiseRevenueResp =
        await fetchCampaignwisePaymentDataOfCompany(
          userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
        );

      if (campaignwiseRevenueResp?.status === 200) {
        campaigns?.forEach((campaign) => {
          if (
            campaign?.start_time?.toString()?.includes(new Date().getFullYear())
          ) {
            campaignwiseRevenueData.push({
              campaign: campaign?.campaign_name,
              revenue: campaignwiseRevenueResp?.data?.find(
                (camp) =>
                  parseInt(camp?.campaigns) === parseInt(campaign?.campaign_id)
              )
                ? campaignwiseRevenueResp?.data?.find(
                    (camp) =>
                      parseInt(camp?.campaigns) ===
                      parseInt(campaign?.campaign_id)
                  )?.sums
                : 0,
            });
          }
        });
      }
    })();
  }, [activeCompany, campaigns, userDetails]);

  return (
    <div className="w-full rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl p-4 flex flex-col ">
      <div className="flex items-center justify-between m-0">
        <h1
          className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Areawise Lead Details
        </h1>
        <div className="font-light">
          <Select
            defaultValue={currentYearCampaign?.[0]?.campaign_name}
            placeholder={currentYearCampaign?.[0]?.campaign_name}
            style={{
              width: 240,
            }}
            onChange={handleAreaChange}
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
        <rcElement.ResponsiveContainer width="100%" height={220}>
          <rcElement.RadarChart
            cx="50%"
            cy="50%"
            activeDot={"dot"}
            outerRadius="70%"
            data={areawiseLeads}
          >
            <rcElement.Tooltip />
            <rcElement.PolarGrid />
            <rcElement.PolarAngleAxis dataKey="city" stroke="#cbd5e1" />
            <rcElement.PolarRadiusAxis />
            <rcElement.Radar
              dataKey="percentage"
              stroke="#8884d8"
              fill="#ffa500"
              activeDot={"dot"}
              dot={true}
              fillOpacity={0.8}
            />
          </rcElement.RadarChart>
        </rcElement.ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaWiseLead;

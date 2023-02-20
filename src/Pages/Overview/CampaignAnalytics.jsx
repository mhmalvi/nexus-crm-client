import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const CampaignAnalytics = () => {
  const { Option } = Select;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState();
  const [areawiseLeads, setAreawiseLeads] = useState([]);
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
  const [campaignSummary, setCampaignSummary] = useState([]);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const leads = useSelector((state) => state.leads?.leads);

  const COLORS = [
    "#34C759",
    "#FF9500",
    "#4F8DEA",
    "#17CDD9",
    "#7037FF",
    "#ff1c24",
  ];

  useEffect(() => {
    setActiveCampaign(campaigns?.[0]?.campaign_id);
    setActiveCampaignSummary(campaigns?.[0]?.campaign_id);
  }, [campaigns]);

  const handleAreaChange = (value) => {
    setActiveCampaign(value);
  };

  const handleCampaignSummary = (value) => {
    setActiveCampaignSummary(value);
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // For Lead Quality Ratio
  const campaignQualityRatio = [];
  campaigns.forEach((campaign) => {
    campaignQualityRatio.push({
      campaign: campaign?.campaign_name,
      rate:
        (
          leads
            ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.filter((filteredCampaign) => filteredCampaign?.star_review > 2)
            ?.length /
          leads?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
            ?.length
        ).toFixed(2) * 100,
    });
  });

  useEffect(() => {
    // For Areawise Lead Details
    setAreawiseLeads([
      {
        city: "New South Wales",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "nsw"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#8884d8",
      },
      {
        city: "Victoria",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "vic"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#83a6ed",
      },
      {
        city: "Queensland",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "qld"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#8dd1e1",
      },
      {
        city: "Western Australia",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "wa"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#82ca9d",
      },
      {
        city: "South Australia",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "sa"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#d0ed57",
      },
      {
        city: "Tasmania",
        percentage:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) => filteredCampaign?.work_location === "tas"
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
        fill: "#a4de6c",
      },
    ]);

    setCampaignSummary([
      {
        status: "New Lead",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 1
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length
          ).toFixed(2) * 100,
      },
      {
        status: "Skilled",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 2
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length
          ).toFixed(2) * 100,
      },
      {
        status: "Called",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 3
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length
          ).toFixed(2) * 100,
      },
      {
        status: "Paid",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 4
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length
          ).toFixed(2) * 100,
      },
      {
        status: "Verified",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 5
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length
          ).toFixed(2) * 100,
      },
      {
        status: "Completed",
        value:
          (
            leads
              ?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.filter(
                (filteredCampaign) =>
                  filteredCampaign?.lead_details_status === 6
              )?.length /
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length
          ).toFixed(2) * 100,
      },
    ]);
  }, [activeCampaign, activeCampaignSummary, leads]);

  // console.log("areawiseLeads", areawiseLeads);

  // Campaigns Details
  const campaignsDetails = [];
  campaigns.forEach((campaign) => {
    campaignsDetails.push({
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
  });

  return (
    <div className="mt-7 font-poppins">
      <div>
        <div className="relative">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Campaigns Details
          </h1>
          <p className="absolute top-6 right-7 float-right font-light">
            Last 30 days
          </p>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.BarChart
              width={500}
              height={300}
              data={campaignsDetails}
              margin={{
                top: 0,
                right: 28,
                left: 0,
                bottom: 5,
              }}
              barSize={30}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="campaign" />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend />
              <rcElement.Bar dataKey="New Lead" stackId="lead" fill="#34C759" />
              <rcElement.Bar dataKey="skilled" stackId="lead" fill="#FF9500" />
              <rcElement.Bar dataKey="called" stackId="lead" fill="#4F8DEA" />
              <rcElement.Bar dataKey="paid" stackId="lead" fill="#17CDD9" />
              <rcElement.Bar dataKey="verified" stackId="lead" fill="#7037FF" />
              <rcElement.Bar
                dataKey="completed"
                stackId="lead"
                fill="#ff1c24"
              />
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Campaigns Revenue
          </h1>
          <p className="absolute top-6 right-7 float-right font-light">
            Last 30 days
          </p>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.LineChart
              width={500}
              height={200}
              data={chartData.campaignRevenueData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="campaign" />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
                label={<chartUtils.CampaignRevenueCustomizedLabel />}
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>

      <div className="mt-12">
        <div className="relative">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Lead Quality Ratio
          </h1>
          <p className="absolute top-6 right-7 float-right font-light">
            Last 30 days
          </p>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.LineChart
              width={500}
              height={200}
              data={campaignQualityRatio}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="campaign" />
              <rcElement.YAxis domain={[0, 100]} />
              <rcElement.Tooltip />
              <rcElement.Legend />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="rate"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>

      <div className="flex mt-12">
        {/* Areawise Lead */}

        <div className="w-1/2 mr-12 border rounded-md p-6">
          <div className="relative">
            <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
              Areawise Lead Details
            </h1>
            <div className="absolute top-6 right-7 float-right font-light">
              <Select
                defaultValue={campaigns?.[0]?.campaign_name}
                placeholder={campaigns?.[0]?.campaign_name}
                style={{
                  width: 240,
                }}
                onChange={handleAreaChange}
              >
                {campaigns?.map((campaign) => (
                  <Option key={campaign?.id} value={campaign?.campaign_id}>
                    {campaign?.campaign_name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="pt-20">
            <rcElement.ResponsiveContainer width="90%" height={300}>
              <rcElement.RadarChart
                cx="50%"
                cy="50%"
                outerRadius="90%"
                data={areawiseLeads}
              >
                <rcElement.PolarGrid />
                <rcElement.PolarAngleAxis dataKey="city" />
                <rcElement.PolarRadiusAxis />
                <rcElement.Radar
                  dataKey="percentage"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.7}
                />
              </rcElement.RadarChart>
            </rcElement.ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Summary */}
        <div className="w-1/2 border rounded-md p-6">
          <div className="relative">
            <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
              Lead Status Summary
            </h1>
            <div className="absolute top-6 right-7 float-right font-light">
              <Select
                defaultValue={campaigns?.[0]?.campaign_name}
                placeholder={campaigns?.[0]?.campaign_name}
                style={{
                  width: 240,
                }}
                onChange={handleCampaignSummary}
              >
                {campaigns?.map((campaign) => (
                  <Option key={campaign?.id} value={campaign?.campaign_id}>
                    {campaign?.campaign_name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <rcElement.ResponsiveContainer
            className="-ml-6"
            width="90%"
            height={450}
          >
            <rcElement.PieChart width={"100%"} height={500}>
              <rcElement.Pie
                activeIndex={activeIndex}
                activeShape={chartUtils.LeadStatusCustomizedLabel}
                data={campaignSummary}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={110}
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
    </div>
  );
};

export default CampaignAnalytics;

import { Select } from "antd";
import React, { useCallback, useState } from "react";
import * as rcElement from "recharts";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const CampaignAnalytics = () => {
  const { Option } = Select;
  const [activeIndex, setActiveIndex] = useState(0);

  const COLORS = [
    "#34C759",
    "#FF9500",
    "#4F8DEA",
    "#17CDD9",
    "#7037FF",
    "#ff1c24",
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleCampaignSummary = (value) => {
    console.log(`selected ${value}`);
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

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
              data={chartData.CampaignDetailsData}
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
              data={chartData.campaignLeadQualityData}
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
                dataKey="revenue"
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
                defaultValue="#cmp1"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                <Option value="#cmp1">#cmp1</Option>
                <Option value="#cmp2">#cmp2</Option>
                <Option value="#cmp3">#cmp3</Option>
                <Option value="#cmp4">#cmp4</Option>
              </Select>
            </div>
          </div>
          <div className="pt-20">
            <rcElement.ResponsiveContainer width="90%" height={300}>
              <rcElement.RadarChart
                cx="50%"
                cy="50%"
                outerRadius="90%"
                data={chartData.AreawiseResponseData}
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
                defaultValue="#cmp1"
                style={{
                  width: 120,
                }}
                onChange={handleCampaignSummary}
              >
                <Option value="#cmp1">#cmp1</Option>
                <Option value="#cmp2">#cmp2</Option>
                <Option value="#cmp3">#cmp3</Option>
                <Option value="#cmp4">#cmp4</Option>
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
                data={chartData.LeadStatusSummaryData}
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

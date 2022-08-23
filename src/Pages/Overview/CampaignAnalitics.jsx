import React from "react";
import * as rcElement from "recharts";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const CampaignAnalitics = () => {
  return (
    <div className="mt-10 font-poppins">
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
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
                label={<chartUtils.CustomizedLabel />}
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10">
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
    </div>
  );
};

export default CampaignAnalitics;

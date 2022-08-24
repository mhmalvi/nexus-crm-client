import React from "react";
import * as rcElement from "recharts";
import * as chartData from "./data";
import * as chartUtils from "./utils";
import { Select } from "antd";

const CompanyRevenue = () => {
  const { Option } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="py-10">
      <div className="mt-4">
        <div className="relative">
          <div className="relative">
            <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
              Company Monthly Revenue Details
            </h1>
            <div className="absolute top-6 right-7 float-right font-light">
              <Select
                defaultValue="ITEC"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                <Option value="#cmp1">ITEC</Option>
                <Option value="#cmp2">Tiger IT</Option>
                <Option value="#cmp3">BS23</Option>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.LineChart
              width={500}
              height={200}
              data={chartData.MonthlyRevenueData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="month" />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                label={<chartUtils.CampaignRevenueCustomizedLabel />}
                activeDot={{ r: 5.5 }}
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CompanyRevenue;

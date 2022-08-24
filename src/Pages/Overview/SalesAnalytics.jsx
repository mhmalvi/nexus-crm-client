import React from "react";
import * as rcElement from "recharts";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const SalesAnalytics = () => {
  return (
    <div className="mt-10">
      <div>
        <div className="relative">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Sales Team Total Sales Details
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
              data={chartData.SalesTeamDetails}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="name" />
              <rcElement.YAxis />
              <rcElement.Legend />
              <rcElement.Tooltip />
              <rcElement.Bar
                dataKey="amount"
                fill="#8884d8"
                shape={<chartUtils.TriangleBar />}
              >
                <rcElement.LabelList
                  dataKey="amount"
                  content={chartUtils.SalesTeamDetailsCustomizedLabel}
                />
              </rcElement.Bar>
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SalesAnalytics;

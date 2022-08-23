import React, { useCallback, useState } from "react";
import * as rcElement from "recharts";
import Icons from "../../Components/Shared/Icons";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const ManagementAnalytics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const COLORS = [
    "#34C759",
    "#FF9500",
    "#4F8DEA",
    "#17CDD9",
    "#7037FF",
    "#ff1c24",
  ];

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <div>
      <div className="flex items-start">
        {/* Overall Summary */}

        <div className="w-1/2 mr-10">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Summary
          </h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">$ 22,880.8</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Total Revenue
                </p>
              </div>
              <div>
                <Icons.Briefcase className="w-5 text-purple-900 text-opacity-80" />
              </div>
            </div>
            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">$ 6099.5</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income (Last Month)
                </p>
              </div>
              <div>
                <Icons.CalendarMonth className="w-5 text-rose-600 text-opacity-60" />
              </div>
            </div>
            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">$ 1009.5</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income (Last Week)
                </p>
              </div>
              <div>
                <Icons.CalendarWeek className="w-5 text-blue-600 text-opacity-60" />
              </div>
            </div>
            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">778</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Total Campaigns
                </p>
              </div>
              <div>
                <Icons.Campaigns className="w-5 text-yellow-500" />
              </div>
            </div>
            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">$ 2,880.8</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income (Per Campaign)
                </p>
              </div>
              <div>
                <Icons.MoneyCheck className="w-5 text-indigo-600 text-opacity-80" />
              </div>
            </div>

            <div className="w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">15</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Seals Team
                </p>
              </div>
              <div>
                <Icons.PeopleGroup className="w-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}

        <div className=" w-1/2">
          <h1 className="text-xl font-semibold mb-4 leading-8 font-poppins">
            Monthly Revenue
          </h1>
          <div>
            <rcElement.ResponsiveContainer width="100%" height={300}>
              <rcElement.LineChart
                width={500}
                height={200}
                data={chartData.MonthlyRevenueData}
                margin={{
                  top: 0,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <rcElement.CartesianGrid strokeDasharray="3 3" />
                <rcElement.XAxis dataKey="month" />
                <rcElement.YAxis />
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

      <div className="mt-10 flex items-start">
        {/* Lead Convertion Ratio */}
        <div className="w-1/2 mr-10">
          <div>
            <h1 className="text-xl font-semibold -mb-8 leading-8 font-poppins">
              Lead Convertion Ratio
            </h1>
          </div>
          <div>
            <p className="mr-14 float-right font-light mt-7 -mb-10">
              Last 30 days
            </p>
            <rcElement.ResponsiveContainer
              className="-ml-6"
              width="100%"
              height={450}
            >
              <rcElement.BarChart
                width={500}
                height={200}
                data={chartData.LeadConvertionData}
                margin={{
                  top: 50,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <rcElement.CartesianGrid strokeDasharray="3 3" />
                <rcElement.XAxis dataKey="campaign" />
                <rcElement.YAxis domain={[0, 100]} />
                <rcElement.Tooltip />
                <rcElement.Legend />
                <rcElement.Bar dataKey="rate" fill="#8884d8" minPointSize={5}>
                  <rcElement.LabelList
                    dataKey="rate"
                    content={chartUtils.LeadConvertionCustomizedLabel}
                  />
                </rcElement.Bar>
              </rcElement.BarChart>
            </rcElement.ResponsiveContainer>
          </div>
        </div>

        {/* Lead Status Summary */}
        <div className="w-1/2">
          <div>
            <h1 className="text-xl font-semibold -mb-7 leading-8 font-poppins">
              Lead Status Summary
            </h1>
            <p className="mr-7.5 -mb-14 mt-7 float-right font-light">
              Last 30 days
            </p>
          </div>

          <rcElement.ResponsiveContainer
            className="-ml-6"
            width="100%"
            height={450}
          >
            <rcElement.PieChart width={500} height={500}>
              <rcElement.Pie
                activeIndex={activeIndex}
                activeShape={chartUtils.LeadStatusCustomizedLabel}
                data={chartData.LeadStatusSummaryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                fill={COLORS[activeIndex]}
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </rcElement.PieChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ManagementAnalytics;

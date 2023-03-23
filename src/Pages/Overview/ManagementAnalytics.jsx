import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import {
  fetchAverageIncomeOfLastWeek,
  fetchMonthPaymentDataOfCompany,
} from "../../Components/services/payment";
import Icons from "../../Components/Shared/Icons";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";

import * as chartUtils from "./utils";

const ManagementAnalytics = ({ comapnyEmployees, activeCompany }) => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state.user)?.loading;
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const leads = useSelector((state) => state.leads?.leads);
  const campaignRatio = [];

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [lastWeekIncome, setLastWeekIncome] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalLastWeekIncome, setTotalLastWeekIncome] = useState(0);

  useEffect(() => {
    dispatch(setLoader(true));
    (async () => {
      const monthlyRevenueResp = await fetchMonthPaymentDataOfCompany(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );

      console.log("monthlyRevenueResp", monthlyRevenueResp);

      if (monthlyRevenueResp?.status === 200) {
        setMonthlyRevenue((monthlyRevenueResp?.data).reverse());
      }

      let totalMonthlyRevenue = 0;
      monthlyRevenueResp?.data?.forEach((rev) => {
        totalMonthlyRevenue += rev?.Income;
      });
      setTotalRevenue(totalMonthlyRevenue);
      dispatch(setLoader(false));
    })();

    (async () => {
      const lastWeekIncomeResp = await fetchAverageIncomeOfLastWeek(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );

      console.log("lastWeekIncomeResp", lastWeekIncomeResp);

      if (lastWeekIncomeResp?.status === 200) {
        setLastWeekIncome(lastWeekIncomeResp?.data);
      }

      let totalLastWeekIncome = 0;
      lastWeekIncomeResp?.data?.forEach((rev) => {
        totalLastWeekIncome += rev?.Income;
      });
      setTotalLastWeekIncome(totalLastWeekIncome);
      dispatch(setLoader(false));
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCompany, userDetails]);

  // console.log("lastWeekIncome", lastWeekIncome);
  // console.log("totalLastWeekIncome", totalLastWeekIncome);
  // console.log("totalRevenue", totalRevenue);

  campaigns?.forEach((campaign) => {
    campaignRatio.push({
      campaign_name: campaign?.campaign_name,
      campaign: "Jan",
      rate:
        leads?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
          ?.length > 0
          ? (
              leads
                ?.filter((lead) => lead?.campaign_id === campaign?.campaign_id)
                ?.filter(
                  (filteredCampaign) =>
                    filteredCampaign?.lead_details_status === 6
                )?.length /
              leads?.filter(
                (lead) => lead?.campaign_id === campaign?.campaign_id
              )?.length
            ).toFixed(2) * 100
          : 0,
    });
  });

  return (
    <div>
      <div className="flex items-start">
        {/* Overall Summary */}

        {loadingDetails && (
          <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}

        <div className="w-1/2 mr-10">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Summary
          </h1>
          <div className="grid grid-cols-2 2xl:grid-cols-3 gap-6">
            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">$ {totalRevenue}</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Total Revenue
                </p>
              </div>
              <div>
                <Icons.Briefcase className="w-5 text-purple-900 text-opacity-80" />
              </div>
            </div>
            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">
                  ${" "}
                  {totalRevenue
                    ? (totalRevenue / (dayjs().month() + 1)).toFixed(2)
                    : 0}
                </h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income (Per Month)
                </p>
              </div>
              <div>
                <Icons.CalendarMonth className="w-5 text-rose-600 text-opacity-60" />
              </div>
            </div>
            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">
                  ${" "}
                  {totalLastWeekIncome
                    ? (totalLastWeekIncome / 7)?.toFixed(2)
                    : 0}
                </h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income Per Day (Last Week)
                </p>
              </div>
              <div>
                <Icons.CalendarWeek className="w-5 text-blue-600 text-opacity-60" />
              </div>
            </div>
            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">{campaigns?.length}</h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Total Campaigns
                </p>
              </div>
              <div>
                <Icons.Campaigns className="w-5 text-yellow-500" />
              </div>
            </div>
            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">
                  ${" "}
                  {totalRevenue > 0
                    ? (totalRevenue / campaigns?.length).toFixed(2)
                    : 0}
                </h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Average Income (Per Campaign)
                </p>
              </div>
              <div>
                <Icons.MoneyCheck className="w-5 text-indigo-600 text-opacity-80" />
              </div>
            </div>

            <div className="w-52 xl:w-56 rounded-lg shadow-md px-6 py-7 border border-gray-50 flex justify-between">
              <div>
                <h1 className="text-lg font-semibold ">
                  {comapnyEmployees?.length}
                </h1>
                <p className="text-xs font-medium text-black text-opacity-70 mb-0">
                  Sales Team
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
            Last 7 Days Income
          </h1>
          <div>
            <rcElement.ResponsiveContainer width="100%" height={300}>
              <rcElement.LineChart
                width={500}
                height={200}
                data={lastWeekIncome}
                margin={{
                  top: 0,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <rcElement.CartesianGrid strokeDasharray="3 3" />
                <rcElement.XAxis dataKey="dates" />
                <rcElement.YAxis />
                <rcElement.Tooltip />
                <rcElement.Legend />
                <rcElement.Line
                  connectNulls
                  type="monotone"
                  dataKey="Income"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </rcElement.LineChart>
            </rcElement.ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-full mt-12">
        <h1 className="text-xl font-semibold mb-4 leading-8 font-poppins">
          Monthly Revenue
        </h1>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.LineChart
              width={500}
              height={200}
              data={monthlyRevenue}
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
              <rcElement.Legend />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="Income"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>

      {/* Lead Convertion Ratio */}
      <div className="mt-10">
        <div>
          <h1 className="text-xl font-semibold -mb-8 leading-8 font-poppins">
            Lead Conversion Ratio
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
              // data={chartData.LeadConvertionData}
              data={campaignRatio}
              margin={{
                top: 50,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="campaign_name" />
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
    </div>
  );
};

export default ManagementAnalytics;

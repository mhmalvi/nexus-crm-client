
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import {
  fetchAverageIncomeOfLastWeek,
  fetchMonthPaymentDataOfCompany,
} from "../../Components/services/payment";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";

import * as chartUtils from "./utils";
import Summary from "./Summary";

const ManagementAnalytics = ({ activeCompany }) => {
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state.user)?.loading;
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const campaignRatio = [];

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [lastWeekIncome, setLastWeekIncome] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalLastWeekIncome, setTotalLastWeekIncome] = useState(0);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (getleads) {
      if (getleads?.length) {
        setLeads(getleads);
      }
    }
  }, [getleads, getleads?.length]);
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
          <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-transparent">
            <Loading />
          </div>
        )}
        <div className="flex justify-between items-center w-full gap-5">

          {/* Income/ Day */}
          <div className=" w-1/2 rounded-xl py-4 flex flex-col h-full ">
            <h1 className={`text-xl font-semibold px-4 font-poppins ${colorMode ? "text-white":"text-gray-800"}`}>
              {/* Last 7 Days Income */}
              Income/Day
            </h1>
            <div className="">
              <rcElement.ResponsiveContainer
                width="100%"
                height={250}
                className={"ml-[-40px]"}
              >
                <rcElement.LineChart
                  width={500}
                  height={200}
                  data={lastWeekIncome}
                  margin={{
                    top: 0,
                    right: 0,
                    left: "0",
                    bottom: 0,
                  }}
                >
                  <rcElement.CartesianGrid strokeDasharray="5 5" />
                  <rcElement.XAxis dataKey="dates" />
                  <rcElement.YAxis />
                  <rcElement.Tooltip />
                  <rcElement.Legend />
                  <rcElement.Line
                    connectNulls
                    type="monotone"
                    dataKey="Income"
                    stroke="#ffa500"
                    fill="#ffa500"
                    className="margin"
                  />
                </rcElement.LineChart>
              </rcElement.ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue */}
      {userDetails?.role_id !== 1 && (
        <div className="w-full mt-12">
          <h1 className={`text-xl font-semibold mb-4 ${colorMode ? "text-white":"text-gray-800"} font-poppins`}>
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
                  stroke="#ffa500"
                  fill="#ffa500"
                />
              </rcElement.LineChart>
            </rcElement.ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Lead Convertion Ratio */}
      <div className="mt-10">
        <div>
          <h1 className={`text-xl font-semibold -mb-8 ${colorMode ? "text-white":"text-gray-800"} font-poppins`}>
            Lead Conversion Ratio
          </h1>
        </div>
        <div>
          <p className="mr-14 float-right font-light mt-7 -mb-10">This Year</p>
          <div>
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
                <rcElement.Legend color="#ffa500"/>
                <rcElement.Bar dataKey="rate" fill="#ffa500" minPointSize={5}>
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
    </div>
  );
};

export default ManagementAnalytics;

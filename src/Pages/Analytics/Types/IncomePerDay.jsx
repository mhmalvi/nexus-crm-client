import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import { fetchAverageIncomeOfLastWeek } from "../../../Components/services/payment";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";

import * as chartUtils from "../utils";

const IncomePerDay = ({ activeCompany }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const campaignRatio = [];

  const [lastWeekIncome, setLastWeekIncome] = useState([]);
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
      dispatch(setLoader(false));
    })();

    (async () => {
      const lastWeekIncomeResp = await fetchAverageIncomeOfLastWeek(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );

      if (lastWeekIncomeResp?.status === 200) {
        setLastWeekIncome(lastWeekIncomeResp?.data);
      }
      dispatch(setLoader(false));
    })();
  }, [activeCompany, dispatch, userDetails]);

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
    <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl flex flex-col ">
      <h1
        className={`text-base font-semibold px-4 m-0 font-poppins ${
          colorMode ? "text-slate-300" : "text-gray-800"
        }`}
      >
        Income/Day
      </h1>
      <div className="">
        <rcElement.ResponsiveContainer
          width="100%"
          height={220}
          className="-ml-6"
        >
          <rcElement.LineChart
            width={"100%"}
            height={220}
            data={lastWeekIncome}
            margin={{
              top: 0,
              right: 20,
              left: 0,
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
              stroke="#cbd5e1"
              fill="#7037ff"
            />
          </rcElement.LineChart>
        </rcElement.ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomePerDay;

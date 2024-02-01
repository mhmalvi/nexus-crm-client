import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
// import { fetchCampaignwisePaymentDataOfCompany } from "../../../Components/services/payment";

const LeadQualityRatio = ({ activeCompany }) => {
  const [campaignQualityRatio, setCampaignQualityRatio] = useState([]);
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

    setCampaignQualityRatio(campaignQualityRatioArray);
  }, [campaigns, leads]);

  // useEffect(() => {
  //   const campaignwiseRevenueData = [];

  //   (async () => {
  //     const campaignwiseRevenueResp =
  //       await fetchCampaignwisePaymentDataOfCompany(
  //         userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
  //       );

  //     if (campaignwiseRevenueResp?.status === 200) {
  //       campaigns?.forEach((campaign) => {
  //         if (
  //           campaign?.start_time?.toString()?.includes(new Date().getFullYear())
  //         ) {
  //           campaignwiseRevenueData.push({
  //             campaign: campaign?.campaign_name,
  //             revenue: campaignwiseRevenueResp?.data?.find(
  //               (camp) =>
  //                 parseInt(camp?.campaigns) === parseInt(campaign?.campaign_id)
  //             )
  //               ? campaignwiseRevenueResp?.data?.find(
  //                   (camp) =>
  //                     parseInt(camp?.campaigns) ===
  //                     parseInt(campaign?.campaign_id)
  //                 )?.sums
  //               : 0,
  //           });
  //         }
  //       });
  //     }
  //   })();
  // }, [activeCompany, campaigns, userDetails]);

  return (
    <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl py-4 flex flex-col ">
      <div className="flex items-center justify-between m-0">
        <h1
          className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Lead Quality Ratio
        </h1>
        <p
          className={`text-xs font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          This Year
        </p>
      </div>
      <div>
        <rcElement.ResponsiveContainer
          width="100%"
          height={220}
          className="-ml-6"
        >
          <rcElement.LineChart
            width={"100%"}
            height={220}
            data={campaignQualityRatio}
            margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <rcElement.CartesianGrid strokeDasharray="1 10" />
            <rcElement.XAxis dataKey="campaign" tick={false} axisLine={false} />
            <rcElement.YAxis domain={[0, 100]} />
            <rcElement.Tooltip />
            <rcElement.Legend />
            <rcElement.Line
              connectNulls
              type="monotone"
              dataKey="rate"
              stroke="#ffa500"
              dot={true}
              activeDot={"dot"}
              fill="#ffa500"
            />
          </rcElement.LineChart>
        </rcElement.ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadQualityRatio;

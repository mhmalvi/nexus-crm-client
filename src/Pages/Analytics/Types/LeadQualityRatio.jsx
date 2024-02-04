import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const LeadQualityRatio = ({ activeCompany, fullscreen, setFullScreen }) => {
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
  
  const handleFullScreen = () => {
    setFullScreen("LeadQualityRatio");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
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
        <div className="flex items-center">
          <p
            className={`text-xs font-semibold px-4 m-0 py-0 font-poppins ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            This Year
          </p>
          <div
            onClick={handleFullScreen}
            className={`${
              colorMode ? "text-slate-300" : "text-gray-800"
            } hover:scale-110 ease-in duration-100 cursor-pointer`}
          >
            <Icons.Fullscreen />
          </div>
        </div>
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
              stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              dot={true}
              activeDot={"dot"}
              fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
            />
          </rcElement.LineChart>
        </rcElement.ResponsiveContainer>
      </div>
      <Modal
        className="analyticModal"
        title="Lead Quality Ratio"
        footer={false}
        visible={fullscreen === "LeadQualityRatio"}
        // onOk={handleOk}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={<div className="flex items-center justify-center h-full w-full hover:scale-110">
        <Icons.Minimize />
      </div>}
      >
        <div className="h-[70vh]"><rcElement.ResponsiveContainer
          width="100%"
          height="100%"
          className="-ml-6"
        >
          <rcElement.LineChart
            width="100%"
            height="100%"
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
              stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              dot={true}
              activeDot={"dot"}
              fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
            />
          </rcElement.LineChart>
        </rcElement.ResponsiveContainer></div></Modal>
    </div>
  );
};

export default LeadQualityRatio;

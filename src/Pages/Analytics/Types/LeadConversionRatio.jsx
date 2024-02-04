import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import { Modal } from "antd";
import Icons from "../../../Components/Shared/Icons";

const LeadConversionRatio = ({ activeCompany, fullscreen, setFullScreen }) => {
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const campaignRatio = [];
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (getleads) {
      if (getleads?.length) {
        setLeads(getleads);
      }
    }
  }, [getleads, getleads?.length]);

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
  const handleFullScreen = () => {
    setFullScreen("LeadConversionRatio");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl flex flex-col ">
      {/* Lead Conversion Ratio */}
      <div className="flex items-center justify-between m-0">
        <h1
          className={`2xl:text-base text-sm font-semibold 3xl:px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Lead Conversion Ratio
        </h1>
        <div className="flex items-center">
          <p
            className={`text-xs font-semibold 2xl:px-4 m-0 py-0 font-poppins ${
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
          <rcElement.BarChart
            width={"100%"}
            height={220}
            data={campaignRatio}
            margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <rcElement.CartesianGrid strokeDasharray="1 10" />
            <rcElement.XAxis
              dataKey="campaign_name"
              tick={false}
              axisLine={false}
            />

            <rcElement.YAxis domain={[0, 100]} />
            <rcElement.Tooltip />
            <rcElement.Legend color={`${colorMode ? "#cbd5e1" : "#7037ff"}`} />
            <rcElement.Bar dataKey="rate" fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`} minPointSize={1} />
          </rcElement.BarChart>
        </rcElement.ResponsiveContainer>
      </div>
      <Modal
        className="analyticModal"
        title="Lead Conversion Ratio"
        footer={false}
        visible={fullscreen === "LeadConversionRatio"}
        // onOk={handleOk}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={<div className="flex items-center justify-center h-full w-full hover:scale-110">
        <Icons.Minimize />
      </div>}
      >
        <div className="h-[70vh]">
          <rcElement.ResponsiveContainer
            width="100%"
            height="100%"
            className="-ml-6"
          >
            <rcElement.BarChart
              width="100%"
              height="100%"
              data={campaignRatio}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="1 10" />
              <rcElement.XAxis
                dataKey="campaign_name"
                tick={false}
                axisLine={false}
              />

              <rcElement.YAxis domain={[0, 100]} />
              <rcElement.Tooltip />
              <rcElement.Legend color={`${colorMode ? "#cbd5e1" : "#7037ff"}`}  />
              <rcElement.Bar dataKey="rate" fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`} minPointSize={1} />
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default LeadConversionRatio;

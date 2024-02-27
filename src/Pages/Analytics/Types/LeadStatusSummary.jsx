import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, Legend, PieChart, Pie } from "recharts";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";
import Loading from "../../../Components/Shared/Loader";
import { LeadStatusCustomizedLabel } from "../utils";
import "./analytic.css";

const LeadStatusSummary = ({ fullscreen, setFullScreen }) => {
  const { Option } = Select;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState();
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
  const [campaignSummary, setCampaignSummary] = useState([]);
  const [currentYearCampaign, setCurrentYearCampaign] = useState([]);
  const [leads, setLeads] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [loading, setLoading] = useState(true);
  const COLORS = [
    "#7037FF",
    "#2f77d6",
    "#c72d2d",
    "#17CDD9",
    "#ffa500",
    "#34C759",
  ];

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
    setActiveCampaign(currentYearCampaign?.[0]?.campaign_id);
    setActiveCampaignSummary(currentYearCampaign?.[0]?.campaign_id);
  }, [currentYearCampaign]);

  const handleCampaignSummary = (value) => {
    setActiveCampaignSummary(value);
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    if (userDetails?.userInfo?.role_id !== 1) {
      setCampaignSummary([
        {
          status: "New Lead",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 1
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Skilled",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 2
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Called",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 3
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Paid",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 4
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Verified",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 5
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
        {
          status: "Completed",
          value:
            leads?.filter((lead) => lead?.campaign_id === activeCampaignSummary)
              ?.length > 0
              ? (
                  leads
                    ?.filter(
                      (lead) => lead?.campaign_id === activeCampaignSummary
                    )
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.lead_details_status === 6
                    )?.length /
                  leads?.filter(
                    (lead) => lead?.campaign_id === activeCampaignSummary
                  )?.length
                ).toFixed(2) * 100
              : 0,
        },
      ]);
      setLoading(false);
    }
  }, [
    activeCampaign,
    activeCampaignSummary,
    leads,
    userDetails?.userInfo?.role_id,
  ]);
  const handleFullScreen = () => {
    setFullScreen("LeadStatusSummary");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };

  return (
    <div className="w-full rounded-md p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] py-4 flex flex-col ">
      <div className="w-full flex gap-4 items-center justify-between m-0">
        <h1
          className={`w-full text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Lead Status Summary
        </h1>

        <div className="w-1/2 flex items-center">
          <Select
            defaultValue={currentYearCampaign?.[0]?.campaign_name}
            placeholder={currentYearCampaign?.[0]?.campaign_name}
            className={`w-5/6 ${
              colorMode ? "statusSummaryDark" : "statusSummaryLight"
            }`}
            onChange={handleCampaignSummary}
          >
            {currentYearCampaign?.map((campaign) => (
              <Option key={campaign?.id} value={campaign?.campaign_id}>
                {campaign?.campaign_name}
              </Option>
            ))}
          </Select>
          <div
            onClick={handleFullScreen}
            className={`${
              colorMode ? "text-slate-300" : "text-gray-800"
            } hover:scale-110 ease-in duration-100 cursor-pointer ml-4`}
          >
            <Icons.Fullscreen />
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart width="100%" height={220}>
              <Pie
                activeIndex={activeIndex}
                activeShape={LeadStatusCustomizedLabel}
                data={campaignSummary}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="70%"
                fill={COLORS[activeIndex]}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                <Legend />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <Modal
        className="analyticModal"
        title="Lead Status Summary"
        footer={false}
        visible={fullscreen === "LeadStatusSummary"}
        // onOk={handleOk}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={
          <div className="flex items-center justify-center h-full w-full hover:scale-110">
            <Icons.Minimize />
          </div>
        }
      >
        <div className="h-[70vh]">
          <Select
            defaultValue={currentYearCampaign?.[0]?.campaign_name}
            placeholder={currentYearCampaign?.[0]?.campaign_name}
            style={{
              width: 240,
            }}
            onChange={handleCampaignSummary}
          >
            {currentYearCampaign?.map((campaign) => (
              <Option key={campaign?.id} value={campaign?.campaign_id}>
                {campaign?.campaign_name}
              </Option>
            ))}
          </Select>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width="100%" height="100%">
              <Pie
                activeIndex={activeIndex}
                activeShape={LeadStatusCustomizedLabel}
                data={campaignSummary}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="70%"
                fill={COLORS[activeIndex]}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                <Legend />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default LeadStatusSummary;

import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as rcElement from "recharts";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";
import "./analytic.css";
import Loading from "../../../Components/Shared/Loader";

const AreaWiseLead = ({ activeCompany, fullscreen, setFullScreen }) => {
  const { Option } = Select;
  const [activeCampaign, setActiveCampaign] = useState();
  const [areawiseLeads, setAreawiseLeads] = useState([]);
  const [activeCampaignSummary, setActiveCampaignSummary] = useState();
  const [currentYearCampaign, setCurrentYearCampaign] = useState([]);
  const [leads, setLeads] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [loading, setLoading] = useState(true);

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

  const handleAreaChange = (value) => {
    setActiveCampaign(value);
  };

  useEffect(() => {
    // For Areawise Lead Details
    if (userDetails?.userInfo?.role_id !== 1) {
      setAreawiseLeads([
        {
          city: "New South Wales",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "nsw"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#8884d8",
        },
        {
          city: "Victoria",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "vic"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#83a6ed",
        },
        {
          city: "Queensland",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "qld"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#8dd1e1",
        },
        {
          city: "Western Australia",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "wa"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#82ca9d",
        },
        {
          city: "South Australia",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "sa"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#d0ed57",
        },
        {
          city: "Tasmania",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "tas"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
        {
          city: "Capital Territory",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "act"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
        {
          city: "Northern Territory",
          percentage:
            leads?.filter((lead) => lead?.campaign_id === activeCampaign)
              ?.length > 0
              ? (
                  leads
                    ?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.filter(
                      (filteredCampaign) =>
                        filteredCampaign?.work_location === "nt"
                    )?.length /
                  leads?.filter((lead) => lead?.campaign_id === activeCampaign)
                    ?.length
                ).toFixed(2) * 100
              : 0,
          fill: "#a4de6c",
        },
      ]);
      setLoading(false)
    }
  }, [activeCampaign, leads, userDetails?.userInfo?.role_id]);

  const handleFullScreen = () => {
    setFullScreen("AreaWiseLead");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <div className="w-full rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl p-4 flex flex-col ">
      <div className="flex items-center justify-between m-0">
        <h1
          className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Areawise Lead Details
        </h1>
        <div className="flex items-center">
          <Select
            defaultValue={currentYearCampaign?.[0]?.campaign_name}
            placeholder={currentYearCampaign?.[0]?.campaign_name}
            style={{
              width: 240,
            }}
            onChange={handleAreaChange}
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
        <div className="pt-4 min-h-32">
          <rcElement.ResponsiveContainer width="100%" height={220}>
            <rcElement.RadarChart
              cx="50%"
              cy="50%"
              activeDot={"dot"}
              outerRadius="70%"
              data={areawiseLeads}
            >
              <rcElement.Tooltip />
              <rcElement.PolarGrid />
              <rcElement.PolarAngleAxis
                dataKey="city"
                stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              />
              <rcElement.PolarRadiusAxis />
              <rcElement.Radar
                dataKey="percentage"
                stroke="#8884d8"
                fill="#7037ff"
                activeDot={"dot"}
                dot={true}
                fillOpacity={0.8}
              />
            </rcElement.RadarChart>
          </rcElement.ResponsiveContainer>
        </div>
      )}

      <Modal
        className="analyticModal"
        title="Areawise Lead Details"
        footer={false}
        visible={fullscreen === "AreaWiseLead"}
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
            onChange={handleAreaChange}
          >
            {currentYearCampaign?.map((campaign) => (
              <Option key={campaign?.id} value={campaign?.campaign_id}>
                {campaign?.campaign_name}
              </Option>
            ))}
          </Select>
          <rcElement.ResponsiveContainer width="100%" height="100%">
            <rcElement.RadarChart
              cx="50%"
              cy="50%"
              activeDot={"dot"}
              outerRadius="70%"
              data={areawiseLeads}
            >
              <rcElement.Tooltip />
              <rcElement.PolarGrid />
              <rcElement.PolarAngleAxis
                dataKey="city"
                stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              />
              <rcElement.PolarRadiusAxis />
              <rcElement.Radar
                dataKey="percentage"
                stroke="#8884d8"
                fill="#7037ff"
                activeDot={"dot"}
                dot={true}
                fillOpacity={0.8}
              />
            </rcElement.RadarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default AreaWiseLead;

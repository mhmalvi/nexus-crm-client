import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { fetchMonthPaymentDataOfCompany } from "../../../Components/services/payment";
import { setLoader } from "../../../features/user/userSlice";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const MonthlyRevenue = ({ activeCompany, fullscreen, setFullScreen }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user?.userInfo);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const getleads = useSelector((state) => state.leads?.leads);
  const colorMode = useSelector((state) => state.user?.colorMode);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    const fetchData = async () => {
      const monthlyRevenueResp = await fetchMonthPaymentDataOfCompany(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );
      if (monthlyRevenueResp?.status === 200) {
        setMonthlyRevenue(monthlyRevenueResp?.data.reverse());
      }
      dispatch(setLoader(false));
    };
    fetchData();
  }, [activeCompany, userDetails, dispatch]);

  useEffect(() => {
    if (getleads?.length) {
      setLeads(getleads);
    }
  }, [getleads]);

  const campaignRatio = useMemo(() => {
    if (!campaigns || !leads.length) return [];
    return campaigns.map((campaign) => ({
      campaign_name: campaign.campaign_name,
      campaign: "Jan",
      rate:
        leads.filter((lead) => lead.campaign_id === campaign.campaign_id)
          .length > 0
          ? (
              leads
                .filter((lead) => lead.campaign_id === campaign.campaign_id)
                .filter((filteredCampaign) => filteredCampaign.lead_details_status === 6)
                .length /
              leads.filter((lead) => lead.campaign_id === campaign.campaign_id)
                .length
            ).toFixed(2) * 100
          : 0,
    }));
  }, [campaigns, leads]);

  const handleFullScreen = () => {
    setFullScreen("MonthlyRevenue");
  };

  const handleMinimizeScreen = () => {
    setFullScreen("");
  };

  return (
    <>
      <div className="w-full rounded-md p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] py-4 flex flex-col ">
        <div className="w-full flex justify-between items-center">
          <h1
            className={`text-base font-semibold px-4 m-0 font-poppins ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            Monthly Revenue
          </h1>
          <div
            onClick={handleFullScreen}
            className={`${
              colorMode ? "text-slate-300" : "text-gray-800"
            } hover:scale-110 ease-in duration-100 cursor-pointer`}
          >
            <Icons.Fullscreen />
          </div>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={220} className="-ml-6">
            <LineChart
              width={"100%"}
              height={220}
              data={monthlyRevenue}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                connectNulls
                type="monotone"
                dataKey="Income"
                stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Modal
        className="analyticModal"
        title="Monthly Revenue"
        footer={false}
        visible={fullscreen === "MonthlyRevenue"}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={<div className="flex items-center justify-center h-full w-full hover:scale-110">
        <Icons.Minimize />
      </div>}
      >
        {fullscreen === "MonthlyRevenue" && (
          <div className="h-[70vh]">
            <ResponsiveContainer width="100%" height="100%" className="-ml-6">
              <LineChart
                width="100%"
                height="100%"
                data={monthlyRevenue}
                margin={{
                  top: 0,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend className="bg-[#fc00ff]" />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey="Income"
                  stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                  fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MonthlyRevenue;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import { fetchMonthPaymentDataOfCompany } from "../../../Components/services/payment";
import { setLoader } from "../../../features/user/userSlice";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const MonthlyRevenue = ({ activeCompany, fullscreen, setFullScreen }) => {
  const dispatch = useDispatch();
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
  const handleFullScreen = () => {
    setFullScreen("MonthlyRevenue");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <>
      {/* Monthly Revenue */}
      {userDetails?.role_id !== 1 && (
        <div className="w-full rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl py-4 flex flex-col ">
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
            <rcElement.ResponsiveContainer
              width="100%"
              height={220}
              className="-ml-6"
            >
              <rcElement.LineChart
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
                <rcElement.CartesianGrid strokeDasharray="1 10" />
                <rcElement.XAxis dataKey="month" />
                <rcElement.YAxis />
                <rcElement.Tooltip />
                <rcElement.Legend className="bg-[#fc00ff]" />
                <rcElement.Line
                  connectNulls
                  type="monotone"
                  dataKey="Income"
                  stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                  fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                />
              </rcElement.LineChart>
            </rcElement.ResponsiveContainer>
          </div>
        </div>
      )}
      <Modal
        className="analyticModal"
        title="Monthly Revenue"
        footer={false}
        visible={fullscreen === "MonthlyRevenue"}
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
            <rcElement.LineChart
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
              <rcElement.CartesianGrid strokeDasharray="1 10" />
              <rcElement.XAxis dataKey="month" />
              <rcElement.YAxis />
              <rcElement.Tooltip />
              <rcElement.Legend className="bg-[#fc00ff]" />
              <rcElement.Line
                connectNulls
                type="monotone"
                dataKey="Income"
                stroke={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
              />
            </rcElement.LineChart>
          </rcElement.ResponsiveContainer>
        </div>
      </Modal>
    </>
  );
};

export default MonthlyRevenue;

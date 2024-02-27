import React, { useEffect, useState } from "react";
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
import { fetchAverageIncomeOfLastWeek } from "../../../Components/services/payment";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const IncomePerDay = ({ activeCompany, setFullScreen, fullscreen }) => {
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
  const handleFullScreen = () => {
    setFullScreen("IncomePerDay");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <div className="w-full rounded-md p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] flex flex-col ">
      <div
        className={`w-full flex justify-between items-center ${
          colorMode ? "text-slate-300" : "text-gray-800"
        }`}
      >
        <h1
          className={`text-base font-semibold px-4 m-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Income/Day
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
      {!lastWeekIncome ? (
        <Loading />
      ) : (
        <div className="">
          <ResponsiveContainer
            width="100%"
            height={fullscreen ? "100%" : 220}
            className="-ml-6"
          >
            <LineChart
              width={"100%"}
              height={fullscreen ? "100%" : 220}
              data={lastWeekIncome}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="dates" />
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
      )}
      <Modal
        className="analyticModal"
        title="Income/Day"
        footer={false}
        visible={fullscreen === "IncomePerDay"}
        // onOk={handleOk}
        onCancel={handleMinimizeScreen}
        width={"70%"}
        height={"80%"}
        closeIcon={<div className="flex items-center justify-center h-full w-full hover:scale-110">
        <Icons.Minimize />
      </div>}
      >
        <div className="h-[70vh]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="-ml-6"
          >
            <LineChart
              width="100%"
              height="100%"
              data={lastWeekIncome}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="dates" />
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
      </Modal>
    </div>
  );
};

export default IncomePerDay;

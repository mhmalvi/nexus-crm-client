import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileDetails } from "../../../Components/services/auth";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { curveCardinal } from "d3-shape";
import { PieChart, Pie, Cell } from "recharts";
import {
  handleGetStudentAdminDashboardData,
  handleGetStudentAdminDashboardDataGraph,
} from "../../../Components/services/utils";

function ManagerDashboard() {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({});
  const [dashboardDataGraph, setDashboardDataGraph] = useState([]);
  const loadingDetails = useSelector((state) => state?.user?.loading);
  const ProfileDetails = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    document.title = `Agency Dashboard | Queleads CRM`;
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(setLoader(false));
    }, 3000);
  }, [dispatch, ProfileDetails?.userInfo]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.user_id
      );

      if (userDetailResponse?.data) {
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, ProfileDetails]);

  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdminDashboardData();
      if (res?.status === 200) {
        setDashboardData(res?.data);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await handleGetStudentAdminDashboardDataGraph();
      if (res?.status === 200) {
        const data = [];

        res?.data?.forEach((item, idx) => {
          data.push({
            name: item?.monthname,
            certified: item?.count,
          });
        });
        setDashboardDataGraph(data);
      }
    })();
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const pidata = [
    {
      name: "Approved",
      value: dashboardData?.approved ? dashboardData?.approved : 0,
    },
    {
      name: "Pending",
      value: dashboardData?.pending ? dashboardData?.pending : 0,
    },
    {
      name: "Rejected",
      value: dashboardData?.rejected ? dashboardData?.rejected : 0,
    },
    {
      name: "Certified",
      value: dashboardData?.certified ? dashboardData?.certified : 0,
    },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const cardinal = curveCardinal.tension(0.2);

  return (
    <div className="m-0">
      {loadingDetails && (
        <div className="w-full h-full text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="w-full mx-auto">
        <div className="flex gap-2 flex-wrap w-full">
          <div className=" w-[24%] h-[100px] bg-[#FFA859] rounded flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.approved ? dashboardData?.approved : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Approved
              </p>
            </div>
          </div>
          <div className="w-[24%] h-[100px] bg-[#6EE46A] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.pending ? dashboardData?.pending : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Pending
              </p>
            </div>
          </div>
          <div className="w-[24%] h-[100px] bg-[#AA87CB] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.rejected ? dashboardData?.rejected : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Rejected
              </p>
            </div>
          </div>
          <div className="w-[24%] h-[100px] bg-[#709FBB] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.certified ? dashboardData?.certified : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Certified
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[64%] mt-10">
            <AreaChart
              width={640}
              height={400}
              data={dashboardDataGraph}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="certified"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                type={cardinal}
                dataKey="certified"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            </AreaChart>
          </div>
          <div className="w-[35%] border mt-5 rounded-lg bg-slate-300">
            <PieChart width={350} height={360}>
              <Pie
                isAnimationActive={true}
                data={pidata}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;

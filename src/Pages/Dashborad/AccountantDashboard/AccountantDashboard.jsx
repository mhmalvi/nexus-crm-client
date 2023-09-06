import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
// import picture from "./../../assets/Images/paypal.png";
import { useNavigate } from "react-router-dom";
import graphgif from "../../../assets/Images/graph.gif";
import xaxis from "../../../assets/Images/x-axis.png";
import yaxis from "../../../assets/Images/y-axis.png";
import { handleProfileDetails } from "../../../Components/services/auth";
// import Loading from "../../Components/Shared/Loader";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { handleGetDashboardDataAccountant, handleGetDashboardDataGraph } from "../../../Components/services/utils";
import { Skeleton } from "antd";

function AccountantDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const [dashboardData, setDashboardData] = useState({});
  const [dashboardGraphData, setDashboardGraphData] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
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

      console.log("userDetailResponse", userDetailResponse);

      if (userDetailResponse?.data) {
        const user = userDetailResponse?.data;
        setUserDetails(user);
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
      setDashboardLoading(true);
      const res = await handleGetDashboardDataAccountant();
      if (res?.status === 200) {
        setDashboardLoading(false);
        setDashboardData(res?.data);
      } else {
        setDashboardLoading(false);
      }
    })();
  }, []);

  useEffect(()=>{
    (async()=>{
      setDashboardLoading(true);
      const res = await handleGetDashboardDataGraph();
      if(res?.status === 200){
        const data = []
        setDashboardLoading(false);
        res?.data?.forEach((item,idx)=>{
          console.log("grph item: ", item)
          data.push({name: item?.monthname, paid: item?.count})
        })
        setDashboardGraphData(data);
      }else{
        setDashboardLoading(false);
      }
    })()
  },[])

  const EditSettings = () => {
    navigate("/edit-profile");
  };
  console.log("graph data: ", dashboardGraphData)

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
      name: "Total Student",
      value: dashboardData?.total_student ? dashboardData?.total_student : 0,
    },
    {
      name: "Pending",
      value: dashboardData?.slip_pending ? dashboardData?.slip_pending : 0,
    },
    {
      name: "Completed",
      value: dashboardData?.slip_approved ? dashboardData?.slip_approved : 0,
    },
    {
      name: "Rejected",
      value: dashboardData?.slip_rejected ? dashboardData?.slip_rejected : 0,
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
        // <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
        <div className="w-full h-full text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      {/* <div className="border rounded-md shadow-md">
        <div className="my-10 mx-5 lg:mx-20">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div>
              <div className="flex flex-wrap m-auto">
                <div className="rounded-full mx-2">
                  <Avatar
                    className="rounded-full cursor-pointer"
                    size="80"
                    // color={Avatar.getRandomColor("sitebase", [
                    //   "red",
                    //   "green",
                    //   "#728FCE",
                    //   "violet",
                    //   "#2B547E",
                    //   "black",
                    //   "#87AFC7",
                    //   "Lime",
                    //   "#D5D6EA",
                    //   "#77BFC7",
                    //   "orange",
                    //   "#FDD017",
                    //   "#665D1E",
                    // ])}
                    name={ProfileDetails?.full_name}
                  />
                </div>
                <div className="flex-col font-poppins my-auto">
                  <div className="text-lg">{ProfileDetails?.full_name}</div>
                  <div className="text-xs">
                    Phone NUMBER:
                    <span className="font-semibold px-1">
                      {ProfileDetails?.contact_number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="flex justify-end">
                <button
                  className="bg-black text-white font-poppins text-sm rounded-md px-6 py-2 flex items-center"
                  onClick={EditSettings}
                >
                  <Icons.Edit className="text-white" />
                  <span className="ml-2">Edit</span>
                </button>
              </div> */}
      {/* </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-10 mx-2 gap-8">
            <div>
              <div className="flex-col">
                <div className="text-xs text-[#808080]">Accountant Name</div>
                <div className="font-semibold truncate">
                  {ProfileDetails?.full_name}
                </div>
              </div>
            </div>
            <div>
              <div className="flex-col">
                <div className="text-xs text-[#808080]">Email Address</div>
                <div className="font-semibold truncate">
                  {ProfileDetails?.email}
                </div>
              </div>
            </div>
            <div>
              <div className="flex-col">
                <div className="text-xs text-[#808080]">Phone Number</div>
                <div className="font-semibold truncate">
                  {ProfileDetails?.contact_number}
                </div>
              </div>
            </div> */}
      {/* <div>
              <div className="flex-col">
                <div className="text-xs text-[#808080]">Address</div>
                <div className="font-semibold truncate">
                  {ProfileDetails?.address}
                </div>
              </div>
            </div> */}
      {/* </div>
        </div>
      </div>
      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2 ||
        userDetails?.userInfo?.role_id === 3 ||
        userDetails?.userInfo?.role_id === 4 ||
        userDetails?.userInfo?.role_id === 5) && (
        <div className="my-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="">
              <div className="bg-[#000000] h-full rounded-lg p-10 shadow-md">
                <div className="mb-10">
                  <Icons.Equilizer className="w-20" />
                </div>
                <div className="flex-col font-poppins">
                  <div className="text-md text-white">Last month income</div>
                  <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                    $88,500
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between my-4">
                  <div>
                    <div className="text-md text-white">Total Sell</div>
                    <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                      $88,500
                    </div>
                  </div>
                  <div>
                    <div className="text-md text-white">Commission</div>
                    <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                      15%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 mt-8 sm:mt-0">
              <div className="h-full border rounded-lg p-5 shadow-md">
                <div className="flex flex-col lg:flex-row justify-evenly font-poppins my-4">
                  <div className="flex-col">
                    <div className="text-lg text-[#808080] leading-8 mb-4">
                      Monthly Sales
                    </div>
                    <div className="flex mx-2">
                      <img src={yaxis} alt="Avatar" />
                      <img src={graphgif} alt="Avatar" width={300} />
                    </div>
                    <div className="mx-8">
                      <img src={xaxis} alt="Avatar" width={300} />
                    </div>
                  </div>
                  <div className="grid grid-col gap-2 mt-5 lg:mt-0">
                    <div>
                      <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                        Monthly Sales Stats
                      </div>
                      <div className="text-xs text-[#808080]">
                        55 Lead success
                      </div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                        Lead Accept
                      </div>
                      <div className="text-xs text-[#808080]">
                        150 Lead success
                      </div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                        success percentage
                      </div>
                      <div className="text-xs text-[#808080]">50%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}  */}
      {dashboardLoading ? (
        <Skeleton active />
      ) : (
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
                  {dashboardData?.total_student
                    ? dashboardData?.total_student
                    : 100}
                </h1>
                <p className="p-0 m-0 font-bold font-serif text-[17px]">
                  Total Student
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
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="p-0 m-0 text-[25px] text-white">
                  {dashboardData?.slip_pending
                    ? dashboardData?.slip_pending : 0}
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <div>
                <h1 className="p-0 m-0 text-[25px] text-white">
                  {dashboardData?.slip_approved
                    ? dashboardData?.slip_approved
                    : 100}
                </h1>
                <p className="p-0 m-0 font-bold font-serif text-[17px]">
                  Completed
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
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="p-0 m-0 text-[25px] text-white">
                  {dashboardData?.slip_rejected
                    ? dashboardData?.slip_rejected : 0}
                </h1>
                <p className="p-0 m-0 font-bold font-serif text-[17px]">
                  Rejected
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[64%] mt-10">
              {/* <ResponsiveContainer width="100%" height="100%"> */}
              <AreaChart
                width={640}
                height={400}
                data={dashboardGraphData}
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
                  dataKey="paid"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  type={cardinal}
                  dataKey="paid"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
              </AreaChart>
              {/* </ResponsiveContainer> */}
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
      )}
    </div>
  );
}

export default AccountantDashboard;

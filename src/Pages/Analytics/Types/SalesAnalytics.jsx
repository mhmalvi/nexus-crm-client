import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import { fetchSalesEmployeesSale } from "../../../Components/services/leads";
import { setLoader } from "../../../features/user/userSlice";
import * as chartUtils from "../utils";
import Icons from "../../../Components/Shared/Icons";
import { Modal } from "antd";

const SalesAnalytics = ({ activeCompany, fullscreen, setFullScreen }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);
  const [employeesSales, setEmployeesSales] = useState([]);

  useEffect(() => {
    (async () => {
      const salesResponse = await fetchSalesEmployeesSale(
        userDetails?.userInfo?.role_id === 3
          ? userDetails?.userInfo?.client_id
          : activeCompany
      );

      console.log("salesResponse", salesResponse?.data);
      setCompanySalesEmployees(salesResponse?.data);
    })();
  }, [
    activeCompany,
    userDetails?.userInfo?.client_id,
    userDetails?.userInfo?.role_id,
  ]);

  useEffect(() => {
    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.role_id === 1
          ? activeCompany
          : userDetails?.userInfo?.client_id
      );

      if (employeeResponse?.status === true) {
        if (employeeResponse?.data?.length) {
          const sales = (employeeResponse?.data).filter(
            (employee) =>
              (employee?.role_id === 3 ||
                employee?.role_id === 4 ||
                employee?.role_id === 5) &&
              employee?.suspend === 0
          );

          let employees = [];

          sales?.forEach((employee) => {
            console.log(
              "FINDDD",
              companySalesEmployees?.filter(
                (salesEmployee) => salesEmployee?.sales === employee?.id
              )
            );

            employees?.push({
              id: employee?.user_id,
              name: employee?.full_name,
              amount: companySalesEmployees?.filter(
                (salesEmployee) => salesEmployee?.sales === employee?.id
              )?.length
                ? companySalesEmployees?.filter(
                    (salesEmployee) => salesEmployee?.sales === employee?.id
                  )?.[0]?.amounts
                : 0,
            });
          });
          setEmployeesSales(employees);
        }
        dispatch(setLoader(false));
      }
    })();
  }, [
    activeCompany,
    companySalesEmployees,
    dispatch,
    userDetails?.userInfo?.client_id,
    userDetails?.userInfo?.role_id,
  ]);
  const handleFullScreen = () => {
    setFullScreen("SalesAnalytics");
  };
  const handleMinimizeScreen = () => {
    setFullScreen("");
  };
  return (
    <div className="w-full rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-xl p-4 flex flex-col mb-2">
      <div className="flex items-center justify-between m-0">
        <h1
          className={`text-base font-semibold px-4 m-0 py-0 font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Sales Team Total Sales
        </h1>
        <div className="flex items-center">
          <p
            className={`text-xs font-semibold px-4 m-0 py-0 font-poppins ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            This Month
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
      <div className="pt-4">
        <rcElement.ResponsiveContainer
          width="100%"
          height={230}
          className="-ml-6"
        >
          <rcElement.BarChart
            width={"100%"}
            height={230}
            data={employeesSales}
            margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <rcElement.CartesianGrid strokeDasharray="3 3" />
            <rcElement.XAxis dataKey="name" tick={false} axisLine={false} />
            <rcElement.YAxis />
            <rcElement.Legend />
            <rcElement.Tooltip />
            <rcElement.Bar
              dataKey="amount"
              fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
            
              shape={<chartUtils.TriangleBar />}
            />
          </rcElement.BarChart>
        </rcElement.ResponsiveContainer>
      </div>
      <Modal
        className="analyticModal"
        title="Sales Team Total Sales"
        footer={false}
        visible={fullscreen === "SalesAnalytics"}
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
          <rcElement.ResponsiveContainer
            width="100%"
            height="100%"
            className="-ml-6"
          >
            <rcElement.BarChart
              width="100%"
              height="100%"
              data={employeesSales}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="name" tick={false} axisLine={false} />
              <rcElement.YAxis />
              <rcElement.Legend />
              <rcElement.Tooltip />
              <rcElement.Bar
                dataKey="amount"
                fill={`${colorMode ? "#cbd5e1" : "#7037ff"}`}
                shape={<chartUtils.TriangleBar />}
              />
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default SalesAnalytics;

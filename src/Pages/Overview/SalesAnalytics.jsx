import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import { handleFetchCompanyEmployees } from "../../Components/services/company";
import { fetchSalesEmployeesSale } from "../../Components/services/leads";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";
import * as chartUtils from "./utils";

const SalesAnalytics = ({ activeCompany }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const loadingDetails = useSelector((state) => state.user)?.loading;

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
  }, [activeCompany, userDetails]);

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

          console.log("sales>>>>>", sales);
          console.log("companySalesEmployees", companySalesEmployees);

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

          console.log("Sales From Overview", employees);
          setEmployeesSales(employees);
        }
        dispatch(setLoader(false));
      }
    })();
  }, [activeCompany, dispatch, userDetails, companySalesEmployees]);

  console.log("employeesSales", employeesSales);

  return (
    <div className="mt-10">
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div>
        <div className="relative">
          <h1 className="text-xl font-semibold text-white font-poppins">
            Sales Team Total Sales Details
          </h1>
          <p className="absolute top-6 right-7 float-right font-light">
            This Month
          </p>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.BarChart
              width={500}
              height={300}
              data={employeesSales}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <rcElement.CartesianGrid strokeDasharray="3 3" />
              <rcElement.XAxis dataKey="name" />
              <rcElement.YAxis />
              <rcElement.Legend />
              <rcElement.Tooltip />
              <rcElement.Bar
                dataKey="amount"
                fill="#ffa500"
                shape={<chartUtils.TriangleBar />}
              >
                <rcElement.LabelList
                  dataKey="amount"
                  content={chartUtils.SalesTeamDetailsCustomizedLabel}
                />
              </rcElement.Bar>
            </rcElement.BarChart>
          </rcElement.ResponsiveContainer>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SalesAnalytics;

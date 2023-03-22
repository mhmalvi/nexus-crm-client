import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rcElement from "recharts";
import { handleFetchCompanyEmployees } from "../../Components/services/company";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";
import * as chartData from "./data";
import * as chartUtils from "./utils";

const SalesAnalytics = ({ activeCompany }) => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state?.leads)?.leads;
  const userDetails = useSelector((state) => state?.user);
  const loadingDetails = useSelector((state) => state.user)?.loading;

  // const [companyAdvisorEmployees, setCompanyAdvisorEmployees] = useState([]);
  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);

  // console.log("User", userDetails?.userInfo?.id);

  useEffect(() => {
    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.role_id === 1
          ? activeCompany
          : userDetails?.userInfo?.client_id
      );

      if (employeeResponse?.status === true) {
        // console.log(employeeResponse?.data);

        if (employeeResponse?.data?.length) {
          // const admins = (employeeResponse?.data).filter(
          //   (employee) => employee?.role_id === 4 && employee?.suspend === 0
          // );

          const sales = (employeeResponse?.data).filter(
            (employee) =>
              (employee?.role_id === 2 || employee?.role_id === 5) &&
              employee?.suspend === 0
          );

          console.log("Sales From Overview", sales);

          // setCompanyAdvisorEmployees(admins);
          setCompanySalesEmployees(sales);

          // console.log("LLLLL", employeeResponse?.data);

          // setCompanyAdminEmployee(
          //   (employeeResponse?.data).find(
          //     (employee) =>
          //       (employee?.role_id === 1 || employee?.role_id === 3) &&
          //       employee?.suspend === 0
          //   )
          // );

          // setInactiveAdminEmployees(
          //   (employeeResponse?.data).filter(
          //     (employee) =>
          //       (employee?.role_id === 3 || employee?.role_id === 4) &&
          //       employee?.suspend === 1
          //   )
          // );

          // setInactiveSalesEmployees(
          //   (employeeResponse?.data).filter(
          //     (employee) => employee?.role_id === 5 && employee?.suspend === 1
          //   )
          // );
        }
        dispatch(setLoader(false));
      }
    })();

    // console.log(
    //   "leads",
    //   // leads
    //   leads?.filter((lead) => lead?.sales_user_id === userDetails?.userInfo?.id)
    // );
  }, [activeCompany, dispatch, leads, userDetails]);

  return (
    <div className="mt-10">
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div>
        <div className="relative">
          <h1 className="text-xl font-semibold mb-6 leading-8 font-poppins">
            Sales Team Total Sales Details
          </h1>
          <p className="absolute top-6 right-7 float-right font-light">
            Last 30 days
          </p>
        </div>
        <div>
          <rcElement.ResponsiveContainer width="100%" height={300}>
            <rcElement.BarChart
              width={500}
              height={300}
              data={chartData.SalesTeamDetails}
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
                fill="#8884d8"
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

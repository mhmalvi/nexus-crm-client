import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import Icons from "../../Components/Shared/Icons";
import {
  fetchAverageIncomeOfLastWeek,
  fetchMonthPaymentDataOfCompany,
} from "../../Components/services/payment";
import { Select } from "antd";
import { setLoader } from "../../features/user/userSlice";
import {
  handleFetchCompanies,
} from "../../Components/services/company";

const Summary = ({
  activeCompany,
  companyEmployees,
  setActiveCompanies,
}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user)?.userInfo;
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [lastWeekIncome, setLastWeekIncome] = useState([]);
  const [totalLastWeekIncome, setTotalLastWeekIncome] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [defaultCompany, setDefaultCompany] = useState(companies?.[0]?.name);

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

    (async () => {
      const lastWeekIncomeResp = await fetchAverageIncomeOfLastWeek(
        userDetails?.role_id === 3 ? userDetails?.client_id : activeCompany
      );

      console.log("lastWeekIncomeResp", lastWeekIncomeResp);

      if (lastWeekIncomeResp?.status === 200) {
        setLastWeekIncome(lastWeekIncomeResp?.data);
      }

      let totalLastWeekIncome = 0;
      lastWeekIncomeResp?.data?.forEach((rev) => {
        totalLastWeekIncome += rev?.Income;
      });
      setTotalLastWeekIncome(totalLastWeekIncome);
      dispatch(setLoader(false));
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCompany, userDetails]);
  const handleChange = (value) => {
    setActiveCompanies(value);
  };
  useEffect(() => {
    (async () => {
      const companiesResponse = await handleFetchCompanies();
      if (companiesResponse?.status) {
        setCompanies(companiesResponse?.data);

        setActiveCompanies(companiesResponse?.data?.[0]?.id);
        setDefaultCompany(companiesResponse?.data?.[0]?.name);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col justify-between items-start w-full gap-2">
      <div className="flex w-full items-center justify-between">
        <h1
          className={`text-xl font-semibold font-poppins ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          Summary
        </h1>
        {userDetails?.role_id === 1 ? (
            <div className="font">
              <Select
                id="companies"
                defaultValue={defaultCompany}
                placeholder={defaultCompany}
                style={{
                  width: 200,
                }}
                onChange={handleChange}
              >
                {companies?.map((company) => (
                  <Option value={company?.id}>{company?.name}</Option>
                ))}
              </Select>
            </div>
          ) : null}
      </div>
      <div className="w-full items-center justify-between flex gap-4">
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                $ {totalRevenue}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } mb-0`}
              >
                Total Revenue
              </p>
            </div>
            <div>
              <Icons.Briefcase
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                ${" "}
                {totalRevenue
                  ? (totalRevenue / (dayjs().month() + 1)).toFixed(2)
                  : 0}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-white" : "text-gray-800"
                } mb-0`}
              >
                Average Income (Per Month)
              </p>
            </div>
            <div>
              <Icons.CalendarMonth
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                ${" "}
                {totalLastWeekIncome
                  ? (totalLastWeekIncome / 7)?.toFixed(2)
                  : 0}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                } mb-0`}
              >
                Average Income Per Day (Last Week)
              </p>
            </div>
            <div>
              <Icons.CalendarWeek
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                {campaigns?.length}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-white" : "text-gray-800"
                } mb-0`}
              >
                Total Campaigns
              </p>
            </div>
            <div>
              <Icons.Campaigns
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                ${" "}
                {totalRevenue > 0 && campaigns?.length > 0
                  ? (totalRevenue / campaigns?.length).toFixed(2)
                  : 0}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-white" : "text-gray-800"
                } mb-0`}
              >
                Average Income (Per Campaign)
              </p>
            </div>
            <div>
              <Icons.MoneyCheck
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11]">
            <div>
              <h1
                className={`text-lg font-semibold ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                {companyEmployees?.length}
              </h1>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-white" : "text-gray-800"
                } mb-0`}
              >
                Sales Team
              </p>
            </div>
            <div>
              <Icons.PeopleGroup
                className={`w-5 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

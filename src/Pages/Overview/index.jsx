import { Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFileName, useScreenshot } from "use-react-screenshot";
import {
  handleFetchCompanies,
  handleFetchCompanyEmployees,
} from "../../Components/services/company";
import {
  handleFetchCampaigns,
  handleFetchLeads,
} from "../../Components/services/leads";
import { addCampaigns } from "../../features/Leads/campaignSlice";
import { addLeads } from "../../features/Leads/leadsSlice";
import { setLoader } from "../../features/user/userSlice";
import CampaignAnalytics from "./CampaignAnalytics";
import CompanyRevenue from "./CompanyRevenue";
import ManagementAnalytics from "./ManagementAnalytics";
import SalesAnalytics from "./SalesAnalytics";

const Overview = () => {
  document.title = "Overview | Queleads CRM";
  const { Option } = Select;

  const pdfRef = useRef(null);
  const [, takeScreenShot] = useScreenshot();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [comapnyEmployees, setComapnyEmployees] = useState();
  const [activeCompany, setActiveCompanies] = useState();
  const [companies, setCompanies] = useState([]);
  const [defaultCompany, setDefaultCompany] = useState(companies?.[0]?.name);

  useEffect(() => {
    (async () => {
      const companiesResponse = await handleFetchCompanies();
      if (companiesResponse?.status) {
        setCompanies(companiesResponse?.data);

        setActiveCompanies(companiesResponse?.data?.[0]?.id);
        setDefaultCompany(companiesResponse?.data?.[0]?.name);
      }

      console.log("companiesResponse", companiesResponse);
    })();
  }, []);

  useEffect(() => {
    console.log("activeCompany activeCompany", activeCompany);
    dispatch(setLoader(true));

    (async () => {
      dispatch(setLoader(true));
      const response = await handleFetchCampaigns(
        userDetails?.userInfo?.role_id === 1
          ? activeCompany
          : userDetails?.userInfo?.client_id
      );

      if (response?.data?.length) {
        dispatch(addCampaigns(response?.data));
        dispatch(setLoader(false));
      }
    })();

    (async () => {
      dispatch(setLoader(true));
      const leadsResponse = await handleFetchLeads({
        client_id:
          userDetails?.userInfo?.role_id === 1
            ? activeCompany
            : userDetails?.userInfo?.client_id,
      });

      if (leadsResponse?.data) {
        dispatch(addLeads(leadsResponse?.data));
        dispatch(setLoader(false));
      }
    })();

    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.role_id === 1
          ? activeCompany
          : userDetails?.userInfo?.client_id
      );

      if (employeeResponse?.status === true) {
        setComapnyEmployees(employeeResponse?.data);
        dispatch(setLoader(false));
      }
    })();
  }, [activeCompany, dispatch, userDetails?.userInfo]);

  useEffect(() => {
    if (
      dayjs().date() === 1 &&
      localStorage.getItem("monthly_report") !== `${dayjs().$D}-${dayjs().$M}`
    ) {
      setTimeout(() => {
        getImage();
      }, 10000);
      localStorage.setItem("monthly_report", `${dayjs().$D}-${dayjs().$M}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value) => {
    setActiveCompanies(value);
    console.log(`selected ${value}`);
  };

  // For Generate Rport and Download
  const download = (
    image,
    {
      name = `Overview (${dayjs().$D}-${dayjs().$M + 1}-${dayjs().$y})`,
      extension = "jpg",
    } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => {
    takeScreenShot(pdfRef.current).then(download);
  };

  return (
    <div className="py-5 font-poppins px-5 h-screen flex flex-col items-center justify-center">
      <button
        className="text-black bg-white px-2 py-1 mb-5 rounded-full cursor-pointer font-semibold font-[Poppins] border border-black text-xs"
        onClick={getImage}
      >
        Capture Report
      </button>
      <div className="font-poppins rounded-xl p-5 shadow-xl backdrop-blur-2xl bg-[#ffffff11] h-[90vh] w-full mx-5 overflow-y-scroll overflow-x-hidden">
        <div>
          {userDetails?.userInfo?.role_id === 1 ? (
            <div className="font-light">
              <Select
                id="companies"
                defaultValue={defaultCompany}
                placeholder={defaultCompany}
                style={{
                  width: 50,
                }}
                onChange={handleChange}
              >
                {companies?.map((company) => (
                  <Option value={company?.id}>{company?.name}</Option>
                ))}
              </Select>
            </div>
          ) : null}

          <div ref={pdfRef}>
            {/* Comapny Analytics */}
            {userDetails?.userInfo?.role_id === 1 && (
              <CompanyRevenue activeCompany={activeCompany} />
            )}

            {/* Management Analitics */}
            <ManagementAnalytics
              comapnyEmployees={comapnyEmployees}
              activeCompany={activeCompany}
            />

            {/* Campaign Analitics */}
            <CampaignAnalytics activeCompany={activeCompany} />

            {/* Sales Analitics */}
            <SalesAnalytics activeCompany={activeCompany} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

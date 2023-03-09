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
  document.title = "Overview";
  const { Option } = Select;

  const pdfRef = useRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [comapnyEmployees, setComapnyEmployees] = useState();
  const [activeCompany, setActiveCompanies] = useState();
  const [companies, setCompanies] = useState([]);
  const [defaultCompany, setDefaultCompany] = useState(companies?.[0]?.name);

  useEffect(() => {
    (async () => {
      const companiesResponse = await handleFetchCompanies();

      if (companiesResponse?.status === true) {
        setCompanies(companiesResponse?.data);

        setActiveCompanies(companiesResponse?.data?.[0]?.id);
        setDefaultCompany(companiesResponse?.data?.[0]?.name);
      }
    })();
  }, []);

  useEffect(() => {
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
    <div className="py-16 px-6 font-poppins">
      <div className="float-right text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black text-xs">
        <span onClick={getImage}>Export Report</span>
      </div>

      {userDetails?.userInfo?.role_id === 1 ? (
        <div className="font-light">
          <Select
            id="companies"
            // defaultValue={companies?.[0]?.name}
            defaultValue={defaultCompany}
            placeholder={defaultCompany}
            // className="absolute top-16 right-0"
            style={{
              width: 250,
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
        <CompanyRevenue />

        {/* Management Analitics */}
        <ManagementAnalytics comapnyEmployees={comapnyEmployees} />

        {/* Campaign Analitics */}
        <CampaignAnalytics />

        {/* Sales Analitics */}
        <SalesAnalytics activeCompany={activeCompany}/>
      </div>
    </div>
  );
};

export default Overview;

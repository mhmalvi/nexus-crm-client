import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { handleFetchCompanyEmployees } from "../../Components/services/company";
import {
  handleFetchCampaigns,
  handleFetchLeads,
} from "../../Components/services/leads";
import { addCampaigns } from "../../features/Leads/campaignSlice";
import { addLeads } from "../../features/Leads/leadsSlice";
import { setLoader } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Summary from "./Summary";
import IncomePerDay from "./Types/IncomePerDay";
import SalesAnalytics from "./Types/SalesAnalytics";
import MonthlyRevenue from "./Types/MonthlyRevenue";
import LeadConversionRatio from "./Types/LeadConversionRatio";
import CampaignDetails from "./Types/CampaignDetails";
import CampaignsRevenue from "./Types/CampaignsRevenue";
import LeadQualityRatio from "./Types/LeadQualityRatio";
import AreaWiseLead from "./Types/AreaWiseLead";
import LeadStatusSummary from "./Types/LeadStatusSummary";

const Overview = () => {
  document.title = "Overview | Queleads CRM";

  const pdfRef = useRef(null);
  const [, takeScreenShot] = useScreenshot();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  const [companyEmployees, setCompanyEmployees] = useState();
  const [activeCompany, setActiveCompanies] = useState();
  const [fullscreen, setFullScreen] = useState("");

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
        setCompanyEmployees(employeeResponse?.data);
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
  useEffect(() => {
    if (
      userDetails?.userInfo?.verification_status === 1 &&
      Storage.getItem("auth_tok")
    ) {
      navigate("/setup-your-profile");
    }
  }, [navigate, userDetails]);

  return (
    <div className="py-4 font-poppins px-8 h-screen flex flex-col items-center justify-center">
      {/* <button
        className="text-black bg-white px-2 py-1 mb-5 rounded-full cursor-pointer font-semibold font-[Poppins] border border-black text-xs"
        onClick={getImage}
      >
        Capture Report
      </button> */}
      <div className="font-poppins rounded-xl p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] h-screen w-full overflow-hidden">
        <div ref={pdfRef} className="flex flex-col gap-4 ">
          <div className="">
            <Summary
              activeCompany={activeCompany}
              companyEmployees={companyEmployees}
              setActiveCompanies={setActiveCompanies}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 overflow-y-scroll overflow-x-hidden h-[75vh] w-full rounded-md ">
            <div className="flex-auto flex-shrink-0 w-1/4">
              <IncomePerDay
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <MonthlyRevenue
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <LeadConversionRatio
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <CampaignDetails
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <CampaignsRevenue
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <LeadQualityRatio
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <AreaWiseLead
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <LeadStatusSummary
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
            <div className="flex-auto flex-shrink-0 w-1/4">
              <SalesAnalytics
                activeCompany={activeCompany}
                fullscreen={fullscreen}
                setFullScreen={setFullScreen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

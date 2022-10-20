import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import CampaignAnalytics from "./CampaignAnalytics";
import CompanyRevenue from "./CompanyRevenue";
import ManagementAnalytics from "./ManagementAnalytics";
import SalesAnalytics from "./SalesAnalytics";

const Overview = () => {
  document.title = "Overview";

  const pdfRef = useRef(null);
  const [image, takeScreenShot] = useScreenshot();

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

  const download = (
    image,
    {
      name = `Overview (${dayjs().$D}-${dayjs().$M}-${dayjs().$y})`,
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

      <div ref={pdfRef}>
        {/* Comapny Analytics */}
        <CompanyRevenue />

        {/* Management Analitics */}
        <ManagementAnalytics />

        {/* Campaign Analitics */}
        <CampaignAnalytics />

        {/* Sales Analitics */}
        <SalesAnalytics />
      </div>
    </div>
  );
};

export default Overview;

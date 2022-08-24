import React, { useRef, useState } from "react";
import { useScreenshot } from "use-react-screenshot";
import CampaignAnalytics from "./CampaignAnalytics";
import CompanyRevenue from "./CompanyRevenue";
import ManagementAnalytics from "./ManagementAnalytics";
import SalesAnalytics from "./SalesAnalytics";

const Overview = () => {
  const pdfRef = useRef(null);

  const [image, takeScreenShot] = useScreenshot();
  const [buttonToggle, setButtonToggle] = useState(false);

  const getImage = () => {
    setButtonToggle(true);
    takeScreenShot(pdfRef.current);
  };
  console.log(image);

  return (
    <div className="my-16 mx-6 font-poppins" id="divToPrint">
      <div
        className="float-right text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
        style={{
          fontSize: "10px",
        }}
      >
        {image && buttonToggle ? (
          <a
            className="text-black hover:text-black"
            href={image}
            download
            target="__black"
            onClick={() => setButtonToggle(false)}
          >
            Download Report
          </a>
        ) : (
          <span onClick={getImage}>Generate Report</span>
        )}
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

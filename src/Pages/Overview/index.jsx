import React from "react";
import CampaignAnalitics from "./CampaignAnalitics";
import ManagementAnalytics from "./ManagementAnalytics";

const Overview = () => {
  return (
    <div className="my-16 mx-6 font-poppins">
      <div>
        <h1
          className="float-right text-black bg-white px-2 py-1 rounded-full cursor-pointer font-semibold font-poppins border border-black"
          style={{
            fontSize: "10px",
          }}
        >
          Generate Report
        </h1>
      </div>
      <div>
        {/* Management Analitics */}
        <ManagementAnalytics />

        {/* Campaign Analitics */}
        <CampaignAnalitics />
        {/* Sales Analitics */}
      </div>
    </div>
  );
};

export default Overview;

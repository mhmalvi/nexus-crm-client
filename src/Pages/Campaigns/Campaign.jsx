import React from "react";
import { Link } from "react-router-dom";
import fbCampaignCover from "../../assets/Images/facebook-campaign.png";
import { useSelector } from "react-redux";

const Campaign = ({ campaign }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <Link
      to={`${campaign?.campaign_id}`}
      className="ease-in transition-all hover:scale-95 mx-auto w-64 h-92  flex flex-col items-center shadow cursor-pointer overflow-hidden rounded-md"
    >
      <div className="relative">
        <img src={fbCampaignCover} className="min-w-full" alt="Cover_Image" />
        <div
          className={`absolute -top-2.5 -left-11 w-29 flex justify-center items-center ${
            campaign.campaign_status === "ACTIVE"
              ? "bg-green-500"
              : "bg-brand-color"
          } bg-opacity-90 pb-1 pt-8 -rotate-45 shadow-md`}
        >
          <h6 className="text-slate-300 font-semibold font-poppins text-xs">
            {campaign.campaign_status}
          </h6>
        </div>
      </div>
      <div
        className={`flex h-full flex-col items-center rounded-b-md overflow-hidden justify-center font-poppins ${
          colorMode ? "bg-slate-300" : "bg-gray-800"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <h2
            className={`m-0 px-4 py-2 font-semibold text-sm text-start border-b ${
              colorMode ? "text-gray-800" : "text-slate-300"
            }`}
          >
            {campaign.campaign_name}
          </h2>
          <div className="w-full px-4 ">
            <h2
              className={`text-xs m-0 p-0 flex justify-between ${
                colorMode ? "text-gray-800" : "text-slate-300"
              }`}
            >
              <span>
                {new Date(campaign.start_time).toISOString().split("T")[0]}
              </span>
              <span>-</span>
              <span>
                {new Date(campaign.stop_time).toISOString().split("T")[0]}
              </span>
            </h2>
          </div>
        </div>
        {/* <h2 className="text-justify text-xs overflow-hidden h-19 px-2">
          {campaign.details}
        </h2> */}
      </div>
    </Link>
  );
};

export default Campaign;

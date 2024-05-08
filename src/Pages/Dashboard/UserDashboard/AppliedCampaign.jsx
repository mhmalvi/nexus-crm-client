import React from "react";
import { Link } from "react-router-dom";

const AppliedCampaign = ({ leadDetails }) => {
  return (
    <Link
      to={`/lead/${leadDetails?.lead_id}`}
      className="h-48 w-79 bg-brand-color bg-opacity-90 shadow p-2 rounded-2xl cursor-pointer font-poppins"
    >
      <div
        className="h-full w-full rounded-2xl flex flex-col justify-center items-center"
        style={{
          border: "0.1px solid #ffffff",
        }}
      >
        <h1 className="text-white font-semibold text-sm leading-6 text-center my-1 px-2 uppercase">
          {leadDetails?.course_title}
        </h1>
        <span className="text-white text-center mt-1 font-light uppercase text-xs italic">
          {leadDetails?.course_code}
        </span>

        <div className="flex items-center">
          <div className="flex items-center py-1.5 pl-3 pr-4 rounded-lg shadow-md bg-white mt-5">
            <div
              className={`w-1.5 h-1.5 bg-${
                status[parseInt(leadDetails?.lead_details_status) - 1]?.color
              }-500 rounded-full`}
            ></div>
            <div className="ml-1 font-semibold text-black text-xs">
              {status[parseInt(leadDetails?.lead_details_status) - 1]?.title}
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}
    </Link>
  );
};

export default AppliedCampaign;

const status = [
  {
    title: "New Lead",
    color: "green",
  },
  {
    title: "Skilled",
    color: "orange",
  },
  {
    title: "Called",
    color: "blue",
  },
  {
    title: "Paid",
    color: "teal",
  },
  {
    title: "Verified",
    color: "violet",
  },
  {
    title: "Completed",
    color: "red",
  },
];

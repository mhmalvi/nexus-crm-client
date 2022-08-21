import React from "react";
import { Link } from "react-router-dom";

const AppliedCampaign = () => {
  return (
    <Link
      to={"/lead/113256"}
      className="h-40 w-64 bg-brand-color bg-opacity-90 shadow p-2 rounded-2xl cursor-pointer"
    >
      <div
        className="h-full w-full rounded-2xl flex flex-col justify-center items-center"
        style={{
          border: "0.1px solid #ffffff",
        }}
      >
        <div>
          <h1 className="text-white font-medium text-sm leading-6 text-center">
            HLTAID009 – Provide cardiopulmonary resuscitation
          </h1>
        </div>
        {/* {statusColor
        .filter((status) => status.title === list.order_status)
        .map((lead_status, index) => ( */}
        <div className="w-22 flex items-center py-1.5 px-2 rounded-lg shadow-md bg-white mt-6">
          <div className={`w-1.5 h-1.5 bg-red-500 rounded-full`}></div>
          <div
            className="ml-1 font-semibold text-black"
            style={{
              fontSize: "10px",
            }}
          >
            Completed
          </div>
        </div>
      </div>
      {/* ))} */}
    </Link>
  );
};

export default AppliedCampaign;

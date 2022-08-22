import React from "react";
import { Link } from "react-router-dom";

const AppliedCampaign = () => {
  return (
    <Link
      to={"/lead/113256"}
      className="h-40 w-64 bg-brand-color bg-opacity-90 shadow p-2 rounded-2xl cursor-pointer font-poppins"
    >
      <div
        className="h-full w-full rounded-2xl flex flex-col justify-center items-center"
        style={{
          border: "0.1px solid #ffffff",
        }}
      >
        <h1 className="text-white font-medium text-base leading-6 text-center my-1">
          Provide cardiopulmonary resuscitation
        </h1>
        <span
          className="text-white text-center mt-1 font-light"
          style={{
            fontSize: "10px",
          }}
        >
          HLTAID009
        </span>

        {/* {statusColor
        .filter((status) => status.title === list.order_status)
        .map((lead_status, index) => ( */}
        <div className="flex items-center">
          <div className="w-22 flex items-center py-1.5 px-2 rounded-lg shadow-md bg-white mt-5">
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
      </div>
      {/* ))} */}
    </Link>
  );
};

export default AppliedCampaign;

import React from "react";

const Campaign = ({ campaign }) => {
  return (
    <div
      className="mx-auto w-64 h-81 flex flex-col items-center bg-white shadow cursor-pointer overflow-hidden"
      style={{
        borderRadius: "10px",
      }}
    >
      <div className="relative">
        <img
          src="https://i.pcmag.com/imagery/articles/04HUXgEu0I3mdCOejOjQpNE-5.fit_lim.v1620748900.jpg"
          className="min-w-full h-48 rounded-tl rounded-tr mb-2"
          alt=""
        />
        <div
          className={`absolute -top-2.5 -left-11 w-29 flex justify-center items-center ${
            campaign.campaign_status === "ACTIVE"
              ? "bg-green-500"
              : "bg-red-500"
          } bg-opacity-90 pb-1 pt-8 -rotate-45 shadow-md`}
        >
          <h6 className="text-white font-poppins text-xs">
            {campaign.campaign_status}
          </h6>
        </div>
      </div>
      <div className="p-2 pt-2 rounded flex flex-col items-center justify-center font-poppins">
        <div className="flex flex-col justify-center items-center mb-3">
          <h2 className="font-semibold text-base mb-4 text-center">
            {campaign.campaign_name}
          </h2>
          <span
            style={{
              fontSize: "10px",
            }}
          >
            {campaign.start_time} - {campaign.stop_time}
          </span>
        </div>
        <h2 className="text-justify text-xs overflow-hidden h-19 px-2">
          {campaign.details}
        </h2>
      </div>
    </div>
  );
};

export default Campaign;

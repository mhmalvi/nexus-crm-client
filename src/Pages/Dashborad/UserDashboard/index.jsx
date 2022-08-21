import React from "react";
import AppliedCampaign from "./AppliedCampaign";

const UserDashboard = () => {
  return (
    <div className="font-poppins">
      <div>
        <h4 className="text-xl leading-6 font-poppins font-semibold text-black text-opacity-80">
          Applied
        </h4>
      </div>
      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-8 mt-7.5">
        {Array.from({ length: 6 }, () => Math.random()).map((arr, i) => (
          <AppliedCampaign key={i} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

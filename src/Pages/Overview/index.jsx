import React from "react";
import analytics from "../../assets/Images/analysis-dashboard.png";

const Overview = () => {
  return (
    <div className="relative my-12 text-xl font-semibold mx-6">
      <img className="w-full" src={analytics} alt="" />
      <div className="absolute w-full min-h-full top-0 p-20 bg-black rounded-lg shadow-sm bg-opacity-80 flex items-center justify-center">
        <h1 className="text-white text-4xl font-poppins">In Progress</h1>
      </div>
    </div>
  );
};

export default Overview;

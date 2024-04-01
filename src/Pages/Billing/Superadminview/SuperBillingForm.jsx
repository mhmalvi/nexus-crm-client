import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const SuperBillingForm = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col text-lg w-full">
        {/* Prdct nm n strp || Keeping Package Name for the users */}
        <label className={`${colorMode ? "text-slate-300" : "text-gray-800"}`}>
          Package Name
        </label>
        <input
          className={`rounded-md bg-transparent border ${
            colorMode ? "border-slate-300" : "border-gray-800"
          }`}
        />
      </div>
    </div>
  );
};

export default SuperBillingForm;

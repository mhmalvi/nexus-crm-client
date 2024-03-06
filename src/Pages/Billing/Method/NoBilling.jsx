import React from "react";

import { useSelector } from "react-redux";
import Icons from "../../../Components/Shared/Icons";

  const NoBilling = ({setDetailsClicked}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
      <Icons.EmptyBilling className="w-1/4 " />
      <div className="flex flex-col gap-4">
        <h1
          className={`m-0 p-0 text-lg ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
          You currently have no billing information.
        </h1>
        <button
          className={`m-0 px-4 py-2 border rounded-md text-base ${
            colorMode
              ? "border-slate-300 text-slate-300"
              : "border-gray-800 text-gray-800"
          }`}
          onClick={()=>{
            setDetailsClicked({
              screen: "billing-form"
            })
          }}
        >
          Add Billing Information
        </button>
      </div>
    </div>
  );
};

export default NoBilling;

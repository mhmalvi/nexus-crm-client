import React from "react";

const BillingForm = ({ setDetailsClicked }) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div
        className="bg-orange-300 w-1/12 flex items-center justify-center cursor-pointer"
        onClick={() => {
          setDetailsClicked({ screen: "default" });
        }}
      >
        back
      </div>
      <div className="flex gap-4 w-full h-full">
        <div className="w-full bg-orange-300 background-blur-md shadow-md">
          ok
        </div>
      </div>
    </div>
  );
};

export default BillingForm;

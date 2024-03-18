import React from "react";

const BillingDetails = ({ setDetailsClicked, detailsClicked }) => {
  return (
    <div className="w-full">
      <div
        onClick={() => {
          setDetailsClicked({ screen: "default" });
        }}
      >
        back
      </div>
      <h1>BillingDetails</h1>
      {/* {detailsClicked.data} */}
    </div>
  );
};

export default BillingDetails;

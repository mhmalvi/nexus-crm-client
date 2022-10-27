import React from "react";
import Package from "./Package";

const Subscription = ({ setShowRequisitionForm, data, setData }) => {
  return (
    <>
      <Package
        setShowRequisitionForm={setShowRequisitionForm}
        data={data}
        setData={setData}
      />
    </>
  );
};
export default Subscription;

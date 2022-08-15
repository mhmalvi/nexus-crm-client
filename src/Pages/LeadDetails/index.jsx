import React from "react";
import { useParams } from "react-router-dom";
import LeadStatus from "./LeadStatus";

const LeadDetails = () => {
  const { id } = useParams();
  console.log(id);

  const leadStatus = {
    "New Lead": true,
    Skilled: true,
    Called: false,
    Paid: false,
    Verified: false,
    Completed: false,
  };

  return (
    <div className="lg:mx-2 2xl:mx-6 mt-25 pt-1">
      <div>
        <LeadStatus leadStatus={leadStatus} />
      </div>
    </div>
  );
};

export default LeadDetails;

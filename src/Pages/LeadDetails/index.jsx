import React from "react";
import { useParams } from "react-router-dom";
import LeadStatus from "./LeadStatus";

const LeadDetails = () => {
  const { id } = useParams();

  const leadStatus = {
    New_Lead: false,
    Skilled: true,
    Called: true,
    Paid: true,
    Verified: true,
    Completed: true,
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

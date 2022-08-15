import React from "react";
import { useParams } from "react-router-dom";
import Conversation from "./Conversation";
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";

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
    <div className="lg:mx-4 2xl:mx-6 mt-25 pt-1">
      <div className="grid grid-cols-3">
        <div>
          <LeadStatus leadStatus={leadStatus} />
        </div>
        <div>
          <Conversation />
        </div>
        <div>
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

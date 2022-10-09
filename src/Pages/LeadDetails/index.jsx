import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Conversation from "./Conversation";
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";

const LeadDetails = () => {
  const leads = useSelector((state) => state?.leads)?.leads;
  const { id } = useParams();
  const [leadDetails, setleadDetails] = useState();

  console.log("leads", leads);
  console.log(id);

  useEffect(() => {
    setleadDetails(leads?.find((lead) => lead?.lead_id === parseInt(id)));
  }, [id, leads]);

  console.log(leads?.find((lead) => lead?.lead_id === parseInt(id)));

  const leadStatus = {
    "New Lead": true,
    Skilled: true,
    Called: true,
    Paid: false,
    Verified: false,
    Completed: false,
  };

  return (
    <div className="lg:mx-4 2xl:mx-6 mt-25 pt-1 pb-10">
      <div className="grid grid-cols-3">
        <div>
          <LeadStatus leadStatus={leadStatus} />
        </div>
        <div>
          <Conversation />
        </div>
        <div>
          <UserDetails leadDetails={leadDetails} />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

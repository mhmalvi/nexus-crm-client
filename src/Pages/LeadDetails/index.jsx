import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleLeadDetails } from "../../Components/services/leads";
import Conversation from "./Conversation";
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";

const LeadDetails = () => {
  const { id } = useParams();

  const [leadDetails, setleadDetails] = useState();
  const [statusDetails, setStatusDetails] = useState();
  const [syncDetails, setSyncDetails] = useState(false);
  const [leadStatusDetails, setLeadStatusDetails] = useState({
    "New Lead": true,
    Skilled: false,
    Called: false,
    Paid: false,
    Verified: false,
    Completed: false,
  });

  useEffect(() => {
    (async () => {
      const response = await handleLeadDetails(id);

      console.log("response...", response);

      if (response) {
        setleadDetails(response?.leadDetails);
        setStatusDetails(response?.leadAllStatus);

        const status = {
          "New Lead": false,
          Skilled: false,
          Called: false,
          Paid: false,
          Verified: false,
          Completed: false,
        };

        // console.log("response?.leadAllStatus", response?.leadAllStatus);

        (response?.leadAllStatus).forEach((leadStatus) => {
          // console.log(leadStatus?.lead_status);
          status[
            `${Object.keys(status)[parseInt(leadStatus?.lead_status) - 1]}`
          ] = true;
        });
        // console.log("status >>>", status);
        setLeadStatusDetails(status);
      }
    })();
    // setleadDetails(leads?.find((lead) => lead?.lead_id === parseInt(id)));
  }, [id, syncDetails]);

  // console.log(leadDetails);

  // useEffect(() => {
  //   leadDetails.
  // }, []);

  // const leadStatus = {
  //   "New Lead": true,
  //   Skilled: false,
  //   Called: false,
  //   Paid: false,
  //   Verified: false,
  //   Completed: false,
  // };

  // console.log("leadDetails?.leadAllStatus", leadDetails?.leadAllStatus);

  return (
    <div className="lg:mx-4 2xl:mx-6 mt-25 pt-1 pb-10">
      <div className="grid grid-cols-3">
        <div>
          <LeadStatus
            leadStatus={leadStatusDetails}
            leadDetails={leadDetails}
            statusDetails={statusDetails}
            syncDetails={syncDetails}
            setSyncDetails={setSyncDetails}
          />
        </div>
        <div>
          <Conversation id={id} />
        </div>
        <div>
          <UserDetails leadDetails={leadDetails} />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

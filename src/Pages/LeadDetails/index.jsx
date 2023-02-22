import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleLeadDetails } from "../../Components/services/leads";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";
import Conversation from "./Conversation";
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";

const LeadDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  const [leadDetails, setleadDetails] = useState();
  // const [statusDetails, setStatusDetails] = useState([]);
  const [syncDetails, setSyncDetails] = useState(false);
  const [leadStatusDetails, setLeadStatusDetails] = useState({
    Suspended: false,
    "New Lead": true,
    Skilled: false,
    Called: false,
    Paid: false,
    Verified: false,
    Completed: false,
  });

  const [statusDateTime, setStatusDateTime] = useState({
    Suspended: "Not Yet",
    "New Lead": "Not Yet",
    Skilled: "Not Yet",
    Called: "Not Yet",
    Paid: "Not Yet",
    Verified: "Not Yet",
    Completed: "Not Yet",
  });

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const response = await handleLeadDetails(id);
      console.log("response", response);
      if (response) {
        setleadDetails(response);
        const status = {
          Suspended: false,
          "New Lead": false,
          Skilled: false,
          Called: false,
          Paid: false,
          Verified: false,
          Completed: false,
        };

        const statusTimeDate = {
          Suspended: "Not Yet",
          "New Lead": "Not Yet",
          Skilled: "Not Yet",
          Called: "Not Yet",
          Paid: "Not Yet",
          Verified: "Not Yet",
          Completed: "Not Yet",
        };

        response?.leadAllStatus?.forEach((leadStatus) => {
          status[
            `${Object.keys(status)[parseInt(leadStatus?.lead_status)]}`
          ] = true;

          document.title = `Details - ${response?.leadDetails?.full_name}`;

          statusTimeDate[
            `${Object.keys(statusTimeDate)[parseInt(leadStatus?.lead_status)]}`
          ] = `${leadStatus?.updated_at?.replace("T", " ")?.slice(0, 15)}`;
        });

        setLeadStatusDetails(status);
        setStatusDateTime(statusTimeDate);
        dispatch(setLoader(false));
      }
    })();
  }, [dispatch, id, syncDetails]);

  return (
    <div>
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="lg:mx-4 2xl:mx-6 mt-25 pt-1 pb-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="px-2 xl:px-3">
            <LeadStatus
              leadStatus={leadStatusDetails}
              leadDetails={leadDetails}
              statusDateTime={statusDateTime}
              syncDetails={syncDetails}
              setSyncDetails={setSyncDetails}
            />
          </div>
          <div>
            <Conversation leadDetails={leadDetails} id={id} />
          </div>
          <div>
            <UserDetails
              leadDetails={leadDetails}
              syncDetails={syncDetails}
              setSyncDetails={setSyncDetails}
            />
          </div>
          {leadDetails?.leadDetails?.lead_details_status === 0 && (
            <div className="w-full h-full bg-white bg-opacity-50 absolute flex justify-center items-center font-poppins text-2xl text-red-600 font-semibold italic">
              Lead has been suspended
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

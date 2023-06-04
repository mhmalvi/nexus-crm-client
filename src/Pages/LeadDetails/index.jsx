import { message, Popconfirm, Tooltip } from "antd";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  handleLeadDetails,
  handleLeadStatusUpdate,
} from "../../Components/services/leads";
import { handlePaymentDetails } from "../../Components/services/payment";
import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../features/user/userSlice";
import Conversation from "./Conversation";
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";

const LeadDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const userDetails = useSelector((state) => state?.user)?.userInfo;

  // console.log("userDetails", userDetails);

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
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [syncTotalPaid, setSyncTotalPaid] = useState(false);

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

          document.title = `Details - ${response?.leadDetails?.full_name} | Queleads CRM`;

          statusTimeDate[
            `${Object.keys(statusTimeDate)[parseInt(leadStatus?.lead_status)]}`
          ] = `${leadStatus?.updated_at}`;
          // ] = `${leadStatus?.updated_at?.replace("T", " ")?.slice(0, 15)}`;
        });

        setLeadStatusDetails(status);
        setStatusDateTime(statusTimeDate);
        dispatch(setLoader(false));
      }
    })();
  }, [dispatch, id, syncDetails]);

  useEffect(() => {
    (async () => {
      const paymentHistoryRes = await handlePaymentDetails(id);

      if (paymentHistoryRes?.status === 200) {
        setPaymentHistory(paymentHistoryRes?.data);
        let totalAmount = 0;

        paymentHistoryRes?.data?.forEach((payment) => {
          totalAmount = (
            parseFloat(totalAmount) + parseFloat(payment?.payment_amount)
          ).toFixed(2);
        });
        setTotalPaid(totalAmount);
      } else {
        setPaymentHistory([]);
        setTotalPaid(0);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, syncTotalPaid]);

  const confirm = async (e) => {
    // console.log(
    //   "STATUSSS",
    //   leadDetails?.leadAllStatus[leadDetails?.leadAllStatus?.length - 2]
    //     ?.lead_status
    // );
    const statusUpdateResponse = await handleLeadStatusUpdate(
      leadDetails?.leadDetails?.lead_id,
      0,
      // leadDetails?.leadAllStatus[leadDetails?.leadAllStatus?.length - 2]
      //   ?.lead_status,
      userDetails?.user_id
    );

    if (statusUpdateResponse?.status) {
      message.success("Lead Has Been Released Successfully");
      setSyncDetails(!syncDetails);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div>
      {loadingDetails && (
        <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="lg:mx-4 2xl:mx-6 mt-25 pt-1 pb-10">
        <div
          className={`relative grid grid-cols-1 gap-6 ${
            userDetails?.role_id === 6 ? "lg:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          <div className="px-2 xl:px-3">
            <LeadStatus
              leadStatus={leadStatusDetails}
              leadDetails={leadDetails}
              statusDateTime={statusDateTime}
              syncDetails={syncDetails}
              setSyncDetails={setSyncDetails}
              paymentHistory={paymentHistory}
              totalPaid={totalPaid}
              syncTotalPaid={syncTotalPaid}
              setSyncTotalPaid={setSyncTotalPaid}
            />
          </div>
          {userDetails?.role_id !== 6 && (
            <div>
              <Conversation leadDetails={leadDetails} id={id} />
            </div>
          )}
          <div>
            <UserDetails
              leadDetails={leadDetails}
              syncDetails={syncDetails}
              setSyncDetails={setSyncDetails}
              paymentHistory={paymentHistory}
              totalPaid={totalPaid}
            />
          </div>
          {leadDetails?.leadDetails?.lead_details_status === 0 && (
            <div className="w-full h-full bg-white bg-opacity-50 absolute flex flex-col justify-center items-center font-poppins text-2xl text-red-600 font-semibold italic">
              <div>Lead has been suspended</div>
              <div className="xl:ml-4 mt-8">
                <Popconfirm
                  title="Do you want to Release this lead from the Suspension?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip
                    placement="right"
                    title={
                      "If you think to Release the lead from the Suspension"
                    }
                  >
                    <button
                      className={`w-32 px-1.5 py-2 border border-green-600 text-green-600 text-xs font-medium leading-4 font-poppins rounded-md`}
                      // onClick={handleLeadSuspend}
                    >
                      Release
                    </button>
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

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
import LeadStatus from "./LeadStatus";
import UserDetails from "./UserDetails";
import { Link } from "react-router-dom";

const LeadDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const userDetails = useSelector((state) => state?.user)?.userInfo;
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [leadDetails, setleadDetails] = useState();
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
    const statusUpdateResponse = await handleLeadStatusUpdate({
      lead_id: leadDetails?.leadDetails?.lead_id,
      lead_status: 0,
      sales_user_id: userDetails?.user_id,
      client_id: userDetails?.client_id,
      response: null,
    });

    if (statusUpdateResponse?.status) {
      message.success("Lead Has Been Released Successfully");
      setSyncDetails(!syncDetails);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div className="h-screen flex flex-col mx-5 justify-center items-center">
      <div className="w-full">
        <Link to={"/dashboard"}>
          <button
            className={`px-2 py-1 ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            {"< "} Back
          </button>
        </Link>
      </div>
      <div className="h-[85vh] w-full mx-5 rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-y-scroll">
        {loadingDetails && (
          <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-slate-300 bg-opacity-70">
            <Loading />
          </div>
        )}
        <div className={`flex flex-col `}>
          <div className="">
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
            <div className="w-full h-full bg-slate-300 bg-opacity-50 absolute flex flex-col justify-center items-center font-poppins text-2xl text-red-600 font-semibold italic">
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

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchLeads } from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import AppliedCampaign from "./AppliedCampaign";

const UserDashboard = () => {
  document.title = "Dashboard | Queleads CRM";

  const dispatch = useDispatch();

  const [leadData, setLeadData] = useState([]);

  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads({
        student_id: userDetails?.userInfo?.user_id,
      });

      console.log("response", response);

      if (response?.status === 200) {
        console.log("res enterd: ", response);
        if (response?.data) {
          console.log("res data: ", response?.data);
          setLeadData(response?.data);
          dispatch(addLeads(response?.data));
        }
      }
    })();
  }, [dispatch, userDetails?.userInfo?.user_id]);

  console.log("l data: ", leadData);

  return (
    <>
      <div className="font-poppins mb-20">
        <div>
          <h4 className="text-xl leading-6 font-poppins font-semibold text-black text-opacity-80">
            Applied Courses
          </h4>
        </div>
        <div className="grid grid-cols-2 2lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-7.5 mr-1">
          {leadData?.map((leadDetails, i) => {
            console.log("lead details: ", leadDetails);
            return <AppliedCampaign key={i} leadDetails={leadDetails} />;
          })}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

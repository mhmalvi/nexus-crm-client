import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleProfileDetails } from "../../../Components/services/auth";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import { curveCardinal } from "d3-shape";
import { handleGetAgencyDashboardData } from "../../../Components/services/utils";

function AgencyDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const loadingDetails = useSelector((state) => state?.user?.loading);
  const ProfileDetails = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    document.title = `Agency Dashboard | Queleads CRM`;
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(setLoader(false));
    }, 3000);
  }, [dispatch, ProfileDetails?.userInfo]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.user_id
      );


      if (userDetailResponse?.data) {
        const user = userDetailResponse?.data;
        setUserDetails(user);
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, ProfileDetails]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await handleGetAgencyDashboardData(ProfileDetails?.user_id);
      if (res?.status === 200) {
        setLoading(false);
        setDashboardData(res?.data);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="m-0">
      {loadingDetails && (
        <div className="w-full h-full text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="w-full mx-auto">
        <div className="flex gap-2 flex-wrap w-full">
          <div className=" w-[32%] h-[100px] bg-[#FFA859] rounded flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.payment_pending
                  ? dashboardData?.payment_pending
                  : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Payment Pending
              </p>
            </div>
          </div>
          <div className="w-[32%] h-[100px] bg-[#6EE46A] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.payment_approved
                  ? dashboardData?.payment_approved
                  : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Payment Approved
              </p>
            </div>
          </div>
          <div className="w-[32%] h-[100px] bg-[#AA87CB] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.payment_disapproved
                  ? dashboardData?.payment_disapproved
                  : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Payment Disapproved
              </p>
            </div>
          </div>
          <div className="w-[32%] h-[100px] bg-[#709FBB] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.pending ? dashboardData?.pending : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                File Incomplete
              </p>
            </div>
          </div>
          <div className="w-[32%] h-[100px] bg-[#70ccc0] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.rejected ? dashboardData?.rejected : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                File Rejected
              </p>
            </div>
          </div>
          <div className="w-[32%] h-[100px] bg-[#50583f] rounded  flex items-center justify-center gap-5  text-white">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                />
              </svg>
            </div>
            <div>
              <h1 className="p-0 m-0 text-[25px] text-white">
                {dashboardData?.certified ? dashboardData?.certified : 0}
              </h1>
              <p className="p-0 m-0 font-bold font-serif text-[17px]">
                Certified
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center"></div>
      </div>
    </div>
  );
}

export default AgencyDashboard;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import UserDashboard from "./UserDashboard";
import AgencyDashboard from "./AgencyDashboard/AgencyDashboard";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import AccountantDashboard from "./AccountantDashboard/AccountantDashboard";
import Loading from "../../Components/Shared/Loader";

const Dashboard = () => {
  const userDetails = useSelector((state) => state?.user);
  const openSideBar = useSelector((state) => state?.user)?.openSideBar;
  const [showDashboard, setShowDashboard] = useState(true);
  useEffect(() => {
    setShowDashboard(false);
    const timeoutId = setTimeout(() => {
      setShowDashboard(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [openSideBar]);
  return (
    <div className=" min-h-[100vh] ">
      {showDashboard ? (
        <div className="2xl:px-5 w-full h-[100vh] flex justify-center items-center">
          {userDetails?.userInfo?.role_id && (
            <>
              {(userDetails?.userInfo?.role_id === 1 ||
                userDetails?.userInfo?.role_id === 2) && (
                <SuperAdminDashboard />
              )}
              {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) && (
                // <TourProvider steps={steps}>
                <AdminDashboard />
                // </TourProvider>
              )}
              {userDetails?.userInfo?.role_id === 6 && <UserDashboard />}
              {userDetails?.userInfo?.role_id === 9 && <AgencyDashboard />}
              {userDetails?.userInfo?.role_id === 7 && <ManagerDashboard />}
              {userDetails?.userInfo?.role_id === 8 && <AccountantDashboard />}
            </>
          )}
        </div>
      ) : (
        <div className="2xl:px-5 w-full h-[100vh] flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

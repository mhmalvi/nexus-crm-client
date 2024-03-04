// import { UserOutlined } from "@ant-design/icons";
// import { Button, Input, message, Modal, ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { handlePasswordReset } from "../../Components/services/auth";
// import { Storage } from "../../Components/Shared/utils/store";
import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import UserDashboard from "./UserDashboard";
import AgencyDashboard from "./AgencyDashboard/AgencyDashboard";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import AccountantDashboard from "./AccountantDashboard/AccountantDashboard";
// import { TourProvider } from "@reactour/tour";
// import steps from "./steps";
const Dashboard = () => {
  const userDetails = useSelector((state) => state?.user);

  return (
    <div className=" min-h-[100vh] ">
      <div className="2xl:px-5 w-full h-[100vh] flex justify-center items-center">
        {userDetails?.userInfo?.role_id && (
          <>
            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2) && <SuperAdminDashboard />}
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
    </div>
  );
};

export default Dashboard;

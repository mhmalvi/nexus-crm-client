// import { UserOutlined } from "@ant-design/icons";
// import { Button, Input, message, Modal, ConfigProvider } from "antd";
import React, {useEffect} from "react";
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
const Dashboard = () => {
  
  const userDetails = useSelector((state) => state?.user);

  return (
    <div className=" min-h-[100vh] ">
      {/* Password Change Modal */}
      {/* <Modal
        title="Change Password"
        centered
        visible={toggleChanglePassword}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <div className="font-poppins">
          <div>
            <div className="mb-6">
              <span className="text-sm mb-0.5 font-light">Old Password</span>
              <Input.Password
                required
                value={passwordDetails}
                onChange={handleChange}
                placeholder="Old Password"
                prefix={<UserOutlined />}
              />
            </div>
            <div className="mb-3">
              <span className="text-sm mb-0.5 font-light">New Password</span>
              <Input.Password
                required
                id="new_password"
                className="bg-white"
                placeholder="New Password"
                prefix={<UserOutlined />}
              />
            </div>
            <div>
              <span className="text-sm mb-0.5 font-light">
                Re-Type New Password
              </span>
              <Input.Password
                required
                id="re_new_password"
                className="bg-white"
                placeholder="Re-Type New Password"
                prefix={<UserOutlined />}
              />
            </div>
          </div>
        </div>
      </Modal> */}

      <div className="2xl:px-5 h-[100vh] flex justify-center items-center">
        {userDetails?.userInfo?.role_id && (
          <>
            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2) && <SuperAdminDashboard />}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5) && <AdminDashboard />}
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

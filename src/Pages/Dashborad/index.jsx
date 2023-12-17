import { UserOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handlePasswordReset,
} from "../../Components/services/auth";
import { Storage } from "../../Components/Shared/utils/store";
import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import UserDashboard from "./UserDashboard";
import AgencyDashboard from "./AgencyDashboard/AgencyDashboard";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import AccountantDashboard from "./AccountantDashboard/AccountantDashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);

  const [toggleChanglePassword, setToggleChanglePassword] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState("");

  useEffect(() => {
    if (Storage.getItem("crm_password")) {
      setPasswordDetails(Storage.getItem("crm_password").split("_")?.[0]);
    }

    if (userDetails?.userInfo?.flag) {
      if (userDetails?.userInfo?.flag === 1) {
        setToggleChanglePassword(true);
      } else {
        setToggleChanglePassword(false);
      }
    }
  }, [passwordDetails, userDetails?.userInfo?.flag]);


  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      const newPassword = document.getElementById("new_password").value;
      const rewNewPassword = document.getElementById("re_new_password").value;

      if (newPassword === rewNewPassword) {
        const passwordChangeResponse = await handlePasswordReset(
          userDetails?.userInfo?.user_id,
          newPassword.toString()
        );
        if (passwordChangeResponse?.status === 205) {
          Storage.setItem("crm_password", newPassword);
          message.success("Password Changed Successfully");

          Storage.removeItem("auth_tok");
          Storage.removeItem("user_info");
          navigate("/login");
        }
      }

      setToggleChanglePassword(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setPasswordDetails(e?.target?.vaue);
  };


  return (
    <div>
      {/* Password Change Modal */}
      <Modal
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
      </Modal>
      <div className="absolute group right-0 mt-4 mr-4 p-1 rounded-full shadow-md">
        <Avatar
          className="rounded-full cursor-pointer mr-1"
          size="38"
          name={
            userDetails?.userInfo?.full_name ||
            userDetails?.userInfo?.name ||
            ""
          }
        />
        <span className="px-2">
          {userDetails?.userInfo?.full_name ||
            userDetails?.userInfo?.name ||
            ""}
        </span>

        <div className="hidden group-hover:block min-w-40 h-16 bg-white shadow-md absolute right-0 top-[52px] rounded-md">
          <div className="flex flex-col p-2 text-xs">
            <div>
              {userDetails?.userInfo?.full_name ||
                userDetails?.userInfo?.name ||
                ""}
            </div>
            <div>{userDetails?.userInfo?.email}</div>
            <div>
              {userDetails?.userInfo?.contact_number ||
                userDetails?.userInfo?.phone_number ||
                ""}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
        {userDetails?.userInfo?.role_id && (
          <div>
            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2) && <SuperAdminDashboard />}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5) && <AdminDashboard />}
            {userDetails?.userInfo?.role_id === 6 && <UserDashboard />}
            {userDetails?.userInfo?.role_id === 9 && <AgencyDashboard />}
            {userDetails?.userInfo?.role_id === 7 && <ManagerDashboard />}
            {userDetails?.userInfo?.role_id === 8 && <AccountantDashboard />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

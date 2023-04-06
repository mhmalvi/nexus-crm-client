import { UserOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import {
  handlefetchMessages,
  handlefetchNotifications,
  handlePasswordReset,
} from "../../Components/services/auth";
import { Storage } from "../../Components/Shared/utils/store";
import { addMessages } from "../../features/user/messagesSlice";
import { addNotifications } from "../../features/user/notificationSlice";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  const [toggleChanglePassword, setToggleChanglePassword] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState("");

  useEffect(() => {
    if (Storage.getItem("crm_password")) {
      setPasswordDetails(Storage.getItem("crm_password").split("_")?.[0]);
    }

    if (userDetails?.userInfo?.flag === 1) {
      setToggleChanglePassword(true);
    } else {
      setToggleChanglePassword(false);
    }
  }, [passwordDetails, userDetails?.userInfo?.flag]);

  useEffect(() => {
    document.title = `Dashboard`;

    // API Request for fetching messages
    (async () => {
      const messages = await handlefetchMessages(
        userDetails?.userInfo?.user_id
      );
      dispatch(
        addMessages(
          messages.length
            ? messages?.filter(
                (element, index) =>
                  messages.findIndex((obj) => obj.room === element.room) ===
                  index
              )
            : []
        )
      );
    })();

    // API Request for fetching notifiaction
    (async () => {
      const response = await handlefetchNotifications(
        userDetails?.userInfo?.user_id
      );

      if (response) {
        response?.forEach((notification) => {
          if (
            userNotifications?.filter(
              (notific) => notific.id !== notification.id
            ).length === 0
          ) {
            dispatch(addNotifications(notification));
          }
        });
      }
    })();
  }, [dispatch, userDetails?.userInfo?.user_id, userNotifications]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      const newPassword = document.getElementById("new_password").value;
      const rewNewPassword = document.getElementById("re_new_password").value;
      // console.log("newPassword", newPassword);
      // console.log("reNewPassword", rewNewPassword);

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

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setToggleChanglePassword(false);
  // };

  return (
    <div>
      {/* Password Change Modal */}
      <Modal
        title="Change Password"
        centered
        visible={toggleChanglePassword}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
        // okText="Save"
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
      {/* {userDetails?.userInfo?.role_id === 6 && ( */}
      <div className="absolute group right-0 mt-4 mr-4 p-1 rounded-full shadow-md">
        <Avatar
          className="rounded-full cursor-pointer mr-1"
          size="38"
          name={userDetails?.userInfo?.full_name}
        />
        <span className="px-2">{userDetails?.userInfo?.full_name}</span>

        <div className="hidden group-hover:block min-w-40 h-16 bg-white shadow-md absolute right-0 top-[52px] rounded-md">
          <div className="flex flex-col p-2 text-xs">
            <div>{userDetails?.userInfo?.full_name}</div>
            <div>{userDetails?.userInfo?.email}</div>
            <div>{userDetails?.userInfo?.contact_number}</div>
          </div>
        </div>
      </div>
      {/*  )} */}
      <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
        {(userDetails?.userInfo?.role_id === 1 ||
          userDetails?.userInfo?.role_id === 2) && <SuperAdminDashboard />}
        {(userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4 ||
          userDetails?.userInfo?.role_id === 5) && <AdminDashboard />}
        {userDetails?.userInfo?.role_id === 6 && <UserDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;

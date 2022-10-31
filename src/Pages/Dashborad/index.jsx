import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handlefetchMessages,
  handlefetchNotifications,
} from "../../Components/services/auth";
import { Storage } from "../../Components/Shared/utils/store";
import { addMessages } from "../../features/user/messagesSlice";
import { addNotifications } from "../../features/user/notificationSlice";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { UserOutlined } from "@ant-design/icons";
import { handlePasswordReset } from "../../Components/services/company";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  const [toggleChanglePassword, setToggleChanglePassword] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    old_password: "",
    new_password: "",
    re_new_password: "",
  });

  useEffect(() => {
    const passwordData = { ...passwordDetails };
    passwordData.old_password = Storage.getItem("crm_password").split("_")
      .length
      ? Storage.getItem("crm_password").split("_")?.[0]
      : "";
    setPasswordDetails(passwordData);

    if (!Storage.getItem("p_changed")) {
      setToggleChanglePassword(true);
    } else {
      setToggleChanglePassword(false);
    }
  }, []);

  useEffect(() => {
    document.title = `Dashboard`;

    if (!Storage.getItem("auth_tok")) {
      navigate("/login");
    }

    // API Request for fetching messages
    (async () => {
      const messages = await handlefetchMessages(
        userDetails?.userInfo?.user_id
      );
      dispatch(
        addMessages(
          messages?.filter(
            (element, index) =>
              messages.findIndex((obj) => obj.room === element.room) === index
          )
        )
      );
    })();

    // API Request for fetching notifiaction
    (async () => {
      const response = await handlefetchNotifications(
        userDetails?.userInfo?.user_id
      );

      response?.forEach((notification) => {
        if (
          userNotifications?.filter((notific) => notific.id !== notification.id)
            .length === 0
        ) {
          dispatch(addNotifications(notification));
        }
      });
    })();
  }, [dispatch, userDetails?.userInfo?.user_id, userNotifications]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      const newPassword = document.getElementById("new_password").value;
      const rewNewPassword = document.getElementById("re_new_password").value;
      console.log("newPassword", newPassword);
      console.log("reNewPassword", rewNewPassword);

      if (newPassword === rewNewPassword) {
        const passwordChangeResponse = await handlePasswordReset(
          userDetails?.userInfo?.user_id,
          newPassword.toString()
        );
        if (passwordChangeResponse?.status === 205) {
          Storage.setItem("p_changed", true);
          Storage.setItem("crm_password", newPassword);
          message.success("Password Changed Successfully");
        }
      }

      setToggleChanglePassword(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setToggleChanglePassword(false);
  };

  return (
    <div>
      {/* Password Change Modal */}
      <Modal
        title="Change Password"
        centered
        visible={toggleChanglePassword}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="font-poppins">
          <div>
            <div className="mb-6">
              <span className="text-sm mb-0.5 font-light">Old Password</span>
              <Input.Password
                value={passwordDetails?.old_password}
                placeholder="Old Password"
                prefix={<UserOutlined />}
              />
            </div>
            <div className="mb-3">
              <span className="text-sm mb-0.5 font-light">New Password</span>
              <Input.Password
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
                id="re_new_password"
                className="bg-white"
                placeholder="Re-Type New Password"
                prefix={<UserOutlined />}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
        {userDetails?.userInfo?.role_id === 6 ? (
          <UserDashboard />
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

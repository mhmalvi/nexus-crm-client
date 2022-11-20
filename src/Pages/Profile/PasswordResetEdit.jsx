import { UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handlefetchMessages,
  handlefetchNotifications,
  handlePasswordReset,
} from "../../Components/services/auth";
import { Storage } from "../../Components/Shared/utils/store";
import { addMessages } from "../../features/user/messagesSlice";
import { addNotifications } from "../../features/user/notificationSlice";

function PasswordResetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications
  ).notifications;

/*   const [toggleChanglePassword, setToggleChanglePassword] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false); */
  const [passwordDetails, setPasswordDetails] = useState("");

  useEffect(() => {
    if (Storage.getItem("crm_password")) {
      setPasswordDetails(Storage.getItem("crm_password").split("_")?.[0]);
    }
  }, [passwordDetails, userDetails?.userInfo?.flag]);

  const handleOk = () => {
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
    }, 2000);
  };

  const handleChange = (e) => {
    setPasswordDetails(e?.target?.value);
  };

  const CancelEditSettings = () => {
    navigate("/user-profile");
  };
  return (
    <div className="border rounded-lg bg-zinc-50 m-auto">
      <form className="w-3/5 font-poppins mt-6 m-auto">
        <div className="font-semibold text-2xl py-2">Reset Password</div>
        {/*       <div
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
      > */}
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
        {/* </div> */}

        <div className="flex justify-center my-10 gap-1">
          <div>
            <button
              className="h-10 px-5 w-full text-black bg-white border-2 border-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:border-brand-color hover:text-brand-color tracking-wide"
              onClick={CancelEditSettings}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              key="submit"
              onClick={handleOk}
              className="h-10 px-5 w-full text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-brand-color tracking-wide"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PasswordResetForm;

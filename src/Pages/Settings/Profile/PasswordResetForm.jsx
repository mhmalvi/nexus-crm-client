import { UserOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../../Components/Shared/utils/store";
import { handlePasswordReset } from "../../../Components/services/auth";

function PasswordResetForm() {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);

  const handleOk = async () => {
    const newPassword = document.getElementById("new_password").value;
    const rewNewPassword = document.getElementById("re_new_password").value;

    if (newPassword === rewNewPassword) {
      if (!newPassword?.length && !rewNewPassword?.length) {
        message.warn("Please enter a valid password");
        return;
      }

      const passwordChangeResponse = await handlePasswordReset(
        userDetails?.userInfo?.user_id,
        newPassword.toString()
      );

      console.log("passwordChangeResponse", passwordChangeResponse);

      if (passwordChangeResponse?.status === 205) {
        message.success("Password changed successfully");

        Storage.removeItem("auth_tok");
        Storage.removeItem("user_info");
        navigate("/login");
      } else {
        message.warn("Wrong Password");
      }
    } else {
      message.warn("Passwords are not matched");
    }
  };

  return (
    <div className="w-11/12 border rounded-lg bg-white m-auto shadow-md py-6">
      <div className="w-3/5 font-poppins mt-6 m-auto">
        <div className="font-semibold text-2xl py-2">Change Password</div>
        <div className="font-poppins">
          <div>
            <div className="mb-3">
              <span className="text-sm mb-1 font-light">New Password</span>
              <Input.Password
                required
                id="new_password"
                className="bg-white"
                placeholder="New Password"
                prefix={<UserOutlined />}
              />
            </div>
            <div>
              <span className="text-sm mb-1 font-light">
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

        <div className="flex justify-center my-10 gap-1">
          <div>
            <button
              key="submit"
              onClick={handleOk}
              className="h-10 px-5 w-full text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-gray-800 tracking-wide"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetForm;

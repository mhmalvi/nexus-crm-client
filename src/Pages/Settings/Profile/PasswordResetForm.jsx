import { UserOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handlePasswordReset } from "../../../Components/services/auth";
import { Storage } from "../../../Components/Shared/utils/store";

function PasswordResetForm() {
  // const navigate = useNavigate();

  const userDetails = useSelector((state) => state?.user);

  const [passwordDetails, setPasswordDetails] = useState("");

  useEffect(() => {
    if (Storage.getItem("crm_password")) {
      setPasswordDetails(Storage.getItem("crm_password").split("_")?.[0]);
    }
  }, [passwordDetails, userDetails?.userInfo?.flag]);

  const handleOk = async () => {
    // setTimeout(async () => {
    const newPassword = document.getElementById("new_password").value;
    const rewNewPassword = document.getElementById("re_new_password").value;

    if (newPassword === rewNewPassword) {
      if (passwordDetails) {
        if (newPassword === passwordDetails) {
          message.success("Password is same as previous");
          return;
        }
      }

      const passwordChangeResponse = await handlePasswordReset(
        userDetails?.userInfo?.user_id,
        newPassword.toString()
      );

      console.log("passwordChangeResponse", passwordChangeResponse);

      if (passwordChangeResponse?.status === 205) {
        // Storage.setItem("crm_password", newPassword);
        message.success("Password Changed Successfully");

        Storage.removeItem("auth_tok");
        Storage.removeItem("user_info");
        // navigate("/login");
      }
    }
    // }, 2000);
  };

  // const handleChange = (e) => {
  //   setPasswordDetails(e?.target?.value);
  // };

  // const CancelEditSettings = () => {
  //   navigate("/user-profile");
  // };
  return (
    <div className="border rounded-lg bg-white m-auto shadow-sm py-6">
      <form className="w-3/5 font-poppins mt-6 m-auto">
        <div className="font-semibold text-2xl py-2">Reset Password</div>
        <div className="font-poppins">
          <div>
            <div className="mb-6">
              <span className="text-sm mb-0.5 font-light">Old Password</span>
              <Input.Password
                required
                value={passwordDetails}
                // onChange={handleChange}
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

        <div className="flex justify-center my-10 gap-1">
          {/* <div>
            <button
              className="h-10 px-5 w-full text-black bg-white border-2 border-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:border-gray-800 hover:text-gray-800 tracking-wide"
              onClick={CancelEditSettings}
            >
              Cancel
            </button>
          </div> */}
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
      </form>
    </div>
  );
}

export default PasswordResetForm;

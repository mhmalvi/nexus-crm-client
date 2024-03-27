import { Modal } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";
import {
  successNotification,
  warningNotification,
} from "../../../Components/Shared/Toast";
const ForgotPassword = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailCheckResponse, setEmailCheckResponse] = useState();
  const modalText = "A Verification mail will be sent to the designated email.";
  const [emailData, setEmailData] = useState("");

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleOk = () => {
    if (emailData !== "") {
      if (regex.test(emailData) === true) {
        Axios.post(
          `https://crmuser.queleadscrm.com/api/user/forgot-password`,
          {
            email: emailData,
          },
          config
        )
          .then((res) => {
            setEmailCheckResponse(res.data);
            successNotification(
              "Verfication mail has been sent to the designated email."
            );
          })
          .catch((err) => {
            setEmailCheckResponse(err.response.data);
            warningNotification("Please enter a valid email address.");
          });
      } else {
        warningNotification("Please enter a valid email address.");
      }
    } else {
      warningNotification("Enter your email first.");
    }

    setConfirmLoading(true);
    setTimeout(() => {
      props.oncancel(false);
      setConfirmLoading(false);
    }, 1000);
  };

  return (
    <Modal
      title="Did you forget your password?"
      visible={props.visibility}
      onOk={handleOk}
      okText={"Send Email"}
      okButtonProps={{ disabled: emailData ? false : true }}
      confirmLoading={confirmLoading}
      centered
      onCancel={() => props.oncancel(false)}
      className="forgotModal"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <p className="p-0 mx-0 mb-2 text-slate-300 text-sm">{modalText}</p>
      <input
        className="w-full rounded-md bg-transparent placeholder:text-sm p-2 !text-slate-300"
        type="email"
        placeholder="Enter a valid email"
        onChange={(e) => {
          e.preventDefault();
          setEmailData(e.target.value);
        }}
      />
    </Modal>
  );
};

export default ForgotPassword;

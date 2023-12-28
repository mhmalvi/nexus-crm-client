import { Modal, message } from "antd";
import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailCheckResponse, setEmailCheckResponse] = useState();
  const [modalText, setModalText] = useState(
    "A Verification mail will be sent to the designated email."
  );
  const [emailData, setEmailData] = useState("");

  console.log(emailData);
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const handleOk = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
            console.log(res.data.message);
            setEmailCheckResponse(res.data);
            message.success("Verfication mail has been sent to the designated email.");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setEmailCheckResponse(err.response.data);
            message.warning("Please enter a valid email.");
          });
      } else {
        message.warning("Please enter a valid email address.");
      }
    } else {
      message.warning("Enter your email first.");
    }

    setConfirmLoading(true);
    setTimeout(() => {
      props.oncancel(false);
      setConfirmLoading(false);
    }, 3000);
  };

  return (
    <Modal
      title="Did you forget your password?"
      visible={props.visibility}
      onOk={handleOk}
      okText={"Send Email"}
      confirmLoading={confirmLoading}
      onCancel={() => props.oncancel(false)}
    >
      <p>{modalText}</p>
      <input
        className="w-full"
        type="email"
        placeholder="Enter a valid email"
        onChange={(e) => {
          e.preventDefault();
          setEmailData(e.target.value);
        }}
      />
      {/* ?email=${emailData} */}
    </Modal>
  );
};

export default ForgotPassword;
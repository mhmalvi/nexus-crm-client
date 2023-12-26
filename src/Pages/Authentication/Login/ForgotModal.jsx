import { Modal } from "antd";
import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailCheckResponse, setEmailCheckResponse] = useState();
  const [modalText, setModalText] = useState(
    "A Verification mail will be sent to the designated email."
  );
  const [emailData, setEmailData] = useState("");

  console.log(emailData)
  const handleOk = () => {
    Axios.post(
      `https://crmuser.quadque.digital/api/user/forgot-password/?email=${emailData}`
      // `${process.env?.REACT_APP_AUTH_URL}/api/user/forgot-password`,
      // props.emaildata
    )
      .then((res) => {
        console.log(res.data.message);
        setEmailCheckResponse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setEmailCheckResponse(err.response.data);
      });

    if (emailCheckResponse.status === true) {
      setModalText("Verfication mail has been sent to the designated email.");
    } else {
      setModalText(emailCheckResponse.message);
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
        type="text"
        placeholder="Enter a valid email"
        onChange={(e) => {
          e.preventDefault();
          setEmailData(e.target.value)
        }}
      />
    </Modal>
  );
};

export default ForgotPassword;

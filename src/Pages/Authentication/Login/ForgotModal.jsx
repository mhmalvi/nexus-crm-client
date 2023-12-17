import { Modal } from "antd";
import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailCheckResponse, setEmailCheckResponse] = useState();
  const [modalText, setModalText] = useState(
    "A Verification mail will be sent to the designated email. Do you wish to proceed?"
  );

  const handleOk = () => {
    Axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/user/forgot-password/?email=${props.emaildata}`
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
      setModalText(
        "Verfication mail has been sent to the designated email. Please verify through your email account.");
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
      confirmLoading={confirmLoading}
      onCancel={() => props.oncancel(false)}
    >
      <p>{modalText}</p>
    </Modal>
  );
};

export default ForgotPassword;

import axios from "axios";

export const handleLeadStatusChangeEmail = async (mailDetails) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_EMAIL_URL}/api/send-mail`,
      mailDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCallResponseMail = async (mailDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_EMAIL_URL}/api/send-responded-mail`,
      mailDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};


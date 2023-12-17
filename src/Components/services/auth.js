import axios from "axios";
import { btob_dev } from "./environment";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
export const handleRegistration = async (registrationDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/register`,
      registrationDetails
    );

    console.log("result", result);

    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLogin = async (loginDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/login`,
      loginDetails
    );

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleLoginSecond = async (loginDetails) => {
  try {
    const result = await axios.post(
      `${btob_dev}/agency_auth/agency-login`,
      loginDetails
    );

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleRegister = async (RegisterDetails) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/agency_auth/agency-register`,
      RegisterDetails,
      config
    );

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleSuspandB2BUser = async (cid, uid, status) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/agency_auth/company_id=${cid}/user_id=${uid}/status=${status}/suspend-user`,
      {},
      config
    );

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleProfileDetails = async (user_id) => {
  console.log("apiResultID", user_id);
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/${user_id}/details`,
      user_id
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const handleFetchB2BUser = async (rid, status) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_AUTH_URL}/api/role=${rid}/status=${status}/fetch-user`,
      config
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const handleUpdateProfileDetails = async (user_id, profileData) => {
  console.log(user_id);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/update`,
      user_id,
      profileData
    );
    console.log("APIresult", result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const handlePasswordReset = async (userId, newPassword) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/password-reset`,
      {
        user_id: userId,
        password: newPassword,
      }
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleUserSuspendStatus = async (userId, status) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/user-suspend`,
      {
        user_id: userId,
        suspend: status,
      }
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateUserStatus = async (userId, status) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/status`,
      {
        id: userId,
        status: status,
      }
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchUserProfileDetails = async (userId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/${userId}/details`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const handlefetchMessages = async (userId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_CHAT_SERVER_URL}/messages/${userId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handlefetchNotifications = async (userId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/notifications/${userId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

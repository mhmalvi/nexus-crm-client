import axios from "axios";

export const handleInitialRegistration = async (registrationData) => {
  const configJSON = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `https://crmuser.queleadscrm.com/api/user/registration`,
      registrationData,
      configJSON
    );

    return result?.data;
  } catch (error) {
    return error.response;
  }
};
export const handleMultipartRegistration = async (registrationData) => {
  const configJSON = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `https://crmuser.queleadscrm.com/api/user/register`,
      registrationData,
      configJSON
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};
export const handleEmployeeRegistration = async (registrationDetails) => {
  const configJSON = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `https://crmuser.queleadscrm.com/api/user/add`,
      registrationDetails,
      configJSON
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};
export const handleRegistration = async (registrationDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/register`,
      registrationDetails
    );

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
    return result;
  } catch (error) {
    return error;
  }
};
// export const handleLoginSecond = async (loginDetails) => {
//   try {
//     const result = await axios.post(
//       `${btob_dev}/agency_auth/agency-login`,
//       loginDetails
//     );

//     return result;
//   } catch (error) {
//     return error;
//   }
// };
export const handleLogout = async (logOut) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `https://crmuser.queleadscrm.com/api/logout`,
      logOut,
      config
    );
    return result;
  } catch (error) {
    return error;
  }
};

// export const handleRegister = async (RegisterDetails) => {
//   const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + authToken,
//     },
//   };
//   try {
//     const result = await axios.post(
//       `${btob_dev}/agency_auth/agency-register`,
//       RegisterDetails,
//       config
//     );

//     return result;
//   } catch (error) {
//     return error;
//   }
// };
// export const handleSuspandB2BUser = async (cid, uid, status) => {
//   const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + authToken,
//     },
//   };
//   try {
//     const result = await axios.post(
//       `${btob_dev}/agency_auth/company_id=${cid}/user_id=${uid}/status=${status}/suspend-user`,
//       {},
//       config
//     );

//     return result;
//   } catch (error) {
//     return error;
//   }
// };
export const handleProfileDetails = async (user_id) => {
  
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/${user_id}/details`,
      user_id
    );
    return result.data;
  } catch (error) {
    return error;
  }
};
// export const handleFetchB2BUser = async (rid, status) => {
//   const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + authToken,
//     },
//   };
//   try {
//     const result = await axios.get(
//       `${process.env?.REACT_APP_AUTH_URL}/api/role=${rid}/status=${status}/fetch-user`,
//       config
//     );
//     return result.data;
//   } catch (error) {
//     return error;
//   }
// };

export const handleUpdateProfileDetails = async (user_id, profileData) => {
  
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_AUTH_URL}/api/user/update`,
      user_id,
      profileData
    );
    return result;
  } catch (error) {
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

// export const handleFetchUserProfileDetails = async (userId) => {

// export const handlefetchMessages = async (userId) => {

// export const handlefetchNotifications = async (userId) => {

// export const handleDeleteImage = async (data) => {

// export const getAllSubscriptionList = async () => {

// export const updateProduct = async (data, productID) => {

// const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));

// export const handleCreateCompanyRequisition = async (requisitionData) => {

// export const handleFetchRequisitions = async () => {

// export const handleUpdateRequisitions = async (requisitionId, status) => {

// export const handleConfirmRegistration = async (full_name, email, password) => {

// export const handleRegistrationResponseMail = async (mailDetails) => {

// export const handleFetchNotificationList = async (uid) => {

// export const handleChangeNotificationStatus = async (notificationID) => {
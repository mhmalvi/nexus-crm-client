import axios from "axios";
import { crmNotification_dev } from "./environment";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
export const handleAddFollowUp = async (followUpData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json",
    },
  };
  console.log("FollowUp",followUpData)
  try {
    const result = await axios.post(
      `http://192.168.0.121:7000/api/follow-up`,
      followUpData,
      config
    );
    return result?.data;
  } catch (error) {
    return error;
  }
};
export const handleUpdateFollowUp = async (updatedFollowUpData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.put(
      `http://192.168.0.121:7000/api/follow-up-update`,
      updatedFollowUpData,
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};
export const handleFetchFollowUp = async (userID) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${crmNotification_dev}/api/follow-up-by-user`,
      {
        user_id: userID,
      },
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};
export const handleDeleteFollowUp = async (followupID) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json",
    },
  };
  console.log(followupID)
  try {
    const result = await axios.post(
      `http://192.168.0.121:7000/api/delete-notification`,
      {id:followupID},
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchReminders = async (reminderData) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `http://192.168.0.121:7000/api/notification-fetch`,
      reminderData,
      config
    );
    return result?.data;
  } catch (error) {
    return error;
  }
};
import axios from "axios";
import { crmNotification_dev } from "./environment";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));

export const handleFetchNotificationList = async (uid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${crmNotification_dev}/api/${uid}/notifications-list`,
      {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },

      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleChangeNotificationStatus = async (notificationID) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${crmNotification_dev}/api/change-status/${notificationID}`,
      {},
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleNotificationViewed = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `http://192.168.0.121:7000/api/notification-view`,
      data,
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

import axios from "axios";
import { NOTIFICATION_SERVER_DEV, crmNotification_dev } from "./environment";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
// export const handleFetchFollowUpNotification = async (userID) => {
//   console.log("userID", userID);
//   try {
//     const result = await axios.post(
//       // `${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/api/notifications-list`,
//       `${NOTIFICATION_SERVER_DEV}/api/notifications-list`,
//       {
//         user_id: userID,
//       }
//     );
//     return result?.data;
//   } catch (error) {
//     return error.response;
//   }
// };

// export const handleReadNotification = async (notificationID) => {
//   try {
//     const result = await axios.post(
//       // `${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/api/change-status`,
//       `${NOTIFICATION_SERVER_DEV}/api/change-status`,
//       {
//         id: notificationID,
//       }
//     );
//     return result?.data;
//   } catch (error) {
//     return error.response;
//   }
// };

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
      // `${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/api/change-status`,
      `${crmNotification_dev}/api/change-status/${notificationID}`,
      {},
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

import axios from "axios";
import { NOTIFICATION_SERVER_DEV } from "./environment";

export const handleFetchFollowUpNotification = async (userID) => {
  console.log("userID", userID);
  try {
    const result = await axios.post(
      // `${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/api/notifications-list`,
      `${NOTIFICATION_SERVER_DEV}/api/notifications-list`,
      {
        user_id: userID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleReadNotification = async (notificationID) => {
  try {
    const result = await axios.post(
      // `${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/api/change-status`,
      `${NOTIFICATION_SERVER_DEV}/api/change-status`,
      {
        id: notificationID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

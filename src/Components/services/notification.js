import axios from "axios";

export const handleFetchFollowUpNotification = async (userID) => {
  console.log("userID", userID);
  try {
    const result = await axios.get(
      `http://localhost:5000/api/notifications-list`,
      {
        user_id: userID,
      }
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleReadNotification = async (eventID) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_EVENTS_URL}/api/change-status`,
      {
        id: eventID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

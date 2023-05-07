import axios from "axios";

export const handleAddFollowUp = async (followUpData) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/api/follow-up`,
      followUpData
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateFollowUp = async (updatedFollowUpData, id) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/api/follow-up-update/${id}`,
      updatedFollowUpData
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchFollowUp = async (userID) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/api/follow-up-by-user`,
      {
        user_id: userID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchReminder = async (userID) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/api/follow`,
      {
        user_id: userID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};


import axios from "axios";

export const handlefetchMessages = async (userId) => {
  //   console.log(userId);
  try {
    // const result = await coreAxios.get(`/messages/${userId}`);
    const result = await axios.get(
      `${process.env?.REACT_APP_CHAT_SERVER_URL}/messages/${userId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handlefetchNotifications = async (userId) => {
  //   console.log(userId);
  try {
    // const result = await coreAxios.get(`/notifications/${userId}`);
    const result = await axios.get(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/notifications/${userId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

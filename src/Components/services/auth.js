import axios from "axios";
import { io } from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

export const handleRegistration = async (registrationDetails) => {
  try {
    // const result = await coreAxios.get(`/messages/${userId}`);
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
    return error.response;
  }
};

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
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_NOTIFICATION_SERVER_URL}/notifications/${userId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddNotification = async (notificationData) => {
  try {
    await socket.emit("send_notification", notificationData);
  } catch (error) {
    return error.response;
  }
};

export const handleSetReminder = async (reminderData) => {
  try {
    await socket.emit("add_reminder", reminderData);
  } catch (error) {
    return error.response;
  }
};

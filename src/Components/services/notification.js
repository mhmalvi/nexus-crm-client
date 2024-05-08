import axios from "axios";

export const handleNotificationViewed = async (data) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const result = await axios.post(
      `https://crmnotification.queleadscrm.com/api/notification-view`,
      data,
      config
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

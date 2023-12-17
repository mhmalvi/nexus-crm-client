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

  try {
    const result = await axios.post(
      `${crmNotification_dev}/api/follow-up`,
      followUpData,
      config
    );
    return result?.data;
  } catch (error) {
    return error;
  }
};

export const handleUpdateFollowUp = async (updatedFollowUpData, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `${crmNotification_dev}/api/${id}/follow-up-update`,
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
  try {
    const result = await axios.get(
      `${crmNotification_dev}/api/${followupID}/destroy`
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

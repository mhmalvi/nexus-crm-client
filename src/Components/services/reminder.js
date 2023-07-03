import axios from "axios";
import { crmNotification_dev, follow_up_dev } from "./environment";

export const handleAddFollowUp = async (followUpData) => {
  try {
    const result = await axios.post(
      // `${follow_up_dev}/api/follow-up`,
      `${crmNotification_dev}/api/follow-up`,
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
      // `${follow_up_dev}/api/follow-up-update/${id}`,
      `${crmNotification_dev}/api/follow-up-update/${id}`,
      updatedFollowUpData
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchFollowUp = async (userID) => {
  try {
    // const result = await axios.post(`${follow_up_dev}/api/follow-up-by-user`, {
    //   user_id: userID,
    // });
    const result = await axios.post(
      `${crmNotification_dev}/api/follow-up-by-user`,
      {
        user_id: userID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

// export const handleFetchReminder = async (userID) => {
//   try {
//     const result = await axios.get(
//       `${follow_up_dev}/api/follow`,
//       {
//         user_id: userID,
//       }
//     );
//     return result?.data;
//   } catch (error) {
//     return error.response;
//   }
// };

export const handleDeleteFollowUp = async (followupID) => {
  try {
    const result = await axios.get(
      // `${follow_up_dev}/api/delete-notification`,
      // {
      //   id: followupID,
      // }
      `${crmNotification_dev}/api/${followupID}/destroy`
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};



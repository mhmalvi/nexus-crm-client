import axios from "axios";
import { follow_up_dev } from "./environment";

export const handleAddFollowUp = async (followUpData) => {
  try {
    const result = await axios.post(
      `${follow_up_dev}/api/follow-up`,
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
      `${follow_up_dev}/api/follow-up-update/${id}`,
      updatedFollowUpData
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchFollowUp = async (userID) => {
  try {
    const result = await axios.post(`${follow_up_dev}/api/follow-up-by-user`, {
      user_id: userID,
    });
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
    const result = await axios.post(
      `${follow_up_dev}/api/delete-notification`,
      {
        id: followupID,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

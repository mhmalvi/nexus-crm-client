import axios from "axios";
import { crmNotification_dev, follow_up_dev } from "./environment";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
export const handleAddFollowUp = async (followUpData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json",
    },
  };
  // console.log(followUpData);

  try {
    const result = await axios.post(
      // `${follow_up_dev}/api/follow-up`,
      `${crmNotification_dev}/api/follow-up`,
      followUpData,
      config
    );
    return result?.data;
  } catch (error) {
    // console.log(error);
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
      // `${follow_up_dev}/api/follow-up-update/${id}`,
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
    // const result = await axios.post(`${follow_up_dev}/api/follow-up-by-user`, {
    //   user_id: userID,
    // });
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

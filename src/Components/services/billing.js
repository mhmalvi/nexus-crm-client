import axios from "axios";

export const saveCardDetails = async (data) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `https://crm-payment.queleadscrm.com/api/card-details-save`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const getCardDetails = async (data) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `https://crm-payment.queleadscrm.com/api/card-details`,
      { client_id: data },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

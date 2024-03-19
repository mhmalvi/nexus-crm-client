import axios from "axios";
import qs from "qs";

// export const saveCardDetails = async (data) => {
//   const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + authToken,
//     },
//   };
//   try {
//     const result = await axios.post(
//       `https://crm-payment.queleadscrm.com/api/card-details-save`,
//       data,
//       config
//     );
//     return result.data;
//   } catch (error) {
//     return error.response;
//   }
// };

export const getCardDetails = async () => {
  const custId = JSON.parse(window.localStorage.getItem("cust_id"));
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const config = {
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.get(
      `https://api.stripe.com/v1/customers/${custId}/cards`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const createCard = async (stripeToken) => {
  const custId = JSON.parse(window.localStorage.getItem("cust_id"));
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;

  const data = qs.stringify({ source: stripeToken });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
    transformRequest: [(data) => data],
  };

  try {
    const result = await axios.post(
      `https://api.stripe.com/v1/customers/${custId}/sources`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const deleteCard = async (cardId) => {
  const custId = JSON.parse(window.localStorage.getItem("cust_id"));
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
    transformRequest: [(data) => data],
  };

  try {
    const result = await axios.delete(
      `https://api.stripe.com/v1/customers/${custId}/sources/${cardId}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const getCustomerDetails = async () => {
  const custId = JSON.parse(window.localStorage.getItem("cust_id"));
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const config = {
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.get(
      `https://api.stripe.com/v1/customers/${custId}`,
      config
    );
    return result;
  } catch (error) {
    return error.response;
  }
};
export const updateDefaultCard = async (defaultCard) => {
  const custId = JSON.parse(window.localStorage.getItem("cust_id"));
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const data = qs.stringify({ default_source: defaultCard });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.post(
      `https://api.stripe.com/v1/customers/${custId}`,
      data,
      config
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

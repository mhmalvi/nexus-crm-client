import axios from "axios";
import qs from "qs";

export const getAllSubscriptionList = async () => {
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
      `https://api.stripe.com/v1/subscriptions`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
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

export const createSubscription = async (interval, package_name, price_id) => {
  const data = {
    customer_id: JSON.parse(window.localStorage.getItem("cust_id")),
    interval: interval,
    package_name: package_name,
    price_id: price_id,
  };
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };

  try {
    const result = await axios.post(
      `https://crm-payment.queleadscrm.com/api/create-subscriptions`,
      data,
      config
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const getPriceList = async () => {
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const config = {
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.get(`https://api.stripe.com/v1/prices`, config);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const getProduct = async (productID) => {
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const config = {
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.get(
      `https://api.stripe.com/v1/products/${productID}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const getSubscriptionDetails = async (subID) => {
  const secretKey = process.env.REACT_APP_ZULKER_SP_SEC_KEY;
  const config = {
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secretKey,
    },
  };
  try {
    const result = await axios.get(
      `https://api.stripe.com/v1/subscriptions/${subID}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

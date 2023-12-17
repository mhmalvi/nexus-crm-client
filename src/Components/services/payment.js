import axios from "axios";
import { payment_dev } from "./environment";

export const handleAddEwayPaymentDetails = async (paymentData) => {
  try {
    const result = await axios.post(
      `${payment_dev}/api/eway/payment/response`,
      paymentData
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handlePaymentDetails = async (leadId) => {
  try {
    const result = await axios.get(
      `${payment_dev}/api/payment-details/${leadId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchMonthPaymentDataOfCompany = async (companyId) => {
  try {
    const result = await axios.post(
      `${payment_dev}/api/monthly-payment`,
      {
        company_id: companyId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchCampaignwisePaymentDataOfCompany = async (companyId) => {
  try {
    const result = await axios.post(
      `${payment_dev}/api/campaign-wise-payment`,
      {
        company_id: companyId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchAverageIncomeOfLastWeek = async (companyId) => {
  try {
    const result = await axios.post(
      `${payment_dev}/api/last-week-payment`,
      {
        company_id: companyId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddLeadPaymentHistory = async (data) => {
  try {
    const result = await axios.post(
      `https://crmpayment.quadque.digital/api/store-payment-history`,
      data
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeletePaymentHistory = async (id) => {
  try {
    const result = await axios.get(
      `${payment_dev}/api/payment-history-delete/${id}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

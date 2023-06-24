import axios from "axios";
import { environment_dev } from "./environment";

export const handleUploadFile = async (fileDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_FILE_SERVER_URL}/api/documents`,
      fileDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleLeadMailUpload = async (data) => {
  console.log("data: ", data);
  try {
    const result = await axios.post(
      `https://crmleads.quadque.digital/api/lead/mail`,
      data
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchFile = async (fileId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_FILE_SERVER_URL}/api/documents/${fileId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Fetch Sales Employees
export const handleFetchSales = async (id) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/sales-list/${id}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Fetch Leqds data by id of sales employee

export const handleFetchLeadsBySalesId = async (id) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/assigned-lead-list/${id}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// fetch unassigned lead list

export const handleFetchUnassignedLeadList = async (id) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/unassigned-lead-list/${id}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

// Sales Lead assign
export const handleSalesAssignLead = async (data) => {
  console.log("data: ", data);
  try {
    const result = await axios.post(
      `${environment_dev}/api/assign-leads`,
      data
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Sales remove assign

export const handleSalesRemoveLead = async (id) => {
  console.log("data: ", id);
  try {
    const result = await axios.post(
      `https://crmleads.quadque.digital/api/lead/mail`,
      id
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

import axios from "axios";
import { environment_dev } from "./environment";

const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
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
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/sales-list/${id}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Fetch Leqds data by id of sales employee

export const handleFetchLeadsBySalesId = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/assigned-lead-list/${id}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// fetch unassigned lead list

export const handleFetchUnassignedLeadList = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/unassigned-lead-list/${id}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

// Sales Lead assign
export const handleSalesAssignLead = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/assign-leads`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Sales remove assign

export const handleSalesRemoveLead = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/unassign-leads`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

// Remove sales man

export const handleSalesManRemove = async (sid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/lead/${sid}/unassign-lead`,
      {},
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// add new Attach file
export const handleAddNewAttachment = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/checklist-save`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// get all Checklists
export const handleGetAllCheckLists = async (cid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${environment_dev}/api/company_id=${cid}/checklist-fetch`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// delet chckekLists
export const handleDeleteAttachment = async (cid, fid, attach_list) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/company_id=${cid}/checklist-delete`,
      {
        file_id: fid,
        attach_list: attach_list,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

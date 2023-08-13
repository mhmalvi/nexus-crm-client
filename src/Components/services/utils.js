import axios from "axios";
import { btob_dev, environment_dev } from "./environment";

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
// get pdf for show
export const handleGetPDFShow = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${environment_dev}/api/checklist_id=${id}/view-pdf-content`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// send student details
export const handleSendStudentDetails = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student-save`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Admission requests
export const handleGetStudentAdmissionRequests = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(`${btob_dev}/student/student-lists`, config);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Student admission request details
export const handleGetStudentAdmissionRequestsDetails = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/student_id=${id}/student-details`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetStudentAdmissionDetailsAgency = async (aid, sid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/agency_id=${aid}/student_id=${sid}/show-student-details-agency`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Change status admission complete

export const handleAdmissionStatusChange = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/change-status`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// get students details agency check

export const handleGetStudentCompleteDetailsCheck = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/agency_id=${id}/show-student-agency`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Remove file
export const handleRemoveFileAgencyCheck = async (id, rId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/student_id=${rId}/file_id=${id}/delete-file-by-agency`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Update file
export const handleUpdateStudentFile = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student_id=${id}/update-file`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// Send mail to institute
export const handleSendMailToInstitute = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student_id=${id}/send-mail`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// generate invoice pdf
export const handleInvoiceGenerate = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student_id=${id}/generate-pdf`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

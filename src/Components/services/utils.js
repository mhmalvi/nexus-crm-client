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
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/mail`,
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
export const handleFetchSales = async (cid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/sales-list/${cid}`,
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
    console.log(result);
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
export const handleRemoveFileAgencyCheck = async (id, rId, flag) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student_id=${rId}/file_id=${id}/delete-file-by-agency`,
      {
        flag: flag,
      },
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
//
export const handleCourseCheckListInsert = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/add-course-by-accountant`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleCourseCheckLists = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${environment_dev}/api/get-course-in-accountant`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
// REMOVE SALES ADMIN
export const handleRemoveTemplet = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/template_id=${id}/delete-mail-templates`,
      {},
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleShowStatusLogs = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${environment_dev}/api/lead/lead_id=${data?.lid}/lead-status-logs`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleAssignLeadToSales = async (data) => {
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
export const handleGetSalesAdmin = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/sales-employee`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleUpoladPaySlip = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/pay-slip`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetPaySlip = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/accountant/get-payment-slip-lists`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleChangeStatusPaySlip = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/accountant/pay-slip-status-change`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleSendComment = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/comment/add-comment-by-admin`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetComments = async (fid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/comment/file_id=${fid}/get-comments`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleSendCommentAgency = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/comment/reply-comment-by-agency`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUploadCertificate = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/certificate-upload`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetDashboardDataAccountant = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/accountant/get-accountant-dashboard-analytics`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetDashboardDataGraph = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/accountant/accountant-current-year-dashboard-data`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleGetStudentAdminDashboardData = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/admin-analytics`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetStudentAdminDashboardDataGraph = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(`${btob_dev}/student/admin-graph`, config);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleGetAgencyDashboardData = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${btob_dev}/student/agency_id=${id}/agency-analytics`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleDeleteCourse = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/course_id=${id}/course-destroy-from-accountant`,
      {},
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleUpdateCourse = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/course_id=${id}/course-update-from-accountant`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleGetCourseEdit = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${environment_dev}/api/course_id=${id}/get-course-details-in-accountant`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleIncompleteUpdateStudentFile = async (fid, flag, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/file_id=${fid}/flag_id=${flag}/update-file`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleSearchStudent = async (data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${btob_dev}/student/student-search`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCompanyList = async (rid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/role_id=${rid}/company-list-in-sales`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCompanyWiseLeadList = async (sid, cid) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/sales_id=${sid}/company_id=${cid}/get-lead-list-in-sales`,
      {},
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

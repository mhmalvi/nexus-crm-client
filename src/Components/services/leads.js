import axios from "axios";

export const handleFetchLeads = async (details) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/list`,
      details,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleLeadDetails = async (leadId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/details`,
      { lead_id: leadId },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleAddLead = async (leadData) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/create-lead`,
      leadData,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddCourse = async (details) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/add-course`,
      details,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUploadLeadFile = async (fileDetails) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/excel-read`,
      fileDetails,
      config
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateLeadContact = async (leadId, updatedDetails) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead-update/${leadId}`,
      updatedDetails,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadStudentDetailsUpdate = async (leadId, userId) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/${leadId}/update`,
      { student_id: userId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadStatusUpdate = async (data) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/status`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCallResponseUpdate = async (data) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/response`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadReviewUpdate = async (leadId, rating, salesUserId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/quality/update`,
      {
        lead_id: leadId,
        star_review: parseInt(rating),
        sales_user_id: salesUserId,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadCommentUpdate = async (leadId, remarks) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/multi-review/${leadId}`,
      {
        comments: remarks,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddCall = async (leadId, startTime, endTime, remark) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/add/call`,
      {
        lead_id: leadId,
        call_start_time: startTime,
        call_end_time: endTime,
        call_remark: remark,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddAmount = async (leadId, amount) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/add/amount`,
      {
        lead_id: leadId,
        amount: amount,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchChecklist = async (courseId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist`,
      {
        course_id: courseId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleChecklistDocumentUpload = async (documentDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/add/document`,
      documentDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleChecklistDocumentDelete = async (checklistId, studentId) => {
  try {
    const result = await axios.delete(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/${checklistId}/delete/documents`,
      {
        student_id: studentId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchLeadCheckListDocuments = async (details) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/student/documents`,
      details
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCampaigns = async (clientId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/campaign/list`,
      { client_id: clientId },
      config
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDocumentDelete = async (documentId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_FILE_SERVER_URL}/api/documents-delete/${documentId}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCourses = async () => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/courses`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleClientwiseCourseDetails = async (clientId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/course-details-by-client`,
      { client_id: clientId },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCoursewiseSalesAssign = async (requestData) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/assign-sales-to-lead`,
      requestData,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteCoursewiseSalesAssign = async (requestData) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/delete-sales-employee-by-user-id`,
      requestData,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCourseCheckList = async (courseId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist`,
      {
        course_id: courseId,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCoursewiseAssignedEmployees = async (courseDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/course-details-by-course-id`,
      courseDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateChecklist = async (
  clientId,
  userId,
  courseId,
  title
) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/create`,
      {
        client_id: clientId,
        user_id: userId,
        course_id: courseId,
        title: title,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteChecklist = async (checkListId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/delete`,
      {
        id: checkListId,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadAssign = async (leadId, salesUserId, assignBy) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/assign`,
      {
        lead_id: leadId,
        sales_user_id: salesUserId,
        assign_by: assignBy,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleSyncLeads = async (clientId, acToken) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/scrap`,
      {
        client_id: clientId,
        ac_k: acToken,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadCertificatetDetailsUpdate = async (
  leadId,
  certificateId
) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/${leadId}/update`,
      { document_certificate_id: certificateId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleReviewRemarksSubmitReq = async (remarks, leadId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/review/${leadId}`,
      {
        remarks: remarks,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCommentsSubmitReq = async (remarks, leadId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/multi-review/${leadId}`,
      {
        comments: remarks,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteComment = async (commentId) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/delete-lead-comments`,
      {
        comment_id: commentId,
      },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchSalesEmployeesSale = async (companyId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/sales-wise-lead-amount`,
      {
        company_id: companyId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

// Fetch email templet list
export const fetchEmailTemplatList = async () => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/mail-templates`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
//Add new Template

export const AddNewTemplateList = async (data) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/save-mail-template`,
      data
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

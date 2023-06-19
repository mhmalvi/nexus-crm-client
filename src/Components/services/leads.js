import axios from "axios";

export const handleAddLead = async (leadData) => {
  // console.log(clientId);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/create-lead`,
      leadData
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchLeads = async (details) => {
  // console.log(clientId);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/list`,
      details
      // { client_id: clientId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUploadLeadFile = async (fileDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/excel-read`,
      fileDetails
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateLeadContact = async (leadId, updatedDetails) => {
  // console.log(clientId);
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead-update/${leadId}`,
      updatedDetails
      // { client_id: clientId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadDetails = async (leadId) => {
  console.log(leadId);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/details`,
      { lead_id: leadId }
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

export const handleLeadStatusUpdate = async (
  leadId,
  newStatus,
  salesUserId
) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/status`,
      {
        lead_id: leadId,
        lead_status: newStatus,
        sales_user_id: salesUserId,
        response: null,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCallResponseUpdate = async (
  leadId,
  leadStatus,
  response
) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/response`,
      {
        lead_id: leadId,
        lead_status: leadStatus,
        response: response,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadReviewUpdate = async (leadId, rating, salesUserId) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/quality/update`,
      {
        lead_id: leadId,
        star_review: parseInt(rating),
        sales_user_id: salesUserId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadCommentUpdate = async (
  leadId,
  /* salesUserId, */ remarks
) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/multi-review/${leadId}`,
      {
        /* lead_id: leadId, */
        comments: remarks,
        /* sales_user_id: salesUserId, */
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddCall = async (leadId, startTime, endTime, remark) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/add/call`,
      {
        lead_id: leadId,
        call_start_time: startTime,
        call_end_time: endTime,
        call_remark: remark,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddAmount = async (leadId, amount) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/add/amount`,
      {
        lead_id: leadId,
        amount: amount,
      }
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
  console.log(documentDetails);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/add/document`,
      documentDetails
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleChecklistDocumentDelete = async (checklistId, studentId) => {
  console.log(checklistId);
  console.log(studentId);
  try {
    const result = await axios.delete(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/${checklistId}/delete/documents`,
      {
        student_id: studentId,
      }
    );
    console.log(result);
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
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCampaigns = async (clientId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/campaign/list`,
      { client_id: clientId }
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
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/course-details-by-client`,
      { client_id: clientId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCoursewiseSalesAssign = async (requestData) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/assign-sales-to-lead`,
      requestData
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteCoursewiseSalesAssign = async (requestData) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/delete-sales-employee-by-user-id`,
      requestData
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCourseCheckList = async (courseId) => {
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
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/create`,
      {
        client_id: clientId,
        user_id: userId,
        course_id: courseId,
        title: title,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteChecklist = async (checkListId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/checklist/delete`,
      {
        id: checkListId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleLeadAssign = async (leadId, salesUserId, assignBy) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/assign`,
      {
        lead_id: leadId,
        sales_user_id: salesUserId,
        assign_by: assignBy,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleSyncLeads = async (clientId, acToken) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/scrap`,
      {
        client_id: clientId,
        ac_k: acToken,
      }
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
  console.log(remarks, leadId);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/review/${leadId}`,
      {
        remarks: remarks,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCommentsSubmitReq = async (remarks, leadId) => {
  console.log(remarks, leadId);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/multi-review/${leadId}`,
      {
        comments: remarks,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteComment = async (commentId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/delete-lead-comments`,
      {
        comment_id: commentId,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchSalesEmployeesSale = async (companyId) => {
  console.log("companyId", companyId);
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
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_LEAD_URL}/api/mail-templates`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

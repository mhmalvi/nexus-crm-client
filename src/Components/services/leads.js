import axios from "axios";

export const handleFetchLeads = async (clientId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/list`,
      { client_id: clientId }
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

export const handleLeadDetailsUpdate = async (leadId, userId) => {
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
  console.log(salesUserId);
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/status`,
      { lead_id: leadId, lead_status: newStatus, sales_user_id: salesUserId }
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

export const handleLeadCommentUpdate = async (leadId, salesUserId, remarks) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_LEAD_URL}/api/lead/quality/update`,
      {
        lead_id: leadId,
        lead_remarks: remarks,
        sales_user_id: salesUserId,
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
    const result = await axios.delete(
      `${process.env?.REACT_APP_FILE_SERVER_URL}/api/documents/delete/${documentId}`
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

import axios from "axios";

export const handleCreateCompany = async (companyDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/create`,
      companyDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateCompany = async (companyDetails) => {
  console.log("companyDetails", companyDetails);
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/update`,
      companyDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCompanies = async () => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/list`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCompanyDetails = async (companyId) => {
  console.log("companyId", companyId);
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/${companyId}/details`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchCompanyEmployees = async (companyId) => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/${companyId}/employee/list`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddCompanyEmployees = async (employeeDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/employee/create`,
      employeeDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleRefreshCompanyFBToken = async (companyId) => {
  console.log(companyId);
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/${companyId}/token/update`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchNotices = async (clientId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/notice/list`,
      { client_id: clientId }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteNotices = async (noticeId) => {
  try {
    const result = await axios.delete(
      `${process.env?.REACT_APP_COMPANY_URL}/api/notice/${noticeId}/delete`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddNotice = async (clientId, noticeTitile, noticeDesc) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/notice/create`,
      {
        client_id: clientId,
        notice_title: noticeTitile,
        notice_description: noticeDesc,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateNotice = async (
  noticeId,
  noticeTitile,
  noticeDesc
) => {
  try {
    const result = await axios.put(
      `${process.env?.REACT_APP_COMPANY_URL}/api/notice/${noticeId}/update`,
      {
        notice_title: noticeTitile,
        notice_description: noticeDesc,
      }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchPackages = async () => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/get/package`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateCompanyRequisition = async (requisitionData) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/store/requisition`,
      requisitionData
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleCompanyStatusUpdate = async (companyId, status) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/company/status`,
      {
        company_id: companyId,
        active: status,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchStudentsPaymentHistory = async (userId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_PAYMENT_URL}/api/payment/list`,
      {
        user_id: userId,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchClientsPaymentHistory = async (companyId) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_PAYMENT_URL}/api/payment/list`,
      {
        company_id: companyId,
      }
    );
    return result?.data;
  } catch (error) {
    return error.response;
  }
};

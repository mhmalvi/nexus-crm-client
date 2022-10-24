import axios from "axios";

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

export const handleCreatePackage = async (packageDetails) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/store/package`,
      packageDetails
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

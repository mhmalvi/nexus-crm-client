import axios from "axios";

export const handleFetchRequisitions = async () => {
  try {
    const result = await axios.get(
      `${process.env?.REACT_APP_COMPANY_URL}/api/requisition/list`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateRequisitions = async (requisitionId, status) => {
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/update/status/requisition`,
      { id: requisitionId, status: status }
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleCreatePackage = async (packageDetails) => {
  console.log(packageDetails);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/store/package`,
      packageDetails
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdatePackage = async (packageDetails) => {
  console.log(packageDetails);
  try {
    const result = await axios.post(
      `${process.env?.REACT_APP_COMPANY_URL}/api/update/package`,
      packageDetails
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

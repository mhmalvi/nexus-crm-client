import axios from "axios";

export const handleCreatePackage = async (packageDetails) => {
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

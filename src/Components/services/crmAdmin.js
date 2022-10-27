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

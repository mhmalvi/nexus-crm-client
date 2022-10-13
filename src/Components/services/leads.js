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

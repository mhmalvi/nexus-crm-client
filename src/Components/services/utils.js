import axios from "axios";

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

import axios from "axios";

export const handleUploadFile = async (
  //   userId,
  //   clientId,
  //   documentFile,
  //   documentDetails
  fileDetails
) => {
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

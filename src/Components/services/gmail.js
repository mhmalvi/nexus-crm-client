import axios from "axios";

export const handleFetchEmails = async () => {
  try {
    const result = await axios.get(
      `http://localhost:8000/api/mail/inbox/ibristy009@gmail.com`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleFetchEmailDetails = async (id) => {
    console.log("resullllt IDddd", id);
  try {
    const result = await axios.get(
      `http://localhost:8000/api/mail/read/${id}`
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
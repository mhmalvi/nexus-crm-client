import coreAxios from "../Shared/utils/axios";

export const handlefetchMessages = async (userId) => {
  //   console.log(userId);
  try {
    const result = await coreAxios.get(`/messages/${userId}`);
    return result.data;
  } catch (error) {
    return error.response;
  }
};

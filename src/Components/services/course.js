import axios from "axios";
import { environment_dev } from "./environment";

const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));

export const getCourseDetailById = async (id) => {
  try {
    const res = await axios.get(
      `${environment_dev}/api/lead/${id}/course`
    );
    return res;
  } catch (error) {
    return error.response;
  }

};
export const updateCourseDetailById = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/lead/${id}/course/update`,
      data,
      config
    );

    console.log("result", result);

    return result?.data;
  } catch (error) {
    return error.response;
  }
};

import axios from "axios";
import { environment_dev } from "./environment";

export const getCourseDetailById = async (id) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const res = await axios.get(
      `${environment_dev}/api/lead/${id}/course`,
      config
    );
    return res;
  } catch (error) {
    return error.response;
  }
};
export const updateCourseDetailById = async (id, data) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `${environment_dev}/api/lead/${id}/course/update`,
      data,
      config
    );

    return result?.data;
  } catch (error) {
    return error.response;
  }
};

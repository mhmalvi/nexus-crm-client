import axios from "axios";
import { environment_dev } from "./environment";

const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));

export const getCourseDetailById = async (id) => {
  try {
    const res = await axios.get(
      //   `${process.env?.REACT_APP_COMPANY_DEV}/api/lead/${id}/course`
      `${environment_dev}/api/lead/${id}/course`
    );
    return res;
  } catch (error) {
    return error.response;
  }

  // axios.get().then((res)=> console.log(res)).catch(err=>console.log(err))
};
export const updateCourseDetailById = async (id, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      // `${process.env?.REACT_APP_COMPANY_DEV}/api/lead/${id}/course/update`,
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

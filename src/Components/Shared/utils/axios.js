import axios from "axios";

const coreAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  //   baseURL: "http://localhost:5000",
});

export default coreAxios;

coreAxios.interceptors.request.use(function (req) {
  let token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = "Token " + JSON.parse(token);
  }

  return req;
});

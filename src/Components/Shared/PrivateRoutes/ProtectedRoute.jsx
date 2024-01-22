import { Navigate, Outlet } from "react-router-dom";
import { Storage } from "../utils/store";

const ProtectedRoute = () => {
  return Storage.getItem("auth_tok") ? (
    <Outlet />
  ) : (
    // window.location.assign("https://queleadscrm.com")
    ""
  );
};

export default ProtectedRoute;

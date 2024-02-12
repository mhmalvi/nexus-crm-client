import { Outlet, Navigate } from "react-router-dom";
import { Storage } from "../utils/store";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const authToken = Storage.getItem("auth_tok");
  const userDetails = useSelector((state) => state?.user);

  if (authToken) {
    if (userDetails?.userInfo?.verification_status === 2) {
      return <Outlet />;
    } else if (userDetails?.userInfo?.verification_status === 1){
      return <Navigate to="/setup-your-profile" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoute;

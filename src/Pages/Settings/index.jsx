import React from "react";
import { useSelector } from "react-redux";
import CompanySettings from "./CompanySettings";

const Settings = () => {
  document.title = `Settings`;

  const userDetails = useSelector((state) => state?.user);

  return (
    <div className="pt-1 pb-10">
      {/* Company Profile Settings */}
      {/* {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2) && <AdminSettings />} */}
      {/* {userDetails?.userInfo?.role_id === 1 && <AdminSettings />} */}

      {/* Company Profile Settings */}
      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2 ||
        userDetails?.userInfo?.role_id === 3 ||
        userDetails?.userInfo?.role_id === 4 ||
        userDetails?.userInfo?.role_id === 5) && <CompanySettings />}
    </div>
  );
};

export default Settings;

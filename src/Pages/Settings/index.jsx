import React from "react";
import { useSelector } from "react-redux";
import AdminSettings from "./AdminSettings";
import CompanySettings from "./CompanySettings";
import ProfileSettings from "./ProfileSettings";

const Settings = () => {
  document.title = `Settings`;

  const userDetails = useSelector((state) => state?.user);

  return (
    <div className="pt-1 pb-10">
      {/* Company Profile Settings */}
      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2) && <AdminSettings />}
      {/* {userDetails?.userInfo?.role_id === 1 && <AdminSettings />} */}

      {/* Company Profile Settings */}
      {(userDetails?.userInfo?.role_id === 3 ||
        userDetails?.userInfo?.role_id === 4) && <CompanySettings />}

      {/* Personal Profile Settings */}
      <ProfileSettings />
    </div>
  );
};

export default Settings;

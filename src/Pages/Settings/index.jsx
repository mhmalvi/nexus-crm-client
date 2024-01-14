import React from "react";
import { useSelector } from "react-redux";
import CompanySettings from "./CompanySettings";

const Settings = () => {
  document.title = `Settings | Queleads CRM`;

  const userDetails = useSelector((state) => state?.user);

  return (
    <div className="h-screen flex justify-center items-center">
      {(userDetails?.userInfo?.role_id === 1 ||
        userDetails?.userInfo?.role_id === 2 ||
        userDetails?.userInfo?.role_id === 3 ||
        userDetails?.userInfo?.role_id === 4 ||
        userDetails?.userInfo?.role_id === 5) && <CompanySettings />}
    </div>
  );
};

export default Settings;

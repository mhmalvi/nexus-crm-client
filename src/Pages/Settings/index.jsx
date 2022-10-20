import React from "react";
import AdminSettings from "./AdminSettings";
import CompanySettings from "./CompanySettings";

const Settings = () => {
  document.title = `Settings`;

  return (
    <div className="pt-1 pb-10">
      <AdminSettings />
      <CompanySettings />
    </div>
  );
};

export default Settings;

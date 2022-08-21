import React from "react";
import CompanyDetails from "./CompanyDetails";
import SealsAdmins from "./SealsAdmins";
import { useParams } from "react-router-dom";

const CompanySettings = ({ admin }) => {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="mx-6 py-12">
      <CompanyDetails />
      <SealsAdmins admin={admin} />
    </div>
  );
};

export default CompanySettings;

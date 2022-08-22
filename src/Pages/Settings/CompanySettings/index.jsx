import React from "react";
import CompanyDetails from "./CompanyDetails";
import SalesAdmins from "./SalesAdmins";
import { useParams } from "react-router-dom";

const CompanySettings = ({ admin }) => {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="mx-6 py-12">
      <CompanyDetails />
      <SalesAdmins admin={admin} />
    </div>
  );
};

export default CompanySettings;

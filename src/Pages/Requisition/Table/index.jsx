import React from "react";
import requisitionData from "../../Requisition/requisitionData.json";
import RequisitionTable from "./RequisitionTable";

const Requisitions = ({ activeFilter, searchInput }) => {
  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <RequisitionTable
        title="Requisition List"
        tableHeaders={RequisitiontableHeaders}
        data={requisitionData}
        activeFilter={activeFilter}
        searchInput={searchInput}
      />
    </div>
  );
};

export default Requisitions;

const RequisitiontableHeaders = [
  "ID",
  "User Name",
  "Company",
  "Contact",
  "Business Email",
  "Trade Name",
  // "ABN",
  // "RTO CODE",
  "Status",
  "Approval",
];

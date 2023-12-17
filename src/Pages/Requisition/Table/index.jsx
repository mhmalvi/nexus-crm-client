import React, { useEffect, useState } from "react";
import { handleFetchRequisitions } from "../../../Components/services/crmAdmin";
import RequisitionTable from "./RequisitionTable";

const Requisitions = () => {
  const [requisitionsData, setRequisitionsData] = useState([]);
  const [syncRequisitionsData, setSyncRequisitionsData] = useState(false);

  useEffect(() => {
    (async () => {
      const requisitionsResponse = await handleFetchRequisitions();
      if (requisitionsResponse?.status) {
        setRequisitionsData(requisitionsResponse?.data);
      }
    })();
  }, [syncRequisitionsData]);

  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <RequisitionTable
        title="Requisition List"
        tableHeaders={requisitionTableHeader}
        data={requisitionsData}
        syncRequisitionsData={syncRequisitionsData}
        setSyncRequisitionsData={setSyncRequisitionsData}
      />
    </div>
  );
};

export default Requisitions;

const requisitionTableHeader = [
  "ID",
  "User Name",
  "Company",
  "Contact",
  "Business Email",
  "Trade Name",
  "Time",
  // "RTO CODE",
  "Status",
  "Actions",
];

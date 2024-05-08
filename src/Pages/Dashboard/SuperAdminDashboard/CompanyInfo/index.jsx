import React, { useState } from "react";
import SalesAdmins from "../../../Settings/CompanySettings/SalesAdmins";
import CompanyCampaigns from "./CompanyCampaigns";
import CompanyLeads from "./CompanyLeads";

const CompanyInfo = ({ clientId }) => {

  const [activeTabs, setActiveTabs] = useState(0);

  return (
    <div className="lg:w-[95%] xl:w-[85%] mx-auto pb-10">
      <div className="py-3 mb-5">
        <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
          More Informations
        </h1>
        <div className="flex flex-wrap items-center">
          {/* Tabs */}
          {tabs.map((tab) => (
            <div key={tab.id} onClick={() => setActiveTabs(tab.id)}>
              <h1
                className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 whitespace-nowrap ${
                  activeTabs === tab.id
                    ? "text-white bg-black"
                    : "text-black bg-white"
                }  rounded-full`}
                style={{
                  border: "1px solid rgba(124, 141, 181, 0.5)",
                }}
              >
                {tab.title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {activeTabs === 0 && <CompanyLeads clientId={clientId} />}
      {activeTabs === 1 && <CompanyCampaigns clientId={clientId} />}
      {activeTabs === 3 && <SalesAdmins clientId={clientId} />}
    </div>
  );
};

export default CompanyInfo;

const tabs = [
  {
    id: 0,
    title: "Leads",
  },
  {
    id: 1,
    title: "Campaigns",
  },
  {
    id: 2,
    title: "Account History",
  },
  {
    id: 3,
    title: "Employees",
  },
];

import { Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";

const SalesAdmins = ({ clientId }) => {
  const [activeAddSupervisor, setActiveAddSupervisor] = useState(false);
  const [activeAddSeals, setActiveAddSeals] = useState(false);
  const [syncEmployees, setSyncEmployees] = useState(false);
  const [companyAdminEmployees, setCompanyAdminEmployees] = useState([]);
  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(clientId);

      if (employeeResponse?.status === true) {
        if (employeeResponse?.data?.length) {
          const admins = (employeeResponse?.data).filter(
            (employee) => employee?.role_id === 3 || employee?.role_id === 4
          );
          const sales = (employeeResponse?.data).filter(
            (employee) => employee?.role_id === 5
          );

          setCompanyAdminEmployees(admins);
          setCompanySalesEmployees(sales);
        }
      }
    })();
  }, [clientId, syncEmployees]);

  return (
    <div className="flex justify-between 2xl:justify-evenly mt-12 pt-0.5">
      <div className="2xl:mr-32">
        <div>
          <hr />

          <Modal
            title="Add Admin Employee"
            visible={activeAddSupervisor}
            footer={null}
            onCancel={() => setActiveAddSupervisor(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              roleId={4}
              clientId={clientId}
              setActiveAddSupervisor={setActiveAddSupervisor}
              setActiveAddSeals={setActiveAddSeals}
              syncEmployees={syncEmployees}
              setSyncEmployees={setSyncEmployees}
            />
          </Modal>

          <Modal
            title="Add Sales Employee"
            visible={activeAddSeals}
            footer={null}
            onCancel={() => setActiveAddSeals(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              clientId={clientId}
              roleId={5}
              setActiveAddSupervisor={setActiveAddSupervisor}
              setActiveAddSeals={setActiveAddSeals}
              syncEmployees={syncEmployees}
              setSyncEmployees={setSyncEmployees}
            />
          </Modal>

          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-3 my-0">
              Admins
            </h1>
            <div>
              <div>
                <button
                  className="py-1 whitespace-nowrap px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color 2xl:ml-29"
                  onClick={() => setActiveAddSupervisor(true)}
                >
                  Add Supervisor
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="ml-8 px-4 mt-5">
          {companyAdminEmployees.length ? (
            companyAdminEmployees.map((employee, i) => (
              <div key={i} className="flex mb-6">
                <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
                  {i + 1}
                </div>
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.full_name}
                  </h1>
                  <p className="font-medium text-xs leading-5 mb-0 text-gray-600 text-opacity-75">
                    {employee?.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-base">No Employee Added Yet</h1>
          )}
          {/* <div className="flex mb-6">
            <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
              2
            </div>
            <div className="ml-4">
              <h1 className="font-semibold text-xl leading-5 text-gray-600">
                Nishat Ahmed
              </h1>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                CEO
              </p>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                ahmed@gmail.com
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="ml-2.5">
        <div>
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Sales Admins
            </h1>

            <div>
              <button
                className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color ml-29"
                onClick={() => setActiveAddSeals(true)}
              >
                Add Sales
              </button>
            </div>
          </div>
          <hr />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {companySalesEmployees.length ? (
            companySalesEmployees.map((employee, i) => (
              <div key={i} className="flex ">
                <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
                  {i + 1}
                </div>
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.full_name}
                  </h1>
                  <p className="font-medium text-xs leading-5 mb-0 text-gray-600 text-opacity-75">
                    {employee?.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-base">No Employee Added Yet</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAdmins;

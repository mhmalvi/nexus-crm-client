import { message } from "antd";
import React from "react";
import { useState } from "react";
import { handleRegistration } from "../../../Components/services/auth";
import { handleAddCompanyEmployees } from "../../../Components/services/company";

const EmployeeRegistrationForm = ({
  roleId,
  clientId,
  setActiveAddSupervisor,
  setActiveAddSeals,
  syncEmployees,
  setSyncEmployees,
}) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    full_name: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };

  console.log("employeeDetails", {
    ...employeeDetails,
    role_id: roleId,
  });

  const handleAddEmployee = async () => {
    const registrationResponse = await handleRegistration({
      ...employeeDetails,
      role_id: roleId,
    });
    console.log("registrationResponse", registrationResponse);
    console.log("DATA?????", {
      company_id: clientId,
      user_id: registrationResponse?.data?.user_id,
    });
    if (registrationResponse?.status === true) {
      const employeeAddResponse = await handleAddCompanyEmployees({
        company_id: clientId,
        user_id: registrationResponse?.data?.user_id,
      });

      console.log("employeeAddResponse", employeeAddResponse);

      if (employeeAddResponse?.status === true) {
        message.success("Employee Added Successfully");

        if (roleId === 4) {
          setActiveAddSupervisor(false);
        }
        if (roleId === 5) {
          setActiveAddSeals(false);
        }
        setEmployeeDetails({
          full_name: "",
          email: "",
          contact: "",
        });

        setSyncEmployees(!syncEmployees);
      } else {
        message.warn("Something Went Wrong. Try again...");
      }
    } else {
      message.warn("Something Went Wrong. Try again...");
    }
  };

  return (
    <div className="py-8 px-6">
      <h1 className="text-base font-semibold text-left text-brand-color uppercase tracking-wide ">
        Personal Information
      </h1>
      <div className="grid grid-cols-2 gap-1">
        <div className="mb-6">
          <label>
            <span className="block text-sm font-medium text-gray-700 tracking-wide">
              Your Name
            </span>
            <div>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                value={employeeDetails.full_name}
                onChange={handleChange}
              />
            </div>
          </label>
        </div>
        <div className="mb-6">
          <label>
            <span className="block text-sm font-medium text-gray-700 tracking-wide">
              Email
            </span>
            <input
              name="email"
              type="email"
              id="email"
              className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
              placeholder="email"
              value={employeeDetails.email}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="w-full flex items-center">
        <div className="w-full mb-2">
          <label className="block text-sm font-medium text-gray-700 tracking-wide">
            Contact
          </label>
          <div className="flex justify-start gap-1 my-2">
            <div className="w-full">
              <input
                name="contact"
                type="text"
                id="contact"
                maxLength={12}
                minLength={9}
                className="block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                placeholder="Contact No."
                value={employeeDetails.contact}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-6">
        <button
          className="float-right py-1 px-4 text-base leading-6 font-medium bg-brand-color rounded-md text-white"
          onClick={handleAddEmployee}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;

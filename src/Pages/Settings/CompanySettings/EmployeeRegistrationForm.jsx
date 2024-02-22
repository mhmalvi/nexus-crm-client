import { message } from "antd";
import React from "react";
import { useState } from "react";
import {
  handleEmployeeRegistration,
  handleRegister,
  handleRegistration,
} from "../../../Components/services/auth";
import { handleAddCompanyEmployees } from "../../../Components/services/company";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../features/user/userSlice";
import { handleRegistrationResponseMail } from "../../../Components/services/mail";
import Loading from "../../../Components/Shared/Loader";

const EmployeeRegistrationForm = ({
  roleId,
  clientId,
  setActiveAddSupervisor,
  setActiveAddSeals,
  syncEmployees,
  setSyncEmployees,
  setActiveAddStudentAdmin,
  setActiveAddStudentAccountants,
  flag,
}) => {
  console.log("flag: ", flag);
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    abn_number: "",
    website: "",
    address: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    dispatch(setLoader(true));

    const registrationResponse = await handleEmployeeRegistration({
      ...employeeDetails,
      role_id:
        (flag === 1 && 7) || (flag === 2 && 8) || (flag === 3 && 9) || roleId,
    });
    if (registrationResponse?.status === 201) {
      const employeeAddResponse = await handleAddCompanyEmployees({
        company_id: clientId,
        user_id: registrationResponse?.data?.user_id,
      });

      if (employeeAddResponse?.status === true) {
        message.success(registrationResponse?.message);
        setShowLoader(false);
        dispatch(setLoader(false));
        window.location.reload();
        if (roleId === 4) {
          setActiveAddSupervisor(false);
        }
        if (roleId === 5) {
          setActiveAddSeals(false);
        }
        setEmployeeDetails({
          full_name: "",
          email: "",
          contact_number: "",
          abn_number: "",
          website: "",
          address: "",
        });

        setSyncEmployees(!syncEmployees);
      } else {
        message.warn("Something went wrong. Please try again.");
        setShowLoader(false);
      }
    } else if (registrationResponse?.status === 500) {
      message.warn(registrationResponse?.data.errors.email[0]);
      setShowLoader(false);
    } else if (registrationResponse?.status === 422) {
      message.warn(registrationResponse?.data.errors.email[0]);
      setShowLoader(false);
    } else {
      message.warn("Email is not correct. Please try again.");
      setShowLoader(false);
    }
  };

  return (
    <div className="min-h-48 w-full">
      {showLoader ? (
        <div className="-ml-8 h-48 w-full flex items-center justify-center mx-0 p-0">
          <Loading />
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            setShowLoader(true);
            handleAddEmployee();
          }}
        >
          <div className="w-full flex gap-4">
            <div className="w-full">
              <h1 className="m-0 p-0 font-poppins text-base font-medium text-slate-300">
                Employee Name
              </h1>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
                className=" w-full py-2 px-4 rounded-md border border-slate-300 bg-transparent shadow-sm focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color placeholder:!text-slate-300 text-slate-300"
                value={employeeDetails.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <h1 className="m-0 p-0 font-poppins text-base font-medium text-slate-300">
                Employee Email
              </h1>
              <input
                name="email"
                type="email"
                id="email"
                className=" w-full py-2 px-4 rounded-md border border-slate-300 bg-transparent shadow-sm focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color placeholder:!text-slate-300 text-slate-300"
                placeholder="email"
                value={employeeDetails.email}
                onChange={handleChange}
              />
            </div>
          </div>
          {flag !== 3 && (
            <div className="w-full flex items-center">
              <div className="w-full mb-2">
                <h1 className="m-0 p-0 font-poppins text-base font-medium text-slate-300">
                  Employee Contact
                </h1>
                <div className="flex justify-start gap-1">
                  <div className="w-full">
                    <input
                      name="contact_number"
                      type="text"
                      id="contact_number"
                      className=" w-full py-2 px-4 rounded-md border border-slate-300 bg-transparent shadow-sm focus:outline-none focus:ring-brand-color focus:border-b focus:border-brand-color placeholder:!text-slate-300 text-slate-300"
                      placeholder="Contact No."
                      value={employeeDetails.contact_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {flag === 3 && (
            <div className="w-full flex items-center">
              <div className="w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  ABN Number
                </label>
                <div className="flex justify-start gap-1 my-2">
                  <div className="w-full">
                    <input
                      name="abn_number"
                      type="text"
                      id="abn_number"
                      maxLength={12}
                      minLength={9}
                      className="block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                      placeholder="ABN Number"
                      value={employeeDetails.abn_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {flag === 3 && (
            <div className="w-full flex items-center">
              <div className="w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  Website
                </label>
                <div className="flex justify-start gap-1 my-2">
                  <div className="w-full">
                    <input
                      name="website"
                      type="text"
                      id="website"
                      maxLength={12}
                      minLength={9}
                      className="block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                      placeholder="Web address"
                      value={employeeDetails.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {flag === 3 && (
            <div className="w-full flex items-center">
              <div className="w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  Address
                </label>
                <div className="flex justify-start gap-1 my-2">
                  <div className="w-full">
                    <textarea
                      rows={5}
                      cols={5}
                      name="address"
                      type="text"
                      id="address"
                      maxLength={12}
                      minLength={9}
                      className="block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                      placeholder="Address"
                      value={employeeDetails.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="py-2 px-4 text-base font-medium bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] rounded-md text-slate-300"
            type="submit"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeRegistrationForm;

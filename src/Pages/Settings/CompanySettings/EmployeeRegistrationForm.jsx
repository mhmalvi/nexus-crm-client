import { message } from "antd";
import React from "react";
import { useState } from "react";
import {
  handleRegister,
  handleRegistration,
} from "../../../Components/services/auth";
import { handleAddCompanyEmployees } from "../../../Components/services/company";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../features/user/userSlice";
import Loading from "../../../Components/Shared/Loader";
import { handleRegistrationResponseMail } from "../../../Components/services/mail";

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
  const loadingDetails = useSelector((state) => state?.user)?.loading;

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
    const registrationResponse = await handleRegistration({
      ...employeeDetails,
      role_id:
        (flag === 1 && 7) || (flag === 2 && 8) || (flag === 3 && 9) || roleId,
    });

    console.log("registrationResponse <><><>", registrationResponse);

    if (registrationResponse?.status === true) {
      const employeeAddResponse = await handleAddCompanyEmployees({
        company_id: clientId,
        user_id: registrationResponse?.data?.user_id,
      });
      console.log("employeeAddResponse", employeeAddResponse);

      if (employeeAddResponse?.status === true) {
        message.success("Employee Added Successfully");
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
        message.warn("Something went wrong. Try again later...");
      }
    } else {
      dispatch(setLoader(false));
      message.warn("Something went wrong. Try again later...");
    }
  };

  return (
    <div className="py-8 px-6">
      {loadingDetails && (
        <div className="w-full h-full text-7xl absolute top-0 left-0 z-50 flex justify-center items-center bg-slate-300 bg-opacity-70">
          <Loading />
          &nbsp;
        </div>
      )}
      <div>
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
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
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
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                placeholder="email"
                value={employeeDetails.email}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {flag !== 3 && (
          <div className="w-full flex items-center">
            <div className="w-full mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Contact
              </label>
              <div className="flex justify-start gap-1 my-2">
                <div className="w-full">
                  <input
                    name="contact_number"
                    type="text"
                    id="contact_number"
                    className="block w-full py-2 px-3 border-b border-gray-300 bg-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
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
        <div className="pt-10 pb-6">
          <button
            className="float-right py-2 px-4 text-base leading-6 font-medium bg-black rounded-md text-slate-300"
            onClick={() => {
              handleAddEmployee();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;

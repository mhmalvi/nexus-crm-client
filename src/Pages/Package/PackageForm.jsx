import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./package.css";
import Axios from "axios";
import { message } from "antd";

const PackageForm = () => {
  const [Data, setData] = useState({
    package_name: "",
    package_type: "",
    package_type_limit: "",
    business_type: 1,
    package_details: "",
  });
  const [DataErr, setDataErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [Show, setShow] = useState(false);
  const [error, setError] = useState(false);
  // const [error_msg, setError_msg] = useState(false);

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataErr(validate(Data));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(DataErr);
    if (Object.keys(DataErr).length === 0 && isSubmit) {
      console.log(Data);

      Axios.post(
        `${process.env?.REACT_APP_COMPANY_URL}/api/store/package`,
        Data
      )
        .then((res) => {
          console.log(res);
          setShow(!Show);
        })
        .catch((err) => {
          //console.log(err.response.data.errors.package_type);
          if (err.response.data.errors) {
            console.log(err.response.data.errors.package_type);
          } else {
            console.log(err.response.data);
          }
          setError(!error);
          console.log(err.response.data.errors.package_type);
          message.warning(err.response.data.errors.package_type);
        });

      setData({
        package_name: "",
        package_type: "",
        package_type_limit: "",
        business_type: 1,
        package_details: "",
      });

      setIsSubmit(!isSubmit);
    }
  }, [isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.package_name) {
      errors.package_name = "package name is required!";
    }
    if (!values.package_type) {
      errors.package_type = "package type is required!";
    }
    if (!values.package_type_limit) {
      errors.package_type_limit = "package type is required!";
    }
    if (!values.business_type) {
      errors.business_type = "Business type is  required!";
    }
    if (!values.package_details) {
      errors.package_details = "Business type is  required!";
    }
    return errors;
  };

  return (
    <>
      <div className="font-poppins relative flex flex-col justify-center overflow-hidden py-18">
        {Object.keys(DataErr).length === 0 && Show && !error && (
          <div className="w-[30%] p-6 m-auto shadow-lg text-lg text-[#7E4BFF] text-center shadow-indigo-100 border-2 border-slate-200 rounded-lg">
            Package created successfully!
          </div>
        )}
        <div className="w-10/12 p-6 m-auto">
          <h1 className="text-2xl font-semibold text-left text-[#7E4BFF] uppercase tracking-wide">
            Create Package
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Package Name
                </span>
                <input
                  type="text"
                  name="package_name"
                  placeholder="Package Name"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-400 focus:border-b focus:border-indigo-400 sm:text-sm"
                  onChange={handleChange}
                  value={Data.package_name}
                />
              </label>
              <p className="text-red-500 text-xs">{DataErr.package_name}</p>
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Package Type
                </span>
                <input
                  name="package_type"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Ex. 1,2,3"
                  value={Data.package_type}
                  onChange={handleChange}
                />
              </label>
              <p className="text-red-500 text-xs">{DataErr.package_type}</p>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Type Limit
                <input
                  name="package_type_limit"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Ex. 1,2,3"
                  value={Data.package_type_limit}
                  onChange={handleChange}
                />
              </label>
              <p className="text-red-500 text-xs">
                {DataErr.package_type_limit}
              </p>
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Business Type
                </span>
                <input
                  name="business_type"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Business type"
                  value={Data.business_type}
                  onChange={handleChange}
                />
              </label>
              <p className="text-red-500 text-xs">{DataErr.business_type}</p>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Details
                <input
                  name="package_details"
                  type="text"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Package Details"
                  value={Data.package_details}
                  onChange={handleChange}
                />
              </label>
              <p className="text-red-500 text-xs">{DataErr.business_type}</p>
            </div>

            <div className="flex justify-center my-10">
              <button
                type="submit"
                className="h-10 px-5 w-full text-indigo-100 bg-[#7E4BFF] rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-[#723bff] tracking-wide"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PackageForm;

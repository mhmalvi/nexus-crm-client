import { AutoComplete, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleCreateCompanyRequisition } from "../../Components/services/company";
import Subscription from "../Subscription";
import SubsFooter from "../Subscription/SubsFooter";
import countries from "./countries.json";
import Dialog from "./Dialog";

const RequisitionForm = () => {
  const [DataErr, setDataErr] = useState({});
  const [showRequisitionForm, setShowRequisitionForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [data, setData] = useState(initialRequisitionData);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataErr(validate(data));

    if (Object.keys(DataErr).length === 0) {
      const requisitionResponse = await handleCreateCompanyRequisition(data);

      if (requisitionResponse?.status) {
        setData(initialRequisitionData);
        setShowDialog(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const cityDetails = [];
      countries.forEach((details) => {
        cityDetails.push({ value: `${details?.name}` });
      });
      setCountryList(cityDetails);
    })();
  }, []);

  const handleSetCountryname = (value) => {
    const reqData = { ...data };
    console.log(value);
    reqData.country_name = value;

    setData(reqData);
  };

  const validate = (values) => {
    //data.logo = ImgFile;
    const errors = {};
    if (!values.name) {
      errors.name = "Full name is required!";
    }
    if (!values.contact) {
      errors.contact = "Contact number is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.company_name) {
      errors.company_name = "Company name is required!";
    }
    if (!values.email) {
      errors.email = "Personal email is required!";
    }
    if (!values.business_email) {
      errors.business_email = "Personal email is required!";
    }
    if (!values.address) {
      errors.address = "Company address is required!";
    }
    if (!values.trading_name) {
      errors.trading_name = "Company trade name is required!";
    }
    if (!values.rto_code) {
      errors.rto_code = "RTO code is required!";
    }
    if (!values.abn) {
      errors.abn = "Australian business number is  required!";
    }
    if (!values.website) {
      errors.website = "Company website is required!";
    }
    if (!values.country_name) {
      errors.country_name = "Country is required!";
    }
    return errors;
  };

  const handleCancelDialog = () => {
    setShowDialog(false);
  };

  console.log(data);

  return (
    <div className="font-poppins scroll-smooth">
      <h1 className="font-poppins text-2xl font-semibold text-center pt-20 pb-4">
        CRM Requisition From
      </h1>
      <div className="w-10/12 mx-auto">
        <Subscription
          setShowRequisitionForm={setShowRequisitionForm}
          data={data}
          setData={setData}
        />
      </div>

      {/* Confirmation Message */}
      <Modal
        visible={showDialog}
        footer={null}
        onCancel={handleCancelDialog}
        width={600}
      >
        <Dialog />
      </Modal>

      {showRequisitionForm && (
        <div
          id="requisition_from"
          className="flex flex-col justify-center items-center scroll-smooth overflow-hidden pb-16 pt-2 font-poppins"
        >
          <div className="w-1/2 p-6 m-auto shadow-x bg-gray-50 bg-opacity-40 rounded-md shadow">
            <h1 className="text-base font-semibold text-left text-brand-color uppercase tracking-wide">
              Personal Information
            </h1>
            <form id="form" onSubmit={handleSubmit} className="mt-6">
              <div className="grid grid-cols-2 gap-1">
                <div className="mb-6">
                  <label>
                    <span className="block text-sm font-medium text-gray-700 tracking-wide">
                      Your Name
                    </span>
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </label>
                  <div>
                    <p className="text-red-500 text-xs">{DataErr.name}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <label>
                    <span className="block text-sm font-medium text-gray-700 tracking-wide">
                      email
                    </span>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                      placeholder="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </label>
                  <p className="text-red-500 text-xs">{DataErr.email}</p>
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
                        value={data.contact}
                        onChange={handleChange}
                      />
                      <p className="text-red-500 text-xs">{DataErr.contact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comapny info */}
              <h1 className="text-base font-semibold text-left text-brand-color uppercase py-4 tracking-wide">
                Company Information
              </h1>

              <div className="grid grid-cols-2 gap-2 items-end">
                <div className="mb-6">
                  <label>
                    <span className="block text-sm font-medium text-gray-700 tracking-wide">
                      Company name
                    </span>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        placeholder="Name of your company"
                        value={data.company_name}
                        onChange={handleChange}
                        className=" mt-1 block w-full py-2 px-3 mr-1 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </label>
                  <p className="text-red-500 text-xs">{DataErr.company_name}</p>
                </div>
                <div className="mb-6">
                  <label>
                    <span className="block text-sm font-medium text-gray-700 tracking-wide">
                      Business Email
                    </span>
                    <input
                      name="business_email"
                      type="email"
                      id="business_email"
                      className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm  "
                      placeholder="john.cooks@example.com"
                      value={data.business_email}
                      onChange={handleChange}
                    />
                  </label>
                  <p className="text-red-500 text-xs">
                    {DataErr.business_email}
                  </p>
                </div>
                {/* <div className="mb-6">
                  <span className="block text-sm font-medium text-gray-700 tracking-wide mb-2">
                    Logo
                  </span>
                  <div className="w-full flex justify-start items-end">
                    <label
                      htmlFor="logo"
                      className="cursor-pointer mr-6 w-44 max-h-10 shadow text-white font-medium text-center bg-brand-color focus:outline-none hover:ring-indigo-700 hover:border-indigo-700 py-2"
                    >
                      <span>Upload</span>
                      <input
                        id="logo"
                        accept="image/png, image/jpeg, image/jpg"
                        name="logo"
                        type="file"
                        placeholder="Company contact no."
                        onChange={(e) => handleImage(e)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <p className="text-red-500 text-xs">{DataErr.logo}</p>
                </div> */}
              </div>

              <div className="mb-6">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Description
                  </span>
                  <textarea
                    name="description"
                    id="description"
                    className=" mt-1 block w-full py-2 px-3 mr-1 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                    rows="2"
                    value={data.description}
                    onChange={handleChange}
                  ></textarea>
                </label>
              </div>

              <div className="mb-6">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Company Address
                  </span>
                  <input
                    name="address"
                    type="text"
                    id="address"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Address of your company"
                    value={data.address}
                    onChange={handleChange}
                  />
                </label>
                <p className="text-red-500 text-xs">{DataErr.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Trading Name
                  </label>
                  <input
                    name="trading_name"
                    type="text"
                    id="trading_name"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Enter trade name"
                    value={data.trading_name}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.trading_name}</p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    RTO Code
                  </label>
                  <input
                    name="rto_code"
                    type="text"
                    id="rto_code"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="RTO code"
                    value={data.rto_code}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.rto_code}</p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    ABN <span className="text-xs">(Business number)</span>
                  </label>
                  <input
                    name="abn"
                    type="text"
                    id="abn"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Business number"
                    value={data.abn}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.abn}</p>
                </div>
              </div>
              <div className="mb-6">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Company Website
                  </span>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border-b border-t-0 border-x-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      name="website"
                      id="website"
                      className="block w-full py-2 px-3 border-b border-l-0 border-gray-300 bg-white rounded-tr-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                      placeholder="www.example.com"
                      value={data.website}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <p className="text-red-500 text-xs">{DataErr.website}</p>
              </div>
              <div className="mb-2 country">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  Country
                </label>
                <AutoComplete
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  options={countryList}
                  style={{
                    border: "none",
                  }}
                  onSelect={handleSetCountryname}
                  placeholder="Type Country Name"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
                {/* <select
                  id="country_name"
                  name="country_name"
                  value={data.country_name}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500"
                >
                  <option className="text-slate-400">Select country</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UK</option>
                  <option>Bangladesh</option>
                  <option>China</option>
                  <option>India</option>
                </select> */}
                <p className="text-red-500 text-xs">{DataErr.country_name}</p>
              </div>
              {/* <div className="mb-6">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    FaceBook Account
                  </span>
                  <input
                    name="facebook"
                    type="text"
                    id="facebook"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="www.facebook.com"
                    value={data.facebook}
                    onChange={handleChange}
                  />
                </label>
              </div> */}
              <div className="mt-6 px-3 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    className="bg-gray-200 cursor-pointer"
                    type="checkbox"
                    name="terms&conditions"
                    id="terms&conditions"
                    value="terms&conditions"
                    required
                  />
                  <label
                    htmlFor="terms&conditions"
                    className="ml-3 cursor-pointer font-light font-mulish"
                  >
                    agree to all the{" "}
                    <Link to={"/"} className="text-blue-600">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to={"/"} className="text-blue-600">
                      Privacy policy
                    </Link>
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-10 mb-6">
                <button
                  type="submit"
                  className="h-10 px-5 text-white bg-brand-color text-sm rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-600 font-poppins tracking-wide"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        <SubsFooter />
      </div>
    </div>
  );
};

export default RequisitionForm;

const initialRequisitionData = {
  // porsonal info
  name: "",
  email: "",
  contact: "",
  // company info
  packages_id: "",
  company_name: "",
  description: "",
  // logo_id: "",
  business_email: "",
  address: "",
  abn: "",
  website: "",
  trading_name: "",
  rto_code: "",
  country_name: "",
};

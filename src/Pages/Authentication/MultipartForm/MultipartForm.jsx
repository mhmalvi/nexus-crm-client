import React, { useState } from "react";
import Icons from "../../../Components/Shared/Icons";
import "./multipart.css";
import { Select } from "antd";
const MultipartForm = () => {
  const [screen, setScreen] = useState(0);
  const [industriesList, setIndustriesList] = useState(["RTO"]);
  const [data, setData] = useState({
    username: "",
    contact: "",
    company_name: "",
    company_address: "",
    industry: "RTO",
    website: "",
    abn: "",
    company_code: "",
    new_user: null,
  });
  const handleChange = (value) => {
    setIndustriesList(value);
  };
  const { Option } = Select;
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center formBackground font-poppins">
      {/* Screen 0 */}
      {screen === 0 && (
        <div className="w-1/3 flex flex-col items-center justify-center">
          <Icons.WelcomeStart className="w-full ease-in duration-200 w-full" />
          <h1 className="2xl:text-6xl text-5xl text-slate-300 m-0 p-0 text-center ">
            You are almost set
          </h1>
          <h1 className="2xl:text-lg text-sm text-slate-300 m-0 p-0 text-center w-full">
            Now that you have verified your email, let&apos;s setup your
            profile.
          </h1>
          <button
            onClick={() => {
              setScreen(1);
            }}
            className="px-4 py-2 m-0 text-blue-500 self-end 2xl:mr-12 xl:mr-0 mr-4 hover:text-slate-300 ease-in duration-100"
          >
            Next →
          </button>
        </div>
      )}

      {/* HEADING Screen 1,2,3 */}
      {screen === 1 && (
        <h1 className="text-xl text-slate-300 m-0 p-0 ">
          Personal Information
        </h1>
      )}
      {screen === 2 && (
        <h1 className="text-xl text-slate-300 m-0 p-0 ">Company Information</h1>
      )}
      {screen === 3 && (
        <h1 className="text-xl text-slate-300 m-0 p-0 ">Legal Information</h1>
      )}

      {/* FORM Screen 1,2,3 */}
      <form
        className={`w-1/5 h-2/3 flex items-center justify-center shadow-md backdrop-blur-2xl bg-[#ffffff22] border-[0.5px] border-[#ffffff44] rounded-md p-8 ${
          screen === 0 || screen === 4 ? "hidden" : "block"
        }`}
      >
        {screen === 1 && (
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Username
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Username"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Contact Number
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Contact Number"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    contact: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              onClick={() => {
                setScreen(2);
              }}
              className="m-0 text-blue-500 self-end hover:text-slate-300 ease-in duration-100"
            >
              Next →
            </button>
          </div>
        )}
        {screen === 2 && (
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Company Name
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Company Name"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    company_name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Company Address
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Company Address"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    company_address: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Select Industry
              </h1>
              <Select
                id="companies"
                defaultValue={data.industries}
                placeholder="Select an industry"
                className="!m-0 !px-0 !py-0 !w-full rounded-md bg-transparent border border-slate-300"
                onChange={handleChange}
              >
                {industriesList?.map((industry) => (
                  <Option value={industry}>{industry}</Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Website (Optional)
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Website"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    website: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  setScreen(1);
                }}
                className="m-0 text-blue-500 self-end hover:text-slate-300 ease-in duration-100"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  setScreen(3);
                }}
                className="m-0 text-blue-500 self-end hover:text-slate-300 ease-in duration-100"
              >
                Next →
              </button>
            </div>
          </div>
        )}
        {screen === 3 && (
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                ABN Number
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="ABN Number"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    abn: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full">
              <h1 className="m-0 w-full text-base text-slate-300 font-normal">
                Company Code (Optional)
              </h1>
              <input
                className="m-0 px-4 py-2 w-full rounded-md bg-transparent border border-slate-300"
                required
                placeholder="Company Code"
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    company_code: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  setScreen(2);
                }}
                className="m-0 text-blue-500 self-end hover:text-slate-300 ease-in duration-100"
              >
                ← Previous
              </button>
              <button
                // onClick={() => {
                //   setScreen(3);
                // }}
                className="m-0 text-gray-800  hover:text-slate-300 ease-in duration-100 bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] px-4 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>

      {screen === 0 || screen === 4 ? null : (
        <div
          className={`flex items-center justify-center ${
            screen === 0 || screen === 4 ? "hidden" : "block"
          }`}
        >
          <div
            className={`${
              screen >= 1 ? "bg-slate-300" : ""
            } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
          ></div>
          <div
            className={`${
              screen >= 2 ? "bg-slate-300" : ""
            } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
          ></div>
          <div
            className={`${
              screen >= 3 ? "bg-slate-300" : ""
            } ease-in duration-100 w-1 h-1 rounded-full border border-slate-300 p-1 mx-2`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MultipartForm;

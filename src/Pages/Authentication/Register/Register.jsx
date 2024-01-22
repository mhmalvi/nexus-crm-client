import { Button, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Shared/Loader";
import { handleRegister } from "../../../Components/services/auth";

const companyLogo = require("../../../assets/Icons/qq_logo_july.jpeg");
const Register = () => {
  document.title = "Register";
  const navigate = useNavigate();
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const [isCreating, setIscreating] = useState(false);
  const [role, setRole] = useState(1);
  const handleChange = (value) => {
    setRole(value);
  };

  const [data, setData] = useState({
    name: "",
    abn_number: null,
    phone_number: null,
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    website: "",
  });
  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
  };

  const handleLoginReq = async (e) => {
    e.preventDefault();
    setIscreating(true);
    let userData = { ...data, role };
    if (userData?.password !== userData?.confirm_password) {
      message.warn("Password dose not match");
    } else {
      const register = await handleRegister(userData);
      if (register?.status === 201) {
        setData({});
        setRole(1);
        setIscreating(false);
        message?.success("Account created successfully");
        navigate("/login");
      } else {
        setIscreating(false);
        message.warning(register?.message || "Account creation failed");
      }
    }
  };

  return (
    <div className="flex justify-center min-h-[100vh] items-center bg-gray-100 loginBackground">
      {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}

      <div className="max-w-[90vw] max-h-[95vh] bg-white px-8 py-4 rounded-md overflow-y-auto crm-scroll-none">
        <div className="pb-3 pt-8 flex flex flex-col items-center justify-center">
          <img
            src={companyLogo}
            alt="companyLogo"
            srcset=""
            className="w-60 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />

          <h1 className="text-2xl font-semibold text-gray-700 font-poppins">
            Register
          </h1>
          <p className="text-gray-500 pt-2 pb-4 font-poppins">
            Create New account
          </p>
        </div>
        <form
          className="mb-4 grid lg:grid-cols-2 grid-cols-1 lg:gap-x-10"
          onSubmit={handleLoginReq}
        >
          <div className="mb-6 font-poppins col-span-2 ">
            <label htmlFor="" className="block mb-2 text-sm text-gray-600">
              Select Role
            </label>
            <Select
              defaultValue={1}
              className="w-full rounded-md"
              onChange={handleChange}
              options={[
                { value: 1, label: `Agency` },
                { value: 2, label: `Organization Manager` },
              ]}
            />
          </div>
          <div className="mb-6 font-poppins lg:col-span-1 col-span-2">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Name/Agency Name
            </label>
            <Input
              size="large"
              name="name"
              id="name"
              value={data.name}
              placeholder="Enter your name"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          {role === 1 && (
            <div className="mb-6 font-poppins">
              <label
                htmlFor="abn_number"
                className="block mb-2 text-sm text-gray-600"
              >
                ABN Number
              </label>
              <Input
                type="number"
                size="large"
                name="abn_number"
                id="abn_number"
                value={data.abn_number}
                placeholder="Enter ABN Number"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                onChange={userData}
                required
              />
            </div>
          )}
          {role === 2 && (
            <div className="mb-6 font-poppins">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm text-gray-600"
              >
                Phone Number
              </label>
              <Input
                size="large"
                name="phone_number"
                id="phone_number"
                value={data.phone_number}
                placeholder="Enter your Phone Number"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                onChange={userData}
                required
              />
            </div>
          )}
          <div className="mb-6 font-poppins lg:col-span-1 col-span-2">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Add website
            </label>
            <Input
              size="large"
              name="website"
              id="website"
              value={data.website}
              placeholder="Enter website url"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="mb-6 font-poppins lg:col-span-1 col-span-2">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <Input
              size="large"
              name="email"
              id="email"
              value={data.email}
              placeholder="Enter your email"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="mb-4 font-poppins lg:col-span-1 col-span-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <Input.Password
              size="large"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={data.password}
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="mb-4 font-poppins lg:col-span-1 col-span-2">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <Input.Password
              size="large"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm your password"
              value={data.confirm_password}
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>

          {role === 1 && (
            <div className="mb-6 font-poppins col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm text-gray-600"
              >
                Address
              </label>
              <Input.TextArea
                rows={2}
                cols={2}
                size="large"
                name="address"
                id="address"
                value={data.address}
                placeholder="Enter Address"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                onChange={userData}
                required
              />
            </div>
          )}

          {/* THIS IS THE BUTTON SECTION */}
          <div className="col-span-2">
            <div className="mb-6">
              <Button
                htmlType="submit"
                loading={isCreating}
                className="!w-full py-3 !text-white !font-medium !bg-brand-color !bg-opacity-80 hover:bg-primary-800 !rounded-md focus:outline-none font-poppins !border-none"
              >
                {isCreating ? "Creating" : "Create A Account"}
              </Button>
            </div>
            <div
              className="text-center font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              I have an account
            </div>
            <div className="text-center">
              <a className="font-semibold" href="/requisition" target="_blank">
                Click Here To Explore Packages and Send Requisition
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

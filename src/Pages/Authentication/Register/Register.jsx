import { Button, Input, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Shared/Loader";
import { handleRegister } from "../../../Components/services/auth";
import { Storage } from "../../../Components/Shared/utils/store";
import "./register.css";
const companyLogo = require("../../../assets/Icons/Queleads_Logo.png");
const Register = () => {
  document.title = "Register";
  
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (Storage.getItem("auth_tok")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    if (registrationData.password !== confirmPassword) {
      return message.error("Passwords do not match!");
    } else {
      const res = handleRegister(registrationData);
      if (res) {
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <div className="flex h-screen items-center ">
      {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="flex flex-col gap-8 items-center justify-center h-full  w-1/3 register-left-background">
        <div className="flex flex-col">
          <h1 className="text-9xl text-slate-300 m-0 p-0">CRM</h1>
          <h2 className="text-xl text-slate-300 m-0 p-0">
            Client Relationship Management
          </h2>
        </div>
        <div className="flex flex-col gap-8 w-3/5">
          <div className="flex items-center gap-4">
            <div className="rounded-full text-slate-300 border h-4 w-4 flex items-center justify-center m-0 p-2">
              {">"}
            </div>
            <div>
              <h1 className="text-xl m-0 p-0 text-slate-300">
                Quick and free sign-up
              </h1>
              <p className=" text-base m-0 p-0 text-slate-300">
                Enter your email address to create an account.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full text-slate-300 border h-4 w-4 flex items-center justify-center m-0 p-2">
              {">"}
            </div>
            <div>
              <h1 className="text-xl m-0 p-0 text-slate-300">
                Automate your work
              </h1>
              <p className=" text-base m-0 p-0 text-slate-300">
                Focus on bringing sales while Queleads CRM will manage all the
                rest
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full text-slate-300 border h-4 w-4 flex items-center justify-center m-0 p-2">
              {">"}
            </div>
            <div>
              <h1 className="text-xl m-0 p-0 text-slate-300">
                Something for everyone
              </h1>
              <p className=" text-base m-0 p-0 text-slate-300">
                The best customer experiences are built with Queleads CRM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-2/3 register-right-background">
        <div className="flex items-center justify-center h-screen rounded-md">
          <div className="flex flex-col gap-8 h-2/3 shadow-md backdrop-blur-2xl bg-[#ffffff22] border-[0.5px] border-[#ffffff44] rounded-md px-8 py-8">
            <div className="flex flex-col gap-4 items-center justify-center">
              <img
                src={companyLogo}
                alt="companyLogo"
                srcset=""
                className="w-84 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold text-blue-500 font-poppins m-0 p-0">
                  Create account
                </h1>
                <p className="text-gray-500 font-poppins p-0 m-0">
                  Join us by creating your Queleads CRM account.
                </p>
              </div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={registerUser}>
              <div className="font-poppins ">
                <label htmlFor="email" className=" px-2 text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full !px-2 !py-2 !bg-transparent !active:bg-transparent !text-sm !placeholder-gray-400 !border !border-gray-400 !rounded-md !focus:outline-none !focus:border-brand-color"
                  onChange={(e) => {
                    setRegistrationData({
                      ...registrationData,
                      email: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="font-poppins ">
                <label htmlFor="password" className=" px-2 text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full !px-2 !py-2 !bg-transparent !active:bg-transparent !text-sm !placeholder-gray-400 !border !border-gray-400 !rounded-md !focus:outline-none !focus:border-brand-color"
                  onChange={(e) => {
                    setRegistrationData({
                      ...registrationData,
                      password: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="font-poppins ">
                <label
                  htmlFor="confirm_password"
                  className="px-2 text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm your password"
                  className="w-full !px-2 !py-2 !bg-transparent !active:bg-transparent !text-sm !placeholder-gray-400 !border !border-gray-400 !rounded-md !focus:outline-none !focus:border-brand-color"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="ease-in duration-200 lg:h-full w-full px-4 py-2 text-slate-300 font-medium bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] rounded-md focus:outline-none font-poppins hover:text-black"
              >
                Create
              </button>
              <h1 className="text-center font-semibold cursor-pointer">
                Already have an account?{" "}
                <span
                  className="ease-in duration-100 text-brand-color hover:text-opacity-70 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

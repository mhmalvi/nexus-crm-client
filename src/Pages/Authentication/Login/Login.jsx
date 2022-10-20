import { Input, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../../../Components/services/auth";
import Icons from "../../../Components/Shared/Icons";
import { Storage } from "../../../Components/Shared/utils/store";

const Login = () => {
  document.title = "CRM -Log In";
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    if(Storage.getItem("auth_tok")){
      navigate("/dashboard")
    }
  }, [navigate]);

  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
  };

  const handleLoginReq = async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("email", data.email);
    loginFormData.append("password", data.password);

    const loginResponse = await handleLogin(loginFormData);

    if (loginResponse?.status === 200) {
      message.success("Successfully Logged In");
      navigate("/dashboard");
      Storage.setItem("auth_tok", loginResponse?.data?.token);
    } else {
      message.warning("Oopps Wrong! Check You Email or Password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container max-w-md border border-gray-200 rounded-md p-3 bg-white">
        <div className="pb-3 pt-8">
          <div className="flex flex-col items-center">
            <Icons.CompanyLogo className="w-40" />
          </div>
        </div>
        <div className="text-center my-6">
          <h1 className="text-2xl font-semibold text-gray-700 font-poppins">
            Login
          </h1>
          <p className="text-gray-500 pt-2 pb-4 font-poppins">
            Login to access your account
          </p>
        </div>

        <div className="m-6">
          <form className="mb-4" onSubmit={handleLoginReq}>
            <div className="mb-6 font-poppins">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600"
              >
                Email
              </label>
              <Input
                // type="password"
                size="large"
                name="email"
                id="email"
                placeholder="Enter your username"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                onChange={userData}
                required
              />
              {/* <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Your Username"
                className="w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:border-brand-color"
                required
              /> */}
            </div>
            <div className="mb-6 font-poppins">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <Link
                  to="/login"
                  className="text-xs text-gray-400 focus:outline-none"
                >
                  Forgot password?
                </Link>
              </div>
              <Input.Password
                // type="password"
                size="large"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                onChange={userData}
                required
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 text-white font-medium bg-brand-color bg-opacity-80 hover:bg-primary-800 rounded-md focus:outline-none font-poppins"
              >
                Log in
              </button>
            </div>
            {/* <p className="text-sm text-center text-gray-400">
                Don't have an account yet?
                <Link to="/join" className="font-semibold ml-1.5">
                  Sign up
                </Link>
              </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

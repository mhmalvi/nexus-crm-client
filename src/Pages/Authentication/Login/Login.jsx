import { Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../../assets/Images/QQ.png";

const Login = () => {
  // const [data, setData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container max-w-md border border-gray-200 rounded-md p-3 bg-white">
        <div className="pb-3 pt-8">
          <div className="flex flex-col items-center">
            {/* <h1 className="text-lg">Welcome to</h1> */}
            {/* <span className="text-2xl">Quadque Technologies Limited</span> */}
            <img src={brandLogo} alt="" />
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
          <form className="mb-4">
            <div className="mb-6 font-poppins">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600"
              >
                Username
              </label>
              <Input
                // type="password"
                size="large"
                name="username"
                id="username"
                placeholder="Enter your username"
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
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

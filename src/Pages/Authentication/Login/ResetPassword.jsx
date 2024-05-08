import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import picture from "../../../assets/Images/paypal.png";

const ResetPassword = () => {
  document.title = "Log In | Queleads CRM";
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const [passwordMatch, setPasswordMatch] = useState(0);

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const passwordCheckMsg = [
    {
      id: 0,
      message: "",
    },
    {
      id: 1,
      message: "Passwords match.",
    },
    {
      id: 2,
      message: "Passwords don't match.",
    },
  ];

  useEffect(() => {
    if (data.newPassword !== "" && data.confirmPassword !== "") {
      if (data.newPassword === data.confirmPassword) {
        setPasswordMatch(passwordCheckMsg[1]);
      } else {
        setPasswordMatch(passwordCheckMsg[2]);
      }
    } else if (
      data.newPassword.length === 0 &&
      data.confirmPassword.length === 0
    ) {
      setPasswordMatch(passwordCheckMsg[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="container max-w-md border border-gray-200 rounded-md p-3 bg-white">
        <div className="pb-3 pt-8">
          <div className="flex flex-col items-center">
            <Icons.CompanyLogo className="w-40" />
          </div>
        </div>
        <div className="text-center my-6">
          <div className="m-auto rounded-full border w-14 h-14">
            <img src={picture} alt="" />
          </div>
          <div>
            <p className="text-gray-500 pt-2 font-poppins font-semibold m-0">
              Jahid Hasan
            </p>
            <span className="text-gray-500 text-sm font-poppins">
              jahid@quadque.digital
            </span>
          </div>
        </div>

        <div className="m-6">
          <h1 className="text-center text-2xl font-semibold text-gray-700 font-poppins">
            Reset your password
          </h1>
          <p className="text-gray-500 pt-2 font-poppins text-xs">
            Strong passwords include numbers, letters, and punctuation marks.
          </p>
          <form className="mb-4">
            <div className="mb-4 font-poppins">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  New password
                </label>
              </div>
              <Input.Password
                type="password"
                size="large"
                name="newPassword"
                id="newPassword"
                placeholder="Enter your password"
                value={data.newPassword}
                onChange={handleChange}
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                required
              />
            </div>

            {/* Password matching dialogue START*/}
            {passwordMatch.id === 1 && (
              <p className="text-green-500 text-xs">{passwordMatch.message}</p>
            )}
            {passwordMatch.id === 2 && (
              <p className="text-red-500 text-xs">{passwordMatch.message}</p>
            )}
            {passwordMatch.id === 0 && (
              <p className="text-red-500 text-xs">{passwordMatch.message}</p>
            )}
            {/* Password matching dialogue END*/}

            <div className="mb-4 font-poppins">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Confirm new password
                </label>
              </div>
              <Input.Password
                type="password"
                size="large"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                required
              />
            </div>

            {/* RESET button enable/disable */}
            {passwordMatch.id === 1 ? (
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full p-3 text-white font-medium bg-brand-color bg-opacity-80 hover:bg-primary-800 rounded-md focus:outline-none font-poppins"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <button
                  disabled
                  type="submit"
                  className="w-full p-3 text-white font-medium bg-brand-color bg-opacity-40 hover:bg-primary-800 rounded-md focus:outline-none font-poppins"
                >
                  Reset
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

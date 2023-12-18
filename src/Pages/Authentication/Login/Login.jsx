import { Input, Modal, Select, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { Storage } from "../../../Components/Shared/utils/store";
import {
  handleLogin,
  handleLoginSecond,
} from "../../../Components/services/auth";
import {
  addUserDetails,
  setCompanyId,
  setLoader,
  updateFbToken,
} from "../../../features/user/userSlice";
import ForgotPassword from "./ForgotModal";
import sidecoverphoto from "../../../assets/newimages/review-evaluation-satisfaction-customer-service-feedback-sign-icon (1).jpg";
const companyLogo = require("../../../assets/Icons/qq_logo_july.jpeg");
const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingDetails = useSelector((state) => state?.user)?.loading;
  const [tooglePasswordForget, setTooglePasswordForget] = useState(false);
  const [bookMarkOpen, setBookMarkOpen] = useState(false);
  const [addBookMarkOpen, setAddBookMarkOpen] = useState(false);
  const [syncBookMarked, setSyncBookMarked] = useState(false);
  const [bookMarkedAccounts, setBookMarkedAccounts] = useState([]);
  const [role, setRole] = useState(0);
  const handleChange = (value) => {
    setRole(value);
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Storage.getItem("auth_tok")) {
      navigate("/dashboard");
    }

    if (Storage.getItem("__ce__") && Storage.getItem("__cp__")) {
      setData({
        email: Storage.getItem("__ce__"),
        password: Storage.getItem("__cp__")?.split("_")[0],
      });
    }

    if (Storage.getItem("__b__")) {
      setBookMarkedAccounts(JSON.parse(Storage.getItem("__b__")));
    }
  }, [navigate, syncBookMarked]);

  console.log("bookMarkedAccounts", bookMarkedAccounts);

  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
  };

  const handleLoginReq = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));

    const loginFormData = new FormData();
    loginFormData.append("email", data.email);
    loginFormData.append("abn_number", data.email);
    loginFormData.append("password", data.password);
    loginFormData.append("role", role);
    let loginResponse;
    let loginResponseSecond;

    if (role === 0) {
      loginResponse = await handleLogin(loginFormData);
    } else {
      loginResponseSecond = await handleLoginSecond(loginFormData);
    }

    console.log("loginResponse", loginResponse);

    if (loginResponse?.status === 200 && loginResponse?.data) {

      console.log("loginResponse?.data?.data", loginResponse?.data?.data);

      Storage.setItem("user_info", loginResponse?.data?.data);
      Storage.setItem(
        "auth_tok",
        loginResponse?.data?.token || loginResponse?.data?.data
      );
      Storage.setItem("fac_t", loginResponse?.data?.data?.ac_k);
      dispatch(updateFbToken(loginResponse?.data?.data?.ac_k));

      dispatch(setLoader(false));
      dispatch(addUserDetails(loginResponse?.data?.data));
      dispatch(setCompanyId(loginResponse?.data?.data?.company?.id));

      if (loginResponse?.data?.data?.flag === 1) {
        Storage.setItem("__ce__", data.email);
        Storage.setItem(
          "__cp__",
          data.password +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3)
        );
      }

      message.success("Successfully Logged In");

      if (
        !bookMarkedAccounts?.filter((account) => account?._ue_ === data?.email)
          ?.length
      ) {
        setAddBookMarkOpen(true);
      } else {
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 1500);
      }
    } else if (
      loginResponseSecond?.status === 200 &&
      loginResponseSecond?.data
    ) {
      Storage.setItem("user_info", loginResponseSecond?.data?.data);
      Storage.setItem(
        "auth_tok",
        loginResponseSecond?.data?.token || loginResponseSecond?.data?.data
      );

      dispatch(setLoader(false));
      dispatch(addUserDetails(loginResponseSecond?.data?.data));
      message.success("Successfully Logged In");
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1500);
    } else {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 2000);
      message.warning("Oopps Wrong! Check You Email or Password/ABN Number");
    }
  };

  const handleOneClickLogin = async (credentials) => {
    dispatch(setLoader(true));

    const loginFormData = new FormData();
    loginFormData.append("email", credentials?._ue_);
    loginFormData.append("password", credentials?._up_?.split("_")[0]);

    const loginResponse = await handleLogin(loginFormData);

    console.log("loginResponse", loginResponse);

    if (loginResponse?.status === 200) {
      Storage.setItem("user_info", loginResponse?.data?.data);
      Storage.setItem("auth_tok", loginResponse?.data?.token);

      dispatch(setLoader(false));
      dispatch(addUserDetails(loginResponse?.data?.data));

      if (loginResponse?.data?.data?.flag === 1) {
        Storage.setItem("__ce__", data.email);
        Storage.setItem(
          "__cp__",
          data.password +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3)
        );
      }

      dispatch(setLoader(false));

      message.success("Successfully Logged In");
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1500);
    } else {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 2000);
      message.warning("Oopps Wrong! Check You Email or Password");
    }
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleRememberMe = (e) => {
    if (e.target.checked) {
      Storage.setItem("__ce__", data.email);
      Storage.setItem(
        "__cp__",
        data.password +
          "_" +
          makeid(3) +
          "_" +
          makeid(3) +
          "_" +
          makeid(3) +
          "_" +
          makeid(3)
      );
    }
  };

  const handleAddToBookMark = () => {
    setBookMarkedAccounts([
      ...bookMarkedAccounts,
      {
        _ue_: data.email,
        _up_:
          data.password +
          "_" +
          makeid(3) +
          "_" +
          makeid(3) +
          "_" +
          makeid(3) +
          "_" +
          makeid(3),
      },
    ]);
    Storage.setItem(
      "__b__",
      JSON.stringify([
        ...bookMarkedAccounts,
        {
          _ue_: data.email,
          _up_:
            data.password +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3) +
            "_" +
            makeid(3),
        },
      ])
    );
    setAddBookMarkOpen(false);

    message.success("Added to the Bookmark");

    setTimeout(() => {
      navigate("/dashboard");
      window.location.reload();
    }, 1500);
  };

  const ForgotPasswordModal = () => {
    console.log(data);
    const regex = /^[a-zA-Z0-9\\/*+;&%?#@!^()_="\-:~`|[\]{}\s]*$/i;
    if (data.email !== "") {
      if (regex.test(data.email) === true) {
        setTooglePasswordForget(true);
      } else {
        message.warning("Please enter a valid email address.");
      }
    } else {
      message.warning("Enter your email first.");
    }
  };

  const handleRemoverBookmarkedAccount = (acoountDetials) => {
    console.log(acoountDetials?._ue_);

    setBookMarkedAccounts(
      bookMarkedAccounts?.filter((acc) => acc?._ue_ !== acoountDetials?._ue_)
    );

    Storage.setItem(
      "__b__",
      JSON.stringify(
        bookMarkedAccounts?.filter((acc) => acc?._ue_ !== acoountDetials?._ue_)
      )
    );

    setSyncBookMarked(!syncBookMarked);
  };

  return (
    <div className="flex justify-center items-center md:h-screen bg-gray-100 ">
      {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}

      <div className=" !grid !grid-cols-12 gap-2 mx-auto h-full py-[10px]">
        <div className="w-[100%] lg:block hidden h-full !col-span-12 md:!col-span-7 md:!relative md:!left-[40px]">
          <img className="w-full h-full" src={sidecoverphoto} alt="" />
        </div>
        <div
          className="!col-span-12 md:!col-span-5 w-[100%]  !mx-auto container relative max-w-md border border-gray-200 rounded-md p-3 bg-white overflow-x-hidden overflow-y-auto crm-scroll-none"
          style={{}}
        >
          <Modal
            visible={addBookMarkOpen}
            footer={false}
            closable={false}
            centered
          >
            <div className="py-10 px-4 flex items-center justify-between">
              <div className="text-lg font-poppins font-semibold mb-6?">
                Add to Bookmark?
              </div>
              <div className="flex items-center">
                <div
                  className="px-6 py-1 rounded-full shadow text-sm font-poppins font-light border border-brand-color text-brand-color cursor-pointer"
                  onClick={handleAddToBookMark}
                >
                  Yes
                </div>
                <div
                  className="px-6 py-1 ml-2 rounded-full shadow text-sm font-poppins font-light border border-red-600 text-red-600 cursor-pointer"
                  onClick={() => {
                    setAddBookMarkOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  No
                </div>
              </div>
            </div>
          </Modal>
          <div>
            <div className="pb-3 pt-8">
              <div className="flex flex-col items-center ">
                <img
                  src={companyLogo}
                  alt="companyLogo"
                  srcset=""
                  className="w-60 cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                />
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
                </div>
                <div className="mb-6 font-poppins">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    {role === 1 ? "ABN Number" : "Email"}
                  </label>
                  <Input
                    // type="password"
                    size="large"
                    name="email"
                    id="email"
                    value={data.email}
                    placeholder="Enter your username"
                    className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
                    onChange={userData}
                    required
                  />
                </div>
                <div className="mb-4 font-poppins">
                  {/* Forgot password */}
                  {/* <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                    <label
                      className="text-xs text-gray-400 focus:outline-none hover:text-indigo-500"
                      onClick={ForgotPasswordModal}
                    >
                      Forgot password?
                    </label>

                    <ForgotPassword
                      visibility={tooglePasswordForget}
                      oncancel={(cancel) => setTooglePasswordForget(cancel)}
                      emaildata={data.email}
                    />
                  </div> */}
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

                <div className="mb-6 font-poppins flex items-center justify-between">
                  <div className="">
                    <input
                      className="cursor-pointer mr-2"
                      type="checkbox"
                      name="remember me"
                      id="remember_me"
                      defaultValue="off"
                      onChange={handleRememberMe}
                    />
                    <label className="cursor-pointer" htmlFor="remember_me">
                      Remember Me
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full p-3 text-white font-medium bg-brand-color bg-opacity-80 hover:bg-primary-800 rounded-md focus:outline-none font-poppins"
                  >
                    Log in
                  </button>
                </div>
                <div
                  className="text-center font-semibold cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  I don't have account
                </div>
                <div className="text-center">
                  <a
                    className="font-semibold"
                    href="/requisition"
                    target="_blank"
                  >
                    Click Here To Explore Packages and Send Requisition
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div
            className={`${
              !bookMarkOpen ? "w-0 h-0" : "w-full h-[670px] py-12 px-6"
            } absolute top-0 right-0 bottom-0 bg-white transition-all delay-200 duration-500 border`}
          >
            <div
              style={{ overflow: "scroll" }}
              className={`${
                !bookMarkOpen
                  ? "delay-100 duration-100 opacity-0 h-[670px]"
                  : "delay-1000 duration-200 opacity-100"
              } transition-all mt-2 ml-2 flex flex-col justify-start items-start h-[670px]`}
            >
              <div className="text-xl font-semibold mb-4">
                Bookmarked Accounts
              </div>

              {bookMarkedAccounts?.length ? (
                bookMarkedAccounts?.map((account, i) => (
                  <div
                    key={i}
                    className="relative mt-4 mr-4 p-1 rounded-full shadow-md cursor-pointer flex items-center justify-between"
                    onClick={() => handleOneClickLogin(account)}
                  >
                    <div>
                      <Avatar
                        className="rounded-full cursor-pointer mr-1"
                        size={38}
                        name={account?._ue_}
                      />
                      <span className="pl-2 pr-4">{account?._ue_}</span>
                    </div>

                    <div
                      className="absolute top-0 -right-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icons.Cross
                        className="w-3.5 bg-red-500 py-0.5 px-1 rounded-full text-white"
                        onClick={() => handleRemoverBookmarkedAccount(account)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center">
                  <h1 className="mt-28 text-base">
                    No Accounts Bookmarked Yet
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* Saved Accounts */}
          <div className="absolute right-6 top-6">
            {!bookMarkOpen ? (
              <Tooltip title="Book marked accounts" placement="right">
                <Icons.Bookmark
                  className="w-6 cursor-pointer hover:text-brand-color"
                  onClick={() => setBookMarkOpen(true)}
                />
              </Tooltip>
            ) : (
              <div>
                <Icons.Cross
                  className="w-3 mr-1 font-bold text-red-600 cursor-pointer"
                  onClick={() => setBookMarkOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Input, Modal, Tooltip, message } from "antd";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { Storage } from "../../../Components/Shared/utils/store";
import { handleLogin } from "../../../Components/services/auth";
import {
  addUserDetails,
  setCompanyId,
  setLoader,
  updateBearerToken,
} from "../../../features/user/userSlice";
import ForgotPassword from "./ForgotModal";
import "./Login.css";
const companyLogo = require("../../../assets/PNGS/qq_logo_w.png");

const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const [loginClicked, setLoginClicked] = useState(false);
  const [tooglePasswordForget, setTooglePasswordForget] = useState(false);
  const [bookMarkOpen, setBookMarkOpen] = useState(false);
  const [addBookMarkOpen, setAddBookMarkOpen] = useState(false);
  const [syncBookMarked, setSyncBookMarked] = useState(false);
  const [bookMarkedAccounts, setBookMarkedAccounts] = useState([]);
  const [role, setRole] = useState(0);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Storage.getItem("__ce__") && Storage.getItem("__cp__")) {
      setData({
        email: Storage.getItem("__ce__"),
        password: Storage.getItem("__cp__")?.split("_")[0],
      });
    }
    if (Storage.getItem("__b__")) {
      setBookMarkedAccounts(JSON.parse(Storage.getItem("__b__")));
    }
  }, [syncBookMarked]);

  // useEffect(() => {
  //   const isBookmarkSet = !!Storage.getItem("__b__");
  //   if (!isBookmarkSet) {
  //     setAddBookMarkOpen(true);
  //   }
  // }, []);
  // useEffect(() => {

  // }, [navigate, userDetails]);

  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
  };

  const makeid = useMemo(() => {
    return function (length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
  }, []);

  const handleLoginReq = async (e) => {
    setLoginClicked(true);
    dispatch(setLoader(true));

    const loginFormData = new FormData();
    loginFormData.append("email", data.email);
    loginFormData.append("password", data.password);
    const loginResponse = await handleLogin(loginFormData);
    if (
      loginResponse?.data.token === "" ||
      loginResponse?.data.message === "Account not verified"
    ) {
      message.warning("Please check your email for a verification link.");
      setLoginClicked(false);
    } else if (loginResponse?.status === 200 && loginResponse?.data) {
      Storage.setItem("user_info", loginResponse?.data?.data);
      Storage.setItem(
        "auth_tok",
        loginResponse?.data?.token || loginResponse?.data?.data
      );
      Storage.setItem(
        "cust_id",
        loginResponse?.data?.data?.customer_id || loginResponse?.data?.data
      );
      dispatch(updateBearerToken(loginResponse?.data?.token));
      dispatch(setLoader(false));
      dispatch(addUserDetails(loginResponse?.data?.data));
      dispatch(setCompanyId(loginResponse?.data?.data?.company?.id));
      setLoginClicked(false);
      if (
        !bookMarkedAccounts?.filter((account) => account?._ue_ === data?.email)
          ?.length
      ) {
        setAddBookMarkOpen(true);
      } else if (Storage.getItem("auth_tok")) {
        if (userDetails?.userInfo?.verification_status === 2) {
          navigate("/dashboard");
        } else if (userDetails?.userInfo?.verification_status === 1) {
          navigate("/setup-your-profile");
        } else {
          message.warning("Please check your email for a verification link.");
        }
      }
    } else {
      setLoginClicked(false);
      message.warning("Oops Wrong! Check You Email or Password");
    }
  };

  const handleOneClickLogin = async (credentials) => {
    setLoginClicked(true);
    dispatch(setLoader(true));

    const loginFormData = new FormData();
    loginFormData.append("email", credentials?._ue_);
    loginFormData.append("password", credentials?._up_?.split("_")[0]);
    const loginResponse = await handleLogin(loginFormData);
    if (loginResponse?.status === 200) {
      setLoginClicked(false);
      Storage.setItem("user_info", loginResponse?.data?.data);
      Storage.setItem(
        "auth_tok",
        loginResponse?.data?.token || loginResponse?.data?.data
      );
      Storage.setItem(
        "cust_id",
        loginResponse?.data?.data?.customer_id || loginResponse?.data?.data
      );
      dispatch(setLoader(false));
      dispatch(addUserDetails(loginResponse?.data?.data));

      dispatch(setLoader(false));
      message.success("Successfully Logged In");
      if (Storage.getItem("auth_tok")) {
        if (userDetails?.userInfo?.verification_status === 2) {
          navigate("/dashboard");
        } else if (userDetails?.userInfo?.verification_status === 1) {
          navigate("/setup-your-profile");
        } else {
          message.warning("Please check your email for a verification link.");
        }
      }
    } else {
      setLoginClicked(false);
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 2000);
      message.warning("Oopps Wrong! Check You Email or Password");
    }
  };
  const handleRememberMe = useCallback(
    (e) => {
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
    },
    [data.email, data.password, makeid]
  );
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
    }, 500);
  };
  const ForgotPasswordModal = () => {
    setTooglePasswordForget(true);
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
    <div className="flex justify-center items-center min-h-[100vh] dark-background">
      {loginClicked ? (
        <Loading />
      ) : (
        <div className="relative flex items-center justify-center mx-auto w-full h-full p-[10px]">
          <div
            className={` z-10 w-full !mx-auto relative max-w-md shadow-md backdrop-blur-2xl bg-[#ffffff11] border-[0.5px] border-[#ffffff44] rounded-md px-4 py-8 overflow-hidden`}
          >
            <Modal
              visible={addBookMarkOpen}
              footer={false}
              closable={false}
              centered
              className="bookmarkModal"
            >
              <div className="py-8 px-8 flex flex-col gap-8 items-center justify-between shadow-md backdrop-blur-2xl bg-[#ffffff11] !rounded-md ">
                <h1 className="m-0 p-0 text-lg font-poppins font-semibold text-slate-300">
                  Add to Bookmark?
                </h1>
                <div className="flex gap-4 items-center">
                  <div
                    className="px-8 py-2 rounded-md shadow text-sm font-poppins font-light text-slate-300 bg-brand-color cursor-pointer hover:scale-105 ease-in duration-100"
                    onClick={handleAddToBookMark}
                  >
                    Yes
                  </div>
                  <div
                    className="px-8 py-2 rounded-md shadow text-sm font-poppins font-light text-slate-300 red-600 bg-red-600 cursor-pointer hover:scale-105 ease-in duration-100"
                    onClick={() => {
                      setAddBookMarkOpen(false);
                      navigate("/dashboard");
                      window.location.reload();
                    }}
                  >
                    No
                  </div>
                </div>
              </div>
            </Modal>

            <div
              className={` flex flex-col  ${
                bookMarkOpen
                  ? "gap-16 justify-start items-start h-[70vh]"
                  : "gap-16 justify-center items-center h-[70vh]"
              } `}
            >
              {!bookMarkOpen ? (
                <>
                  <div className="flex flex-col items-center ">
                    <a href="https://queleadscrm.com">
                      <img
                        src={companyLogo}
                        alt="companyLogo"
                        className="w-60 cursor-pointer"
                        onClick={() => {
                          navigate("https://www.queleadscrm.com");
                        }}
                      />
                    </a>
                  </div>
                  <form
                    className="flex flex-col gap-4 px-8 w-full"
                    onSubmit={handleLoginReq}
                  >
                    <div className="font-poppins ">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-white"
                      >
                        {role === 1 ? "ABN Number" : "Email"}
                      </label>
                      <Input
                        size="large"
                        name="email"
                        id="email"
                        value={data.email}
                        placeholder="Enter your username"
                        className="inputBGLogin placeholder:!text-slate-300 w-full focus:!bg-transparent !px-2 !py-2 !bg-transparent !active:bg-transparent !text-sm !border !text-slate-300 !border-gray-400 !rounded-md !focus:outline-none !focus:border-brand-color"
                        onChange={userData}
                        required
                      />
                    </div>
                    <div className="font-poppins w-full">
                      {/* Forgot password */}
                      <div className="flex flex-col justify-between loginPassword">
                        <label
                          htmlFor="password"
                          className="text-sm text-white mb-2"
                        >
                          Password
                        </label>
                        <Input.Password
                          size="large"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          value={data.password}
                          className="inputBGLogin w-full !px-2 !bg-transparent !active:bg-transparent !text-sm !border !text-slate-300 !border-gray-400 !rounded-md !focus:outline-none !focus:border-brand-color"
                          onChange={userData}
                          required
                        />
                        <ForgotPassword
                          visibility={tooglePasswordForget}
                          oncancel={(cancel) => setTooglePasswordForget(cancel)}
                        />
                      </div>
                    </div>
                    <div className="font-poppins flex items-center justify-between">
                      <div className="w-full">
                        <input
                          className="cursor-pointer mr-2"
                          type="checkbox"
                          name="remember me"
                          id="remember_me"
                          defaultValue="off"
                          onChange={handleRememberMe}
                        />
                        <label
                          className="cursor-pointer text-white"
                          htmlFor="remember_me"
                        >
                          Remember Me
                        </label>
                      </div>
                      <label
                        className="text-xs text-white focus:outline-none hover:text-indigo-500 w-full text-end cursor-pointer"
                        onClick={ForgotPasswordModal}
                      >
                        Forgot password?
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="ease-in duration-200 lg:h-full w-full px-4 py-2 text-slate-300 font-medium bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] rounded-md focus:outline-none font-poppins hover:text-black"
                    >
                      Log in
                    </button>
                  </form>
                  <h1 className="m-0 p-0 text-slate-300">
                    Don’t have any account?{" "}
                    <span
                      className="ease-in duration-100 text-brand-color hover:text-opacity-70 cursor-pointer"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </span>
                  </h1>
                </>
              ) : (
                <>
                  <div
                    className={`flex flex-col gap-8 justify-center items-center w-full h-full bookmarkModal ease-in duration-200 `}
                  >
                    <h1 className="text-xl m-0 p-0 text-slate-300 border-b font-semibold text-center">
                      Bookmarked Accounts
                    </h1>
                    <div
                      className={`flex flex-col gap-4 justify-start items-center h-5/6 w-full overflow-y-scroll `}
                    >
                      {bookMarkedAccounts?.length ? (
                        bookMarkedAccounts?.map((account, i) => (
                          <div
                            key={i}
                            className="w-full flex items-center justify-start relative p-1 rounded-md shadow-md cursor-pointer "
                            onClick={() => handleOneClickLogin(account)}
                          >
                            <div className="w-full shadow-md backdrop-blur-2xl bg-[#ffffff11] rounded-md overflow-hidden">
                              <Avatar
                                className="rounded-md cursor-pointer mr-1"
                                size={38}
                                name={account?._ue_}
                              />
                              <span className="px-4 text-slate-300 ">
                                {account?._ue_}
                              </span>
                            </div>
                            <div
                              className="flex bg-[#fc00ff] h-[20px] w-[20px] absolute right-0 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icons.Cross
                                className="h-full w-full bg-red-500 p-1 rounded-md text-white"
                                onClick={() =>
                                  handleRemoverBookmarkedAccount(account)
                                }
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="w-full flex justify-center items-center">
                          <h1 className="mt-28 text-base text-slate-300">
                            No Accounts Bookmarked Yet
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="absolute right-6 top-6">
              {!bookMarkOpen ? (
                <Tooltip title="Book marked accounts" placement="right">
                  <Icons.Bookmark
                    className="w-6 cursor-pointer text-white hover:text-brand-color ease-in duration-200"
                    onClick={() => setBookMarkOpen(true)}
                  />
                </Tooltip>
              ) : (
                <div>
                  <Icons.Cross
                    className="w-3 mr-1 font-bold text-red-600 cursor-pointer hover:scale-95 ease-in duration-200"
                    onClick={() => setBookMarkOpen(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

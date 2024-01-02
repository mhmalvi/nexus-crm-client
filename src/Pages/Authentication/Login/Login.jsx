import { Input, Modal, Tooltip, message } from "antd";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import "../Login.css";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";
const companyLogo = require("../../../assets/PNGS/qq_logo_w.png");
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
  const [vantaEffect, setVantaEffect] = useState(null);
  const gradientShader = {
    uniforms: {
      color1: { value: new THREE.Color(0x2596FB) },
      color2: { value: new THREE.Color(0x8A7CFD) },
    },
    vertexShader: `
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
  
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
  };
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          THREE,
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: 0x2596FB,
          color2: 0x8A7CFD,
          backgroundAlpha:0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
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
        }, 500);
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
    } else {
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 2000);
      message.warning("Oops Wrong! Check You Email or Password/ABN Number");
    }
  };

  const handleOneClickLogin = useCallback(
    async (credentials) => {
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
        }, 500);
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 2000);
        message.warning("Oopps Wrong! Check You Email or Password");
      }
    },
    [dispatch, data.email, data.password, makeid, navigate]
  );

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
    <div className="flex justify-center items-center min-h-[100vh] loginBackground" ref={myRef}>
      {loadingDetails && (
        <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}

      <div className="relative flex items-center justify-center mx-auto h-full p-[10px]">
        <div
          className="shadow-xl backdrop-blur-2xl bg-[#ffffff11] z-10 !col-span-12 w-full !mx-auto relative max-w-md border-[0.5px] border-[#ffffff44] rounded-3xl p-3 overflow-x-hidden overflow-y-auto crm-scroll-none min-h-[70vh]"
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
                    window.location.reload();
                  }}
                >
                  No
                </div>
              </div>
            </div>
          </Modal>
          <div className="m-6 min-h-[60vh] flex flex-col justify-between">
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
            <form className="mb-4" onSubmit={handleLoginReq}>
              <div className="mb-6 font-poppins ">
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
                  className="rounded-3xl w-full px-6 py-2 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-brand-color "
                  onChange={userData}
                  required
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="mb-4 font-poppins w-full">
                {/* Forgot password */}
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-white">
                    Password
                  </label>

                  <ForgotPassword
                    visibility={tooglePasswordForget}
                    oncancel={(cancel) => setTooglePasswordForget(cancel)}
                  />
                </div>
                <Input.Password
                  size="large"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={data.password}
                  className="w-full px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-brand-color text-white"
                  onChange={userData}
                  required
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                />
              </div>
              <div className="mb-6 font-poppins flex items-center justify-between">
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
              <div className="mb-6">
                <button
                  type="submit"
                  className="ease-in duration-200 lg:h-full w-full p-3 text-white font-medium bg-gradient-to-b from-[#8A7CFD] to-[#2596FB] rounded-md focus:outline-none font-poppins hover:text-black"
                >
                  Log in
                </button>
              </div>
            </form>
            <div className="text-center ">
              <a
                className="font-semibold text-white"
                href="/requisition"
                target="_blank"
              >
                Click Here To Explore Packages and Send Requisition
              </a>
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
          {/* <div
                  className="text-center font-semibold cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  I don't have account
                </div> */}
          <div className="absolute right-6 top-6">
            {!bookMarkOpen ? (
              <Tooltip title="Book marked accounts" placement="right">
                <Icons.Bookmark
                  className="w-6 cursor-pointer text-white hover:text-brand-color"
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

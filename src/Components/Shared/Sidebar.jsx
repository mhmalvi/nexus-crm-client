import { handleLogout } from "../../Components/services/auth";
import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleFetchCompanyDetails } from "../services/company";
import Icons from "./Icons";
import { Storage } from "./utils/store";
import { addCompanyDetails } from "../../features/Company/companySlice";
import { handleFetchFile } from "../services/utils";
import HamW from "../../assets/Images/hamburgerW.png";

import HamD from "../../assets/Images/hamburgerB.png";
import { setColorMode, setHelpModal } from "../../features/user/userSlice";
import { setOpenSidebar } from "../../features/user/userSlice";
import { ReactComponent as SunIcon } from "../../../src/assets/PNGS/sun.svg";
import { ReactComponent as MoonIcon } from "../../../src/assets/PNGS/moon.svg";
import { successNotification } from "./Toast";
import { useTour } from "@reactour/tour";
import { Steps } from "./Steps";

const qq_Logo = require("../../../src/assets/Icons/Queleads_Logo.png");

const Sidebar = ({ active, setActive }) => {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const openSideBar = useSelector((state) => state?.user)?.openSideBar;
  const helpModal = useSelector((state) => state?.user)?.helpModal;

  const [companyDetails, setCompanyDetails] = useState({
    company_name: null,
    company_logo: null,
  });

  useEffect(() => {
    (async () => {
      const companyDetailsResp = await handleFetchCompanyDetails(
        userDetails?.userInfo?.client_id
      );

      const companyLogo = await handleFetchFile(
        companyDetailsResp?.data?.[0]?.logo_id
      );

      if (companyLogo?.status === 200) {
        dispatch(
          addCompanyDetails({
            ...companyDetailsResp?.data?.[0],
            company_logo:
              process.env.REACT_APP_FILE_SERVER_URL +
              "/" +
              companyLogo?.data?.document_name,
          })
        );
      }

      setCompanyDetails({
        company_name: companyDetailsResp?.data?.[0]?.name
          ? companyDetailsResp?.data?.[0]?.name
          : " ",
        company_logo:
          process.env.REACT_APP_FILE_SERVER_URL +
          "/" +
          companyLogo?.data?.document_name,
      });
    })();
  }, [dispatch, userDetails]);

  const logoutHandler = () => {
    handleLogout({
      user_id: userDetails.userInfo.user_id,
      email: userDetails.userInfo.email,
      token: authToken,
    });
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    Storage.removeItem("fac_t");
    successNotification("Logout Successful.");
    navigate("/login");
  };

  const getColorModePreference = () => {
    return localStorage.getItem("colorMode") === "dark";
  };
  const saveColorModePreference = (colorMode) => {
    localStorage.setItem("colorMode", colorMode ? "dark" : "light");
  };
  useEffect(() => {
    const storedColorMode = getColorModePreference();
    if (storedColorMode !== null) {
      dispatch(setColorMode(storedColorMode));
    }
  }, [dispatch]);

  const toggleColorMode = () => {
    const newColorMode = !colorMode;
    dispatch(setColorMode(newColorMode));
    saveColorModePreference(newColorMode);
  };
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const toggleHelp = () => {
    const newHelpModal = !helpModal;
    dispatch(setHelpModal(newHelpModal));
    setIsOpen(true);
  };

  useEffect(() => {
    setCurrentStep(0);
    if (active === "dashboard") {
      setSteps([
        {
          selector: '[data-tour="dashboard1"]',
          content: "This is the filter tab where you can filter your leads.",
        },
        {
          selector: '[data-tour="dashboard2"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard3"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard4"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard5"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard6"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard7"]',
          content:
            "This is the color associated with the location of your leads.",
        },
        {
          selector: '[data-tour="dashboard8"]',
          content:
            "This is the color associated with the location of your leads.",
        },
      ]);
    } else if (active === "analytics") {
      setSteps([
        {
          selector: '[data-tour="analytic1"]',
          content: "This is the summary of your running campaigns.",
        },
        {
          selector: '[data-tour="analytic2"]',
          content:
            "This is where you can see the statistics of your running campaigns.",
        },
      ]);
    } else {
      setSteps(Steps);
    }
  }, [active, setCurrentStep, setSteps]);
  return (
    <div
      className={` bg-[#ffffff11] ease-in-out duration-300 ${
        openSideBar ? "2xl:w-20 w-16 h-full" : "2xl:w-64 w-56 h-full"
      } overflow-x-hidden overflow-y-scroll`}
    >
      <div
        onClick={() => {
          dispatch(setOpenSidebar(!openSideBar));
        }}
        className={`${
          openSideBar ? "w-full" : "w-16"
        } ease-in duration-300 absolute top-3 right-0 z-[30]`}
      >
        {openSideBar ? (
          <img
            src={colorMode ? HamW : HamD}
            title="Show sidebar"
            alt=""
            className="w-8 m-auto cursor-pointer text-white"
          />
        ) : (
          <div
            className={`cursor-pointer flex items-center justify-center ${
              colorMode ? "text-slate-300" : "text-gray-800"
            }`}
          >
            <Icons.LeftArrow />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-around h-screen">
        <div className="w-[15vw] h-52 flex items-center justify-center origin-center overflow-hidden">
          <div
            className={`h-24 w-24
            }]  ${
              openSideBar ? " hidden" : "rounded-full"
            } ease-in duration-300 overflow-hidden flex items-center justify-center background-blur-2xl bg-[#ffffff22] border border-white p-2`}
          >
            <img
              src={companyDetails?.company_logo}
              className=""
              alt={companyDetails?.company_logo}
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col 2xl:gap-8 gap-4">
          <div className={`${openSideBar ? "ml-0" : "ml-8"}`}>
            <Link
              to={"/dashboard"}
              className={`${
                active === "dashboard"
                  ? colorMode
                    ? "text-white"
                    : "text-black"
                  : colorMode
                  ? "text-[#B3B3B3]"
                  : "text-gray-800"
              } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm cursor-pointer py-1 ${
                colorMode ? "hover:text-white" : "hover:text-black"
              }`}
              onClick={() => setActive("dashboard")}
            >
              <div className="flex w-full items-center justify-around overflow-hidden">
                <Icons.Dashboard />
                {openSideBar ? (
                  ""
                ) : (
                  <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                    <h1
                      className={`m-0 p-0 w-[10vw] ${
                        active === "dashboard"
                          ? colorMode
                            ? "text-white"
                            : "text-black"
                          : colorMode
                          ? "text-[#B3B3B3]"
                          : "text-gray-800"
                      }`}
                    >
                      Dashboard
                    </h1>
                  </span>
                )}
              </div>
              {active === "dashboard" && (
                <div
                  className={`absolute absolute right-0 active-option ${
                    colorMode ? "text-white bg-white" : "text-black bg-black"
                  }`}
                >
                  |
                </div>
              )}
            </Link>

            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) && (
              <Link
                to={"/analytics"}
                className={`${
                  active === "analytics"
                    ? colorMode
                      ? "text-white"
                      : "text-black"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                  colorMode ? "hover:text-white" : "hover:text-black"
                }`}
                onClick={() => setActive("analytics")}
              >
                <div className="flex w-full items-center justify-around overflow-hidden">
                  <Icons.Chart />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                      <h1
                        className={`m-0 p-0 w-[10vw] ${
                          active === "analytics"
                            ? colorMode
                              ? "text-white"
                              : "text-black"
                            : colorMode
                            ? "text-[#B3B3B3]"
                            : "text-gray-800"
                        }`}
                      >
                        Analytics
                      </h1>
                    </span>
                  )}
                </div>
                {active === "analytics" && (
                  <div
                    className={`absolute right-0 active-option ${
                      colorMode ? "text-white bg-white" : "text-black bg-black"
                    }`}
                  >
                    |
                  </div>
                )}
              </Link>
            )}

            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 3) && (
              <Link
                to={"/que-mailer"}
                className={`${
                  active === "que-mailer"
                    ? colorMode
                      ? "text-white"
                      : "text-black"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                  colorMode ? "hover:text-white" : "hover:text-black"
                }`}
                onClick={() => setActive("que-mailer")}
              >
                <div className="flex w-full items-center justify-around overflow-hidden">
                  <Icons.SidebarMail />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                      <h1
                        className={`m-0 p-0 w-[10vw] ${
                          active === "que-mailer"
                            ? colorMode
                              ? "text-white"
                              : "text-black"
                            : colorMode
                            ? "text-[#B3B3B3]"
                            : "text-gray-800"
                        }`}
                      >
                        Que Mailer
                      </h1>
                    </span>
                  )}
                </div>
                {active === "que-mailer" && (
                  <div
                    className={`absolute right-0 active-option ${
                      colorMode ? "text-white bg-white" : "text-black bg-black"
                    }`}
                  >
                    |
                  </div>
                )}
              </Link>
            )}
          </div>

          <div className={`${openSideBar ? "ml-0" : "ml-8"}`}>
            {/* Lead Courses */}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) && (
              <div>
                <Link
                  to={"/courses"}
                  className={`${
                    active === "courses"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("courses")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.Courses className="w-5" />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "courses"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Courses
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "courses" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Lead Campaigns */}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) && (
              <div>
                <Link
                  to={"/campaigns"}
                  className={`${
                    active === "campaigns"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("campaigns")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.Campaigns />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "campaigns"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Campaigns
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "campaigns" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Lead Payments */}
            {userDetails?.userInfo?.role_id !== 10 &&
              userDetails?.userInfo?.role_id !== 9 &&
              userDetails?.userInfo?.role_id !== 8 &&
              userDetails?.userInfo?.role_id !== 7 &&
              userDetails?.userInfo?.role_id !== 6 &&
              userDetails?.userInfo?.role !== 1 &&
              userDetails?.userInfo?.role !== 2 && (
                <div>
                  <Link
                    to={"/payments"}
                    className={`${
                      active === "payments"
                        ? colorMode
                          ? "text-white"
                          : "text-black"
                        : colorMode
                        ? "text-[#B3B3B3]"
                        : "text-gray-800"
                    } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                      colorMode ? "hover:text-white" : "hover:text-black"
                    }`}
                    onClick={() => setActive("payments")}
                  >
                    <div className="flex w-full items-center justify-around overflow-hidden">
                      <Icons.Payment />
                      {openSideBar ? (
                        ""
                      ) : (
                        <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                          <h1
                            className={`m-0 p-0 w-[10vw] ${
                              active === "payments"
                                ? colorMode
                                  ? "text-white"
                                  : "text-black"
                                : colorMode
                                ? "text-[#B3B3B3]"
                                : "text-gray-800"
                            }`}
                          >
                            Payments
                          </h1>
                        </span>
                      )}
                    </div>
                    {active === "payments" && (
                      <div
                        className={`absolute right-0 active-option ${
                          colorMode
                            ? "text-white bg-white"
                            : "text-black bg-black"
                        }`}
                      >
                        |
                      </div>
                    )}
                  </Link>
                </div>
              )}
          </div>

          <div className={`${openSideBar ? "ml-0" : "ml-8"}`}>
            {/* Sales Employee */}

            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) && (
              <div>
                <Link
                  to={"/salesEmployee"}
                  className={`${
                    active === "salesEmployee"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("salesEmployee")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.MoneyCheck className={`w-5`} />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "salesEmployee"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Sales Employee
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "salesEmployee" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Reminder */}
            {(userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5) && (
              <div>
                <Link
                  to={"/reminder"}
                  className={`${
                    active === "reminder"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("reminder")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.Calender className={`w-5`} />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "reminder"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Reminder
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "reminder" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Billing */}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id !== 5) && (
              <div>
                <Link
                  to={"/billing"}
                  className={`${
                    active === "billing"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("billing")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.Billing className={`w-5`} />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "billing"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Billing Information
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "billing" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* Company Settings */}
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id !== 5) && (
              <div>
                <Link
                  to={"/settings"}
                  className={`${
                    active === "settings"
                      ? colorMode
                        ? "text-white"
                        : "text-black"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-300 flex items-center justify-between 2xl:text-base text-sm  cursor-pointer py-1 ${
                    colorMode ? "hover:text-white" : "hover:text-black"
                  }`}
                  onClick={() => setActive("settings")}
                >
                  <div className="flex w-full items-center justify-around overflow-hidden">
                    <Icons.Settings className={`w-5`} />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins text-[100%] overflow-hidden">
                        <h1
                          className={`m-0 p-0 w-[10vw] ${
                            active === "settings"
                              ? colorMode
                                ? "text-white"
                                : "text-black"
                              : colorMode
                              ? "text-[#B3B3B3]"
                              : "text-gray-800"
                          }`}
                        >
                          Company Settings
                        </h1>
                      </span>
                    )}
                  </div>
                  {active === "settings" && (
                    <div
                      className={`absolute right-0 active-option ${
                        colorMode
                          ? "text-white bg-white"
                          : "text-black bg-black"
                      }`}
                    >
                      |
                    </div>
                  )}
                </Link>
              </div>
            )}
          </div>

          {/* Agency menu items end */}
          {/* // Accountant menu items */}
          {userDetails?.userInfo?.role_id === 8 && (
            <div>
              <Link
                to={"/courseManagement"}
                className="ease-in duration-300 flex items-center 2xl:text-base text-sm  cursor-pointer my-5 py-0.5 hover:text-white"
                style={{
                  color: `${
                    active === "courseManagement" ? "#000000" : "#FFFFFF"
                  }`,
                }}
                onClick={() => setActive("courseManagement")}
              >
                <Icons.Pricing />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Course Management
                </span>
                {active === "courseManagement" && (
                  <div
                    className={`absolute right-0 active-option ${
                      colorMode ? "text-white bg-white" : "text-black bg-black"
                    }`}
                  >
                    |
                  </div>
                )}
              </Link>
            </div>
          )}
          {userDetails?.userInfo?.role_id === 8 && (
            <div>
              <Link
                to={"/paymentSlip"}
                className="ease-in duration-300 flex items-center 2xl:text-base text-sm  cursor-pointer py-1 hover:text-white"
                style={{
                  color: `${active === "paymentSlip" ? "#000000" : "#FFFFFF"}`,
                }}
                onClick={() => setActive("paymentSlip")}
              >
                <Icons.Pricing />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Payment Slip
                </span>
                {active === "paymentSlip" && (
                  <div
                    className={`absolute right-0 active-option ${
                      colorMode ? "text-white bg-white" : "text-black bg-black"
                    }`}
                  >
                    |
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* LOGOUT */}
          <div
            className=" flex items-center justify-center 2xl:text-base text-sm  cursor-pointer"
            onClick={logoutHandler}
          >
            <button className="flex w-full items-center justify-center bg-[#D93D3D] mx-2 rounded-md py-2 shadow-md overflow-hidden">
              {openSideBar ? (
                <Icons.LogOut className="m-0 p-0 text-white" />
              ) : (
                <span className="flex items-center justify-center font-medium font-poppins text-white px-2">
                  <h1 className="m-0 p-0 text-white w-[10vw] text-sx">
                    Log out
                  </h1>
                </span>
              )}
            </button>
          </div>
          <div
            className={`flex gap-4 ${
              openSideBar ? "flex-col" : "flex-rows"
            } justify-around items-center w-full`}
          >
            {/* Color Switcher */}
            <div className="flex justify-center items-center">
              <Switch
                onClick={toggleColorMode}
                className="colorModeToggler"
                checkedChildren={<SunIcon />}
                unCheckedChildren={<MoonIcon />}
                defaultChecked
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={toggleHelp}
                className={`border ${
                  helpModal
                    ? "text-brand-color"
                    : colorMode
                    ? "text-slate-300 border-slate-300"
                    : "text-gray-800 border-gray-800"
                }   px-2 py-1 rounded-md`}
              >
                Help
              </button>
            </div>
          </div>
        </div>

        {/* Logo Bottom */}
        <div className="ease-in duration-300 flex flex-col justify-center items-center h-[200px]">
          {openSideBar ? (
            ""
          ) : (
            <div className="ease-in duration-300 flex flex-col justify-center items-center">
              <div className="w-5/6 flex flex-col justify-center items-center overflow-hidden">
                <img
                  className="w-[10vw] h-full"
                  src={qq_Logo}
                  alt="QuadQue Leads"
                />
                <p
                  className={`w-[10vw] m-0 p-0 text-center text-xs ${
                    colorMode ? "text-slate-500" : "text-gray-800"
                  }`}
                >
                  A product of
                </p>
                <p
                  className={`w-[15vw] m-0 p-0 text-center text-xs ${
                    colorMode ? "text-slate-500" : "text-gray-800"
                  }`}
                >
                  Quadque Technologies Pty Limited
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

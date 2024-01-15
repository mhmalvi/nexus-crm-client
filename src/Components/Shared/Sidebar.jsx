import { handleLogout } from "../../Components/services/auth";
import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleFetchCompanyDetails } from "../services/company";
import Icons from "./Icons";
import { Storage } from "./utils/store";
import { addCompanyDetails } from "../../features/Company/companySlice";
import { handleFetchFile } from "../services/utils";
import CrossW from "../../assets/Images/crossW.png";
import HamW from "../../assets/Images/hamburgerW.png";

import CrossD from "../../assets/Images/crossB.png";
import HamD from "../../assets/Images/hamburgerB.png";
import { setColorMode } from "../../features/user/userSlice";
import { ReactComponent as SunIcon } from "../../../src/assets/PNGS/sun.svg";
import { ReactComponent as MoonIcon } from "../../../src/assets/PNGS/moon.svg";

const qq_Logo = require("../../../src/assets/Icons/Queleads_Logo.png");

const Sidebar = ({ active, setActive, openSideBar, setOpenSideBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const user = useSelector((state) => state?.user?.userInfo, shallowEqual);
  const companyId = useSelector(
    (state) => state?.user?.companyId,
    shallowEqual
  );

  const [companyDetails, setCompanyDetails] = useState({
    company_name: null,
    company_logo: null,
  });
  const ToogleSideBar = (index) => {
    setOpenSideBar(index);
  };

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
    handleLogout();
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    Storage.removeItem("fac_t");
    navigate("/login");
    window.location.reload();
  };

  const ToggleProfile = (e) => {
    if (e?.key === "profile") {
      navigate("/user-profile");
    } else if (e?.key === "email-setting") {
      navigate("/email-setting");
    } else if (e?.key === "company") {
      navigate("/settings");
    }
  };

  return (
    <div
      className={` bg-[#ffffff11] duration-300 ${
        openSideBar ? "w-[80px] h-full" : "w-[277px] h-full"
      }`}
      style={{
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <div
        onClick={() => ToogleSideBar(!openSideBar)}
        className={`w-${
          openSideBar ? "full" : "16"
        } ease-in  absolute top-3 right-0 z-[999999]`}
      >
        {openSideBar ? (
          <img
            src={colorMode ? HamW : HamD}
            title="Show sidebar"
            alt=""
            className="w-8 m-auto cursor-pointer text-white"
          />
        ) : (
          <img
            src={colorMode ? CrossW : CrossD}
            title="Hide sidebar"
            alt=""
            className="w-10 m-auto cursor-pointer text-white"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-around h-screen">
        <div className=" flex items-center justify-center min-h-[200px] origin-center ">
          <div
            className={`h-[100px] w-[100px]
            }]  ${
              openSideBar ? " hidden" : "rounded-full"
            } ease-in duration-200 overflow-hidden flex items-center justify-center bg-white`}
          >
            <img
              src={companyDetails?.company_logo}
              className=""
              alt={companyDetails?.company_logo}
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div>
            <NavLink
              to={"/dashboard"}
              className={`${
                active === "dashboard"
                  ? colorMode
                    ? "text-[#FFFFFF]"
                    : "text-[#7037FF]"
                  : colorMode
                  ? "text-[#B3B3B3]"
                  : "text-gray-800"
              } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
              }`}
              onClick={() => setActive("dashboard")}
            >
              <div className="flex w-full items-center justify-around ">
                <Icons.Dashboard />
                {openSideBar ? (
                  ""
                ) : (
                  <span className="ease-in  w-3/4 font-medium font-poppins m-0 p-0">
                    Dashboard
                  </span>
                )}
              </div>
              {active === "dashboard" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                  |
                </div>
              )}
            </NavLink>
          </div>

          {(userDetails?.userInfo?.role_id === 1 ||
            userDetails?.userInfo?.role_id === 2 ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4) && (
            <div>
              <NavLink
                to={"/overview"}
                className={`${
                  active === "overview"
                    ? colorMode
                      ? "text-[#FFFFFF]"
                      : "text-[#7037FF]"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                  colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                }`}
                onClick={() => setActive("overview")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Chart />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins">
                      Overview
                    </span>
                  )}
                </div>
                {active === "overview" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}

          {userDetails?.userInfo?.role_id !== 10 &&
            userDetails?.userInfo?.role_id !== 9 &&
            userDetails?.userInfo?.role_id !== 8 &&
            userDetails?.userInfo?.role_id !== 7 &&
            userDetails?.userInfo?.role_id !== 6 &&
            userDetails?.userInfo?.role !== 1 &&
            userDetails?.userInfo?.role !== 2 && (
              <div>
                <NavLink
                  to={"/payments"}
                  className={`${
                    active === "payments"
                      ? colorMode
                        ? "text-[#FFFFFF]"
                        : "text-[#7037FF]"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                    colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                  }`}
                  onClick={() => setActive("payments")}
                >
                  <div className="flex w-full items-center justify-around">
                    <Icons.Payment />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins">
                        Payments
                      </span>
                    )}
                  </div>
                  {active === "payments" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                      |
                    </div>
                  )}
                </NavLink>
              </div>
            )}

          {(userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4) && (
            <div>
              <NavLink
                to={"/campaigns"}
                className={`${
                  active === "campaigns"
                    ? colorMode
                      ? "text-[#FFFFFF]"
                      : "text-[#7037FF]"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                  colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                }`}
                onClick={() => setActive("campaigns")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Campaigns />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins">
                      Campaigns
                    </span>
                  )}
                </div>
                {active === "campaigns" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}

          {(userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4) && (
            <div>
              <NavLink
                to={"/courses"}
                className={`${
                  active === "courses"
                    ? colorMode
                      ? "text-[#FFFFFF]"
                      : "text-[#7037FF]"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                  colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                }`}
                onClick={() => setActive("courses")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Courses className="w-5" />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins">
                      Courses
                    </span>
                  )}
                </div>
                {active === "courses" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}

          {user?.client_id === 0 ? (
            companyId ? (
              (userDetails?.userInfo?.role_id === 2 ||
                userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4) && (
                <div>
                  <NavLink
                    to={"/salesEmployee"}
                    className={`${
                      active === "salesEmployee"
                        ? colorMode
                          ? "text-[#FFFFFF]"
                          : "text-[#7037FF]"
                        : colorMode
                        ? "text-[#B3B3B3]"
                        : "text-gray-800"
                    } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                      colorMode
                        ? "hover:text-[#ffffff]"
                        : "hover:text-[#7037FF]"
                    }`}
                    onClick={() => setActive("salesEmployee")}
                  >
                    <div className="flex w-full items-center justify-around">
                      <Icons.MoneyCheck className="w-5" />

                      <span
                        className={`w-3/4 text-[${
                          openSideBar ? "16px" : "0px"
                        }] ease-in duration-100 font-medium font-poppins bg-[#fc00ff]`}
                      >
                        Sales Employee
                      </span>
                    </div>
                    {active === "salesEmployee" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                        |
                      </div>
                    )}
                  </NavLink>
                </div>
              )
            ) : (
              <>
                <div style={{ display: "none" }}></div>
              </>
            )
          ) : (
            (userDetails?.userInfo?.role_id === 1 ||
              userDetails?.userInfo?.role_id === 2 ||
              userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4) && (
              <div>
                <NavLink
                  to={"/salesEmployee"}
                  className={`${
                    active === "salesEmployee"
                      ? colorMode
                        ? "text-[#FFFFFF]"
                        : "text-[#7037FF]"
                      : colorMode
                      ? "text-[#B3B3B3]"
                      : "text-gray-800"
                  } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                    colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                  }`}
                  onClick={() => setActive("salesEmployee")}
                >
                  <div className="flex w-full items-center justify-around">
                    <Icons.MoneyCheck className="w-5" />
                    {openSideBar ? (
                      ""
                    ) : (
                      <span className="w-3/4 font-medium font-poppins">
                        Sales Employee
                      </span>
                    )}
                  </div>
                  {active === "salesEmployee" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                      |
                    </div>
                  )}
                </NavLink>
              </div>
            )
          )}

          {(userDetails?.userInfo?.role_id === 1 ||
            userDetails?.userInfo?.role_id === 2 ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ||
            userDetails?.userInfo?.role_id === 5) && (
            <div>
              <NavLink
                to={"/calender"}
                className={`${
                  active === "calender"
                    ? colorMode
                      ? "text-[#FFFFFF]"
                      : "text-[#7037FF]"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                  colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                }`}
                onClick={() => setActive("calender")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Calender
                    className={`${
                      active === "calender"
                        ? colorMode
                          ? "text-[#FFFFFF]"
                          : "text-[#7037FF]"
                        : colorMode
                        ? "text-[#B3B3B3]"
                        : "text-gray-800"
                    } w-5`}
                  />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins">
                      Calender
                    </span>
                  )}
                </div>
                {active === "calender" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}

          {/* Requisitions section */}
          {(userDetails?.userInfo?.role_id === 1 ||
            userDetails?.userInfo?.role_id === 2) && (
            <div>
              <NavLink
                to={"/requisitions"}
                className=" ease-in duration-200 flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
                style={{
                  color: `${active === "requisitions" ? "#7037FF" : "#FFFFFF"}`,
                }}
                onClick={() => setActive("requisitions")}
              >
                {" "}
                <div className="flex w-full items-center justify-around">
                  <Icons.Pricing />
                  <span className="ml-4 leading-6 font-medium font-poppins">
                    Requisitions
                  </span>
                </div>
                {active === "requisitions" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}

          {/* Agency menu items start  */}
          {(userDetails?.userInfo?.role_id === 10 ||
            userDetails?.userInfo?.role_id === 9 ||
            userDetails?.userInfo?.role_id === 7) && (
            <div>
              <NavLink
                to={"/studentManagement"}
                className=" ease-in duration-200 flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
                style={{
                  color: `${
                    active === "studentManagement" ? "#7037FF" : "#FFFFFF"
                  }`,
                }}
                onClick={() => setActive("studentManagement")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Pricing />
                  <span className="ml-4 leading-6 font-medium font-poppins">
                    Student Management
                  </span>
                </div>
                {active === "studentManagement" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}
          {/* Agency menu items end */}
          {/* // Accountant menu items */}
          {userDetails?.userInfo?.role_id === 8 && (
            <div>
              <NavLink
                to={"/courseManagement"}
                className="ease-in duration-200 flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
                style={{
                  color: `${
                    active === "courseManagement" ? "#7037FF" : "#FFFFFF"
                  }`,
                }}
                onClick={() => setActive("courseManagement")}
              >
                <Icons.Pricing />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Course Management
                </span>
                {active === "courseManagement" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}
          {userDetails?.userInfo?.role_id === 8 && (
            <div>
              <NavLink
                to={"/paymentSlip"}
                className="ease-in duration-200 flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
                style={{
                  color: `${active === "paymentSlip" ? "#7037FF" : "#FFFFFF"}`,
                }}
                onClick={() => setActive("paymentSlip")}
              >
                <Icons.Pricing />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Payment Slip
                </span>
                {active === "paymentSlip" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}
          {/* // Accountant menu end */}

          {userDetails?.userInfo?.role_id !== 10 && (
            <div>
              <NavLink
                to={"/settings"}
                className={`${
                  active === "settings"
                    ? colorMode
                      ? "text-[#FFFFFF]"
                      : "text-[#7037FF]"
                    : colorMode
                    ? "text-[#B3B3B3]"
                    : "text-gray-800"
                } ease-in duration-200 flex items-center justify-between text-base cursor-pointer my-5 py-0.5 ${
                  colorMode ? "hover:text-[#ffffff]" : "hover:text-[#7037FF]"
                }`}
                onClick={() => setActive("calender")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Settings
                    className={`${
                      active === "settings"
                        ? colorMode
                          ? "text-[#FFFFFF]"
                          : "text-[#7037FF]"
                        : colorMode
                        ? "text-[#B3B3B3]"
                        : "text-gray-800"
                    } w-5`}
                  />
                  {openSideBar ? (
                    ""
                  ) : (
                    <span className="w-3/4 font-medium font-poppins">
                      Company Settings
                    </span>
                  )}
                </div>
                {active === "settings" && (
                <div className={`active-option text-[${colorMode ? "#FFFFFF":"#7037FF"}] bg-[${colorMode ? "#FFFFFF":"#7037FF"}]`}>
                    |
                  </div>
                )}
              </NavLink>
            </div>
            // <Menu
            //   className={`${
            //     active === "settings" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
            //   } !bg-transparent settingsSidebar hover:text-[#ffffff] `}
            //   onClick={ToggleProfile}
            //   items={[
            //     {
            //       label: (
            //         <>
            //           {openSideBar ? (
            //             ""
            //           ) : (
            //             <span
            //               className={`${
            //                 active === "settings"
            //                   ? "text-[#FFFFFF]"
            //                   : "text-[#B3B3B3]"
            //               } pl-4 `}
            //             >
            //               Settings
            //             </span>
            //           )}
            //         </>
            //       ),
            //       key: "menu",
            //       icon: (
            //         <Icons.Settings className="inline text-[#b3b3b3] hover:text-[#ffffff]" />
            //       ),
            //       children: [
            //         { label: "Profile Settings", key: "profile" },

            //         userDetails?.userInfo?.role_id === 1 ||
            //         userDetails?.userInfo?.role_id === 2 ||
            //         userDetails?.userInfo?.role_id === 3 ||
            //         userDetails?.userInfo?.role_id === 4
            //           ? { label: "Company Settings", key: "company" }
            //           : null,
            //       ],
            //     },
            //   ]}
            // />
          )}

          <div
            className="ease-in duration-200 flex items-center justify-center text-base cursor-pointer my-4 py-1.5"
            onClick={logoutHandler}
          >
            <button className="flex w-full items-center justify-center bg-[#D93D3D] mx-2 rounded-md py-2 shadow-xl">
              <Icons.LogOut />
              {openSideBar ? (
                ""
              ) : (
                <span className=" font-medium font-poppins text-[#FFFFFF] px-2">
                  Log out
                </span>
              )}
            </button>
          </div>
          <div className="flex justify-center items-center">
            <Switch
              onClick={() => {
                dispatch(setColorMode(!colorMode));
              }}
              className="colorModeToggler"
              checkedChildren={<SunIcon />}
              unCheckedChildren={<MoonIcon />}
              defaultChecked
            />
          </div>
        </div>
        <div className="ease-in duration-200 flex flex-col justify-center items-center h-[200px]">
          {openSideBar ? (
            ""
          ) : (
            <div className="ease-in duration-200 flex flex-col justify-center items-center">
              <img
                className="w-full h-full"
                src={qq_Logo}
                alt="QuadQue Leads"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

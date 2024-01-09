import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleFetchCompanyDetails } from "../services/company";
import Icons from "./Icons";
import { Storage } from "./utils/store";
import { addCompanyDetails } from "../../features/Company/companySlice";
import { handleFetchFile } from "../services/utils";
import Cross from "../../assets/Images/cross.png";
import Ham from "../../assets/Images/hamburger.png";
const qq_Logo = require("../../../src/assets/Icons/Queleads_Logo.png");

const Sidebar = ({ active, setActive, openSideBar, setOpenSideBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);

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

  const handleLogout = () => {
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
            src={Ham}
            title="Show sidebar"
            alt=""
            className="w-8 m-auto cursor-pointer text-white"
          />
        ) : (
          <img
            src={Cross}
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
              openSideBar ? " rounded-none" : "rounded-full"
            } ease-in  overflow-hidden flex items-center justify-center bg-white`}
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
                active === "dashboard" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
              } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                  active === "overview" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                    active === "payments" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                  } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                    <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                  active === "campaigns" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                  active === "courses" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                        ? "text-[#FFFFFF] "
                        : "text-[#B3B3B3]"
                    } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
                    onClick={() => setActive("salesEmployee")}
                  >
                    <div className="flex w-full items-center justify-around">
                      <Icons.MoneyCheck className="w-5" />
                     
                        <span className={`w-3/4 text-[${openSideBar ? "16px" :"0px"}] ease-in duration-100 font-medium font-poppins bg-[#fc00ff]`}>
                          Sales Employee
                        </span>
                     
                    </div>
                    {active === "salesEmployee" && (
                      <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                      ? "text-[#FFFFFF]"
                      : "text-[#B3B3B3]"
                  } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
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
                    <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                  active === "calender" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                } flex items-center justify-between text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]`}
                onClick={() => setActive("calender")}
              >
                <div className="flex w-full items-center justify-around">
                  <Icons.Calender
                    className={`${
                      active === "calender"
                        ? "text-[#7037FF]"
                        : "text-[#FFFFFF]"
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                className="flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                className="flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                className="flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
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
                className="flex items-center text-base cursor-pointer my-5 py-0.5 hover:text-[#ffffff]"
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
                  <div className="active-option text-[#FFFFFF] bg-[#FFFFFF]">
                    |
                  </div>
                )}
              </NavLink>
            </div>
          )}
          {/* // Accountant menu end */}

          {userDetails?.userInfo?.role_id !== 10 && (
            <Menu
              className={`${
                active === "settings" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
              } !bg-transparent settingsSidebar hover:text-[#ffffff] `}
              onClick={ToggleProfile}
              items={[
                {
                  label: (
                    <>
                      {openSideBar ? (
                        ""
                      ) : (
                        <span
                          className={`${
                            active === "settings"
                              ? "text-[#FFFFFF]"
                              : "text-[#B3B3B3]"
                          } pl-4 `}
                        >
                          Settings
                        </span>
                      )}
                    </>
                  ),
                  key: "menu",
                  icon: (
                    <Icons.Settings className="inline text-[#b3b3b3] hover:text-[#ffffff]" />
                  ),
                  children: [
                    { label: "Profile Settings", key: "profile" },

                    userDetails?.userInfo?.role_id === 1 ||
                    userDetails?.userInfo?.role_id === 2 ||
                    userDetails?.userInfo?.role_id === 3 ||
                    userDetails?.userInfo?.role_id === 4
                      ? { label: "Company Settings", key: "company" }
                      : null,
                  ],
                },
              ]}
            />
          )}

          <div
            className="flex items-center justify-center text-base cursor-pointer my-4 py-1.5"
            onClick={handleLogout}
          >
            <button className="flex w-full items-center justify-center bg-[#D93D3D] mx-2 rounded-md py-2 shadow-xl">
              <Icons.LogOut className="text-[#FFFFFF]" />
              {openSideBar ? (
                ""
              ) : (
                <span className=" font-medium font-poppins text-[#FFFFFF] px-2">
                  Log out
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-[200px]">
          {openSideBar ? (
            ""
          ) : (
            <div className="flex flex-col justify-center items-center">
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

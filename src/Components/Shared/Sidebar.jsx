import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleFetchCompanyDetails } from "../services/company";
import Icons from "./Icons";
import { Storage } from "./utils/store";

/* function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Settings', 'sub1', <SettingOutlined/>, [
    getItem('Profile', '1'),
    getItem('Company settings', '2'),
  ]),
] */

const Sidebar = ({
  active,
  setActive,
  Items2,
  toggleMessage,
  setToggleMessage,
  toggleNotification,
  setToggleNotification,
}) => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  const userMessages = useSelector((state) => state.messages);
  const userNotification = useSelector((state) => state.notifications);

  const [companyName, setCompanyName] = useState("");

  // useEffect(() => {
  //   console.log("From Sidebar");
  // }, [userMessages]);

  // const userDetails = useSelector((state) => state?.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     const messages = await handlefetchMessages(userDetails?.userInfo?.userId);
  //     console.log("messages ------- ", messages);
  //     console.log(
  //       messages?.filter(
  //         (element, index) =>
  //           messages.findIndex((obj) => obj.room === element.room) === index
  //       )
  //     );

  //     dispatch(
  //       addMessages(
  //         messages?.filter(
  //           (element, index) =>
  //             messages.findIndex((obj) => obj.room === element.room) === index
  //         )
  //       )
  //     );
  //   })();
  // }, [dispatch, userDetails?.userInfo?.userId]);

  useEffect(() => {
    (async () => {
      const companyName = await handleFetchCompanyDetails(
        userDetails?.userInfo?.client_id
      );

      setCompanyName(
        companyName?.data?.[0]?.name ? companyName?.data?.[0]?.name : " "
      );
    })();
  }, [userDetails?.userInfo?.client_id]);

  const handleLogout = () => {
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    navigate("/login");
  };

  const ToggleProfile = (e) => {
    console.log(e);
    if (e?.key === "profile") {
      navigate("/user-profile");
    } else if (e?.key === "company") {
      navigate("/settings");
    }
  };

  return (
    <div
      className="bg-white"
      style={{
        // maxWidth: "277px",
        width: "260px",
        // width: "100%",
        // paddingRight: "16px",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <div className="ml-10">
        <div className="pb-4 pt-12">
          <Icons.CompanyLogo
            style={{
              width: "122px",
            }}
          />
        </div>
        <div
          className="border-r 2xl:pt-8 pb-20 overflow-y-scroll"
          style={{
            height: `calc(100vh - 100px)`,
            overflowX: "hidden",
          }}
        >
          <div>
            <NavLink
              to={"/dashboard"}
              className="flex items-center text-base cursor-pointer my-5 py-0.5"
              style={{
                color: `${active === "dashboard" ? "#7037FF" : "#7C8DB5"}`,
              }}
              onClick={() => setActive("dashboard")}
            >
              <Icons.Dashboard />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Dashboard
              </span>
              {active === "dashboard" && (
                <div className="ml-auto active-option">|</div>
              )}
            </NavLink>
          </div>

          {userDetails?.userInfo?.role_id !== 6 && (
            <div>
              <NavLink
                to={"/overview"}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === "overview" ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive("overview")}
              >
                <Icons.Chart />
                <span className="ml-3 leading-6 font-medium font-poppins">
                  Overview
                </span>
                {active === "overview" && (
                  <div className="ml-auto active-option">|</div>
                )}
              </NavLink>
            </div>
          )}

          <div>
            <div
              className="flex items-center text-base cursor-pointer my-5 py-0.5"
              style={{
                color: `${toggleMessage ? "#7037FF" : "#7C8DB5"}`,
              }}
              onClick={(e) => {
                setToggleNotification(false);
                setToggleMessage(!toggleMessage);
                e.stopPropagation();
              }}
            >
              <Icons.Message />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Message
              </span>
              {userMessages?.messages?.filter((message) => message.status === 0)
                ?.length !== 0 && (
                <div className="relative -right-5 flex justify-center items-center">
                  <div
                    className="w-5 py-0.5 text-center ml-15.5 rounded-full text-white text-xs font-poppins"
                    style={{
                      background: "#FF3B30",
                    }}
                  >
                    {/* Count of unread messages */}
                    {
                      userMessages?.messages?.filter(
                        (message) => message.status === 0
                      )?.length
                    }
                  </div>
                </div>
              )}
              {toggleMessage && <div className="ml-auto active-option">|</div>}
            </div>
          </div>

          <div>
            <div
              className="flex items-center text-base cursor-pointer my-5 py-0.5"
              style={{
                color: `${toggleNotification ? "#7037FF" : "#7C8DB5"}`,
              }}
              onClick={(e) => {
                setToggleMessage(false);
                setToggleNotification(!toggleNotification);
                e.stopPropagation();
              }}
            >
              <Icons.Bell className="w-4" />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Notification
              </span>
              {userNotification?.notifications?.filter(
                (notification) => notification.status === 0
              )?.length !== 0 && (
                <div className="relative right-0 flex justify-center items-center">
                  <div
                    className="w-5 py-0.5 text-center ml-15.5 rounded-full text-white text-xs font-poppins"
                    style={{
                      background: "#FF3B30",
                    }}
                  >
                    {
                      userNotification?.notifications?.filter(
                        (notification) => notification.status === 0
                      )?.length
                    }
                  </div>
                </div>
              )}
              {toggleNotification && (
                <div className="ml-auto active-option">|</div>
              )}
            </div>
          </div>

          <div>
            <NavLink
              to={"/payments"}
              className="flex items-center text-base cursor-pointer my-5 py-0.5"
              style={{
                color: `${active === "payments" ? "#7037FF" : "#7C8DB5"}`,
              }}
              onClick={() => setActive("payments")}
            >
              <Icons.Payment />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Payments
              </span>
              {active === "payments" && (
                <div className="ml-auto active-option">|</div>
              )}
            </NavLink>
          </div>

          {(userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4) && (
            <div>
              <NavLink
                to={"/campaigns"}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === "campaigns" ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive("campaigns")}
              >
                <Icons.Campaigns />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Campaigns
                </span>
                {active === "campaigns" && (
                  <div className="ml-auto active-option">|</div>
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
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === "requisitions" ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive("requisitions")}
              >
                <Icons.Pricing />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Requisitions
                </span>
                {active === "requisitions" && (
                  <div className="ml-auto active-option">|</div>
                )}
              </NavLink>
            </div>
          )}

          {/*           <div>
          {(userDetails?.userInfo?.role_id === 1 ||
            userDetails?.userInfo?.role_id === 2 ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4) && (
            <div>
              <NavLink
                to={"/settings"}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === "settings" ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive("settings")}
              >
                <Icons.Settings />
                <span className="ml-4 leading-6 font-medium font-poppins">
                  Settings
                </span>
                {active === "settings" && (
                  <div className="ml-auto active-option">|</div>
                )}
              </NavLink>
            </div>
          )}

          {/* <div>
            <NavLink
              to={"/settings"}
              className="flex items-center text-base cursor-pointer my-5 py-0.5"
              style={{
                color: `${active === "settings" ? "#7037FF" : "#7C8DB5"}`,
              }}
              onClick={() => setActive("settings")}
            >
              <Icons.Settings />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Profile Settings
              </span>
              {active === "settings" && (
                <div className="ml-auto active-option">|</div>
              )}
            </NavLink>
          </div> */}

          <Menu
            style={{
              width: 226,
              color: `${active === "settings" ? "#7037FF" : "#7C8DB5"}`,
              fontSize: 16,
            }}
            onClick={ToggleProfile}
            items={[
              {
                label: (
                  <span style={{ color: "#7C8DB5" }} className="pl-1">
                    Settings
                  </span>
                ),
                key: "menu",
                // <SettingOutlined
                icon: (
                  <Icons.Settings className="inline text-gray-500 text-opacity-75" />
                  //   style={{ color: "#7C8DB5", width: "16px" }}
                  // />
                ),
                children: [
                  { label: "Profile Settings", key: "profile" },
                  { label: "Company Settings", key: "company" },
                ],
              },
            ]}
          />

          <div className="lg:mt-0 2xl:mt-36 pt-1.5">
            <div className="mr-4">
              <h1 className="font-poppins text-lg font-semibold text-black text-opacity-70 pt-6 pb-2">
                {companyName}
              </h1>
            </div>
            {Items2.map((item) => (
              <div
                key={item.key}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === item.name ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span className="ml-4 leading-6 font-medium font-poppins">
                  {item.label}
                </span>
                {active === item.name && (
                  <div className="ml-auto active-option">|</div>
                )}
              </div>
            ))}

            <div
              className="flex items-center text-base cursor-pointer my-4 py-1.5"
              style={{
                color: "#FF3B30",
              }}
              onClick={handleLogout}
            >
              <Icons.LogOut />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Log out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ProtectedRoute from "../../Components/Shared/PrivateRoutes/ProtectedRoute";
import Sidebar from "../../Components/Shared/Sidebar";
import { handleMessageAudio } from "../../Components/Shared/utils/sounds";
import { Storage } from "../../Components/Shared/utils/store";
import { handleFetchFollowUpNotification } from "../../Components/services/notification";
import Cross from "../../assets/Images/cross.png";
import Ham from "../../assets/Images/hamburger.png";
import { addNotifications } from "../../features/user/notificationSlice";
import Calender from "../Calender";
import Campaigns from "../Campaigns";
import CampaignDetails from "../Campaigns/CampaignDetails";
import Courses from "../Courses";
import Dashboard from "../Dashborad";
import CompanyDetails from "../Dashborad/SuperAdminDashboard/CompanyDetails";
import CampaignInfo from "../Dashborad/SuperAdminDashboard/CompanyInfo/CampaignInfo";
import GmailModule from "../Gmail";
import LeadDetails from "../LeadDetails";
import Messages from "../Messages";
import Notifications from "../Notifications";
import Overview from "../Overview";
import RenewPackage from "../Package/RenewPackage";
import Pay from "../Pay";
import Success from "../Pay/Success";
import PaymentStatus from "../Payments";
import Invoice from "../Payments/Invoice";
import Requisitions from "../Requisition/Table";
import Settings from "../Settings";
import AdminCompanyDetails from "../Settings/AdminSettings/CompanyDetails";
import EditProfile from "../Settings/Profile/EditProfile";
import UserProfile from "../Settings/Profile/UserProfile";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const ToogleSideBar = (index) => {
    setOpenSideBar(index);
  };

  useEffect(() => {
    const socket = io(`https://crm-notification.onrender.com`);

    setInterval(() => {
      socket.emit("message", {
        user_id: userDetails?.userInfo?.user_id,
      });

      socket.on("message", function (msg) {
        msg.forEach((notification) => {
          if (
            userNotifications.filter((prev) => prev?.id === notification?.id)
              ?.length === 0
          ) {
            dispatch(addNotifications(notification));
            handleMessageAudio();
          }
        });

        console.log("msg", msg);
      });
    }, 60000);
  }, []);

  useEffect(() => {
    (async () => {
      const notificationRes = await handleFetchFollowUpNotification(
        userDetails?.userInfo?.user_id
      );

      console.log("notificationRes", notificationRes);

      if (notificationRes.status === 200) {
        notificationRes?.data?.forEach((notification) => {
          console.log(
            "UNIQUE",
            userNotifications?.filter((n) => n.id === notification.id)
          );

          if (
            userNotifications?.filter((n) => n.id === notification.id)
              ?.length === 0
          ) {
            dispatch(addNotifications(notification));
          }
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/") {
      if (Storage.getItem("auth_tok")) {
        navigate("/dashboard");
      } else {
        navigate("/welcome");
      }
    } else {
      setActive(window.location.pathname.toString().slice(1));
    }
  }, [navigate]);

  // const openNotification = (placement, details) => {
  //   notification.warn({
  //     message: "Reminder",
  //     duration: 0,
  //     description: (
  //       <div>
  //         <h4 className="text-sm font-normal">
  //           {details?.details} on Lead id {details?.lead_id}
  //         </h4>
  //         <a
  //           className="text-brand-color font-medium"
  //           href={`/lead/${details?.lead_id}`}
  //           target="__blank"
  //         >
  //           Click Here
  //         </a>
  //       </div>
  //     ),
  //     placement,
  //   });
  // };

  // const handleClose = () => {
  //   setReminderVisible(false);
  // };

  // useEffect(() => {
  //   setAllReminder(JSON.parse(localStorage.getItem("reminder")));
  // }, []);

  // setInterval(() => {
  //   const filteredTasks = allReminder.filter(
  //     (task) => task.time === dayjs().$d.toString().slice(4, 21)
  //   );
  //   setCurrentTasks(filteredTasks);
  // }, 5000);

  return (
    <div
      className="flex justify-start items-start font-poppins overflow-x-hidden"
      onClick={() => {
        setToggleMessage(false);
        setToggleNotification(false);
      }}
    >
      <div className="fixed top-0 left-0 overflow-x-hidden">
        <Sidebar
          Items={Items}
          Items2={Items2}
          active={active}
          openSideBar={openSideBar}
          setActive={setActive}
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
          toggleNotification={toggleNotification}
          setToggleNotification={setToggleNotification}
        />
      </div>
      <div
        className={`relative ml-auto duration-300 ${
          openSideBar ? "w-full" : "w-[calc(100vw-277px)]"
        }`}
      >
        <div
          onClick={() => ToogleSideBar(!openSideBar)}
          className="w-16 h-14 absolute top-3 z-[999999]"
        >
          {openSideBar ? (
            <img
              src={Ham}
              title="Show sidebar"
              alt=""
              className="w-8 m-auto cursor-pointer"
            />
          ) : (
            <img
              src={Cross}
              title="Hide sidebar"
              alt=""
              className="w-10 m-auto cursor-pointer"
            />
          )}
        </div>
        <Routes>
          <Route path="renew-package" element={<RenewPackage />} />
          <Route path={"success/:id"} element={<Success />} />
          <Route path={"lead/:id"} element={<LeadDetails />} />
          <Route path={"pay/:id"} element={<Pay />} />
          <Route path="invoice/:id" element={<Invoice />} />
          <Route path={"campaigns/:id"} element={<CampaignDetails />} />
          <Route
            path={"settings/company/:id"}
            element={<AdminCompanyDetails />}
          />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path={"campaign-details/:id"} element={<CampaignInfo />} />
          <Route path={"dashboard/company/:id"} element={<CompanyDetails />} />
          <Route path="mail" element={<GmailModule />} />
        </Routes>

        {Items.filter((item) => item.key === active).map((navItem, i) => (
          <Routes key={i}>
            <Route path="/*" element={<ProtectedRoute />}>
              <Route
                key={navItem.key}
                path={`${navItem.key}`}
                element={navItem.component}
              />
            </Route>
          </Routes>
        ))}
      </div>
      {toggleMessage && (
        <Messages
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
        />
      )}
      {/* ----------- For notification pop up ------------- */}
      {toggleNotification && (
        <Notifications
          toggleNotification={toggleNotification}
          setToggleNotification={setToggleNotification}
        />
      )}
    </div>
  );
};

export default Layout;

const Items = [
  {
    key: "dashboard",
    name: "dashboard",
    // icon: <Icons.Dashboard />,
    label: "Dashboard",
    component: <Dashboard />,
    count: 0,
  },
  {
    key: "overview",
    name: "overview",
    // icon: <Icons.Chart />,
    label: "Overview",
    component: <Overview />,
    count: 0,
  },
  {
    key: "payments",
    name: "payment",
    // icon: <Icons.Payment />,
    label: "Payments",
    component: <PaymentStatus />,
    count: 0,
  },
  {
    key: "campaigns",
    name: "campaigns",
    // icon: <Icons.Campaigns />,
    label: "Campaigns",
    component: <Campaigns />,
    count: 0,
  },
  {
    key: "courses",
    name: "courses",
    // icon: <Icons.Campaigns />,
    label: "Courses",
    component: <Courses />,
    count: 0,
  },
  {
    key: "calender",
    name: "calender",
    label: "Calender",
    component: <Calender />,
    count: 0,
  },
  {
    key: "requisitions",
    name: "requisitions",
    // icon: <Icons.Campaigns />,
    label: "requisitions",
    component: <Requisitions />,
    count: 0,
  },
  {
    key: "gmail",
    name: "gmail",
    // icon: <Icons.Settings />,
    label: "Gmail",
    component: <GmailModule />,
    count: 0,
  },
  {
    key: "settings",
    name: "settings",
    // icon: <Icons.Settings />,
    label: "Settings",
    component: <Settings />,
    count: 0,
  },
];

const Items2 = [
  // {
  //   key: "profile",
  //   name: "profile",
  //   icon: <Icons.PeopleRounded />,
  //   label: "Profile",
  //   component: <Dashboard />,
  //   count: 0,
  // },
  // {
  //   key: "team-contact",
  //   name: "team-contact",
  //   icon: <Icons.MessageRounded />,
  //   label: "Team Contact",
  //   component: <PaymentStatus />,
  //   count: 0,
  // },
  // {
  //   key: "help-centre",
  //   name: "help-centre",
  //   icon: <Icons.Info />,
  //   label: "Help Centre",
  //   component: <Dashboard />,
  //   count: 0,
  // },
];

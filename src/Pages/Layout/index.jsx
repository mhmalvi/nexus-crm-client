import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../../Components/Shared/PrivateRoutes/ProtectedRoute";
import Sidebar from "../../Components/Shared/Sidebar";
import { Storage } from "../../Components/Shared/utils/store";
import { handleFetchNotificationList } from "../../Components/services/notification";
import Cross from "../../assets/Images/cross.png";
import Ham from "../../assets/Images/hamburger.png";
import { setNotifications } from "../../features/user/notificationSlice";
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
import Sales from "../SalesEmployee";
import ManageStudnet from "../StudentManagement/index";
import NotifyModal from "../Notifications/NotifyModal.jsx";
import CourseMangemnet from "../CourseManagemnet/CourseMangemnet";
import PaySlip from "../PaySlip/PaySlip";
import EmailSetting from "../EmailSetting/EmailSetting";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);

  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  const ToogleSideBar = (index) => {
    setOpenSideBar(index);
  };




  const fetchFollowUpNotification = async () => {
    const notificationRes = await handleFetchNotificationList(
      userDetails?.userInfo?.user_id
    );

    if (
      notificationRes?.message === "success" ||
      notificationRes?.status === 200
    ) {
      dispatch(setNotifications(notificationRes?.data));
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchFollowUpNotification();
    }, 1000);
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
          // Items2={Items2}
          active={active}
          openSideBar={openSideBar}
          setActive={setActive}
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
          toggleNotification={toggleNotification}
          setToggleNotification={setToggleNotification}
          notificationLoading={notificationLoading}
          setNotificationLoading={setNotificationLoading}
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
          notificationLoading={notificationLoading}
          setNotificationLoading={setNotificationLoading}
          setIsNotifyOpen={setIsNotifyOpen}
          setNotificationData={setNotificationData}
        />
      )}
      <NotifyModal
        notificationData={notificationData}
        isNotifyOpen={isNotifyOpen}
        setIsNotifyOpen={setIsNotifyOpen}
      />
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
    key: "salesEmployee",
    name: "salesEmployee",
    // icon: <Icons.Campaigns />,
    label: "Sales Employee",
    component: <Sales />,
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
    key: "studentManagement",
    name: "studentManagement",
    // icon: <Icons.Campaigns />,
    label: "Student Management",
    component: <ManageStudnet />,
    count: 0,
  },
  {
    key: "courseManagement",
    name: "courseManagement",
    // icon: <Icons.Campaigns />,
    label: "Course Management",
    component: <CourseMangemnet />,
    count: 0,
  },
  {
    key: "paymentSlip",
    name: "paymentSlip",
    // icon: <Icons.Campaigns />,
    label: "Pay Slip",
    component: <PaySlip />,
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
  {
    key: "email-setting",
    name: "email-setting",
    // icon: <Icons.Settings />,
    label: "Email Setting",
    component: <EmailSetting />,
    count: 0,
  },
];


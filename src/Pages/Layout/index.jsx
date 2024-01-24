import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../../Components/Shared/PrivateRoutes/ProtectedRoute";
import Sidebar from "../../Components/Shared/Sidebar";
import { Storage } from "../../Components/Shared/utils/store";
import { handleFetchNotificationList } from "../../Components/services/notification";
import { setNotifications } from "../../features/user/notificationSlice";
import Reminder from "../Reminder";
import Campaigns from "../Campaigns";
import CampaignDetails from "../Campaigns/CampaignDetails";
import Courses from "../Courses";
import Dashboard from "../Dashboard";
import CompanyDetails from "../Dashboard/SuperAdminDashboard/CompanyDetails";
import CampaignInfo from "../Dashboard/SuperAdminDashboard/CompanyInfo/CampaignInfo";
import GmailModule from "../Gmail";
import LeadDetails from "../LeadDetails";
import Messages from "../Messages";
import Analytics from "../Analytics";
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
import CourseMangemnet from "../CourseManagemnet/CourseMangemnet";
import PaySlip from "../PaySlip/PaySlip";
import EmailSetting from "../EmailSetting/EmailSetting";
import QueMailer from "../QueMailer"

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);

  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);


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
      className="flex justify-start items-start font-poppins overflow-x-hidden dashboard-background"
      onClick={() => {
        setToggleMessage(false);
      }}
    >
      <div className="fixed top-0 left-0 overflow-x-hidden">
        <Sidebar
          Items={Items}
          active={active}
          openSideBar={openSideBar}
          setOpenSideBar={setOpenSideBar}
          setActive={setActive}
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
        />
      </div>
      <div
        className={`relative ml-auto duration-300 ${
          openSideBar ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-277px)]"
        }`}
      >
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
    </div>
  );
};

export default Layout;

const Items = [
  {
    key: "dashboard",
    name: "dashboard",
    label: "Dashboard",
    component: <Dashboard />,
    count: 0,
  },
  {
    key: "analytics",
    name: "analytics",
    label: "Analytics",
    component: <Analytics />,
    count: 0,
  },
  {
    key: "payments",
    name: "payment",
    label: "Payments",
    component: <PaymentStatus />,
    count: 0,
  },
  {
    key: "campaigns",
    name: "campaigns",
    label: "Campaigns",
    component: <Campaigns />,
    count: 0,
  },

  {
    key: "courses",
    name: "courses",
    label: "Courses",
    component: <Courses />,
    count: 0,
  },
  {
    key: "salesEmployee",
    name: "salesEmployee",
    label: "Sales Employee",
    component: <Sales />,
    count: 0,
  },
  {
    key: "reminder",
    name: "reminder",
    label: "Reminder",
    component: <Reminder />,
    count: 0,
  },
  {
    key: "requisitions",
    name: "requisitions",
    label: "requisitions",
    component: <Requisitions />,
    count: 0,
  },
  {
    key: "studentManagement",
    name: "studentManagement",
    label: "Student Management",
    component: <ManageStudnet />,
    count: 0,
  },
  {
    key: "courseManagement",
    name: "courseManagement",
    label: "Course Management",
    component: <CourseMangemnet />,
    count: 0,
  },
  {
    key: "paymentSlip",
    name: "paymentSlip",
    label: "Pay Slip",
    component: <PaySlip />,
    count: 0,
  },
  {
    key: "gmail",
    name: "gmail",
    label: "Gmail",
    component: <GmailModule />,
    count: 0,
  },
  {
    key: "settings",
    name: "settings",
    label: "Settings",
    component: <Settings />,
    count: 0,
  },
  {
    key: "email-setting",
    name: "email-setting",
    label: "Email Setting",
    component: <EmailSetting />,
    count: 0,
  },
  {
    key: "que-mailer",
    name: "que-mailer",
    label: "Que Mailer",
    component: <QueMailer />,
    count: 0,
  },
];

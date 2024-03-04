import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { handleLogout } from "./Components/services/auth";
import { Storage } from "./Components/Shared/utils/store";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";

import Login from "./Pages/Authentication/Login/Login";
import ResetPassword from "./Pages/Authentication/Login/ResetPassword";
import Reminder from "./Pages/Reminder";
import Campaigns from "./Pages/Campaigns";
import CampaignDetails from "./Pages/Campaigns/CampaignDetails";
import Dashboard from "./Pages/Dashboard";
import CompanyDetails from "./Pages/Dashboard/SuperAdminDashboard/CompanyDetails";
import CampaignInfo from "./Pages/Dashboard/SuperAdminDashboard/CompanyInfo/CampaignInfo";
// import GmailModule from "./Pages/Gmail";
import Layout from "./Pages/Layout";
import LeadDetails from "./Pages/LeadDetails";
import Analytics from "./Pages/Analytics";
import RenewPackage from "./Pages/Package/RenewPackage";
import Pay from "./Pages/Pay";
import Success from "./Pages/Pay/Success";
import PaymentStatus from "./Pages/Payments";
import Invoice from "./Pages/Payments/Invoice";
import RequisitionForm from "./Pages/Requisition";
import RequisitionTable from "./Pages/Requisition/Table";
import Sales from "./Pages/SalesEmployee";
import Settings from "./Pages/Settings";
import EditProfile from "./Pages/Settings/Profile/EditProfile";
import UserProfile from "./Pages/Settings/Profile/UserProfile";
import Register from "./Pages/Authentication/Register/Register";
import MangeStudent from "./Pages/StudentManagement";
import CourseMangemnet from "./Pages/CourseManagement/CourseMangement";
import PaySlip from "./Pages/PaySlip/PaySlip";
import EmailSetting from "./Pages/EmailSetting/EmailSetting";
import QueMailer from "./Pages/QueMailer";
import Billing from "./Pages/Billing";

import { useSelector } from "react-redux";
import { useIdleTimer } from "react-idle-timer/legacy";
import Unsubscribe from "./Pages/QueMailer/Unsubscribe/Unsubscribe";
import MultipartForm from "./Pages/Authentication/MultipartForm/MultipartForm";

function App() {
  const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.user);

  const onIdle = () => {
    handleLogout({
      user_id: userDetails.userInfo.user_id,
      email: userDetails.userInfo.email,
      token: authToken,
    });
    Storage.removeItem("auth_tok");
    Storage.removeItem("user_info");
    Storage.removeItem("fac_t");
    navigate("/login");
    window.location.reload();
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 30 * 60 * 1000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  });
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  return (
    <div className={`${colorMode ? "dark-background " : "light-background"}`}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path={"dashboard/company/:id"} element={<CompanyDetails />} />
          <Route path="lead/:id" element={<LeadDetails />} />
          <Route path="payments" element={<PaymentStatus />} />
          <Route path="renew-package" element={<RenewPackage />} />
          <Route path="pay/:id" element={<Pay />} />
          <Route path="invoice/:id" element={<Invoice />} />
          <Route path={"campaigns/:id"} element={<CampaignDetails />} />
          <Route path={"campaign-details/:id"} element={<CampaignInfo />} />
          <Route path={"success/:id"} element={<Success />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="courses" element={<Campaigns />} />
          <Route path="que-mailer" element={<QueMailer />} />
          <Route path="salesEmployee" element={<Sales />} />
          <Route path="studentManagement" element={<MangeStudent />} />
          <Route path="courseManagement" element={<CourseMangemnet />} />
          <Route path="paymentSlip" element={<PaySlip />} />
          <Route path="reminder" element={<Reminder />} />
          <Route path="requisitions" element={<RequisitionTable />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="email-setting" element={<EmailSetting />} />
          <Route path="billing" element={<Billing />} />

          {/* <Route path="mail" element={<GmailModule />} /> */}
        </Route>
        <Route path="setup-your-profile" element={<MultipartForm />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="requisition" element={<RequisitionForm />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
        <Route path="queleads-unsubscribe" element={<Unsubscribe />} />
        <Route
          path="*"
          element={
            userDetails?.userInfo?.verification_status === 1 ? (
              <Navigate to="/setup-your-profile" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

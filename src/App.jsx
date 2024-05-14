import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { handleLogout } from "./Components/services/auth";
import { Storage } from "./Components/Shared/utils/store";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.css";

import Login from "./Pages/Authentication/Login/Login";
import Reminder from "./Pages/Reminder";
import Campaigns from "./Pages/Campaigns";
import CampaignDetails from "./Pages/Campaigns/CampaignDetails";
import Dashboard from "./Pages/Dashboard";
import CompanyDetails from "./Pages/Dashboard/SuperAdminDashboard/CompanyDetails";
import CampaignInfo from "./Pages/Dashboard/SuperAdminDashboard/CompanyInfo/CampaignInfo";
import Layout from "./Pages/Layout";
import LeadDetails from "./Pages/LeadDetails";
import Analytics from "./Pages/Analytics";
import RenewPackage from "./Pages/Package/RenewPackage";
import Pay from "./Pages/Pay";
import Success from "./Pages/Pay/Success";
import PaymentStatus from "./Pages/Payments";
import Invoice from "./Pages/Payments/Invoice";
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
import PackageDue from "./Pages/Billing/PackageDue";


import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { TourProvider, useTour } from "@reactour/tour";
// import { Steps } from "./Components/Shared/Steps";
// import { setHelpModal } from "./features/user/userSlice";
import { loadStripe } from '@stripe/stripe-js';

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
    setState("Idle");
    window.location.reload();
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

  const stripePromise = loadStripe(process.env.REACT_APP_ZULKER_SP_KEY);
  return (
    // <TourProvider
    //   className="tourSteps"
    //   steps={Steps}
    //   onClickClose={(e) => {
    //     dispatch(setHelpModal(false));
    //     e.setIsOpen(false);
    //   }}
    //   onClickMask={(e) => {
    //     dispatch(setHelpModal(false));
    //     e.setIsOpen(false);
    //   }}
    // >
      <div className={`${colorMode ? "dark-background" : "light-background"}`}>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme={`${colorMode ? "light" : "dark"}`}
          transition={Slide}
        />
        <Routes>
          {userDetails?.userInfo?.active !== 2 ? (
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path={"dashboard/company/:id"}
                element={<CompanyDetails />}
              />
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
              <Route path="settings" element={<Settings />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="email-setting" element={<EmailSetting />} />
              <Route path="billing" element={<Billing />} />
              {/* <Route path="mail" element={<GmailModule />} /> */}
            </Route>
          ) : (
            <Route path="select-package" element={<PackageDue />} />
          )}
          <Route path="setup-your-profile" element={<MultipartForm stripePromise={stripePromise}/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
    // </TourProvider>
  );
}

export default App;

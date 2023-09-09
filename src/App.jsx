import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import Login from "./Pages/Authentication/Login/Login";
import ResetPassword from "./Pages/Authentication/Login/ResetPassword";
import Calender from "./Pages/Calender";
import Campaigns from "./Pages/Campaigns";
import CampaignDetails from "./Pages/Campaigns/CampaignDetails";
import Dashboard from "./Pages/Dashborad";
import CompanyDetails from "./Pages/Dashborad/SuperAdminDashboard/CompanyDetails";
import CampaignInfo from "./Pages/Dashborad/SuperAdminDashboard/CompanyInfo/CampaignInfo";
import GmailModule from "./Pages/Gmail";
import HomePage from "./Pages/LandingPage";
import Layout from "./Pages/Layout";
import LeadDetails from "./Pages/LeadDetails";
import Overview from "./Pages/Overview";
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
import Landing from "./Pages/LandingPage2/Landing";
import Register from "./Pages/Authentication/Register/Register";
import MangeStudent from "./Pages/StudentManagement";
import CourseMangemnet from "./Pages/CourseManagemnet/CourseMangemnet";
import PaySlip from "./Pages/PaySlip/PaySlip";
import EmailSetting from "./Pages/EmailSetting/EmailSetting";

function App() {
  // useEffect(() => {
  //   if (process.env.REACT_APP_PRODUCTION) console.log = () => {};
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          <Route path="overview" element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="courses" element={<Campaigns />} />
          <Route path="salesEmployee" element={<Sales />} />
          <Route path="studentManagement" element={<MangeStudent />} />
          <Route path="courseManagement" element={<CourseMangemnet />} />
          <Route path="paymentSlip" element={<PaySlip />} />
          <Route path="calender" element={<Calender />} />
          <Route path="requisitions" element={<RequisitionTable />} />
          {/* <Route path={"settings/company/:id"} element={<CompanyDetails />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="email-setting" element={<EmailSetting />} />
          <Route path="mail" element={<GmailModule />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="requisition" element={<RequisitionForm />} />
        <Route path="reset-password" element={<ResetPassword />} />
        {/* <Route path="welcome" element={<HomePage />} /> */}
        <Route path="welcome" element={<Landing />} />
        {/* <Route path="package-create" element={<Package />} /> */}
        {/* <Route
          path="subscription/edit-package/:id"
          element={<PackageUpdate />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;

import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import Login from "./Pages/Authentication/Login/Login";
import Campaigns from "./Pages/Campaigns";
import CampaignDetails from "./Pages/Campaigns/CampaignDetails";
import Dashboard from "./Pages/Dashborad";
import LandingPage from "./Pages/LandingPage";
import LeadDetails from "./Pages/LeadDetails";
import Overview from "./Pages/Overview";
import Pay from "./Pages/Pay";
import Success from "./Pages/Pay/Success";
import PaymentStatus from "./Pages/Payments";
import RequisitionForm from "./Pages/Requisition";
import RequisitionTable from "./Pages/Requisition/Table";
import Settings from "./Pages/Settings";
import CompanyDetails from "./Pages/Settings/AdminSettings/CompanyDetails";
import ResetPassword from "./Pages/Authentication/Login/ResetPassword";

function App() {
  // useEffect(() => {
  //   console.log = function () {};
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lead/:id" element={<LeadDetails />} />
          <Route path="payments" element={<PaymentStatus />} />
          <Route path="pay/:id" element={<Pay />} />
          <Route path={"campaigns/:id"} element={<CampaignDetails />} />
          <Route path={"success/:id"} element={<Success />} />
          <Route path="overview" element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="requisitions" element={<RequisitionTable />} />
          <Route path={"settings/company/:id"} element={<CompanyDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="requisition" element={<RequisitionForm />} />
        <Route path="reset-password" element={<ResetPassword />} />
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

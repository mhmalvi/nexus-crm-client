import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import Login from "./Pages/Authentication/Login/Login";
import Campaigns from "./Pages/Campaigns";
import Dashboard from "./Pages/Dashborad";
import LandingPage from "./Pages/LandingPage";
import LeadDetails from "./Pages/LeadDetails";
import Overview from "./Pages/Overview";
import Pay from "./Pages/Pay";
import Success from "./Pages/Pay/Success";
import PaymentStatus from "./Pages/Payments";
import Settings from "./Pages/Settings";
import CompanySettings from "./Pages/Settings/CompanySettings";

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lead/:id" element={<LeadDetails />} />
          <Route path="payments" element={<PaymentStatus />} />
          <Route path="pay/:id" element={<Pay />} />
          <Route path={"success/:id"} element={<Success />} />
          <Route path="overview" element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="settings/company/:name" element={<CompanySettings />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

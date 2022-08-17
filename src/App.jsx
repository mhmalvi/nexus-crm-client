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
import Payment from "./Pages/Payment";
import PaymentStatus from "./Pages/Payment";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lead/:id" element={<LeadDetails />} />
          <Route path="payments" element={<PaymentStatus />} />
          <Route path="pay" element={<Payment />} />
          <Route path="overview" element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

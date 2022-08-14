import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Authentication/Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

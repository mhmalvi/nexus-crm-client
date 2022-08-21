import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Icons from "../../Components/Shared/Icons";
import Sidebar from "../../Components/Shared/Sidebar";
import Campaigns from "../Campaigns";
import Dashboard from "../Dashborad";
import LeadDetails from "../LeadDetails";
import Messages from "../Messages";
import Overview from "../Overview";
import PaymentStatus from "../Payments";
import Pay from "../Pay";
import Settings from "../Settings";
import CompanySettings from "../Settings/CompanySettings";

const LandingPage = () => {
  const navite = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);

  useEffect(() => {
    if (window.location.pathname.length <= 1) {
      navite("/dashboard");
    } else {
      setActive(window.location.pathname.toString().slice(1));
    }
  }, []);

  const Items = [
    {
      key: "dashboard",
      name: "dashboard",
      icon: <Icons.Dashboard />,
      label: "Dashboard",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "overview",
      name: "overview",
      icon: <Icons.Chart />,
      label: "Overview",
      component: <Overview />,
      count: 0,
    },
    {
      key: "payments",
      name: "payment",
      icon: <Icons.Payment />,
      label: "Payments",
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "campaigns",
      name: "campaigns",
      icon: <Icons.Campaigns />,
      label: "Campaigns",
      component: <Campaigns />,
      count: 0,
    },
    {
      key: "export-excel",
      name: "export-excel",
      icon: <Icons.Payment />,
      label: "Export Excel",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "settings",
      name: "settings",
      icon: <Icons.Settings />,
      label: "Settings",
      component: <Settings />,
      count: 0,
    },
    // {
    //   key: "lead/:id",
    //   name: "lead-details",
    //   icon: <Icons.Settings />,
    //   label: "Lead Details",
    //   component: <LeadDetails />,
    //   count: 0,
    // },
    // {
    //   key: "settings/company/",
    //   name: "company-details",
    //   icon: <Icons.Settings />,
    //   label: "Company Details",
    //   component: <CompanySettings />,
    //   count: 0,
    // },
  ];

  const Items2 = [
    {
      key: "profile",
      name: "profile",
      icon: <Icons.PeopleRounded />,
      label: "Profile",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "team-contact",
      name: "team-contact",
      icon: <Icons.MessageRounded />,
      label: "Team Contact",
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "help-centre",
      name: "help-centre",
      icon: <Icons.Info />,
      label: "Help Centre",
      component: <Dashboard />,
      count: 0,
    },
  ];

  return (
    <div
      className="flex justify-start items-start"
      onClick={() => setToggleMessage(false)}
    >
      <div className="fixed top-0 left-0">
        <Sidebar
          Items={Items}
          Items2={Items2}
          active={active}
          setActive={setActive}
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
        />
      </div>
      <div
        className="relative ml-auto"
        style={{
          width: "calc(100vw - 277px)",
        }}
      >
        <Routes>
          <Route path={"lead/:id"} element={<LeadDetails />} />
          <Route path={"pay/:id"} element={<Pay />} />
          <Route
            path={"settings/company/:name"}
            element={<CompanySettings admin={true} />}
          />
        </Routes>

        {Items.filter((item) => item.key === active).map((navItem, i) => (
          <Routes key={i}>
            <Route
              key={navItem.key}
              path={`${navItem.key}`}
              element={navItem.component}
            />
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

export default LandingPage;

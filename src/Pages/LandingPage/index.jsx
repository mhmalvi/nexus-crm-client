import React, { useState } from "react";
import Icons from "../../Components/Shared/Icons";
import Sidebar from "../../Components/Shared/Sidebar";
import Dashboard from "../Dashborad";
import Messages from "../Messages";
import PaymentStatus from "../PaymentStatus";
import Campaigns from "../Campaigns";
import { Route, Routes } from "react-router-dom";
import LeadDetails from "../Dashborad/LeadDetails";
import { useEffect } from "react";

const LandingPage = () => {
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);

  useEffect(() => {
    setActive(window.location.pathname.toString().slice(1));
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
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "payments",
      name: "payment",
      icon: <Icons.Payment />,
      label: "Payment",
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
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "lead/:id",
      name: "settings",
      icon: <Icons.Settings />,
      label: "Settings",
      component: <LeadDetails />,
      count: 0,
    },
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
        </Routes>

        {Items.filter((item) => item.key === active).map((c) => (
          <Routes>
            <Route key={c.key} path={`${c.key}`} element={c.component} />
          </Routes>
        ))}

        {/* {Items.filter((item) => item.name === active).map((c) => (
          <div key={c.key}>{c.component}</div>
        ))} */}
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

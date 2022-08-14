import React, { useState } from "react";
import Icons from "../../Components/Shared/Icons";
import Sidebar from "../../Components/Shared/Sidebar";
import Dashboard from "../Dashborad";
import Messages from "../Messages";
import PaymentStatus from "../PaymentStatus";

const LandingPage = () => {
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);

  const Items = [
    {
      key: "1",
      name: "dashboard",
      icon: <Icons.Dashboard />,
      label: "Dashboard",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "2",
      name: "overview",
      icon: <Icons.Chart />,
      label: "Overview",
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "4",
      name: "payment",
      icon: <Icons.Payment />,
      label: "Payment",
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "5",
      name: "campaigns",
      icon: <Icons.Campaigns />,
      label: "Campaigns",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "6",
      name: "export-excel",
      icon: <Icons.Payment />,
      label: "Export Excel",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "7",
      name: "settings",
      icon: <Icons.Settings />,
      label: "Settings",
      component: <Dashboard />,
      count: 0,
    },
  ];

  const Items2 = [
    {
      key: "8",
      name: "profile",
      icon: <Icons.PeopleRounded />,
      label: "Profile",
      component: <Dashboard />,
      count: 0,
    },
    {
      key: "9",
      name: "team-contact",
      icon: <Icons.MessageRounded />,
      label: "Team Contact",
      component: <PaymentStatus />,
      count: 0,
    },
    {
      key: "10",
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
        {Items.filter((item) => item.name === active).map((c) => (
          <div key={c.key}>{c.component}</div>
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

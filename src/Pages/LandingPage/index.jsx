import { Alert } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Icons from "../../Components/Shared/Icons";
import Sidebar from "../../Components/Shared/Sidebar";
import Campaigns from "../Campaigns";
import Dashboard from "../Dashborad";
import LeadDetails from "../LeadDetails";
import Messages from "../Messages";
import Overview from "../Overview";
import Pay from "../Pay";
import PaymentStatus from "../Payments";
import Settings from "../Settings";
import CompanySettings from "../Settings/CompanySettings";

const LandingPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);

  const [currentTasks, setCurrentTasks] = useState([]);
  const [allReminder, setAllReminder] = useState([]);

  useEffect(() => {
    if (window.location.pathname.length <= 1) {
      navigate("/dashboard");
    } else {
      setActive(window.location.pathname.toString().slice(1));
    }
  }, [navigate]);

  const handleClose = () => {
    setReminderVisible(false);
  };

  useEffect(() => {
    setAllReminder(JSON.parse(localStorage.getItem("reminder")));
  }, []);

  // setInterval(() => {
  //   const filteredTasks = allReminder.filter(
  //     (task) => task.time === dayjs().$d.toString().slice(4, 21)
  //   );
  //   setCurrentTasks(filteredTasks);
  // }, 5000);

  return (
    <div
      className="flex justify-start items-start font-poppins overflow-x-hidden"
      onClick={() => setToggleMessage(false)}
    >
      <div className="fixed top-0 left-0 overflow-x-hidden">
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
        <div className="fixed right-16 bottom-16">
          {currentTasks.map((reminder, i) => (
            <div key={i} className="mb-4">
              <Alert
                className="mb-2"
                message="Warning"
                description={
                  <div className="ml-6">
                    {reminder?.message
                      ? reminder?.message + " to lead No. " + reminder?.lead
                      : "New task in lead No. " + reminder?.lead + " "}
                    <br />
                    Please Visit{" "}
                    <span className="font-medium">
                      Dashboard{">"}Today's Task
                    </span>
                  </div>
                }
                type="warning"
                showIcon
                closable
                afterClose={handleClose}
              />
            </div>

            // <div
            //   key={i}
            //   className="max-w-md z-50 bg-yellow-50 px-5 py-4 shadow rounded-md mb-1"
            // >
            //   <div className="flex items-start justify-between">
            //     <div className="flex items-center mb-2">
            //       <Icons.Alert className="w-4 mr-2 text-yellow-500" />
            //       <h1 className="font-medium mb-0 text-base">Warning</h1>
            //     </div>
            //     <div
            //       className="font-semibold px-1.5 py-0 bg-red-100 shadow rounded cursor-pointer"
            //       onClick={() => handleClose("12345")}
            //     >
            //       x
            //     </div>
            //   </div>
            //   <div className="ml-6">
            //     {reminder?.message
            //       ? reminder?.message + " to lead No. " + reminder?.lead
            //       : "New task in lead No. " + reminder?.lead + " "}
            //     <br /> Please visit Today's Task of Dashboard
            //   </div>
            // </div>
          ))}
        </div>

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
  // {
  //   key: "profile",
  //   name: "profile",
  //   icon: <Icons.PeopleRounded />,
  //   label: "Profile",
  //   component: <Dashboard />,
  //   count: 0,
  // },
  // {
  //   key: "team-contact",
  //   name: "team-contact",
  //   icon: <Icons.MessageRounded />,
  //   label: "Team Contact",
  //   component: <PaymentStatus />,
  //   count: 0,
  // },
  {
    key: "help-centre",
    name: "help-centre",
    icon: <Icons.Info />,
    label: "Help Centre",
    component: <Dashboard />,
    count: 0,
  },
];

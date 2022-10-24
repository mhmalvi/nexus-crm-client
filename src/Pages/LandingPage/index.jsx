import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Icons from "../../Components/Shared/Icons";
import Sidebar from "../../Components/Shared/Sidebar";
import { handleReminderAudio } from "../../Components/Shared/utils/sounds";
import { Storage } from "../../Components/Shared/utils/store";
import Campaigns from "../Campaigns";
import CampaignDetails from "../Campaigns/CampaignDetails";
import Dashboard from "../Dashborad";
import LeadDetails from "../LeadDetails";
import Messages from "../Messages";
import Notifications from "../Notifications";
import Overview from "../Overview";
import Pay from "../Pay";
import Success from "../Pay/Success";
import PaymentStatus from "../Payments";
import Settings from "../Settings";
import CompanySettings from "../Settings/CompanySettings";
import Subscription from "../Subscription";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const LandingPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state?.user);
  const [active, setActive] = useState("dashboard");
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);

  useEffect(() => {
    socket.on("receive_reminder", (data) => {
      openNotification("topRight", data);
      handleReminderAudio();
    });
    // unbind the event handler when the component gets unmounted
    return () => {
      socket.off("receive_reminder");
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname.length <= 1) {
      if (Storage.getItem("auth_tok")) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      setActive(window.location.pathname.toString().slice(1));
    }
  }, [navigate]);

  const openNotification = (placement, details) => {
    notification.warn({
      message: "Reminder",
      duration: 0,
      description: (
        <div>
          <h4 className="text-sm font-normal">
            {details?.details} on Lead id {details?.lead_id}
          </h4>
          <a
            className="text-brand-color font-medium"
            href={`/lead/${details?.lead_id}`}
            target="__blank"
          >
            Click Here
          </a>
        </div>
      ),
      placement,
    });
  };

  // const handleClose = () => {
  //   setReminderVisible(false);
  // };

  // useEffect(() => {
  //   setAllReminder(JSON.parse(localStorage.getItem("reminder")));
  // }, []);

  // setInterval(() => {
  //   const filteredTasks = allReminder.filter(
  //     (task) => task.time === dayjs().$d.toString().slice(4, 21)
  //   );
  //   setCurrentTasks(filteredTasks);
  // }, 5000);

  return (
    <div
      className="flex justify-start items-start font-poppins overflow-x-hidden"
      onClick={() => {
        setToggleMessage(false);
        setToggleNotification(false);
      }}
    >
      <div className="fixed top-0 left-0 overflow-x-hidden">
        <Sidebar
          Items={Items}
          Items2={Items2}
          active={active}
          setActive={setActive}
          toggleMessage={toggleMessage}
          setToggleMessage={setToggleMessage}
          toggleNotification={toggleNotification}
          setToggleNotification={setToggleNotification}
        />
      </div>
      <div
        className="relative ml-auto"
        style={{
          width: "calc(100vw - 277px)",
        }}
      >
        {/* <div className="fixed right-16 bottom-16">
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
        </div> */}

        <Routes>
          <Route path={"success/:id"} element={<Success />} />
          <Route path={"lead/:id"} element={<LeadDetails />} />
          <Route path={"pay/:id"} element={<Pay />} />
          <Route path={"campaigns/:id"} element={<CampaignDetails />} />
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

      {/* ----------- For notification pop up ------------- */}
      {toggleNotification && (
        <Notifications
          toggleNotification={toggleNotification}
          setToggleNotification={setToggleNotification}
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
    key: "subscription",
    name: "subscription",
    icon: <Icons.Campaigns />,
    label: "subscription",
    component: <Subscription />,
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

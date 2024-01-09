import React from "react";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Notifications = ({
  toggleNotification,
  notificationLoading,
  setNotificationLoading,
  setToggleNotification,
  setNotificationData,
  setIsNotifyOpen,
}) => {
  const navigate = useNavigate();

  const [syncNotification, setSyncNotification] = useState(true);

  const handleNotificationNavigation = async (notification) => {
    if (notification.type === "notice") navigate("/dashboard");
  };

  return (
    <div
      className="fixed top-28 -ml-2 -mt-2 pb-6 rounded-md"
      style={{
        width: "341px",
        left: "290px",
        boxShadow: "4px 2px 10px rgba(112, 55, 255, 0.05)",
        zIndex: "99999",
      }}
    >
      <div className="px-4 pt-13" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Notifications
        </h1>
      </div>

      <Notification
        notificationLoading={notificationLoading}
        setNotificationLoading={setNotificationLoading}
        toggleNotification={toggleNotification}
        syncNotification={syncNotification}
        setSyncNotification={setSyncNotification}
        handleNotificationNavigation={handleNotificationNavigation}
        setNotificationData={setNotificationData}
        setIsNotifyOpen={setIsNotifyOpen}
        setToggleNotification={setToggleNotification}
      />
    </div>
  );
};

export default Notifications;

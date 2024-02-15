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
    
  );
};

export default Notifications;

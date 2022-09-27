import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Notification from "./Notification";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Notifications = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.user);

  const [notifications, setNotifications] = useState([]);

  const handleMessageNavigation = async (message) => {
    console.log("userDetails", message.receiver_id);
    console.log("userDetails.userInfo.userId", userDetails.userInfo.userId);

    if (message.receiver_id !== userDetails.userInfo.userId) {
      await socket.emit("read_message", message.id);
    }

    navigate("/lead/112");
  };

  useEffect(() => {
    axios
      .get(
        `${process.env?.REACT_APP_CHAT_SERVER_URL}/notifications/${userDetails?.userInfo?.userId}`
      )
      .then(function (response) {
        console.log(response?.data);
        setNotifications(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userDetails?.userInfo?.userId]);

  console.log(notifications);

  return (
    <div
      className="fixed top-28 -ml-2 -mt-2 pb-6 bg-white border rounded-md"
      style={{
        width: "341px",
        left: "300px",
        boxShadow: "4px 2px 10px rgba(112, 55, 255, 0.05)",
      }}
    >
      <div className="px-4 pt-13" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Notifications
        </h1>
      </div>

      <Notification
        notifications={notifications}
        handleMessageNavigation={handleMessageNavigation}
      />
    </div>
  );
};

export default Notifications;

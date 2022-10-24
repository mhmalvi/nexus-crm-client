import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { handleMessageAudio } from "../../Components/Shared/utils/sounds";
import { addNotifications } from "../../features/user/notificationSlice";
import Notification from "./Notification";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [syncNotification, setSyncNotification] = useState(false);
  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  // const [notifications, setNotifications] = useState([]);

  const handleNotificationNavigation = async (notification) => {
    console.log("userDetails", notification.receiver_id);
    console.log("userDetails.userInfo.userId", userDetails.userInfo.user_id);

    await socket.emit("read_notification", notification.id);
    socket.on("updated_notification", (data) => {
      if (data) {
        console.log(data);
        dispatch(addNotifications(data));
      }
    });
    // setSyncNotification(!syncNotification);

    if (notification.type === "notice") navigate("/dashboard");
  };

  useEffect(() => {
    socket.on("receive_notification", (data) => {
      if (data) {
        console.log(data);
        handleMessageAudio();
        dispatch(addNotifications(data));
      }
    });
  }, [dispatch]);

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
        notifications={userNotifications}
        handleNotificationNavigation={handleNotificationNavigation}
      />
    </div>
  );
};

export default Notifications;

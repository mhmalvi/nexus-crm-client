import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlefetchMessages,
  handlefetchNotifications,
} from "../../Components/services";
import { addMessages } from "../../features/user/messagesSlice";
import { addNotifications } from "../../features/user/notificationSlice";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);
  const userNotifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  useEffect(() => {
    // API Request for fetching messages
    (async () => {
      const mesages = await handlefetchMessages(userDetails?.userInfo?.userId);
      const filteredMessage = mesages?.filter(
        (element, index) =>
          mesages.findIndex((obj) => obj.sender_id === element.sender_id) ===
          index
      );
      dispatch(addMessages(filteredMessage));
    })();

    // API Request for fetching notifiaction
    (async () => {
      const response = await handlefetchNotifications(
        userDetails?.userInfo?.userId
      );

      response?.forEach((notification) => {
        if (
          userNotifications?.filter((notific) => notific.id !== notification.id)
            .length === 0
        ) {
          dispatch(addNotifications(notification));
        }
      });
    })();

    // socket.on("receive_reminders", (data) => {
    //   if (data) {
    //     console.log(data);
    //     if (
    //       userNotifications?.filter((notific) => notific.id !== data.id)
    //         .length === 0
    //     ) {
    //       dispatch(addNotifications(data));
    //     }
    //     dispatch(addNotifications(data));
    //     handleReminderAudio();
    //   }
    // });
  }, [dispatch, userDetails?.userInfo?.userId, userNotifications]);

  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <UserDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlefetchMessages,
  handlefetchNotifications,
} from "../../Components/services/auth";
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
    document.title = `Dashboard`;

    // API Request for fetching messages
    (async () => {
      const messages = await handlefetchMessages(
        userDetails?.userInfo?.user_id
      );
      dispatch(
        addMessages(
          messages?.filter(
            (element, index) =>
              messages.findIndex((obj) => obj.room === element.room) === index
          )
        )
      );
    })();

    // API Request for fetching notifiaction
    (async () => {
      const response = await handlefetchNotifications(
        userDetails?.userInfo?.user_id
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
  }, [dispatch, userDetails?.userInfo?.user_id, userNotifications]);

  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      {userDetails?.userInfo?.role_id === 6 ? (
        <UserDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Dashboard;

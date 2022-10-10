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

  useEffect(() => {
    console.log(userDetails?.userInfo?.userId);

    // API Request for fetching messages
    (async () => {
      const response = await handlefetchMessages(userDetails?.userInfo?.userId);
      const filteredMessage = response.filter(
        (element, index) =>
          response.findIndex((obj) => obj.sender_id === element.sender_id) ===
          index
      );
      dispatch(addMessages(filteredMessage));
    })();

    // API Request for fetching notifiaction
    (async () => {
      const response = await handlefetchNotifications(
        userDetails?.userInfo?.userId
      );
      dispatch(addNotifications(response));
    })();
  }, [dispatch, userDetails?.userInfo?.userId]);

  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <UserDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;

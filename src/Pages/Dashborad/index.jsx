import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlefetchMessages } from "../../Components/services/auth";
import { addMessages } from "../../features/user/messagesSlice";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user);

  useEffect(() => {
    console.log(userDetails?.userInfo?.userId);
    // API Request
    const fetchData = async () => {
      const response = await handlefetchMessages(userDetails?.userInfo?.userId);
      const finteredMessage = response.filter(
        (element, index) =>
          response.findIndex((obj) => obj.sender_id === element.sender_id) ===
          index
      );

      dispatch(addMessages(finteredMessage));
    };

    fetchData();
  }, [dispatch, userDetails?.userInfo?.userId]);

  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <UserDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;

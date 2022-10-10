import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { addNotifications } from "../../features/user/notificationSlice";
import Message from "./Message";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.user);

  const handleMessageNavigation = async (message) => {
    console.log("userDetails", message);
    console.log("userDetails.userInfo.userId", userDetails.userInfo.userId);

    if (message.receiver_id === userDetails.userInfo.userId) {
      await socket.emit("read_message", message.id);
      socket.on("updated_messages", (data) => {
        if (data) {
          console.log(data);
          dispatch(addNotifications(data));
        }
      });
    }

    navigate("/lead/112");
  };

  // useEffect(() => {
  //   console.log(userDetails?.userInfo?.userId);
  //   // API Request
  //   const fetchData = async () => {
  //     const response = await handlefetchMessages(userDetails?.userInfo?.userId);
  //     const finteredMessage = response.filter(
  //       (element, index) =>
  //         response.findIndex((obj) => obj.sender_id === element.sender_id) ===
  //         index
  //     );

  //     dispatch(addMessages(finteredMessage));
  //   };

  //   fetchData();
  // }, [dispatch, userDetails?.userInfo?.userId]);

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
          Massages
        </h1>
      </div>

      <Message handleMessageNavigation={handleMessageNavigation} />
    </div>
  );
};

export default Messages;

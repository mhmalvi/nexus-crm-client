import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import { io } from "socket.io-client";
import { setNotifications } from "../../features/user/notificationSlice"
const Notification = ({
  handleNotificationNavigation,
  setNotificationData,
  setIsNotifyOpen,
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const userDetails = useSelector((state) => state?.user);
  const socket = io("http://192.168.0.121:7000");

  socket.on("connect", (e) => {
    console.log("Socket connected");
    socket.emit("message", {user_id:userDetails.userInfo.id});
  });
  useEffect(()=>{
    socket.on("message", (e) => {
      dispatch(setNotifications(e));
      console.log(e);
    });
    // return () => {
    //   socket.off("message");
    //   socket.on("disconnect", () => {
    //     console.log(socket.id); 
    //   });
    // };
  },[dispatch]);
  return (
    <div>
      <div className="overflow-y-auto">
        {!notifications?.length && (
          <div className="text-lg font-poppins text-center my-6">
            No Notification Yet
          </div>
        )}
        {notifications?.map((notification, i) => (
          <div
            onClick={() => {
              handleNotificationNavigation({
                id: notification.id,
                receiver_id: notification.receiver_id,
                type: notification.notification_type,
              });
              // handleReadMessageReq(notification.id);
              setNotificationData(notification || {});
              setIsNotifyOpen(true);
            }}
            key={i}
            className="py-3 px-3 cursor-pointer hover:bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="text-base font-poppins font-semibold flex items-center">
                <span>
                  {notification?.priority ? (
                    <Icons.Bell
                      className={`w-5 animate-pulse mr-3 ${
                        priorityList[notification?.priority - 1]?.className
                      }`}
                    />
                  ) : null}
                </span>
                <span
                  className={`${colorMode ? "text-white" : "text-gray-800"}`}
                >
                  {notification?.title}
                </span>
              </div>
              {/* Date & Time */}
              <div>
                <span
                  className={`font-medium text-xs mr-1.5 ${
                    colorMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {notification.notification_time?.slice(0, 16)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start py-2 border-b-[0.5px] border-gray-500">
              <div>
                <p
                  className={`text-sm ${
                    colorMode ? "text-white" : "text-gray-800"
                  } font-medium font-poppins mb-0`}
                >
                  {notification?.description}
                </p>
              </div>
              <div>
                <Icons.Read
                  className={` ${
                    !notification.status ? "text-[#00ff00]" : "text-gray-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;

const priorityList = [
  {
    key: 1,
    lable: "Important",
    className: "text-red-600",
  },
  {
    key: 2,
    lable: "Average",
    className: "text-orange-600",
  },
  {
    key: 3,
    lable: "Low",
    className: "text-violet-600",
  },
  {
    key: 4,
    lable: "Very Low",
    className: "text-yellow-600",
  },
];

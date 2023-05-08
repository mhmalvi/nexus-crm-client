import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import { handleReadNotification } from "../../Components/services/notification";
import { setNotifications } from "../../features/user/notificationSlice";

const Notification = ({ handleNotificationNavigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  const handleReadMessageReq = async (id) => {
    console.log(id);
    // const messageReadRes = await handleReadNotification(id);
    // console.log("messageReadRes", messageReadRes);
    // if (messageReadRes?.status === 201) {
    //   const allNotifications = [...notifications];

    //   const updatedNotifications = allNotifications?.map((notification) => {
    //     if (notification.id === id) {
    //       return { ...notification, status: 0 };
    //     }
    //     return notification;
    //   });

    //   console.log("updatedNotifications", updatedNotifications);
    //   dispatch(setNotifications(updatedNotifications));
    // }
  };

  return (
    <div>
      <div
        className="mt-7.5 overflow-y-auto "
        style={{
          maxHeight: "65vh",
        }}
      >
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
              handleReadMessageReq(notification.id);
            }}
            key={i}
            className="pt-3 px-3 cursor-pointer hover:bg-gray-50 hover:delay-200"
          >
            {/* <div className="bg-brand-color/20 px-2 py-0.5 rounded"> */}
            <div className="flex justify-between items-start ">
              <h1 className="text-lg leading-7 font-poppins font-semibold ">
                <span
                  className={`${
                    priorityList[notification?.priority - 1]?.className
                  }`}
                >
                  {notification?.priority ? "Reminder: " : null}
                </span>
                <span>{notification?.title}</span>
              </h1>

              {/* Date & Time */}
              <div>
                <span
                  className="font-medium text-opacity-50 leading-4 mr-1.5"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {notification.trigg_time}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-sm leading-6 font-medium font-poppins mb-0">
                  {notification?.description}
                </p>
              </div>
              <div>
                <Icons.Read
                  className={` ${
                    !notification.status
                      ? "text-brand-color"
                      : "text-black text-opacity-25"
                  }`}
                />
              </div>
            </div>
            {/* </div> */}
            <hr onClick={(e) => e.stopPropagation()} />
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

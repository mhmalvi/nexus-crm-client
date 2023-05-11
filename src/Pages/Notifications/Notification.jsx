import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import {
  handleFetchFollowUpNotification,
  handleReadNotification,
} from "../../Components/services/notification";
import {
  addNotifications,
  setNotifications,
} from "../../features/user/notificationSlice";

const Notification = ({ handleNotificationNavigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state?.notifications
  ).notifications;

  const userDetails = useSelector((state) => state?.user);

  const handleReadMessageReq = async (id) => {
    console.log(id);
    const messageReadRes = await handleReadNotification(id);
    // console.log("messageReadRes", messageReadRes);

    const notificationRes = await handleFetchFollowUpNotification(
      userDetails?.userInfo?.user_id
    );

    console.log("notificationRes", notificationRes);

    if (messageReadRes?.status === 201) {
      dispatch(setNotifications([]));

      const allNotifications = [...notifications];

      if (notificationRes.status === 200) {
        notificationRes?.data?.forEach((notification) => {
          if (
            notifications?.filter((n) => n.id === notification.id)?.length === 0
          ) {
            dispatch(addNotifications(notification));
          }
        });
      }

      const updatedNotifications = allNotifications?.map((notification) => {
        if (notification.id === id) {
          return { ...notification, status: 0 };
        }
        return notification;
      });

      console.log("updatedNotifications", updatedNotifications);
      dispatch(setNotifications(updatedNotifications));
    }
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
              <div className="text-lg leading-7 font-poppins font-semibold flex items-center">
                <span>
                  {notification?.priority ? (
                    <Icons.Bell
                      className={`w-5 animate-pulse mr-3 ${
                        priorityList[notification?.priority - 1]?.className
                      }`}
                    />
                  ) : null}
                </span>
                <span>{notification?.title}</span>
              </div>

              {/* Date & Time */}
              <div>
                <span
                  className="font-medium text-opacity-50 leading-4 mr-1.5"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {notification.start?.slice(0, 16)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-5 mt-2">
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

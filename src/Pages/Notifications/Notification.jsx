import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import {
  handleFetchNotificationList,
  handleChangeNotificationStatus,
} from "../../Components/services/notification";
import {
  addNotifications,
  setNotifications,
} from "../../features/user/notificationSlice";
import { Spin, message } from "antd";

const Notification = ({
  handleNotificationNavigation,
  toggleNotification,
  notificationLoading,
  setNotificationLoading,
  setNotificationData,
  setIsNotifyOpen,
}) => {
  const [notifications, setNotificationss] = useState([]);

  const dispatch = useDispatch();
  const notify = useSelector((state) => state?.notifications).notifications;

  useEffect(() => {
    setInterval(() => {
      setNotificationss(notify);
    }, 2000);
  }, [notify]);

  const userDetails = useSelector((state) => state?.user);

  const handleReadMessageReq = async (id) => {
    const messageReadRes = await handleChangeNotificationStatus(id);
    const notificationRes = await handleFetchNotificationList(
      userDetails?.userInfo?.user_id
    );

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
        setNotificationss(notify);
      }

      const updatedNotifications = allNotifications?.map((notification) => {
        if (notification.id === id) {
          return { ...notification, status: 0 };
        }
        return notification;
      });

      dispatch(setNotifications(updatedNotifications));
    } else {
      message.warn(
        messageReadRes ? messageReadRes?.data?.message : "Something went wrong"
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNotificationLoading(false);
    }, 2000);
  }, [setNotificationLoading]);

  return (
    <div>
      <div
        className="overflow-y-auto"
      >
        {notificationLoading ? (
          <div className=" mt-6 h-8">
            <Spin tip="Loading">
              <div className="content" />
            </Spin>
          </div>
        ) : (
          !notifications?.length && (
              <div className="text-lg font-poppins text-center my-6">
                No Notification Yet
              </div>
          )
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
              setNotificationData(notification || {});
              setIsNotifyOpen(true);
            }}
            key={i}
            className="ease-in duration-200 py-3 px-3 cursor-pointer hover:bg-[#4a0f97]"
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
                <span className="text-white">{notification?.title}</span>
              </div>
              {/* Date & Time */}
              <div>
                <span
                  className="font-medium text-white mr-1.5"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {notification.notification_time?.slice(0, 16)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start py-2 border-b-[0.5px] border-gray-500">
              <div>
                <p className="text-sm text-white font-medium font-poppins mb-0">
                  {notification?.description}
                </p>
              </div>
              <div>
                <Icons.Read
                  className={` ${
                    !notification.status
                      ? "text-[#00ff00]"
                      : "text-gray-500"
                  }`}
                />
              </div>
            </div>
            {/* <hr onClick={(e) => e.stopPropagation()} /> */}
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import {
  handleFetchFollowUpNotification,
  handleReadNotification,
  handleFetchNotificationList,
  handleChangeNotificationStatus
} from "../../Components/services/notification";
import {
  addNotifications,
  setNotifications,
} from "../../features/user/notificationSlice";
import { Spin } from "antd";


const Notification = ({
  handleNotificationNavigation,
  toggleNotification,
  notificationLoading,
  setNotificationLoading,
  setNotificationData,
  setIsNotifyOpen
}) => {
  const [notifications, setNotificationss] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const notify = useSelector((state) => state?.notifications).notifications;
 
  
  useEffect(() => {
    setInterval(() => {
      setNotificationss(notify);
     
    }, 5000);
  }, [notify]);

  const userDetails = useSelector((state) => state?.user);

  const handleReadMessageReq = async (id) => {
    
    // const messageReadRes = await handleReadNotification(id);
    const messageReadRes = await handleChangeNotificationStatus(id);
    // console.log("messageReadRes", messageReadRes);

    // const notificationRes = await handleFetchFollowUpNotification(
    //   userDetails?.userInfo?.user_id
    // );
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
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNotificationLoading(false);
    }, 5000);
  }, [setNotificationLoading]);

  // const sendPropsNotification = (data) =>{
  //   setNotificationData(data);
  //   setIsNotifyOpen(true);
  // }
  const showNotifyModal = () => {
    setIsNotifyOpen(true);
  };


  return (
    <div>
      <div
        className="mt-7.5 overflow-y-auto "
        style={{
          maxHeight: "65vh",
        }}
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
                  {notification.notification_time?.slice(0, 16)}
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
              {/* <div>
                <div/> */}
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

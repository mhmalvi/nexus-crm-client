import React from "react";
import { useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";

const Notification = ({
  handleNotificationNavigation,
  setNotificationData,
  setIsNotifyOpen,
}) => {
  const notifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  function formatUTCDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime;
    const month = String(dateTime).padStart(2, "0");
    const day = String(dateTime).padStart(2, "0");
    const hours = String(dateTime).padStart(2, "0");
    const minutes = String(dateTime).padStart(2, "0");
    const formattedDateTime = `${year}`;
    return formattedDateTime;
  }
  return (
    <div
      className={`overflow-y-auto min-w-[20vw] rounded-md min-h-[40vh] bg-[#ffffff11] backdrop-blur-2xl shadow-md border  ${
        colorMode ? "border-slate-300" : "border-gray-800"
      }`}
    >
      {!notifications?.length && (
        <div
          className={`text-lg font-poppins text-center my-6 ${
            colorMode ? "text-slate-300" : "text-gray-800"
          }`}
        >
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
            setNotificationData(notification || {});
            setIsNotifyOpen(true);
          }}
          key={i}
          className={`py-3 px-3 cursor-pointer ${
            colorMode ? "hover:bg-gray-800" : "hover:bg-slate-300"
          } ease-in duration-100`}
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
              <span className={`${colorMode ? "text-white" : "text-gray-800"}`}>
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
                {formatUTCDateTime(notification.notification_time)}
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

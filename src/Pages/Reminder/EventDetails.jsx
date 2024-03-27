import { DatePicker, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Icons from "../../Components/Shared/Icons";
import {
  handleDeleteFollowUp,
  handleUpdateFollowUp,
} from "../../Components/services/reminder";
import "./reminder.css";
import {
  successNotification,
  warningNotification,
} from "../../Components/Shared/Toast";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD HH:mm";

const EventDetails = ({
  handleEventDetailsCancel,
  eventDetails,
  isEdit,
  setIsEdit,
  eventsData,
  setEventsData,
  setOpenEventDetails,
  synEvents,
  setSynEvents,

  fetchingReminders,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(priorityList[0]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [notifyTime, setNotifyTime] = useState("");
  const [updateEventData, setUpdateEventData] = useState({});
  const [isSaveDisable, setIsSaveDisable] = useState(false);

  useEffect(() => {
    setSelectedPriority(
      priorityList.find((priority) => priority?.key === eventDetails?.priority)
    );

    const eventDetailsData = { ...eventDetails };

    eventDetailsData.start =
      typeof eventDetails?.start === "string"
        ? new Date(`${eventDetails?.start}`)
            ?.toISOString()
            .replace("T", " ")
            .slice(0, 16)
        : eventDetails.start?.toISOString().replace("T", " ").slice(0, 16);

    eventDetailsData.end =
      typeof eventDetails?.end === "string"
        ? new Date(`${eventDetails?.end}`)
            ?.toISOString()
            .replace("T", " ")
            .slice(0, 16)
        : eventDetails.end?.toISOString().replace("T", " ").slice(0, 16);

    setUpdateEventData(eventDetailsData);
  }, [eventDetails]);

  const handleEventDetailsChange = (e) => {
    const updatedValue = { ...updateEventData };
    updatedValue[e.target.id] = e.target.value;
    setUpdateEventData(updatedValue);
  };

  function convertDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  const handleDateTimeChange = (_, dateTimeString) => {
    const eventData = { ...updateEventData };

    eventData.start = convertDateString(dateTimeString[0]);
    eventData.end = convertDateString(dateTimeString[1]);

    setUpdateEventData(eventData);
    setStartDateTime(eventData?.start);
    setEndDateTime(eventData?.end);
  };

  const handleReminderDateTimeChange = (_, dateTimeString) => {
    const eventData = { ...updateEventData };
    eventData.notification_time = convertDateString(dateTimeString);

    setUpdateEventData(eventData);
    setNotifyTime(eventData?.notification_time);
  };
  const handleUpdateFollowUpReq = async () => {
    setIsSaveDisable(true);
    const requestData = { ...updateEventData };

    requestData.start = startDateTime ? startDateTime : `${eventDetails.start}`;
    requestData.end = endDateTime ? endDateTime : `${eventDetails.end}`;
    requestData.notification_time = notifyTime
      ? notifyTime
      : `${eventDetails.notification_time}`;

    requestData.status = 1;
    requestData.user_id = eventDetails.user_id;
    const updateFollowUpRes = await handleUpdateFollowUp(requestData);
    setIsSaveDisable(false);
    if (updateFollowUpRes?.status === 201) {
      successNotification("Reminder updated successfully.");
      setIsSaveDisable(false);
      setIsEdit(false);
      fetchingReminders();

      const restFllowUpEvents = eventsData?.filter(
        (envent) => envent.id !== eventDetails?.id
      );

      setStartDateTime("");
      setEndDateTime("");
      setNotifyTime("");

      setOpenEventDetails(false);
      setEventsData([...restFllowUpEvents, updateFollowUpRes?.data]);
    } else {
      setIsSaveDisable(false);
      warningNotification(
        updateFollowUpRes
          ? updateFollowUpRes?.data?.message
          : "Something went wrong with update."
      );
    }
  };
  const handleDeleteFollowUpReq = async (id) => {
    const deleteResp = await handleDeleteFollowUp(id);

    if (deleteResp?.status === 201) {
      successNotification("Event has been completed.");
      setSynEvents(!synEvents);
      setOpenEventDetails(false);
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } else {
      warningNotification(
        deleteResp?.message || "Error in deleting the event."
      );
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex justify-start gap-4 items-center pb-4 w-full">
        <div className="flex items-center">
          {isEdit ? (
            <input
              type="text"
              name="title"
              id="title"
              className="outline-none bg-transparent border border-slate-300 px-3 py-0.5 rounded-md mr-2 shadow-sm"
              value={updateEventData?.title}
              onChange={handleEventDetailsChange}
            />
          ) : eventDetails?.status ? (
            <h1 className="text-lg font-semibold !text-slate-300">
              {eventDetails?.title}
            </h1>
          ) : (
            <h1 className="text-lg font-semibold !text-slate-300">
              {eventDetails?.title}
            </h1>
          )}
          <div className="text-lg font-semibold !text-slate-300">-Details</div>
        </div>

        <div>
          <Tooltip title="If you have completed the Task">
            <Icons.Correct
              className="w-6 ml-4 text-green-600 hover:text-green-500 cursor-pointer transition-colors delay-200 duration-200"
              onClick={() => handleDeleteFollowUpReq(eventDetails?.id)}
            />
          </Tooltip>
        </div>

        <div>
          <Icons.Edit
            className="hover:text-brand-color cursor-pointer transition-colors delay-200 duration-200 "
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>
      </div>
      <hr className="border-brand-color" />
      <div className="mt-4 flex flex-col gap-4 justify-start items-start">
        {isEdit ? (
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Set Task Start Time:
              </h2>
              <div className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full">
                <RangePicker
                  showTime
                  bordered={false}
                  onChange={handleDateTimeChange}
                  format={dateFormat}
                  separator={null}
                  className="!w-full"
                />
              </div>
            </div>

            {/* for notification */}
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Set Reminder Time:
              </h2>
              <div className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full">
                <DatePicker
                  showTime
                  bordered={false}
                  onChange={handleReminderDateTimeChange}
                  format={dateFormat}
                  separator={null}
                  className="!w-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Task Start Time:
              </h2>
              <div className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full">
                {new Date(eventDetails?.start)
                  ?.toString()
                  .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}{" "}
                -{" "}
                {new Date(eventDetails?.end)
                  ?.toString()
                  .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}
              </div>
            </div>
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Reminder Time:
              </h2>
              <div className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full">
                {new Date(eventDetails?.notification_time)
                  ?.toString()
                  .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}{" "}
              </div>
            </div>
          </>
        )}
        <div className="text-base font-light w-full">
          {isEdit ? (
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Task Description:
              </h2>
              <textarea
                className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full"
                rows={1}
                // cols={110}
                id="description"
                onChange={handleEventDetailsChange}
                value={updateEventData?.description}
              />
            </div>
          ) : (
            <div className="flex items-center w-full gap-4">
              <h2 className="m-0 p-0 text-base font-bold text-slate-300 w-1/4">
                Task Description:
              </h2>
              <div className="rounded-md bg-slate-300 text-gray-800 px-4 py-2 w-full">
                {updateEventData?.description}
              </div>
            </div>
          )}
        </div>
        {isEdit ? (
          <div className="flex justify-end">
            <div
              onClick={handleEventDetailsCancel}
              className="bg-red-600 font-semibold shadow rounded-md text-white px-5 py-1.5 text-center cursor-pointer"
            >
              Cancel
            </div>

            {!isSaveDisable ? (
              <button
                className="bg-brand-color font-semibold shadow rounded-md text-slate-300 px-5 py-1.5 ml-4 text-center cursor-pointer"
                onClick={handleUpdateFollowUpReq}
              >
                Save
              </button>
            ) : (
              <button className="bg-brand-color font-semibold shadow rounded-md text-slate-300 px-5 py-1.5 ml-4 text-center cursor-pointer">
                Saving...
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EventDetails;

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

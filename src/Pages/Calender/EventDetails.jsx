import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Dropdown, Menu, Space, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import Icons from "../../Components/Shared/Icons";
import {
  handleDeleteFollowUp,
  handleUpdateFollowUp,
} from "../../Components/services/reminder";

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
}) => {
  const [selectedPriority, setSelectedPriority] = useState(priorityList[0]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [notifyTime, setNotifyTime] = useState("");
  const [updateEventData, setUpdateEventData] = useState({});
  const [isSaveDisable, setIsSaveDisable] = useState(false);

  console.log("eventDetails", eventDetails);
  console.log("updateEventData", updateEventData);

  useEffect(() => {
    setSelectedPriority(
      priorityList.find((priority) => priority?.key === eventDetails?.priority)
    );
    console.log("eventDetails", eventDetails);

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

    // console.log("eventDetailsData", eventDetailsData);

    setUpdateEventData(eventDetailsData);
  }, [eventDetails]);

  const handlePriorityChange = (selected) => {
    const data = { ...updateEventData };
    data.priority = selected?.key;
    setUpdateEventData(data);
    setSelectedPriority(selected);
  };

  const handleDateTimeChange = (_, dateTimeString) => {
    const eventData = { ...updateEventData };

    eventData.start = dateTimeString[0];
    eventData.end = dateTimeString[1];

    setUpdateEventData(eventData);
    setStartDateTime(eventData?.start);
    setEndDateTime(eventData?.end);
  };
  console.log("zeor data", startDateTime);
  console.log("same data:", updateEventData.start);
  console.log("but data: ", eventDetails.start);

  const handleReminderDateTimeChange = (_, dateTimeString) => {
    console.log("notify update: ", dateTimeString);

    const eventData = { ...updateEventData };
    eventData.notification_time = dateTimeString;

    setUpdateEventData(eventData);
    setNotifyTime(eventData?.notification_time);
  };

  const handleEventDetailsChange = (e) => {
    const updatedValue = { ...updateEventData };
    updatedValue[e.target.id] = e.target.value;
    setUpdateEventData(updatedValue);
  };

  // function convertDateString(dateString) {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = "20";
  //   const seconds = "00";

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }
  function convertDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleUpdateFollowUpReq = async () => {
    const requestData = { ...updateEventData };

    requestData.start = startDateTime
      ? startDateTime
      : convertDateString(`${eventDetails.start}`);
    requestData.end = endDateTime
      ? endDateTime
      : convertDateString(`${eventDetails.end}`);
    requestData.notification_time = notifyTime
      ? notifyTime
      : `${eventDetails.notification_time}`;

    requestData.status = 1;

    console.log("ok: ", requestData);

    const updateFollowUpRes = await handleUpdateFollowUp(
      requestData,
      eventDetails?.id
    );

    console.log("updateFollowUpRes", updateFollowUpRes);

    if (updateFollowUpRes?.status === 201) {
      message.success("Reminder Updated Successfully");
      setIsEdit(false);

      const restFllowUpEvents = eventsData?.filter(
        (envent) => envent.id !== eventDetails?.id
      );

      setStartDateTime("");
      setEndDateTime("");
      setNotifyTime("");

      setOpenEventDetails(false);
      setEventsData([...restFllowUpEvents, updateFollowUpRes?.data]);
      setIsSaveDisable(false);
    } else {
      setIsSaveDisable(false);
    }
    // window.location.reload();
  };

  console.log("eventDetails", eventDetails);

  const menu = (
    <Menu defaultSelectedKeys={[1]}>
      {priorityList?.map((priority) => (
        <Menu.Item
          key={priority?.key}
          onClick={() => handlePriorityChange(priority)}
        >
          <div className="flex items-center">
            <Icons.Flag className={`w-4 h-4 mr-2 ${priority?.className}`} />
            <div>{priority?.lable}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleDeleteFollowUpReq = async (id) => {
    console.log("id", id);

    const deleteResp = await handleDeleteFollowUp(id);

    if (deleteResp?.status === 201) {
      message.success("Event has been completed");
      setSynEvents(!synEvents);
      setOpenEventDetails(false);
    }
  };

  return (
    <div className="px-10 py-4 font-poppins">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl list-item list-disc font-semibold py-6">
            <div className="flex items-center">
              {isEdit ? (
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="outline-none bg-gray-100 px-3 py-0.5 rounded-full mr-2 shadow-sm"
                  value={updateEventData?.title}
                  onChange={handleEventDetailsChange}
                />
              ) : eventDetails?.status ? (
                <div>{eventDetails?.title}</div>
              ) : (
                <del>{eventDetails?.title}</del>
              )}
              <div>-Details</div>
            </div>
          </div>
          <div>
            {isEdit ? (
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                className="cursor-pointer ml-4"
              >
                <Space>
                  <div className="flex items-center">
                    <Icons.Flag
                      className={`w-4 h-4 mr-2 ${selectedPriority?.className}`}
                    />
                    <div className="whitespace-nowrap w-16">
                      {selectedPriority?.lable}
                    </div>
                  </div>
                  <DownOutlined />
                </Space>
              </Dropdown>
            ) : (
              <div className="flex items-center ml-4 px-2.5 py-0.5 border bg-slate-200 rounded-full shadow-sm">
                <div>
                  <Icons.Flag
                    className={`w-3.5 ${
                      priorityList.find(
                        (priority) => priority.key === eventDetails.priority
                      )?.className
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold ml-1.5">
                  {
                    priorityList?.find(
                      (priority) => priority.key === eventDetails?.priority
                    ).lable
                  }
                </div>
              </div>
            )}
          </div>
          <div>
            <Tooltip title="If you have completed the Task">
              <Icons.Correct
                className="w-6 ml-4 text-green-600 hover:text-green-500 cursor-pointer transition-colors delay-200 duration-200"
                onClick={() => handleDeleteFollowUpReq(eventDetails?.id)}
              />
            </Tooltip>
          </div>
        </div>
        <div>
          <Icons.Edit
            className="hover:text-brand-color cursor-pointer transition-colors delay-200 duration-200"
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start">
        {isEdit ? (
          <div className="">
            <h2 className="mt-6 text-[18px] text-[bold]">
              Set Task Start Time:
            </h2>
            <div className="flex items-center">
              <span>
                {startDateTime
                  ? new Date(startDateTime)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")
                  : (eventDetails?.start)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}
              </span>
              <span className="mx-2">-</span>
              <span>
                {endDateTime
                  ? new Date(endDateTime)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")
                  : (eventDetails?.end)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}
              </span>
              <RangePicker
                showTime
                bordered={false}
                onChange={handleDateTimeChange}
                format={dateFormat}
                separator={null}
              />
            </div>
            {/* for notification */}

            <h2 className="mt-6 text-[18px] text-[bold]">Set Reminder Time:</h2>
            <div className="flex items-center">
              <span>
                {notifyTime
                  ? new Date(notifyTime)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")
                  : (eventDetails?.notification_time)
                      .toString()
                      .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}
              </span>
              <DatePicker
                showTime
                bordered={false}
                onChange={handleReminderDateTimeChange}
                format={dateFormat}
                separator={null}
                // value={}
              />
            </div>
          </div>
        ) : (
          <>
            <h2 className="mt-6 text-[18px] text-[bold]">Task Start Time:</h2>
            <div className="float-left px-4 py-0.5 bg-home-color/20 rounded-full shadow-sm">
              {new Date(eventDetails?.start)
                ?.toString()
                .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}{" "}
              -{" "}
              {new Date(eventDetails?.end)
                ?.toString()
                .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}
            </div>
            <h2 className="mt-6 text-[18px] text-[bold]">Reminder Time:</h2>
            <div className="float-left px-4 py-0.5 bg-home-color/20 rounded-full shadow-sm">
              {new Date(eventDetails?.notification_time)
                ?.toString()
                .replace(":00 GMT+0600 (Bangladesh Standard Time)", "")}{" "}
            </div>
          </>
        )}
        <div className="text-base font-light my-8">
          {isEdit ? (
            <textarea
              className="w-[42vw] bg-gray-100 outline-none p-2 rounded-xl shadow-sm"
              rows={3}
              // cols={110}
              id="description"
              onChange={handleEventDetailsChange}
              value={updateEventData?.description}
            />
          ) : (
            <div>{updateEventData?.description}</div>
          )}
        </div>
        {isEdit ? (
          <div className="flex justify-end">
            <div
              onClick={handleEventDetailsCancel}
              className="bg-red-600 font-semibold shadow rounded-full text-white px-5 py-1.5 text-center cursor-pointer"
            >
              Cancel
            </div>

            {!isSaveDisable ? (
              <button
                className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer"
                onClick={handleUpdateFollowUpReq}
              >
                Save
              </button>
            ) : (
              <button className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer">
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

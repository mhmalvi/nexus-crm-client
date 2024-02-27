import { DeleteOutlined } from "@ant-design/icons";
import { Popover, TimePicker, message, DatePicker } from "antd";

import lazyImage from "../../assets/Images/lazy.png";
import React, { useState, useEffect } from "react";
import {
  handleAddFollowUp,
  handleDeleteFollowUp,
  handleFetchFollowUp,
  handleFetchReminders,
} from "../../Components/services/reminder";
import dayjs from "dayjs";

const DayDetails = ({
  handleOpenDayDetailsCancel,
  selectedEventTime,
  setSelectedEventTime,
  eventDetails,
  eventsData,
  setEventsData,
  userDetails,
  fetchingReminders,
  setTime,
}) => {
  const [currentDayEvents, setCurrentDayEvents] = useState([]);
  const [taskDetails, setTaskDetails] = useState(initialData);
  const [notifyDate, setNotiFyDate] = useState("");
  // const [rmTime, setRmTime] = useState("");
  // const [rmDate, setRmDate] = useState(null);
  // const [rmDateTime, setRmDateTime] = useState(null);
  // const [endTime, setEndTime] = useState("");
  const [isSaveDisable, setIsSaveDisable] = useState(false);

  // error handling
  const [titleError, setTitleError] = useState("");
  const [endError, setEndError] = useState("");
  const [startError, setStartError] = useState("");
  const [notifyError, setNotifyError] = useState("");

  useEffect(() => {
    setCurrentDayEvents(
      eventsData?.filter(
        (event) =>
          event?.start?.toLocaleDateString() ===
            selectedEventTime?.start?.toLocaleDateString() ||
          event?.end?.toLocaleDateString() ===
            selectedEventTime?.end?.toLocaleDateString()
      )
    );
  }, [selectedEventTime, eventDetails, eventsData, setEventsData]);

  // const onStartTimeChange = (time, timeString) => {
  //   setTime(timeString);
  //   const data = { ...taskDetails };

  //   const startToDateString = (selectedEventTime?.start).toLocaleDateString();

  //   data.start =
  //     startToDateString?.split("/")[2] +
  //     "-" +
  //     startToDateString?.split("/")[1] +
  //     "-" +
  //     startToDateString?.split("/")[0] +
  //     " " +
  //     timeString;
  //   console.log(data.start);
  //   setTaskDetails(data);
  // };

  // const onEndTimeChange = (time, timeString) => {
  //   // setEndTime(timeString);
  //   const data = { ...taskDetails };
  //   const endToDateString = (selectedEventTime?.end).toLocaleDateString();
  //   data.end =
  //     endToDateString?.split("/")[2] +
  //     "-" +
  //     endToDateString?.split("/")[1] +
  //     "-" +
  //     endToDateString?.split("/")[0] +
  //     " " +
  //     timeString;

  //   setTaskDetails(data);
  // };

  // const onReminderTimeChange = (value, dateString) => {
  //    // Store reminder date and time in state
  // };
  const onStartTimeChange = (time, timeString) => {
    setTime(timeString);
    const data = { ...taskDetails };

    const start = selectedEventTime?.start;
    const formattedDateString =
      start.getFullYear() +
      "-" +
      ("0" + (start.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + start.getDate()).slice(-2);

    const formattedTimeString = timeString;

    const startDateTimeString = formattedDateString + " " + formattedTimeString;

    const startDate = new Date(startDateTimeString);

    // Convert the date to ISO format
    data.start = startDate.toISOString().slice(0, 19).replace("T", " ");

    console.log(data.start);
    setTaskDetails(data);
  };

  const onEndTimeChange = (time, timeString) => {
    // setEndTime(timeString);
    const data = { ...taskDetails };
    const end = selectedEventTime?.end;

    const formattedDateString =
      end.getFullYear() +
      "-" +
      ("0" + (end.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + end.getDate()).slice(-2);

    const formattedTimeString = timeString;

    const endDateTimeString = formattedDateString + " " + formattedTimeString;

    const endDate = new Date(endDateTimeString);

    // Convert the date to ISO format
    data.end = endDate.toISOString().slice(0, 19).replace("T", " ");
    console.log(taskDetails);
    setTaskDetails(data);
  };
  const onReminderDateChange = (value, dateString) => {
    const utcDate = new Date(dateString).toISOString();
    // setRmTime(dateString);
    // setRmDateTime(value);
    // setRmDate(value); // Store reminder date in state
    setNotiFyDate(utcDate);
    console.log(notifyDate);
  };

  const handleTextInputFieldChange = (e) => {
    const data = { ...taskDetails };
    data[e.target.id] = e.target.value;
    setTaskDetails(data);
  };
  const handleAddFollowUpReq = async () => {
    setIsSaveDisable(true);
    const isEmptyField = Object.values(taskDetails).some(
      (value) => value === ""
    );

    if (isEmptyField) {
      message.warning("Please fill in all the fields");
      setIsSaveDisable(false);
      return;
    }
    const addFollowUpRes = await handleAddFollowUp({
      ...taskDetails,
      user_id: userDetails?.id,
      notification_time: notifyDate,
    });

    if (addFollowUpRes?.status === 201) {
      message.success("Reminder Added Successfully");

      setIsSaveDisable(false);
      fetchingReminders();
      setTaskDetails(initialData);
      handleOpenDayDetailsCancel();
      setSelectedEventTime();
      setTime("Select Time");
      // setRmTime("Select Time");
      setEventsData([...eventsData, addFollowUpRes?.data]);
      handleOpenDayDetailsCancel();
    } else {
      setIsSaveDisable(false);
      if (addFollowUpRes.response.data.errors.end[0]) {
        setEndError(addFollowUpRes.response.data.errors.end[0]);
      }
      if (addFollowUpRes.response.data.errors.title[0]) {
        setTitleError(addFollowUpRes.response.data.errors.title[0]);
      }
      if (addFollowUpRes.response.data.errors.notification_time[0]) {
        setNotifyError(
          addFollowUpRes.response.data.errors.notification_time[0]
        );
      }
      if (addFollowUpRes.response.data.errors.start[0] !== "") {
        setStartError(addFollowUpRes.response.data.errors.start[0]);
      }
    }
  };

  const deleteReminder = async (fid) => {
    const res = await handleDeleteFollowUp(fid);
    if (res?.status === 201) {
      message.success(res?.message || "Successfully deleted");
      const featFollowUp = await handleFetchFollowUp(userDetails?.user_id);
      featFollowUp?.data?.forEach((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
      });
      setEventsData(featFollowUp?.data);
    } else {
      message.error(res?.message);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold ">
        <span>Selected Date: </span>
        {Math.ceil(
          (new Date(selectedEventTime?.end).getTime() -
            new Date(selectedEventTime?.start).getTime()) /
            (1000 * 3600 * 24)
        ) === 0 ? (
          <span className="text-brand-color">
            {new Date(selectedEventTime?.start).toDateString()}
          </span>
        ) : (
          <span className="text-brand-color">
            {new Date(selectedEventTime?.start).toDateString()} -{" "}
            {new Date(selectedEventTime?.end).toDateString()}
          </span>
        )}
        <br />
      </div>
      <hr className="border-brand-color" />
      <div className="flex gap-4">
        <div className="w-full flex flex-col border-r border-brand-color">
          <div className="text-lg font-semibold">Tasks For Today</div>
          {currentDayEvents?.length ? (
            <div>
              {currentDayEvents?.map((event, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ul className="list-disc">
                      <li>
                        <div className="text-base font-semibold">
                          {event.title}
                        </div>

                        {event.start?.toLocaleString() !==
                        event.end?.toLocaleString() ? (
                          <>
                            <div>{event.start?.toLocaleString()}</div>
                            <div>{event.end?.toLocaleString()}</div>
                          </>
                        ) : (
                          <div>{event.start?.toLocaleString()}</div>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Popover content={"Remove"}>
                      <DeleteOutlined
                        className="cursor-pointer"
                        onClick={() => {
                          deleteReminder(event?.id);
                        }}
                      />
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <img src={lazyImage} className="w-1/2" alt="" />
                <div className="text-lg font-semibold mt-4 mb-2">
                  Woohoo, No task for today
                </div>
                <div className="text-sm">
                  Tasks and Reminders that are scheduled for Today will appear
                  here.
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <div className="flex flex-col w-full">
                <div className="text-base font-semibold">Enter Task Title:</div>
                <div className="flex items-center">
                  <input
                    required
                    className="outline-none !bg-transparent placeholder:!text-slate-300 w-full rounded-md"
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    id="title"
                    value={taskDetails?.title}
                    onChange={handleTextInputFieldChange}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full ">
                <div className="text-base font-semibold">
                  Enter Task Description:
                </div>
                <input
                  required
                  className="outline-none !bg-transparent placeholder:!text-slate-300 w-full rounded-md"
                  type="text"
                  name="description"
                  placeholder="Task Description"
                  id="description"
                  value={taskDetails?.description}
                  onChange={handleTextInputFieldChange}
                />
              </div>

              <div className="w-full">
                <div className="text-base font-semibold">
                  Select Start Time:
                </div>
                <div className="border-b flex items-center justify-between">
                  <TimePicker
                    placeholder="Select Start Time"
                    format="HH:mm"
                    bordered={false}
                    onChange={onStartTimeChange}
                    className="w-full timePickerInput"
                    placement="bottomRight"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="text-base font-semibold">Select End Time:</div>
                <div className="border-b flex items-center justify-between">
                  <TimePicker
                    // defaultValue={dayjs().set("hour", 0).set("minute", 0)}
                    format="HH:mm"
                    bordered={false}
                    onChange={onEndTimeChange}
                    className="w-full timePickerInput"
                    placeholder="Select End Time"
                    placement="bottomRight"
                  />
                </div>
              </div>

              {/* <div className="w-full h-full">
                <div className="text-base font-semibold">
                  Set Reminder Time:
                </div>
                <div className="w-full border-b flex items-center justify-between">
                  <TimePicker
                    format={format}
                    defaultValue={dayjs().set("hour", 0).set("minute", 0)}
                    bordered={false}
                    onChange={onReminderTimeChange}
                    className="w-full timePickerInput"
                    placement="bottomRight"
                  />
                </div>
              </div> */}

              <div className="w-full h-full">
                <div className="text-base font-semibold">
                  Set Reminder Date & Time:
                </div>
                <div className="w-full border-b flex items-center justify-between">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    onChange={onReminderDateChange}
                    className="w-full datePicker"
                    placeholder="Select Reminder Date and Time"
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div
                  onClick={handleOpenDayDetailsCancel}
                  className="bg-red-600 font-semibold shadow rounded-md text-white px-5 py-1.5 text-center cursor-pointer"
                >
                  Cancel
                </div>
                {!isSaveDisable ? (
                  <button
                    className="bg-brand-color font-semibold shadow rounded-md text-slate-300 px-5 py-1.5 ml-4 text-center cursor-pointer"
                    onClick={handleAddFollowUpReq}
                  >
                    Save
                  </button>
                ) : (
                  <button className="bg-black font-semibold shadow rounded-md text-white px-5 py-1.5 ml-4 text-center cursor-pointer">
                    Saving...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetails;

const initialData = {
  title: "",
  start: "",
  end: "",
  description: "",
  priority: 1,
};

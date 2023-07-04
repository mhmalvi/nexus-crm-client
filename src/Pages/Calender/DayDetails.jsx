import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Popover, Space, TimePicker, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  handleAddFollowUp,
  handleDeleteFollowUp,
  handleFetchFollowUp,
} from "../../Components/services/reminder";
import Icons from "../../Components/Shared/Icons";
import lazyImage from "../../assets/Images/lazy.png";

const DayDetails = ({
  handleOpenDayDetailsCancel,
  selectedEventTime,
  setSelectedEventTime,
  eventDetails,
  eventsData,
  setEventsData,
  userDetails,
  time,
  setTime,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(priorityList[0]);
  const [currentDayEvents, setCurrentDayEvents] = useState([]);
  const [taskDetails, setTaskDetails] = useState(initialData);
  const [notifyDate, setNotiFyDate] = useState("");
  const [rmTime, setRmtime] = useState("");
  const [isSaveDisable, setIsSaveDisable] = useState(false);
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

  

  const onTimeChange = (time, timeString) => {
    setTime(timeString);
    const data = { ...taskDetails };

    const startToDateString = (selectedEventTime?.start).toLocaleDateString();
    const endToDateString = (selectedEventTime?.end).toLocaleDateString();

    data.start =
      startToDateString?.split("/")[2] +
      "-" +
      startToDateString?.split("/")[0] +
      "-" +
      startToDateString?.split("/")[1] +
      " " +
      timeString;
    // minuse 1 houre from start australia
    // let frms = data?.start.split(" ");
    // let getfs = String(frms[0]).split("-");
    // getfs[2] = String(parseInt(getfs[2] - 1));
    // let newgetfs = String(getfs.join("-"));
    // frms[0] = newgetfs;
    // let newfrms = String(frms.join(" "));
    // data.start = newfrms;
    // end it
    data.end =
      endToDateString?.split("/")[2] +
      "-" +
      endToDateString?.split("/")[0] +
      "-" +
      endToDateString?.split("/")[1] +
      " " +
      timeString;
    // minuse 1 houre from end fro australia
    // let frme = data?.end.split(" ");
    // let getfe = String(frme[0]).split("-");
    // getfe[2] = String(parseInt(getfe[2] - 1));
    // let newgetfe = String(getfe.join("-"));
    // frme[0] = newgetfe;
    // let newfrme = String(frme.join(" "));
    // data.end = newfrme;
    // end it
    // } else {
    //   data.start =
    //     startToDateString?.split("/")[2] +
    //     "-" +
    //     startToDateString?.split("/")[0] +
    //     "-" +
    //     startToDateString?.split("/")[1] +
    //     " " +
    //     timeString;
    //   data.end =
    //     endToDateString?.split("/")[2] +
    //     "-" +
    //     endToDateString?.split("/")[0] +
    //     "-" +
    //     endToDateString?.split("/")[1] +
    //     " " +
    //     timeString;
    // }

    setTaskDetails(data);
  };

  const onRemiderTimeChange = (time, timeString) => {
    setRmtime(timeString);
    const DateString = (selectedEventTime?.start).toLocaleDateString();
    const rmDate =
      DateString?.split("/")[2] +
      "-" +
      DateString?.split("/")[0] +
      "-" +
      DateString?.split("/")[1] +
      " " +
      timeString;
    // minus 1 from rmDate for australia
    // let frm = rmDate.split(" ");
    // let getf = String(frm[0]).split("-");
    // getf[2] = String(parseInt(getf[2] - 1));
    // let newgetf = String(getf.join("-"));
    // frm[0] = newgetf;
    // let newfrm = String(frm.join(" "));
    // end it
    // setNotiFyDate(newfrm);
    // console.log("time : ", newfrm);
    // this is for bangladesh time when you want to change please comment out it an comment the others minus for australia block of code.
    setNotiFyDate(rmDate);
  };
 

  const handlePriorityChange = (selected) => {
    const data = { ...taskDetails };
    data.priority = selected?.key;
    setTaskDetails(data);
    setSelectedPriority(selected);
  };

  const handleTextInputFieldChange = (e) => {
    const data = { ...taskDetails };
    data[e.target.id] = e.target.value;
    setTaskDetails(data);
  };

  const handleAddFollowUpReq = async () => {
    setIsSaveDisable(true);
    const addFollowUpRes = await handleAddFollowUp({
      ...taskDetails,
      user_id: userDetails?.id,
      notification_time: notifyDate,
    });

    if (addFollowUpRes?.status === 201) {
      message.success("Reminder Added Successfully");
      setTaskDetails(initialData);
      handleOpenDayDetailsCancel();
      setSelectedEventTime();
      setTime("Select Time");
      setRmtime("Select Time");
      setEventsData([...eventsData, addFollowUpRes?.data]);
      handleOpenDayDetailsCancel();
      setIsSaveDisable(false);
    } else {
      setIsSaveDisable(false);
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

  return (
    <div className="py-10">
      <div className="text-lg font-semibold pb-10 w-11/12 mx-auto">
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
        {/* {new Date(selectedEventTime?.start)
          .toGMTString()
          ?.replace("00 GMT", "")}{" "}
        - {new Date(selectedEventTime?.end).toGMTString()} */}
      </div>

      <div className="w-11/12 mx-auto">
        <div className="flex gap-6 items-center mb-4">
          <div className="w-full">
            <div className="text-lg font-semibold">Enter Task Title:</div>
            <div className="flex items-center">
              <input
                required
                className="outline-none border-b-2 px-2 py-1 my-4 w-full"
                type="text"
                name="title"
                placeholder="Task Title"
                id="title"
                value={taskDetails?.title}
                onChange={handleTextInputFieldChange}
              />
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
            </div>
          </div>
          <div className="w-3/12">
            <div className="text-lg font-semibold">Select Time:</div>
            <div className="border-b-2 pt-1 my-4 flex items-center justify-between">
              <div>
                {time ? time : selectedEventTime?.start?.toLocaleTimeString()}
              </div>
              <TimePicker
                format="HH:mm"
                bordered={false}
                onChange={onTimeChange}
                // onOk={onTimeChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 w-full ">
            <div className=" flex-1">
              <div className="text-lg font-semibold">
                Enter Task Description:
              </div>
              <input
                required
                className="outline-none border-b-2 px-2 py-1 my-4 w-full"
                type="text"
                name="description"
                placeholder="Task Description"
                id="description"
                value={taskDetails?.description}
                onChange={handleTextInputFieldChange}
              />
            </div>
            <div className="w-4/12">
              <div className=" text-lg font-semibold">Set Reminder Time:</div>
              <div className="border-b-2 pt-1 my-4 flex items-center justify-between">
                <div>{rmTime || "Select Time"}</div>
                <TimePicker
                  format="HH:mm"
                  bordered={false}
                  onChange={onRemiderTimeChange}
                  // defaultValue={dayjs("00:00:00", "HH:mm:ss")}

                  // onOk={onTimeChange}
                />
                {/* <Input type="date"></Input> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div
            onClick={handleOpenDayDetailsCancel}
            className="bg-red-600 font-semibold shadow rounded-full text-white px-5 py-1.5 text-center cursor-pointer"
          >
            Cancel
          </div>
          {!isSaveDisable ? (
            <button
              className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer"
              onClick={handleAddFollowUpReq}
            >
              Save
            </button>
          ) : (
            <button className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer">
              Saving...
            </button>
          )}
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="text-lg font-semibold my-4">Tasks For Today</div>
        {currentDayEvents?.length ? (
          <div>
            {currentDayEvents?.map((event, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 mr-2 rounded-full ${
                      priorityList[event.priority - 1]
                    }`}
                  >
                    &nbsp;
                  </div>
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
    </div>
  );
};

export default DayDetails;

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

const initialData = {
  title: "",
  start: "",
  end: "",
  description: "",
  priority: 1,
};

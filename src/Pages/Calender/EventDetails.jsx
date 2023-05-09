import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Dropdown, Menu, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import Icons from "../../Components/Shared/Icons";
import { handleUpdateFollowUp } from "../../Components/services/reminder";

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
}) => {
  const [selectedPriority, setSelectedPriority] = useState(priorityList[0]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [updateEventData, setUpdateEventData] = useState({});

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
    console.log(dateTimeString);

    const eventData = { ...updateEventData };
    eventData.start = dateTimeString[0];
    eventData.end = dateTimeString[1];

    setUpdateEventData(eventData);
    setStartDateTime(dateTimeString[0]);
    setEndDateTime(dateTimeString[1]);
  };

  const handleEventDetailsChange = (e) => {
    const updatedValue = { ...updateEventData };
    updatedValue[e.target.id] = e.target.value;
    setUpdateEventData(updatedValue);
  };

  const handleUpdateFollowUpReq = async () => {
    const updateFollowUpRes = await handleUpdateFollowUp(
      updateEventData,
      eventDetails?.id
    );

    console.log("updateFollowUpRes", updateFollowUpRes);

    if (updateFollowUpRes?.status === 201) {
      message.success("Reminder Updated Successfully");

      const restFllowUpEvents = eventsData?.filter(
        (envent) => envent.id !== eventDetails?.id
      );

      setOpenEventDetails(false);
      setEventsData([...restFllowUpEvents, updateFollowUpRes?.data]);
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
              ) : (
                <div>{eventDetails?.title}</div>
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
        ) : (
          <div className="float-left px-4 py-0.5 bg-home-color/20 rounded-full shadow-sm">
            {new Date(eventDetails?.start)?.toDateString()} -{" "}
            {new Date(eventDetails?.end)?.toDateString()}
          </div>
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
            <button
              className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer"
              onClick={handleUpdateFollowUpReq}
            >
              Save
            </button>
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

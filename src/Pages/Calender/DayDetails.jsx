import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, TimePicker } from "antd";
import React, { useState } from "react";
import events from "./events";
import dayjs from "dayjs";

const DayDetails = ({ handleCancel }) => {
  const [time, setTime] = useState("Not Selected");
  const [selectedPriority, setselectedPriority] = useState(priorityList[0]);

  const onTimeChange = (time, timeString) => {
    console.log(time);
    console.log(timeString);
    setTime(timeString);
  };

  const handlePriorityChange = (selected) => {
    console.log(selected);
    setselectedPriority(selected);
  };

  console.log("events", events);

  const menu = (
    <Menu defaultSelectedKeys={[1]}>
      {priorityList?.map((priority) => (
        <Menu.Item
          key={priority?.key}
          onClick={() => handlePriorityChange(priority)}
        >
          <div className="flex items-center">
            <div className={`w-4 h-4 mr-2 rounded-full ${priority?.className}`}>
              &nbsp;
            </div>
            <div>{priority?.lable}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="py-10">
      <div>
        <div className="w-10/12 mx-auto flex gap-6 items-center mb-6">
          <div className="w-full">
            <div className="text-lg font-semibold">Enter Task:</div>
            <div className="flex items-center">
              <input
                className="outline-none border-b-2 px-2 py-1 my-4 w-full"
                type="text"
                name="Name"
                placeholder="Event Name"
                id="Name"
              />
              <Dropdown
                overlay={
                  menu
                  //   items,
                  //   selectable: true,
                  //   defaultSelectedKeys: ["3"],
                }
                trigger={["click"]}
                className="cursor-pointer ml-4"
              >
                <Space>
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 mr-2 rounded-full ${selectedPriority?.className}`}
                    >
                      &nbsp;
                    </div>
                    <div className="whitespace-nowrap">
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
              <div>{time}</div>
              <TimePicker
                use12Hours
                format="h:mm a"
                bordered={false}
                onChange={onTimeChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div
            onClick={handleCancel}
            className="bg-red-600 font-semibold shadow rounded-full text-white px-5 py-1.5 text-center cursor-pointer"
          >
            Cancel
          </div>
          <button
            //onClick={handleDeleteCategory}
            className="bg-black font-semibold shadow rounded-full text-white px-5 py-1.5 ml-4 text-center cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      <div>
        {events?.map((event) => (
          <div>
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
                  <div>{event.title}</div>
                  <div>{event.start}</div>
                  <div>{event.end}</div>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayDetails;

const priorityList = [
  {
    key: 1,
    lable: "Important",
    className: "bg-red-600",
  },
  {
    key: 2,
    lable: "Average",
    className: "bg-orange-600",
  },
  {
    key: 3,
    lable: "Low",
    className: "bg-violet-600",
  },
  {
    key: 4,
    lable: "Very Low",
    className: "bg-green-600",
  },
];

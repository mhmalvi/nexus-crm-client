import { DatePicker, message, Space, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Icons from "../../../Components/Shared/Icons";
import Replay from "./Reply";

const Conversation = () => {
  // const [activeSection, setActiveSection] = useState("day");
  const [dateTime, setDateTime] = useState("");
  const [fileList, setFileList] = useState([]);
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem("reminder"))
  );
  const [reminderMessage, setReminderMessage] = useState("");

  // const [monthPicker, setMonthPicker] = useState(false);
  // const [yearPicker, setYearPicker] = useState(false);
  let dayPickerDays = [];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []);

  useEffect(() => {
    if (reminders?.length)
      localStorage.setItem("reminder", JSON.stringify(reminders));
  }, [reminders]);

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

  // const dayMenu = (
  //   <Menu className="grid grid-cols-4 gap-2" items={dayPickerDays} />
  // );

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    newFileList = fileList.slice(-2);

    newFileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }

      return file;
    });
    setFileList(newFileList);
  };

  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleChange,
    multiple: true,
  };

  const onOk = (value) => {
    setDateTime(value._d.toString().slice(4, 21));
  };

  const handleAddReminder = () => {
    console.log(dateTime, reminderMessage);
    if (dateTime?.length && reminderMessage?.length) {
      if (reminders?.length) {
        setReminders([
          ...reminders,
          {
            lead: "12345",
            time: dateTime,
            message: reminderMessage,
          },
        ]);
      } else {
        setReminders([
          {
            lead: "12345",
            time: dateTime,
            message: reminderMessage,
          },
        ]);
      }
      setDateTime("");
      setReminderMessage("");
    } else {
      message.error("Add date, time and message");
    }
  };

  return (
    <div
      className="min-h-full px-6 border-r"
      // onClick={() => {
      //   setMonthPicker(false);
      //   setYearPicker(false);
      // }}
    >
      <div
        className="border py-3 px-7 mb-4"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="px-0.5">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
            Add Reminder
          </h1>
        </div>

        {/* --------------- Add Reminder Section ------------------ */}

        <Space
          className="border rounded-full text-base text-center px-1 py-1.5 bg-black text-white cursor-pointer font-poppins"
          direction="vertical"
          size={12}
        >
          <DatePicker
            className="date-time-picker"
            suffixIcon={dateTime ? dateTime : "Select Date and Time"}
            bordered={false}
            showTime
            onOk={onOk}
          />
        </Space>

        {/* <div className="w-44 flex justify-start items-center rounded-full bg-gray-100 mb-5">
          <Dropdown overlay={dayMenu} trigger={["click"]}>
            <div
              className={`px-3 py-2 text-xs leading-4 font-medium font-poppins ${
                activeSection === "day" ? "bg-black text-white" : "text-black"
              } rounded-full cursor-pointer`}
              onClick={() => {
                setActiveSection("day");
                setMonthPicker(false);
                setYearPicker(false);
              }}
            >
              <Space>Day</Space>
            </div>
          </Dropdown>
          <div
            className={`relative w-17 px-3 py-2 text-xs leading-4 font-light font-poppins ${
              activeSection === "month" ? "bg-black text-white" : "text-black"
            } rounded-full cursor-pointer mx-2`}
            onClick={(e) => {
              setActiveSection("month");
              setYearPicker(false);
              setMonthPicker(!monthPicker);
              e.stopPropagation();
            }}
          >
            <div className="absolute top-0.5 left-0 w-17 h-full flex justify-center items-center">
              <h1
                className={`${
                  activeSection === "month"
                    ? " bg-black text-white"
                    : "text-black"
                }`}
              >
                Month
              </h1>
            </div>
            <DatePicker
              suffixIcon=""
              className="custom-picker text-white"
              picker="month"
              open={monthPicker}
              bordered={false}
            />
          </div>
          <div
            className={`relative px-3 py-2 text-xs leading-4 font-light font-poppins ${
              activeSection === "year" ? "bg-black" : "text-black"
            } rounded-full cursor-pointer`}
            onClick={(e) => {
              setActiveSection("year");
              setMonthPicker(false);
              setYearPicker(!yearPicker);
              e.stopPropagation();
            }}
          >
            <div className="absolute top-0.5 -left-2.5 w-17 h-full flex justify-center items-center">
              <h1
                className={`${
                  activeSection === "year" ? " text-white" : "text-black"
                }`}
              >
                Year
              </h1>
            </div>
            <DatePicker
              suffixIcon=""
              className="text-white"
              picker="year"
              open={yearPicker}
              bordered={false}
            />
          </div>
        </div> */}

        {/* <div className="flex bg-gray-50">
          <h1
            className={`${
              activeSection === "time" ? " text-white" : "text-black"
            }`}
          >
            Time
          </h1>
          <TimePicker
            suffixIcon=""
            className="text-transparent outline-none border-none"
            onChange={onChange}
          />
        </div> */}

        <div className="border-b flex justify-between items-center pb-1 mt-12 pt-0.5">
          <input
            className="w-full font-poppins outline-none"
            type="text"
            placeholder="Write Start"
            name="reminder message"
            id="reminder_message"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-black text-white rounded-md font-poppins text-xs leading-5 font-medium ml-4"
            onClick={handleAddReminder}
          >
            Save
          </button>
        </div>
      </div>
      <div>
        {/* --------------- Conversion Section -------------- */}
        <div
          className="mt-5"
          style={{
            height: "450px",
          }}
        >
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
            Conversion
          </h1>
          {/* --------------- Messages --------------- */}
          <div className="h-96 relative mr-auto mb-2 border p-5 rounded-2xl font-poppins flex flex-col justify-between">
            <div className="overflow-y-scroll px-4">
              <div className="w-84 text-xs mb-2.5">
                <p className="rounded-md font-normal mb-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor
                  mollis leo proin turpis.
                </p>
                <div className="mt-1.5">
                  <span className="text-gray-400">10:15 pm</span>
                  <span className="text-gray-400 ml-2">02.08.22</span>
                </div>
              </div>
              <Replay />
              <Replay />
              <Replay />
              <Replay />
              <Replay />
              <div className="w-84 text-xs mb-2.5">
                <p className="rounded-md font-normal mb-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor
                  mollis leo proin turpis.
                </p>
                <div className="mt-1.5">
                  <span className="text-gray-400">10:15 pm</span>
                  <span className="text-gray-400 ml-2">02.08.22</span>
                </div>
              </div>
              <div ref={messagesEndRef}></div>
            </div>
            <div className="w-full flex justify-between items-center p-2.5 bg-gray-100 rounded-xl mt-2">
              <input
                className="w-full outline-none font-normal bg-gray-100 text-xs leading-5 font-poppins placeholder:text-black placeholder:text-opacity-25"
                placeholder="Write a massage"
                type="text"
                name=""
                id=""
              />
              <div className="ml-2 flex items-center">
                <Upload {...props} fileList={fileList}>
                  <Icons.Clip className="mr-2.5" />
                </Upload>
                <button className="px-2.5 py-0.5 font-poppins font-semibold text-xs leading-5 text-black border border-black rounded-md">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

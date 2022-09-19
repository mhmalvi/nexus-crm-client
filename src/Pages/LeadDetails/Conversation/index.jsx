import { DatePicker, Space, Upload } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import Icons from "../../../Components/Shared/Icons";
import Filter from "bad-words";
import axios from "axios";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Conversation = () => {
  const filter = new Filter();
  let dayPickerDays = [];
  // const messagesEndRef = useRef(null);

  const [dateTime, setDateTime] = useState("");
  const [fileList, setFileList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [checkNewMessage, setCheckNewMessage] = useState(false);

  // const [reminders, setReminders] = useState(
  //   JSON.parse(localStorage.getItem("reminder"))
  // );
  const [reminderMessage, setReminderMessage] = useState("");

  // const scrollToBottom = () => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(scrollToBottom, []);

  useEffect(() => {
    socket.emit("join_room", 123);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env?.REACT_APP_CHAT_SERVER_URL}/get-message/123`)
      .then(function (response) {
        setMessageList(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [checkNewMessage]);

  console.log("Hitting");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (!currentMessage && data) setCheckNewMessage(!checkNewMessage);
      setMessageList(() => [...messageList, data]);
    });
  }, [messageList]);

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: 123,
        sender_id: parseInt(localStorage.getItem("userId")),
        recever_id: parseInt(localStorage.getItem("receverId")),
        message: currentMessage,
        date_time: dayjs().$d.toString().slice(4, 21),
      };
      await socket.emit("send_message", messageData);
      setMessageList(() => [...messageList, messageData]);
      setCurrentMessage("");
    }
  };

  // const handleAddReminder = () => {
  //   console.log(dateTime, reminderMessage);
  //   if (dateTime?.length && reminderMessage?.length) {
  //     if (reminders?.length) {
  //       setReminders([
  //         ...reminders,
  //         {
  //           lead: "12345",
  //           time: dateTime,
  //           message: reminderMessage,
  //         },
  //       ]);
  //     } else {
  //       setReminders([
  //         {
  //           lead: "12345",
  //           time: dateTime,
  //           message: reminderMessage,
  //         },
  //       ]);
  //     }
  //     setDateTime("");
  //     setReminderMessage("");
  //   } else {
  //     message.error("Add date, time and message");
  //   }
  // };

  return (
    <div className="min-h-full px-6 border-r">
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
          className="w-40 border rounded-full text-base text-center py-1.5 bg-black text-white cursor-pointer font-poppins"
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
          <button className="px-3 py-1 bg-black text-white rounded-md font-poppins text-xs leading-5 font-medium ml-4">
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
          <form
            onSubmit={(e) => sendMessage(e)}
            className="h-100 relative mr-auto mb-2 border py-5 px-2 rounded-2xl font-poppins flex flex-col justify-between"
          >
            {/* <div className="overflow-y-scroll px-4">
              <div
                className="text-xs mb-2.5"
                style={{
                  maxWidth: "85%",
                }}
              >
                <p className="rounded-md font-normal mb-1">
                  Lorem ipsum dolor sit amet, consect adipiscing elit. Dolor
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
              <div
                className="text-xs mb-2.5"
                style={{
                  maxWidth: "85%",
                }}
              >
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
            </div> */}

            <ScrollToBottom className="message-container">
              {!messageList?.length && (
                <div className="text-2xl text-center mt-16">
                  No Conversation Yet
                </div>
              )}
              {messageList?.map((message, i) => (
                <div className="px-4" key={i}>
                  {parseInt(localStorage.getItem("userId")) ===
                  message.sender_id ? (
                    <>
                      <div
                        className="flex ml-auto justify-end mb-2.5"
                        style={{
                          maxWidth: "85%",
                        }}
                      >
                        <div className="text-xs">
                          <p className="rounded-md font-normal mb-1 text-sm">
                            {filter.clean(message?.message)}
                          </p>
                          <div className="float-right">
                            <span className="text-gray-400 text-xs">
                              {message.date_time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="text-xs mb-2.5"
                        style={{
                          maxWidth: "85%",
                        }}
                      >
                        <p className="rounded-md font-normal mb-0.5 text-sm">
                          {filter.clean(message?.message)}
                        </p>
                        <div>
                          <span className="text-gray-400 text-xs">
                            {message.date_time}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </ScrollToBottom>

            <div className="w-full flex justify-between items-center p-2.5 bg-gray-100 rounded-xl mt-2">
              <input
                className="w-full outline-none font-normal bg-gray-100 text-xs leading-5 font-poppins placeholder:text-black placeholder:text-opacity-25"
                placeholder="Write a massage"
                type="text"
                name=""
                id=""
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <div className="ml-2 flex items-center">
                <Upload {...props} fileList={fileList}>
                  <Icons.Clip className="mr-2.5" />
                </Upload>
                <button
                  className="px-2.5 py-0.5 font-poppins font-semibold text-xs leading-5 text-black border border-black rounded-md"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

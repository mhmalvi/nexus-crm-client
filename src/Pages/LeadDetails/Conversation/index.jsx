import { DatePicker, Space, Upload } from "antd";
import axios from "axios";
import Filter from "bad-words";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import Icons from "../../../Components/Shared/Icons";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import "antd/dist/antd.css";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Conversation = () => {
  const filter = new Filter();
  let dayPickerDays = [];

  const [dateTime, setDateTime] = useState("");
  const [fileList, setFileList] = useState([]);
  // To load current typing text
  const [currentMessage, setCurrentMessage] = useState("");
  // for storing all messages
  const [messageList, setMessageList] = useState([]);
  // This state is a type of flag to sync message in again according to needs
  const [sync, setSync] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [fileList, setFileList] = useState([]);

  useEffect(() => {
    socket.emit("join_room", 123);
  }, []);

  // useEffect(() => {
  //   socket.on("history", (messages) => {
  //     setMessageList(messages);
  //   });
  // }, [messageList]);

  useEffect(() => {
    axios
      .get(`${process.env?.REACT_APP_CHAT_SERVER_URL}/get-message/123`)
      .then(function (response) {
        setMessageList(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [sync]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(() => [...messageList, data]);
    });
  }, [messageList]);

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onOk = (value) => {
    setDateTime(value._d.toString().slice(4, 21));
  };

  // handeling send message to API
  const handleSendMessage = async (e) => {
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
      setSync(!sync);
    }
  };

  // To convert written text to lisk
  const linkify = (text) => {
    var urlRegex =
      // eslint-disable-next-line no-useless-escape
      /(\b(https ?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  };

  // For deleting message
  const handleDeleteMessage = (msgId) => {
    console.log(msgId);
    axios
      .get(`${process.env?.REACT_APP_CHAT_SERVER_URL}/delete-message/${msgId}`)
      .then(function (response) {
        if (response?.data === "Deleted") {
          setSync(!sync);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUploadFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      console.log(e.target.result);
      axios
        .post(
          `${process.env?.REACT_APP_CHAT_SERVER_URL}/message/uploadfile`,
          e.target.result
        )
        .then(function (response) {
          setMessageList(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

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
            enctype="multipart/form-data"
            onSubmit={(e) => handleSendMessage(e)}
            className="h-100 relative mr-auto mb-2 border py-5 px-2 rounded-2xl font-poppins flex flex-col justify-between"
          >
            <ScrollToBottom className="message-container">
              {!messageList?.length && (
                <div className="text-2xl text-center mt-16">
                  No Conversation Yet
                </div>
              )}
              {messageList?.map((message, i) => (
                <div className="px-4" key={i}>
                  {parseInt(localStorage.getItem("userId")) ===
                  message?.sender_id ? (
                    <>
                      <div
                        className="flex ml-auto justify-end mb-2.5"
                        style={{
                          maxWidth: "85%",
                        }}
                      >
                        <div className="text-xs">
                          {/* <p className="rounded-md font-normal mb-1 text-sm">
                            {filter.clean(message?.message)}
                          </p> */}
                          <div className="flex justify-between items-start">
                            <div
                              className="rounded-md font-normal mb-1 text-sm"
                              dangerouslySetInnerHTML={{
                                __html: linkify(filter.clean(message?.message)),
                              }}
                            />
                            <div
                              className="ml-3.5 text-sm font-semibold bg-gray-100 border p-0.5 cursor-pointer rounded-full flex items-center justify-center"
                              onClick={() => handleDeleteMessage(message?.id)}
                            >
                              <span>
                                <Icons.Cross className="w-2.5 h-2.5 text-red-500" />
                              </span>
                            </div>
                          </div>

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
                        <div
                          className="rounded-md font-normal mb-1 text-sm"
                          dangerouslySetInnerHTML={{
                            __html: linkify(filter.clean(message?.message)),
                          }}
                        />
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

            <div className="relative w-full flex justify-between items-center p-2.5 bg-gray-100 rounded-xl mt-2">
              <input
                className="w-full outline-none font-normal bg-gray-100 text-xs leading-5 font-poppins placeholder:text-black placeholder:text-opacity-25"
                placeholder="Write a massage"
                type="text"
                name=""
                id=""
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <div
                className="ml-2 flex items-center overflow-x-auto"
                style={{
                  minWidth: "100px",
                }}
              >
                {/* <Upload {...props} fileList={fileList}> */}
                {/* <Icons.Clip className="mr-2.5" /> */}
                {/* </Upload> */}

                <>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    className="flex items-center mr-2"
                  >
                    {/* <div className="flex items-center"> */}
                    {fileList.length >= 8 ? null : <Icons.Clip />}
                    {/* </div> */}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </>

                {/* <input
                  type="file"
                  name="file"
                  id=""
                  onChange={(e) => handleUploadFile(e)}
                /> */}

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

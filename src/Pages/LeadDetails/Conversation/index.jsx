import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Button,
  DatePicker,
  Space,
  Upload,
  Select,
  Cascader,
  message,
  Modal,
} from "antd";

import "antd/dist/antd.css";
// import axios from "axios";
// import dayjs from "dayjs";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import ScrollToBottom from "react-scroll-to-bottom";
// import Icons from "../../../Components/Shared/Icons";
// import { handleMessageAudio } from "../../../Components/Shared/utils/sounds";
import mailLogo from "../../../assets/Images/gmail.png";
import whatsappLogo from "../../../assets/Images/whatsapp.png";
import { handleLeadDetails } from "../../../Components/services/leads";
import { handleLeadMailUpload } from "../../../Components/services/utils";
import Comments from "./Comments";
import MailModal from "./MailModal";
import StatusShow from "./StatusShow";

// const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Conversation = ({ leadDetails, id }) => {
  // const dispatch = useDispatch();
  // const filter = new Filter();
  let dayPickerDays = [];

  const userDetails = useSelector((state) => state?.user);

  // const [fileList, setFileList] = useState([]);
  // const [selectedFile, setSelectedFile] = useState({});
  // Implemented mailing By Mahadi
  const [tData, setTData] = useState("");
  // const [ uploading, setUploading ] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [leadDtls, setLeadDtls] = useState({});
  const [openMailModal, setOpenMailModal] = useState(false);
  const params = useParams();

  const showMailModal = () => {
    setOpenMailModal(true);
  };
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log("fdatas: ", event?.target?.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }

  function handleSubmit() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("template", tData);
    fetch("https://crmleads.quadque.digital/api/lead/mail", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => console.log("success", result))
      .catch((error) => {
        console.log(error);
      });
  }
  const handleTdata = (value) => {
    setTData(value);
  };

  // Show comments from leadComments in leadDetails.

  useEffect(() => {
    (async () => {
      const lDtails = await handleLeadDetails(params?.id);
      if (lDtails) {
        setLeadDtls(lDtails);
      }
    })();
  }, [params?.id]);
  console.log("ldetails: ", leadDtls);

  //mailing implimentation end by mahadi
  // const handleUpload = (e) => {
  //   console.log("e: ", e?.file?.originFileObj);

  //   const formData = new FormData();
  //   formData.append("file", e?.file?.originFileObj);
  //   console.log("orgfile: ", formData);
  //   setSelectedFile(formData);
  //   // console.log(formData);

  // console.log("s: ", selectedFile);
  // fileList.forEach((file) => {
  //   formData.append("files[]", file);
  // });

  // setUploading(true);
  // // You can use any AJAX library you like
  // fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((res) => res.json())
  //   .then(() => {
  //     setFileList([]);
  //     message.success("upload successfully.");
  //   })
  //   .catch(() => {
  //     message.error("upload failed.");
  //   })
  //   .finally(() => {
  //     setUploading(false);
  //   });
  // };
  // console.log("selected file: ", selectedFile);
  // const handleSubmit = async (tdata) => {

  //   const data = {
  //     template: tdata,
  //     checklist: selectedFile,
  //   };
  //   const getMail = await handleLeadMailUpload(data);
  //   console.log(getMail);
  // };
  // const props = {
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([...fileList, file]);
  //     return false;
  //   },
  //   fileList,
  // };

  // const [dateTime, setDateTime] = useState("");
  // const [fileList, setFileList] = useState([]);
  // for storing all messages
  // const [messageList, setMessageList] = useState([]);
  // This state is a type of flag to sync message in again according to needs
  // const [sync, setSync] = useState(false);

  // const [reminderMessage, setReminderMessage] = useState("");

  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [previewTitle, setPreviewTitle] = useState("");

  // console.log("id", id);

  // useEffect(() => {
  //   socket.emit("join_room", id);
  // }, [id]);

  // useEffect(() => {
  // (async () => {
  //   const messages = await handlefetchMessages(
  //     userDetails?.userInfo?.user_id
  //   );
  //   dispatch(
  //     addMessages(
  //       messages?.filter(
  //         (element, index) =>
  //           messages.findIndex((obj) => obj.room === element.room) === index
  //       )
  //     )
  //   );
  // })();

  // For accessing roomwise messages
  // axios
  //   .get(`${process.env?.REACT_APP_CHAT_SERVER_URL}/get-message/${id}`)
  //   .then(function (response) {
  //     setMessageList(response?.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, [dispatch, id, sync, userDetails?.userInfo?.user_id]);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     if (data) {
  //       handleMessageAudio();
  //       setMessageList(() => [...messageList, data]);
  //       setSync(!sync);
  //     }
  //   });
  //   socket.on("updated_messages", (data) => {
  //     console.log("Message data", data);
  //     dispatch(
  //       addMessages(
  //         data?.filter(
  //           (element, index) =>
  //             data.findIndex((obj) => obj.room === element.room) === index
  //         )
  //       )
  //     );
  //   });
  // }, [dispatch, messageList, sync]);

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  // const onOk = (value) => {
  //   setDateTime(value._d.toString().slice(4, 24));
  // };

  // handeling send message to API
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (e.target[0]?.value !== "") {
  //     const messageData = {
  //       room: id,
  //       // sender_id: parseInt(localStorage.getItem("userId")),
  //       // sender_name: localStorage.getItem("username"),
  //       sender_id: userDetails?.userInfo?.user_id,
  //       sender_name:
  //         userDetails.userInfo.firstName + " " + userDetails.userInfo.lastName,
  //       recever_id: parseInt(localStorage.getItem("receverId")),
  //       recever_name: localStorage.getItem("reveicerName"),
  //       message: e.target[0]?.value,
  //       date_time: dayjs().$d.toString().slice(4, 21),
  //     };
  //     // await socket.emit("send_message", messageData);
  //     setMessageList(() => [...messageList, messageData]);
  //     document.getElementById("message").value = "";
  //     setSync(!sync);
  //   }
  // };

  // To convert written text to lisk
  // const messageConvertion = (text) => {
  //   // Checking filetype and display according to the type
  //   if (
  //     text.includes(".jpg") ||
  //     text.includes(".jpeg") ||
  //     text.includes(".png") ||
  //     text.includes(".tiff") ||
  //     text.includes(".webp") ||
  //     text.includes(".gif") ||
  //     text.includes(".bmp")
  //   ) {
  //     return (
  //       '<a style="text-decoration: underline; max-width:150px; height:auto;" rel="noreferrer" target="_black" href="' +
  //       `${process.env.REACT_APP_CHAT_SERVER_URL}/public/static/` +
  //       text +
  //       '">' +
  //       '<img style="max-width:200px; height:auto;" src="' +
  //       `${process.env.REACT_APP_CHAT_SERVER_URL}/public/static/` +
  //       text +
  //       '"/>' +
  //       "</a>"
  //     );
  //   } else if (
  //     text.includes(".mp4") ||
  //     text.includes(".mp4a") ||
  //     text.includes(".avc1") ||
  //     text.includes(".mov") ||
  //     text.includes(".wmv") ||
  //     text.includes(".avi") ||
  //     text.includes(".avchd") ||
  //     text.includes(".webm") ||
  //     text.includes(".mkv")
  //   ) {
  //     return (
  //       '<video width="250" controls> <source type="video/mp4" src="' +
  //       `${process.env.REACT_APP_CHAT_SERVER_URL}/public/static/` +
  //       text +
  //       '">' +
  //       "</video>"
  //     );
  //   } else if (
  //     text.includes(".txt") ||
  //     text.includes(".doc") ||
  //     text.includes(".pdf") ||
  //     text.includes(".svg") ||
  //     text.includes(".csv") ||
  //     text.includes(".excel") ||
  //     text.includes(".xlsx") ||
  //     text.includes(".xlx") ||
  //     text.includes(".ppt") ||
  //     text.includes(".pptx")
  //   ) {
  //     return (
  //       '<a style="text-decoration: underline; max-width:150px; height:auto;" rel="noreferrer" target="_black" href="' +
  //       `${process.env.REACT_APP_CHAT_SERVER_URL}/public/static/` +
  //       text +
  //       '">' +
  //       text +
  //       "</a>"
  //     );
  //   } else {
  //     var urlRegex =
  //       // eslint-disable-next-line no-useless-escape
  //       /(\b(https ?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  //     return text.replace(urlRegex, function (url) {
  //       return (
  //         '<a style="text-decoration: underline; max-width:150px; height:auto;" rel="noreferrer" target="_black" href="' +
  //         url +
  //         '">' +
  //         url +
  //         "</a>"
  //       );
  //     });
  //   }
  // };

  // For deleting message
  // const handleDeleteMessage = async (msgId) => {
  //   // await socket.emit("delete_message", msgId);
  //   setMessageList(messageList.filter((message) => message.id !== msgId));
  //   setSync(!sync);
  // };

  // const handleUploadFile = async (event) => {
  //   event.preventDefault();
  //   const url = `${process.env.REACT_APP_CHAT_SERVER_URL}/message/uploadfile`;
  //   const formData = new FormData();

  //   for (let i = 0; i < fileList.length; i++) {
  //     formData.append("files", fileList[i]);
  //   }
  //   formData.append("room", 123);
  //   formData.append("sender_id", parseInt(localStorage.getItem("userId")));
  //   formData.append("recever_id", parseInt(localStorage.getItem("receverId")));
  //   formData.append("date_time", dayjs().$d.toString().slice(4, 21));

  //   try {
  //     const result = await axios.post(url, formData);
  //     if (result?.data) {
  //       setSync(!sync);
  //       setFileList([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleAddReminder = () => {
  //   const reminderDetails = {
  //     user_id: 1,
  //     client_id: 2,
  //     lead_id: id,
  //     email: "",
  //     details: reminderMessage,
  //     trigg_time: dateTime,
  //     notification_type: "reminder",
  //     status: 0,
  //   };
  // handleSetReminder(reminderDetails);
  // };

  // const props = {
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([...fileList, file]);
  //     return false;
  //   },
  //   fileList,
  // };

  // console.log(
  //   "Number....",
  //   leadDetails?.leadDetails?.phone_number.replace("+", "")
  // );

  return (
    <div className="min-h-full px-6 border-r">
      {/* {userDetails?.userInfo?.role_id === 4 ||
      userDetails?.userInfo?.role_id === 5 ? (
        <div
          className="border py-3 px-7 mb-9 "
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
      {/* <div>
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
                placeholder="Write Message"
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
        </div>
      ) : null}  */}

      <div>
        {/* --------------- Conversation Section -------------- */}
        <div
          style={{
            height: "500px",
          }}
        >
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mb-5">
            Contact
          </h1>
          {/* --------------- Messages --------------- */}
          {/* <form
            encType="multipart/form-data"
            onSubmit={(e) => {
              fileList.length === 0
                ? handleSendMessage(e)
                : handleUploadFile(e);
            }}
            className=" relative mr-auto mb-2 border py-5 px-2 rounded-2xl font-poppins flex flex-col justify-between"
            style={{
              height: "480px",
            }}
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
                          <div className="flex justify-between items-start">
                            {message.delete_message === 1 ? (
                              <div className="bg-gray-200 py-0.5 px-2 rounded-full italic font-light w-44">
                                This message was deleted
                              </div>
                            ) : (
                              <div
                                className="inline-block rounded-md font-normal mb-1 text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: messageConvertion(
                                    filter?.clean(message?.message)
                                  ),
                                }}
                              />
                            )}
                            {message.delete_message === 0 && (
                              <div
                                className="ml-3.5 text-sm font-semibold bg-gray-100 border p-0.5 cursor-pointer rounded-full flex items-center justify-center"
                                onClick={() => handleDeleteMessage(message?.id)}
                              >
                                <span>
                                  <Icons.Cross className="w-2.5 h-2.5 text-red-500" />
                                </span>
                              </div>
                            )}
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
                        {message.delete_message === 1 ? (
                          <div className="bg-gray-200 py-0.5 px-2 rounded-full italic font-light w-44">
                            This message was deleted
                          </div>
                        ) : (
                          <div
                            className="rounded-md font-normal mb-1 text-sm"
                            dangerouslySetInnerHTML={{
                              __html: messageConvertion(
                                filter?.clean(message?.message)
                              ),
                            }}
                          />
                        )}
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

            {userDetails?.userInfo?.role_id !== 1 ||
            userDetails?.userInfo?.role_id !== 2 ? (
              <div className="relative w-full flex justify-between items-center p-2.5 bg-gray-100 rounded-xl mt-2">
                <input
                  className="w-full outline-none font-normal bg-gray-100 text-xs leading-5 font-poppins placeholder:text-black placeholder:text-opacity-25"
                  placeholder="Write a massage"
                  type="text"
                  name=""
                  id="message"
                />
                <div className="ml-2 flex items-center">
                  <Upload
                    {...props}
                    defaultFileList={[...fileList]}
                    listType="text"
                    fileList={fileList}
                    className="mr-2.5 mt-0.5"
                  >
                    <Icons.Clip />
                  </Upload>

                  <button
                    className="px-2.5 py-0.5 font-poppins font-semibold text-xs leading-5 text-black border border-black rounded-md"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : null}
          </form> */}

          <div>
            {userDetails?.userInfo?.role_id !== 6 ? (
              <button className="px-4 py-2 bg-white rounded-full shadow-md w-56">
                <a
                  className="flex items-center "
                  href={`https://api.whatsapp.com/send?phone=${leadDetails?.leadDetails?.phone_number.replace(
                    "+",
                    ""
                  )}`}
                  // href="https://wa.me/8801770347582"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="w-6" src={whatsappLogo} alt="" />
                  <span className="text-black font-semibold text-base ml-3">
                    Open in Whatsapp
                  </span>
                </a>
              </button>
            ) : null}
          </div>

          {/* <div className=" mt-6">
            {userDetails?.userInfo?.role_id !== 6 ? (
              <a
                // href={`mailto:${leadDetails?.leadDetails?.student_email}?subject=Subject&body=message%20goes%20here`}
                // href={`https://mail.google.com/mail/?view=cm&fs=1&to=${leadDetails?.leadDetails?.student_email}&su=SUBJECT&body=BODY`}
                href={`mailto:${leadDetails?.leadDetails?.student_email}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="px-4 py-2 bg-white rounded-full shadow-md flex items-center w-56">
                  <img className="w-6" src={mailLogo} alt="" />
                  <span className="text-black font-semibold text-base ml-3">
                    Open in Mail
                  </span>
                </button>
              </a>
            ) : null}
          </div> */}
          {/* Custom click to open modal message */}
          <div className=" mt-6">
            {/* {userDetails?.userInfo?.role_id !== 6 ? ( */}
            <button
              className="px-4 py-2 bg-white rounded-full shadow-md flex items-center w-56"
              onClick={showMailModal}
            >
              <img className="w-6" src={mailLogo} alt="" />
              <span className="text-black font-semibold text-base ml-3">
                Send Mail
              </span>
            </button>
            {/* ) : null} */}
          </div>
          {/* Mailing part start */}
          {/* <div className="flex items-center justify-between">
            <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mt-5">
              Email
            </h1>
            <Button
              type="link"
              className="mt-3 mr-4 text-[5px]  flex justify-center items-center"
            >
              <p className="text-[13px]">Add new Template</p>
            </Button>
          </div>

          <div className=" mt-6">
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              // disabled={componentDisabled}
              style={{ maxWidth: 700 }}
              onFinish={handleSubmit}
            >
              <Form.Item>
                <Select
                  placeholder="Select Email template"
                  style={{
                    width: 240,
                    borderRadius: "25px",
                  }}
                  onChange={handleTdata}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                  ]}
                />
              </Form.Item>

              <input
                type="file"
                name="file"
                id="mail-upload"
                onChange={handleFile}
                hidden
              />
              <div className="flex gap-3 items-center">
                <label
                  htmlFor="mail-upload"
                  className="py-[5px] px-[15px] rounded-sm"
                  style={{ border: "1px solid gray" }}
                >
                  Attach CheckList
                </label>
                <p className="text-[green] text-[16px] mt-2">{fileName}</p>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  // onClick={handleUpload}
                  // loading={uploading}

                  style={{ marginTop: 16 }}
                >
                  Send Email
                </Button>
              </Form.Item>
            </Form>
          </div> */}
          {/* mailing part end */}

          {/* Coments and Comments history*/}
          <div className="lead-comments mt-12 h-[300px] overflow-y-auto crm-scroll-none">
            <Comments Comments={leadDtls?.leadComments} />
          </div>
          <div className="lead-comments mt-12  h-[400px] overflow-y-auto crm-scroll-none ">
            <StatusShow leadDetails={leadDetails} />
          </div>
        </div>

        <script
          src="https://secure.ewaypayments.com/scripts/eCrypt.js"
          className="eway-paynow-button"
          data-publicapikey="epk-5C39F555-79BF-4DF3-A805-0260D31CF07B"
          data-amount="10000"
          data-currency="AUD"
        ></script>
        <MailModal
          leadDetails={leadDetails}
          openMailModal={openMailModal}
          setOpenMailModal={setOpenMailModal}
        />
      </div>
    </div>
  );
};

export default Conversation;

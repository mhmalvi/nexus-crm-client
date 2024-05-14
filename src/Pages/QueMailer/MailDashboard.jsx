import {
  Form,
  Input,
  Popconfirm,
  Select,
  DatePicker,
  Modal,
  Tooltip,
} from "antd";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  handleRemoveTemplate,
  fetchEmailTemplateList,
  handleImageUpload,
  handleGetAllImage,
  sendEmail,
  updateEmail,
  scheduleEmail,
} from "../../Components/services/que-mail";
import AddNewTemplate from "./AddNewTemplate";
import { Editor } from "@tinymce/tinymce-react";
import { CloseOutlined } from "@ant-design/icons";
import "./quemailer.css";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../Components/Shared/Toast";

const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];

const MailDashboard = ({
  currentEmail,
  setSuccessMail,
  successMail,
  setMailProgress,
  mailProgress,
  setAttachment,
  attachment,
  setData,
  data,
  setFileName,
  setFile,
  categorizedData,
  headerData,
  bounced,
  csvFileName,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [tempInitValue, setTempInitValue] = useState("");
  const [tData, setTData] = useState("");
  const [attachModal, setAttachModal] = useState(false);
  const [tempOpen, setTempOpen] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [staticTempListData, setStaticTempListData] = useState("");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [scheduleTime, setScheduleTime] = useState();

  const [mailSubject, setMailSubject] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [templateData, setTemplateData] = useState({
    id: "",
    name: "",
    template: tempInitValue,
  });
  const editorRef = useRef(null);
  const userDetails = useSelector((state) => state.user.userInfo);

  const handleTdata = (value) => {
    setTData(value);
  };

  const showAddNewTemplateModal = () => {
    setTempOpen(true);
  };

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    let totalSize = 0;
    let isValid = true;

    files.forEach((file) => {
      const fileExtension = file?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        warningNotification("Please input jpg, jpeg, png or pdf files.");
        isValid = false;
      } else {
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > 500) {
          warningNotification(`${file.name} exceeds the 500KB size limit.`);
          isValid = false;
        } else {
          totalSize += file.size;
        }
      }
    });
    if (!isValid) {
      setAttachment([]);
      return;
    }
    const totalSizeInMB = totalSize / (1024 * 1024);
    if (totalSizeInMB > 20) {
      warningNotification("Total selected files exceed the 20MB limit.");
      setAttachment([]);
      return;
    }
    setAttachment(files);
  };
  const handleSendMail = async () => {
    if (!data || !tData || !mailSubject) {
      if (!data) {
        warningNotification("Please upload a csv.");
      }
      if (!tData) {
        warningNotification("Please select template.");
      }
      if (!mailSubject) {
        warningNotification("Please enter mail subject.");
      }
    } else {
      try {
        const formData = new FormData();
        const emailTemplatePairs = [];

        categorizedData &&
          categorizedData.forEach((data, index) => {
            let modifiedTemplateContent =
              editorRef?.current?.getContent() || "";
            let modifiedMailSubject = mailSubject;
            headerData.forEach((placeholder) => {
              const regex = new RegExp(`{${placeholder}}`, "g");
              modifiedTemplateContent = modifiedTemplateContent.replace(
                regex,
                data[placeholder] || ""
              );
              modifiedMailSubject = modifiedMailSubject.replace(
                regex,
                data[placeholder] || ""
              );
            });

            emailTemplatePairs.push({
              email: data.Email || data.email || data.EMAIL,
              templateContent: modifiedTemplateContent,
              subject: modifiedMailSubject,
            });
          });

        emailTemplatePairs.forEach((data) => {
          formData.append("email[]", data.email);
          formData.append("template[]", data.templateContent);
          formData.append("subject[]", data.subject);
        });

        formData.append("file_name", csvFileName);
        formData.append("user_id", userDetails?.id);

        if (attachment.length) {
          attachment.forEach((file) => {
            formData.append("files[]", file);
          });
        }
        if (bounced.length) {
          bounced.forEach((data) => {
            formData.append("bounced_email[]", data);
          });
        }
        const res = await sendEmail(formData);

        if (res?.status === 200) {
          successNotification(res?.message);
          setSuccessMail("success");
        } else if (res?.status === 504) {
          successNotification("All mail has been sent !");
          setSuccessMail("success");
        } else {
          await warningNotification(res?.message);
          setSuccessMail("failed");
        }
      } catch (error) {
        // setSuccessMail("success");
        warningNotification(error.response);
      }
    }
  };

  const handleUpdateMail = async () => {
    const res = await updateEmail(templateData);
    if (res?.status === 201) {
      successNotification("Template updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, [1500]);
    } else {
      errorNotification(res.message);
    }
  };

  const onMailSchedule = async (dateTimeStamp) => {
    if (!data || !tData || !mailSubject) {
      if (!data) {
        warningNotification("Please upload a csv.");
      }
      if (!tData) {
        warningNotification("Please select template");
      }
      if (!mailSubject) {
        warningNotification("Please enter mail subject");
      }
    } else {
      try {
        const formData = new FormData();
        const emailTemplatePairs = [];
        categorizedData &&
          categorizedData.forEach((data, index) => {
            let modifiedTemplateContent =
              editorRef?.current?.getContent() || "";
            let modifiedMailSubject = mailSubject;
            headerData.forEach((placeholder) => {
              const regex = new RegExp(`{${placeholder}}`, "g");
              modifiedTemplateContent = modifiedTemplateContent.replace(
                regex,
                data[placeholder] || ""
              );
              modifiedMailSubject = modifiedMailSubject.replace(
                regex,
                data[placeholder] || ""
              );
            });

            emailTemplatePairs.push({
              email: data.Email || data.email || data.EMAIL,
              templateContent: modifiedTemplateContent,
              subject: modifiedMailSubject,
            });
          });

        const chunkSize = 100;
        for (let i = 0; i < emailTemplatePairs.length; i += chunkSize) {
          const chunk = emailTemplatePairs.slice(i, i + chunkSize);
          formData.delete("email[]");
          formData.delete("template[]");
          formData.delete("subject[]");

          chunk.forEach((data) => {
            formData.append("email[]", data.email);
            formData.append("template[]", data.templateContent);
            formData.append("subject[]", data.subject);
          });

          formData.append("file_name", csvFileName);
          formData.append("schedule", dateTimeStamp);
          formData.append("user_id", userDetails?.id);

          if (attachment.length) {
            attachment.forEach((file) => {
              formData.append("files[]", file);
            });
          }
          if (bounced.length) {
            bounced.forEach((data) => {
              formData.append("bounced_email[]", data);
            });
          }

          const res = await scheduleEmail(formData);
          if (res?.status === 201) {
            successNotification(res?.message);
            setSuccessMail("success");
          } else if (res?.status === 504) {
            successNotification("All mail has been sent !");
            setSuccessMail("success");
          } else {
            warningNotification(res?.message);
            setSuccessMail("failed");
          }
        }
      } catch (error) {
        // setSuccessMail("success");
        successNotification(error.response);
      }
    }
  };

  useEffect(() => {
    async function onSelectTemp() {
      const client_id = userDetails.client_id;
      let res = await fetchEmailTemplateList({
        client_id: client_id,
      });
      let res2 = await handleGetAllImage();
      let galleryList = [];
      let tempList = [];
      res?.data?.map((item, idx) =>
        tempList.push({
          id: item?.id,
          value: item?.name,
          label: (
            <>
              <div className="flex w-full justify-between items-center px-4">
                <h1 className="m-0 p-0 text-gray-500">{item.name}</h1>
                <Popconfirm
                  title="Are you sure to remove this template"
                  okText="Yes"
                  onConfirm={async () => {
                    const resRmTemp = await handleRemoveTemplate(item?.id);

                    if (resRmTemp?.status === 200) {
                      successNotification("Template successfully removed.");
                      setTData("");
                      setTemplateList([{ value: "", label: "" }]);
                      onSelectTemp();
                    } else {
                      warningNotification(
                        resRmTemp?.message ||
                          "This template has already been deleted. Select another one."
                      );
                    }
                  }}
                >
                  <CloseOutlined className="!text-red-500" />
                </Popconfirm>
              </div>
            </>
          ),
          ...item,
        })
      );
      res2?.file_url?.map((url, index) =>
        galleryList.push({
          url,
        })
      );
      staticTempListData && tempList.push(staticTempListData);
      setTemplateList(tempList);
    }
    onSelectTemp();
  }, [staticTempListData]);

  useEffect(() => {
    if (successMail === "success" || successMail === "failed") {
      setTimeout(() => {
        setMailProgress(false);
        setMailSubject("");
        setTData("");
        setSuccessMail("");
      }, 2000);
      setAttachment([]);
      setFileName("");
      setData([]);
      setFile("");
    }
  }, [
    successMail,
    setMailProgress,
    setData,
    setFileName,
    setSuccessMail,
    setFile,
    setAttachment,
  ]);

  useEffect(() => {
    templateList?.forEach((itm, idx) => {
      if (itm?.value === tData) {
        setTempInitValue(itm?.template);
        setTemplateData({
          id: itm?.id,
          name: itm?.name,
          template: itm?.template,
        });
      }
    });
  }, [tData, templateList]);

  return (
    <div className="flex flex-col gap-4 justify-center h-full">
      <div className="w-full flex items-center justify-between gap-8 border-b border-brand-color pb-4">
        <h1
          className={`m-0 p-0 text-sm ${
            colorMode
              ? "text-slate-300 border-slate-300"
              : "text-gray-800 border-gray-800"
          }`}
        >
          Current Sender Email:{" "}
          <span className="text-green-600">
            {currentEmail && currentEmail.from_mail_address}
          </span>
        </h1>

        <div className="flex gap-8">
          <button
            className={`2xl:text-sm text-xs ease-in duration-100 px-4 py-1 border rounded-md hover:border-brand-color ${
              colorMode
                ? "text-slate-300 border-slate-300"
                : "text-gray-800 border-gray-800"
            }`}
            onClick={showAddNewTemplateModal}
          >
            Add new Template
          </button>
        </div>
      </div>
      <div className="flex gap-4 h-full">
        <Form
          layout="vertical"
          onFinish={() => {
            handleSendMail();
          }}
          className="flex flex-col w-full h-full"
        >
          <div className="flex justify-between items-center w-full gap-2">
            <div className="flex flex-col items-center gap-2 w-1/4">
              <div className="flex items-center gap-2 w-full h-10">
                <h2
                  className={`m-0 p-0 2xl:text-sm text-xs w-28 font-semibold ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  }`}
                >
                  Template:
                </h2>
                <Form.Item className=" !text-black !rounded-lg !w-full !p-0 !m-0">
                  <Select
                    disabled={mailProgress ? true : successMail ? false : false}
                    defaultValue={!tData && ""}
                    value={tData || "Select Email template"}
                    placeholder="Select Email template"
                    className="templateSelect !rounded-lg !m-0 !p-0 !text-slate-400 !w-full !2xl:text-base !text-xs"
                    onChange={handleTdata}
                    options={templateList || []}
                  />
                </Form.Item>
              </div>
              <div className="flex items-center gap-2 w-full h-10">
                <h2
                  className={`2xl:text-sm text-xs m-0 p-0 w-28 font-semibold ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  }`}
                >
                  Subject:
                </h2>
                <Input
                  disabled={
                    mailProgress
                      ? true
                      : successMail === "success"
                      ? false
                      : false
                  }
                  className="!rounded-lg placeholder:!text-slate-400 2xl:text-base !text-xs !w-full !py-2"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e?.target?.value)}
                  placeholder="Enter subject of mail"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <h1
                className={`m-0 p-0 text-end text-sm ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Action Buttons
              </h1>
              <Select
                defaultValue="Copy dynamic header"
                style={{ width: "100%" }}
                className="templateSelect 2xl:text-base !text-xs"
                onChange={(selectedOption) => {
                  navigator.clipboard.writeText(`{${selectedOption}}`);
                  successNotification(`${selectedOption} copied to clipboard`);
                }}
                options={
                  headerData &&
                  headerData.map((header) => ({
                    value: header,
                    label: header,
                  }))
                }
              />
              <div
                className={`text-end text-sm ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Unsubscribe
              </div>
            </div>
            {selectedData.length > 0 ? (
              <ul className="flex">
                {selectedData?.map((item, idx) => {
                  return (
                    <li key={idx} className="text-[green] text-[16px] mt-2">
                      {item?.file_name}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="h-full w-full flex flex-col items-center justify-between">
            {tData ? (
              <div className="w-full h-full flex flex-col justify-between gap-4 emailEditorCustom">
                <Editor
                  apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    `${tempInitValue}` ||
                    "<p>This is the initial content of the editor.</p>"
                  }
                  init={{
                    // height: "calc(60vh - 5em)",
                    height: "100%",
                    menubar: "tools",
                    resize: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "fullscreen",
                      "fullscreen_native",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                      "code",
                      "style",
                    ],
                    theme_advanced_buttons3_add: "styleprops",
                    toolbar:
                      "undo redo | casechange blocks | fontfamily | fontsize | fontsizeinput | forecolor | bold italic backcolor | image link |" +
                      "alignleft aligncenter alignright alignjustify |" +
                      "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help | code",
                    content_style:
                      "body { width:60vw,Arial,sans-serif; font-size:14px; overflow-x:hidden; overflow-y }",
                    images_upload_url:
                      "https://emailmarketing.queleadscrm.com/",
                    automatic_uploads: true,
                    images_reuse_filename: true,
                    images_upload_handler: handleImageUpload,
                  }}
                  onChange={(e) => {
                    setTemplateData((prevData) => ({
                      ...prevData,
                      template: e.target.getContent(),
                    }));
                  }}
                />
                <div className="w-full flex items-center justify-between relative">
                  <div className="flex flex-col items-start justify-between left-0 gap-2">
                    <div className="flex gap-2 items-center">
                      {attachment.length <= 0 ? (
                        ""
                      ) : (
                        <h1
                          className={`${
                            colorMode ? "text-slate-300" : "text-gray-800"
                          } m-0 p-0 hover:text-brand-color cursor-pointer ease-in duration-100`}
                          onClick={() => {
                            setAttachModal(true);
                          }}
                        >
                          Files Selected: {attachment.length}
                        </h1>
                      )}
                      <Tooltip
                        title={
                          <div>
                            <h1 className="text-slate-300">
                              Allowed files: JPG, JPEG, PNG & PDF (200kb).
                            </h1>
                            <h1 className="text-slate-300">
                              Max file size: 500kb, Total file size: 20mb
                            </h1>
                          </div>
                        }
                        placement="right"
                      >
                        <label
                          htmlFor="file-input"
                          className={`flex items-center gap-8 label `}
                        >
                          <input
                            type="file"
                            multiple
                            onChange={handleAttachment}
                            className="hidden"
                            id="file-input"
                          />

                          <span
                            className={`${
                              colorMode
                                ? "bg-transparent border border-slate-300 text-slate-300"
                                : "text-gray-800 bg-transparent border border-gray-800"
                            }   rounded-md m-0 px-4 py-2 cursor-pointer text-sm`}
                          >
                            Attach File
                          </span>
                        </label>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center justify-end gap-4">
                    {templateData.template !== tempInitValue ? (
                      <button
                        type="button"
                        className="text-sm w-2/5 text-slate-300 px-4 py-1 bg-gray-800 rounded-md hover:text-brand-color ease-in duration-100"
                        onClick={handleUpdateMail}
                      >
                        Update Template
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      type="button"
                      className={`text-sm px-4 py-1 !rounded-md disabled:!bg-slate-200 disabled:cursor-not-allowed disabled:!text-slate-400 !bg-gray-800 !text-slate-300 !border-slate-300`}
                      disabled={
                        !data.length || !mailSubject.length ? true : false
                      }
                      onClick={() => {
                        setScheduleModal(true);
                      }}
                    >
                      Schedule Mail
                    </button>
                    <Form.Item className="flex gap-4 !m-0 r-0">
                      <button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                          setMailProgress(true);
                        }}
                        className={`text-sm px-4 py-1 !rounded-md disabled:!bg-slate-200 disabled:cursor-not-allowed disabled:!text-slate-400 !bg-gray-800 !text-slate-300 !border-slate-300`}
                        disabled={
                          !data.length || !mailSubject.length ? true : false
                        }
                      >
                        Send Mail Now
                      </button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            ) : (
              <h1
                className={`m-0 p-0 ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Please select a template to get started
              </h1>
            )}
          </div>
        </Form>
      </div>
      <AddNewTemplate
        setStaticTempListData={setStaticTempListData}
        tempOpen={tempOpen}
        setTempOpen={setTempOpen}
      />
      <Modal
        width="20%"
        visible={attachModal}
        className="emailModals"
        onOk={() => {
          setAttachModal(false);
        }}
        cancelButtonProps={{
          className: "!hidden",
        }}
      >
        <div className="flex flex-col gap-8">
          <h1 className="m-0 p-0 text-base">Files Selected:</h1>
          {attachment.map((item, index) => {
            return (
              <div className={`flex items-center gap-8 border-b`}>
                <h1>{index + 1}</h1>
                <h1>{item.name}</h1>
              </div>
            );
          })}
        </div>
      </Modal>
      <Modal
        width="20%"
        visible={scheduleModal}
        className="emailModals"
        onOk={() => {
          onMailSchedule(scheduleTime);
          setScheduleModal(false);
        }}
        okText={"Schedule Mail"}
        onCancel={() => {
          setScheduleModal(false);
        }}
      >
        <DatePicker
          onChange={(e) => {
            const formattedDateString =
              e._d.getUTCFullYear() +
              "-" +
              ("0" + (e._d.getUTCMonth() + 1)).slice(-2) +
              "-" +
              ("0" + e._d.getUTCDate()).slice(-2) +
              " " +
              ("0" + e._d.getUTCHours()).slice(-2) +
              ":" +
              ("0" + e._d.getUTCMinutes()).slice(-2) +
              ":" +
              ("0" + e._d.getUTCSeconds()).slice(-2);

            setScheduleTime(formattedDateString);
          }}
          showTime
          needConfirm={false}
        />
      </Modal>
    </div>
  );
};

export default MailDashboard;

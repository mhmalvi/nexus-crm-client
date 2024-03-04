import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  DatePicker,
  Modal,
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
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  console.log(bounced);
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
        message.warning("Please input jpg, jpeg, png or pdf files");
        isValid = false;
      } else {
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > 500) {
          message.warning(`${file.name} exceeds the 500KB size limit.`);
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
      message.warning("Total selected files exceed the 20MB limit.");
      setAttachment([]);
      return;
    }
    setAttachment(files);
  };

  const handleSendMail = async () => {
    if (!data || !tData || !mailSubject) {
      if (!data) {
        message.warning("Please upload a csv");
      }
      if (!tData) {
        message.warning("Please select template");
      }
      if (!mailSubject) {
        message.warning("Please enter mail subject");
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

        formData.append("user_id", userDetails?.id);

        if (attachment.length) {
          attachment.forEach((file) => {
            formData.append("files[]", file);
          });
        }

        const res = await sendEmail(formData);

        if (res?.status === 200) {
          message.success(res?.message);
          setSuccessMail("success");
        } else if (res?.status === 504) {
          message.success("All mail has been sent !");
          setSuccessMail("success");
        } else {
          await message.warning(res?.message);
          setSuccessMail("failed");
        }
      } catch (error) {
        // setSuccessMail("success");
        message.warning(error.response);
      }
    }
  };

  const handleUpdateMail = async () => {
    const res = await updateEmail(templateData);
    if (res?.status === 201) {
      message.success("Template Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, [1500]);
    } else {
      message.error(res.message);
    }
  };

  const onMailSchedule = (dateTimeStamp) => {
    
  };
  useEffect(() => {
    async function onSelectTemp() {
      let res = await fetchEmailTemplateList();
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
                      message.success("Template successfully removed");
                      setTData("");
                      setTemplateList([{ value: "", label: "" }]);
                      onSelectTemp();
                    } else {
                      message.warning(
                        resRmTemp?.message ||
                          "This Template is already deleted Select another one/Something went wrong"
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
    <div className=" flex flex-col gap-4">
      <div className="w-full flex justify-between gap-8">
        <div>
          <h1
            className={`m-0 p-0 2xl:text-xl text-sm ${
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
        </div>
        <div className="flex gap-8">
          <button
            className={`2xl:text-base text-xs ease-in duration-100 px-4 py-1 border rounded-md hover:border-brand-color ${
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
      <div className="flex gap-8 min-h-[50vh]">
        <Form
          layout="vertical"
          onFinish={() => {
            handleSendMail();
          }}
          className="w-full"
        >
          <div className="flex justify-between items-center w-full gap-20">
            <div className="flex-col gap-4 w-1/2">
              <div className="flex justify-between items-center w-full h-10">
                <h2
                  className={`w-full m-0 p-0 2xl:text-base text-xs ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  }`}
                >
                  Select Mail Template:
                </h2>
                <Form.Item className=" !text-black !rounded-lg !w-full !p-0 !m-0">
                  <Select
                    disabled={mailProgress ? true : successMail ? false : false}
                    defaultValue={!tData && ""}
                    value={tData || "Select Email template"}
                    placeholder="Select Email template"
                    className="templateSelect !rounded-lg !m-0 !p-0 !text-slate-400 !w-full 2xl:!text-base !text-xs"
                    onChange={handleTdata}
                    options={templateList || []}
                  />
                </Form.Item>
              </div>
              <div className="flex items-center w-full h-10">
                <h2
                  className={`w-full 2xl:text-base text-xs m-0 p-0 ${
                    colorMode
                      ? "text-slate-300 border-slate-300"
                      : "text-gray-800 border-gray-800"
                  }`}
                >
                  Mail Subject:
                </h2>
                <Input
                  disabled={
                    mailProgress
                      ? true
                      : successMail === "success"
                      ? false
                      : false
                  }
                  className="!rounded-lg placeholder:!text-slate-400 2xl:!text-base !text-xs !w-full"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e?.target?.value)}
                  placeholder="Enter subject of mail"
                />
              </div>
            </div>
            <div className="flex w-1/4">
              <Select
                defaultValue="Select dynamic function"
                style={{ width: "100%" }}
                className="templateSelect 2xl:!text-base !text-xs"
                onChange={(selectedOption) => {
                  navigator.clipboard.writeText(`{${selectedOption}}`);
                  message.success(`${selectedOption} copied to clipboard`);
                }}
                options={
                  headerData &&
                  headerData.map((header) => ({
                    value: header,
                    label: header,
                  }))
                }
              />
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
          <div className="template h-full w-full flex flex-col items-center justify-center w-full  ">
            {tData ? (
              <div className="w-full flex flex-col gap-8 emailEditorCustom">
                <Editor
                  apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    `${tempInitValue}` ||
                    "<p>This is the initial content of the editor.</p>"
                  }
                  init={{
                    height: "calc(50vh - 5em)",
                    menubar: false,
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
                    ],
                    toolbar:
                      "undo redo | casechange blocks | fontfamily | fontsize | fontsizeinput | forecolor | bold italic backcolor | image link |" +
                      "alignleft aligncenter alignright alignjustify |" +
                      "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help ",
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
                          }   rounded-md m-0 px-4 py-2 cursor-pointer`}
                        >
                          Attach File
                        </span>
                      </label>
                    </div>
                    <h1
                      className={`${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      } text-xs m-0 p-0`}
                    >
                      Allowed files: JPG, JPEG, PNG & PDF (200kb)
                    </h1>
                    <h1
                      className={`${
                        colorMode ? "text-slate-300" : "text-gray-800"
                      } text-xs m-0 p-0`}
                    >
                      Max file size: 500kb, Total file size: 20mb
                    </h1>
                  </div>
                  <div className="flex w-1/2 items-center justify-end gap-4">
                    {templateData.template !== tempInitValue ? (
                      <button
                        type="button"
                        className="w-2/5 text-slate-300 px-4 py-1 bg-gray-800 rounded-md hover:text-brand-color ease-in duration-100"
                        onClick={handleUpdateMail}
                      >
                        Update Template
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      type="button"
                      className={`px-4 py-1 !rounded-md disabled:!bg-slate-200 disabled:!text-slate-400 !bg-gray-800 !text-slate-300 !border-slate-300"
                         `}
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
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                          setMailProgress(true);
                        }}
                        className={` !rounded-md disabled:!bg-slate-200 disabled:!text-slate-400 !bg-gray-800 !text-slate-300 !border-slate-300"
                         `}
                        disabled={
                          !data.length || !mailSubject.length ? true : false
                        }
                      >
                        Send Mail Now
                      </Button>
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
          onMailSchedule(scheduleTime)
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
              e._d.getFullYear() +
              "-" +
              ("0" + (e._d.getMonth() + 1)).slice(-2) +
              "-" +
              ("0" + e._d.getDate()).slice(-2) +
              " " +
              ("0" + e._d.getHours()).slice(-2) +
              ":" +
              ("0" + e._d.getMinutes()).slice(-2) +
              ":" +
              ("0" + e._d.getSeconds()).slice(-2);

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

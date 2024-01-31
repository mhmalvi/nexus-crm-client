import { Button, Form, Input, message, Popconfirm, Select } from "antd";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  handleRemoveTemplate,
  fetchEmailTemplateList,
  handleImageUpload,
  handleGetAllImage,
  sendEmail,
} from "../../Components/services/que-mail";
import AddNewTemplate from "./AddNewTemplate";
import { Editor } from "@tinymce/tinymce-react";
// import AttachModal from "./AttachModal";
import { CloseOutlined } from "@ant-design/icons";
import Gallery from "./Gallery";
import "./quemailer.css";
import { useMediaQuery } from "react-responsive";

const MailDashboard = ({
  currentEmail,
  setSuccessMail,
  successMail,
  setMailProgress,
  mailProgress,
  setData,
  data,
  setFileName,
  setFile,
}) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [tempInitValue, setTempInitValue] = useState("");
  const [tData, setTData] = useState("");

  const [tempOpen, setTempOpen] = useState(false);
  const [templateList, setTemplateList] = useState([]);
  const [staticTempListData, setStaticTempListData] = useState("");

  const [showGallery, setShowGallery] = useState(false);
  const [galleryList, setGalleryList] = useState("");
  const [staticGalleryListData, setStaticGalleryListData] = useState("");

  const [mailSubject, setMailSubject] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const editorRef = useRef(null);
  const userDetails = useSelector((state) => state.user.userInfo);

  const handleTdata = (value) => {
    setTData(value);
  };
  const showAddNewTemplateModal = () => {
    setTempOpen(true);
  };
  const showGalleryModal = () => {
    setShowGallery(true);
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
      const formData = new FormData();
      formData.append("subject", mailSubject);
      formData.append(
        "template",
        editorRef?.current
          ? editorRef?.current?.getContent()
            ? editorRef?.current?.getContent()
            : ""
          : ""
      );
      data.forEach((email) => {
        formData.append("email[]", email);
      });

      formData.append("user_id", userDetails?.id);

      const res = await sendEmail(formData);

      if (res?.status === 200) {
        
        message.success("Mail sent successfully!");
        setSuccessMail("success");
      } else {
        message.warning(res?.message || "Something went wrong");
        setSuccessMail("failed");
      }
    }
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
      staticGalleryListData && galleryList.push(staticGalleryListData);
      setTemplateList(tempList);
      setGalleryList(galleryList);
    }
    onSelectTemp();
  }, [staticGalleryListData, staticTempListData]);

  useEffect(() => {
    if (successMail === "success") {
      setTimeout(() => {
        setMailProgress(false);
        setMailSubject("");
        setTData("");
        setSuccessMail("");
      }, 2000);
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
  ]);

  useEffect(() => {
    templateList?.forEach((itm, idx) => {
      itm?.label | (itm?.value === tData) && setTempInitValue(itm?.template);
    });
  }, [tData, templateList]);
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between gap-8">
        <div>
          <h1
            className={`m-0 p-0 ${
              colorMode
                ? "text-slate-300 border-slate-300"
                : "text-gray-800 border-gray-800"
            }`}
          >
            Current Sender Email:{" "}
            <span className="font-bold">
              {currentEmail && currentEmail.from_mail_address}
            </span>
          </h1>
        </div>
        <div className="flex gap-8">
          <button
            className={`px-4 py-2 border rounded-md ${
              colorMode
                ? "text-slate-300 border-slate-300"
                : "text-gray-800 border-gray-800"
            }`}
            onClick={showGalleryModal}
          >
            Open Gallery
          </button>
          <button
            className={`px-4 py-2 border rounded-md ${
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
            <div className="flex items-center w-full h-8">
              <h2
                className={`w-1/3 m-0 p-0 ${
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
                className="!rounded-lg placeholder:!text-slate-400 "
                value={mailSubject}
                onChange={(e) => setMailSubject(e?.target?.value)}
                placeholder="Enter subject of mail"
              />
            </div>
            <div className="flex items-center justify-between w-full h-8">
              <h2
                className={`w-1/2 m-0 p-0 ${
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
                  className="templateSelect !rounded-lg !m-0 !p-0 !text-slate-400"
                  onChange={handleTdata}
                  options={templateList || []}
                />
              </Form.Item>
            </div>
            {/* <div className="bodyHeaderRight">
                <label
                  className=""
                  onClick={(e) => {
                    handleCheckListOpen(e);
                  }}
                >
                  Attach CheckList
                </label>
              </div> */}
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
          <div className="h-full flex flex-col items-center justify-center w-full mt-4 !z-4">
            {tData ? (
              <div className="flex flex-col w-full gap-8 z-4 emailEditorCustom">
                <Editor
                  apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    `${tempInitValue}` ||
                    "<p>This is the initial content of the editor.</p>"
                  }
                  init={{
                    height: isBigScreen ? 450 : 300,
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
                      "undo redo | casechange blocks | fontfamily | fontsize | fontsizeinput | forecolor | bold italic backcolor | link image |" +
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
                />
                <Form.Item className="w-full flex items-center justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setMailProgress(true);
                    }}
                    disabled={
                      !data.length || !mailSubject.length ? true : false
                    }
                  >
                    Send Mail
                  </Button>
                </Form.Item>
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
      <Gallery
        galleryList={galleryList}
        setStaticGalleryListData={setStaticGalleryListData}
        showGallery={showGallery}
        setShowGallery={setShowGallery}
      />
      {/* <AttachModal
        attachOpen={attachOpen}
        setAttachOpen={setAttachOpen}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      /> */}
    </div>
  );
};

export default MailDashboard;

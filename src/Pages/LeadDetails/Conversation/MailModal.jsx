import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailTemplatList } from "../../../Components/services/leads";
import { handleLeadMailUpload } from "../../../Components/services/utils";
import AddNewTemplate from "./AddNewTemplate";
import { Editor } from "@tinymce/tinymce-react";
import AttachModal from "./AttachModal";

const MailModal = ({ leadDetails, openMailModal, setOpenMailModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [fileName, setFileName] = useState("");
  const [tData, setTData] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [tempOpen, setTempOpen] = useState(false);
  const [staticTempListData, setStaticTempListData] = useState("");
  const [tempInitValue, setTempInitValue] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const editorRef = useRef(null);
  const userDetails = useSelector((state) => state.user.userInfo);
  const handleTdata = (value) => {
    setTData(value);
  };
  // function handleFile(event) {
  //   // setFile(event.target.files[0]);
  //   // console.log("fdatas: ", event?.target?.files[0]);
  //   // setFileName(event?.target?.files[0]?.name);

  // }

  const handleCheckListOpen = (e) => {
    setSelectedData([]);
    setAttachOpen(true);
  };
  // set mail with pdf
  const handleSendMail = () => {
    const formData = new FormData();
    formData.append("checklist", JSON.stringify(selectedData));
    formData.append(
      "template",
      editorRef?.current
        ? editorRef?.current?.getContent()
          ? editorRef?.current?.getContent()
          : ""
        : ""
    );
    formData.append("mail_subject", mailSubject);
    formData.append("student_email", leadDetails?.leadDetails?.student_email);
    formData.append("sender", userDetails?.email);

    if (!tData || !mailSubject || selectedData.length <= 0) {
      if (!tData) {
        message.warning("Please select template");
      }
      if (!mailSubject) {
        message.warning("Please enter mail subject");
      }
      if (selectedData.length <= 0) {
        message.warning("Please select file");
      }
    } else {
      setConfirmLoading(true);
      fetch("https://crmleads.quadque.digital/api/lead/mail", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.status === 200) {
            message.success("Mail send successfully!");
            setOpenMailModal(false);
            setConfirmLoading(false);
            window.location.reload();
          } else {
            message.error(result?.message || "Something went wrong");
            setConfirmLoading(false);
          }
        })
        .catch((error) => {
          message.error("Something went wrong");
          setConfirmLoading(false);
        });
    }
  };
  // set mail with pdf end

  const handleMailCancel = () => {
    setOpenMailModal(false);
    setConfirmLoading(false);
  };
  useEffect(() => {
    (async () => {
      let res = await fetchEmailTemplatList();

      let tempList = [];
      res?.data?.map(
        (itm, idx) =>
          tempList.push({
            id: itm?.id,
            value: itm?.template_name,
            label: itm.template_name,
            ...itm,
          })
        // tempList([...tempList, itm])
      );
      staticTempListData && tempList.push(staticTempListData);
      setTemplateList(tempList);
    })();
  }, [staticTempListData]);
  const showAddNewTemplateModal = () => {
    setTempOpen(true);
  };
  useEffect(() => {
    templateList?.forEach((itm, idx) => {
      itm?.label | (itm?.value === tData) &&
        setTempInitValue(itm?.template_description);
    });
  }, [tData, templateList]);

  return (
    <div>
      <Modal
        title=""
        okText={`${confirmLoading ? "Sending Mail" : "Send Mail"}`}
        open={openMailModal}
        visible={openMailModal}
        onOk={handleSendMail}
        confirmLoading={confirmLoading}
        width="80%"
        onCancel={handleMailCancel}
      >
        <div className="flex items-center justify-between flex-wrap">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mt-5">
            Email
          </h1>
          <Button
            type="link"
            className="mt-3 mr-4 text-[5px]  flex justify-center items-center"
          >
            <p
              className="text-[15px] cursor-pointer font-bold  text-teal-600 hover:text-teal-700 hover:underline"
              onClick={showAddNewTemplateModal}
            >
              Add new Template
            </p>
          </Button>
        </div>

        <div className=" mt-6">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            onFinish={handleSendMail}
          >
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <h2>Select Mail Template:</h2>
                <Form.Item label="">
                  <Select
                    placeholder="Select Email template"
                    style={{
                      width: 240,
                      borderRadius: "25px",
                    }}
                    onChange={handleTdata}
                    options={templateList || []}
                  />
                </Form.Item>
              </div>

              <div className="mt-[-25px]">
                <h2>Mail Subject:</h2>
                <Input
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e?.target?.value)}
                  placeholder="Enter subject of mail"
                ></Input>
              </div>

              {/* <input
                type="file"
                name="file"
                id="mail-upload"
                onChange={handleFile}
                style={{ display: "none" }}
              /> */}

              <div className="flex gap-3 items-center mt-[5px] ">
                <label
                  // htmlFor="mail-upload"
                  className="py-[5px] px-[15px] cursor-pointer bg-slate-700 text-white border border-slate-700 rounded"
                  style={{ border: "1px solid gray" }}
                  onClick={(e) => {
                    handleCheckListOpen(e);
                  }}
                >
                  Attach CheckList
                </label>
                <p className="text-[green] text-[16px] mt-2">{fileName}</p>
              </div>
              {selectedData.length > 0 ? (
                <ul className="w-[200px] h-[70px] overflow-auto">
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
            {tData && (
              <div className="my-[15px]" style={{ width: "100%" }}>
                <Editor
                  apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    `${tempInitValue}` ||
                    "<p>This is the initial content of the editor.</p>"
                  }
                  init={{
                    height: 500,
                    menubar: false,
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
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | casechange blocks | fontfamily | fontsize | fontsizeinput | forecolor | bold italic backcolor | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help ",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            )}
          </Form>
        </div>

        {/* edit  */}
      </Modal>
      <AddNewTemplate
        setStaticTempListData={setStaticTempListData}
        tempOpen={tempOpen}
        setTempOpen={setTempOpen}
      />
      <AttachModal
        attachOpen={attachOpen}
        setAttachOpen={setAttachOpen}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default MailModal;

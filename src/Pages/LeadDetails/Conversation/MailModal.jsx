import { Button, Form, Input, Modal, Popconfirm, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { fetchEmailTemplatList } from "../../../Components/services/leads";
import { handleRemoveTemplet } from "../../../Components/services/utils";
import AddNewTemplate from "./AddNewTemplate";
import { Editor } from "@tinymce/tinymce-react";
import AttachModal from "./AttachModal";
import { CloseOutlined } from "@ant-design/icons";
import "../userDetails.css";
import { errorNotification, successNotification, warningNotification } from "../../../Components/Shared/Toast";
const MailModal = ({ leadDetails, openMailModal, setOpenMailModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

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
        warningNotification("Please select a template.");
      }
      if (!mailSubject) {
        warningNotification("Please enter a mail subject.");
      }
      if (selectedData.length <= 0) {
        warningNotification("Please select a file.");
      }
    } else {
      setConfirmLoading(true);
      const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        },
      };
      fetch("https://crmleads.queleadscrm.com/api/lead/mail", {
        method: "POST",
        body: formData,
        config,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.status === 200) {
            successNotification("Mail sent successfully.");
            setOpenMailModal(false);
            setConfirmLoading(false);
            window.location.reload();
          } else {
            errorNotification(result?.message || "Something went wrong.");
            setConfirmLoading(false);
          }
        })
        .catch((error) => {
          errorNotification("Something went wrong.");
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
    async function onSelectTemp() {
      let res = await fetchEmailTemplatList();

      let tempList = [];
      res?.data?.map((itm, idx) =>
        tempList.push({
          id: itm?.id,
          value: itm?.template_name,
          label: (
            <>
              <div className="flex justify-between items-center">
                <h1>{itm.template_name}</h1>{" "}
                <Popconfirm
                  title="Are you sure to remove this template"
                  okText="Yes"
                  onConfirm={async () => {
                    const resRmTemp = await handleRemoveTemplet(itm?.id);
                    if (resRmTemp?.status === 201) {
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
                  <CloseOutlined className="text-red-500" />
                </Popconfirm>
              </div>
            </>
          ),
          ...itm,
        })
      );
      staticTempListData && tempList.push(staticTempListData);
      setTemplateList(tempList);
    }
    onSelectTemp();
  }, []);

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
        width="900px"
        onCancel={handleMailCancel}
        className="mailModal"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-start flex-wrap">
            <h1 className="m-0 p-0 text-xl font-semibold font-poppins text-slate-300">
              Email
            </h1>
            <Button
              type="link"
              className="m-0 p-0 flex justify-center items-center"
            >
              <p
                className="m-0 p-0 cursor-pointer font-bold text-brand-color hover:text-teal-700 hover:underline"
                onClick={showAddNewTemplateModal}
              >
                Add new Template
              </p>
            </Button>
          </div>

          <Form
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 14 }}
            // layout="vertical"
            onFinish={handleSendMail}
          >
            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              <div className="w-1/4 flex flex-col gap-2">
                <h2 className="m-0 p-0 text-slate-300">
                  Select Mail Template:
                </h2>
                <Form.Item>
                  <Select
                    defaultValue={!tData && ""}
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

              <div className="mt-[-25px] flex flex-col gap-2 w-1/4">
                <h2 className="m-0 p-0 text-slate-300">Mail Subject:</h2>
                <Input
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e?.target?.value)}
                  placeholder="Enter subject of mail"
                ></Input>
              </div>

              <div className="w-1/4 flex gap-4 items-center mt-[5px] ">
                <label
                  className="w-full py-[5px] px-[15px] cursor-pointer bg-slate-700 text-white border border-slate-700 rounded-md text-center"
                  style={{ border: "1px solid gray" }}
                  onClick={(e) => {
                    handleCheckListOpen(e);
                  }}
                >
                  Attach CheckList
                </label>
                {/* <p className="text-[green] text-[16px] mt-2">{fileName}</p> */}
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

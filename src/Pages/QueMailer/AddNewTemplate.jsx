import { Input, message, Modal } from "antd";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  AddNewTemplateList,
  handleImageUpload,
} from "../../Components/services/que-mail";
import "./quemailer.css";
import { useSelector } from "react-redux";

const AddNewTemplate = ({ setStaticTempListData, tempOpen, setTempOpen }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");
  const editorRef = useRef(null);
  const handleAddNewTemplate = async () => {
    let data = {
      name: templateTitle,
      template: editorRef?.current && editorRef?.current?.getContent(),
    };

    setStaticTempListData({
      value: templateTitle,
      label: templateTitle,
    });

    if (!templateTitle || !editorRef?.current?.getContent()) {
      if (!templateTitle) {
        message.warning("Template Title missing!");
      }
      if (!editorRef?.current?.getContent()) {
        message.warning("Template Description missing!");
      }
    } else {
      setConfirmLoading(true);
      const res = await AddNewTemplateList(data);
      if (res?.status === 201) {
        message.success(res?.message || "Template added successfully");
        setTempOpen(false);
        setConfirmLoading(false);

        window.location.reload();
      } else {
        message.warning(res?.message || "Something went wrong");
        setConfirmLoading(false);
      }
    }
  };
  const handleCancel = () => {
    setTempOpen(false);
  };
  return (
    <div className=" z-[9999999] " style={{ zIndex: 9999999 }}>
      <Modal
        width="80%"
        open={tempOpen}
        visible={tempOpen}
        okText={`${confirmLoading ? "Adding Template" : "Add Template"}`}
        onOk={handleAddNewTemplate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="emailModals"
      >
        <div>
          <div className="flex items-center justify-around mb-6">
            <div className="flex items-center w-1/3">
              <h2 className="m-0 p-0 w-1/4">Template Title: </h2>
              <Input
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e?.target?.value)}
                placeholder="Enter the name of Template"
              />
            </div>
            <h1 className={`bg-gray-800 text-slate-300 rounded-md m-0 px-2 py-2 text-base`}>Press (Shift + CTRL/CMD + F) for fullscreen</h1>
          </div>
          <Editor
            apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={"<p>This is the initial content of the editor.</p>"}
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
                "undo redo | casechange blocks | fontfamily | fontsize | fontsizeinput | forecolor | bold italic backcolor | link image |" +
                "alignleft aligncenter alignright alignjustify |" +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help ",
              content_style:
                "body { width:60vw,Arial,sans-serif; font-size:14px }",
              images_upload_url: "https://emailmarketing.queleadscrm.com/",
              automatic_uploads: true,
              images_reuse_filename: true,
              images_upload_handler: handleImageUpload,
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddNewTemplate;

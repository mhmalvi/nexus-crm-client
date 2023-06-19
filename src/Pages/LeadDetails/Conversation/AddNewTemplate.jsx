import { Input, message, Modal } from "antd";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { AddNewTemplateList } from "../../../Components/services/leads";

const AddNewTemplate = ({ setStaticTempListData, tempOpen, setTempOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");
  const editorRef = useRef(null);
  const handleAddNewTemplate = async () => {
    let data = {
      template_name: templateTitle,
      template_description:
        editorRef?.current && editorRef?.current?.getContent(),
    };
    console.log("template Data: ", data);
    setConfirmLoading(true);
    setStaticTempListData({
      value: templateTitle,
      label: templateTitle,
    });
    const res = await AddNewTemplateList(data);
    if (res?.status === 201) {
      message.success(res?.message || "Template added successfully");
      setTempOpen(false);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setTempOpen(false);
  };
  return (
    <div className=" z-[9999999] " style={{ zIndex: 9999999 }}>
      <Modal
        title="Add New Template"
        width="80%"
        open={tempOpen}
        visible={tempOpen}
        okText={`${confirmLoading ? "Adding Template" : "Add Template"}`}
        onOk={handleAddNewTemplate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <h2>Template Title: </h2>
          <Input
            value={templateTitle}
            onChange={(e) => setTemplateTitle(e?.target?.value)}
            placeholder="Enter the name of Template"
            style={{ width: "30%", margin: "5px 0 30px 0" }}
          ></Input>
          <Editor
            apiKey="krvc4ctq1jqcu2wv0emw6vjgh8lit9tujxyfh0bi791s4t3r"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
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
      </Modal>
    </div>
  );
};

export default AddNewTemplate;

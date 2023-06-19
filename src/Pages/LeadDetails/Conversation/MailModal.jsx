import { Button, Form, message, Modal, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchEmailTemplatList } from "../../../Components/services/leads";
import { handleLeadMailUpload } from "../../../Components/services/utils";
import AddNewTemplate from "./AddNewTemplate";

const MailModal = ({ openMailModal, setOpenMailModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [tData, setTData] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [tempOpen, setTempOpen] = useState(false);
  const [staticTempListData, setStaticTempListData] = useState("");

  const handleTdata = (value) => {
    setTData(value);
  };
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log("fdatas: ", event?.target?.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }
  console.log("fileData: ", file);
  const handleSendMail = () => {
    const formData = new FormData();
    formData.append("checklist", file);
    formData.append("template", tData);
    fetch("https://crmleads.quadque.digital/api/lead/mail", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("success", result);

        message.success("Mail send successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
    setFile([]);
    handleTdata("");
    setOpenMailModal(false);
    setConfirmLoading(false);
  };

  const handleMailCancel = () => {
    console.log("Clicked cancel button");
    setOpenMailModal(false);
  };
  useEffect(() => {
    (async () => {
      let res = await fetchEmailTemplatList();
      console.log("list temp: ", res);
      let tempList = [];
      res?.data?.map((itm, idx) =>
        tempList.push({ value: itm?.template_name, label: itm.template_name })
      );
      staticTempListData && tempList.push(staticTempListData);
      setTemplateList(tempList);
    })();
  }, [staticTempListData]);
  const showAddNewTemplateModal = () => {
    setTempOpen(true);
  };
  console.log("set temp data: ", templateList);
  return (
    <div>
      <Modal
        title=""
        okText="Send Mail"
        open={openMailModal}
        visible={openMailModal}
        onOk={handleSendMail}
        confirmLoading={confirmLoading}
        width="80%"
        onCancel={handleMailCancel}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50 mt-5">
            Email
          </h1>
          <Button
            type="link"
            className="mt-3 mr-4 text-[5px]  flex justify-center items-center"
          >
            <p className="text-[13px]" onClick={showAddNewTemplateModal}>
              Add new Template
            </p>
          </Button>
        </div>

        <div className=" mt-6">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            // disabled={componentDisabled}
            style={{ maxWidth: 700 }}
            onFinish={handleSendMail}
          >
            <Form.Item>
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

            {/* <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                // onClick={handleUpload}
                // loading={uploading}

                style={{ marginTop: 16 }}
              >
                Send Email
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
      <AddNewTemplate
        setStaticTempListData={setStaticTempListData}
        tempOpen={tempOpen}
        setTempOpen={setTempOpen}
      />
    </div>
  );
};

export default MailModal;

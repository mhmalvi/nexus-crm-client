import { Button, Modal } from "antd";
import React from "react";
import SendStudentDetails from "./sendStudentDetails";
import { useState } from "react";

const CreateStudentModal = ({
  createOpen,
  setCreateOpen,
  setListData,
  setStudentListLoading,
}) => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [data, setData] = useState({
    student_name: "",
    course_name: "",
    institute_name: "",
  });
  const handleClose = () => {
    setCreateOpen(false);
    setFiles([]);
    setFileName([]);
    setData({});
  };
  return (
    <>
      <div>
        <Modal
          width={"85%"}
          onCancel={handleClose}
          visible={createOpen}
          footer={[
            <Button type="primary" onClick={handleClose}>
              Close
            </Button>,
          ]}
        >
          <SendStudentDetails
            data={data}
            setData={setData}
            fileName={fileName}
            setFileName={setFileName}
            files={files}
            setFiles={setFiles}
            setListData={setListData}
            setStudentListLoading={setStudentListLoading}
            setCreateOpen={setCreateOpen}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateStudentModal;

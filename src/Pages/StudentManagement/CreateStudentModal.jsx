import { Button, Modal } from "antd";
import React from "react";
import SendStudentDetails from "./sendStudentDetails";

const CreateStudentModal = ({ createOpen, setCreateOpen }) => {
  return (
    <>
      <div>
        <Modal
          width={"85%"}
          onCancel={() => setCreateOpen(false)}
          visible={createOpen}
          footer={[
            <Button type="primary" onClick={() => setCreateOpen(false)}>
              Close
            </Button>,
          ]}
        >
          <SendStudentDetails />
        </Modal>
      </div>
    </>
  );
};

export default CreateStudentModal;

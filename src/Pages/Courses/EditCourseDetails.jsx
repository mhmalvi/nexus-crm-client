import { Form, Input, message, Modal, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getCourseDetailById,
  updateCourseDetailById,
} from "../../Components/services/course";

const EditCourseDetails = ({ open, setOpen, id }) => {
  const [title, setTitle] = useState("");
  //   const [desc, setDesc] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleShow, setTitleShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  console.log("modal record: ", id);
  const handleUpdate = () => {
    setUpdating(true);
    // setModalText("The modal will be closed after two seconds");
    if (title) {
      const data = {
        title,
      };
      updateCourseDetailById(id, data);
      setConfirmLoading(true);

      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setUpdating(false);
        message.success("Successfully updated!");
      }, 1500);
    } else {
      setTitleShow(true);
      setTimeout(() => {
        setTitleShow(false);
      }, 2000);
    }

    window.location.reload();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      console.log("rId: ", id);
      setLoading(true);
      const result = await getCourseDetailById(id);
      // setTimeout(() => {
      if (result) {
        setTitle(result?.data?.course_title);
        setLoading(false);
      } else {
        setLoading(true);
      }

      // }, 1000);
    })();

    // const result = getCourseDetailById(id);
    // setSingleData(result);
  }, [id]);
  return (
    <>
      <Modal
        title="Edit Course Details"
        okText={!updating ? "Update" : "Updating"}
        visible={open}
        open={open}
        onOk={handleUpdate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps
      >
        {Loading ? (
          <div className="w-full flex justify-center">
            <Spin />
          </div>
        ) : (
          <div>
            <Form onFinish={handleUpdate} layout="vertical">
              <Form.Item label="Course Title" required>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {!title && titleShow && (
                  <p className="text-[red]">Title field can not be empty!</p>
                )}
              </Form.Item>
              {/* <Form.Item label="Course Description" required>
              <Input.TextArea
                required
                showCount
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Item> */}
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EditCourseDetails;

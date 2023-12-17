import { Form, Input, message, Modal, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getCourseDetailById,
  updateCourseDetailById,
} from "../../Components/services/course";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import { useSelector } from "react-redux";

const EditCourseDetails = ({
  open,
  setOpen,
  id,
  setCourses,
  setCourseListLoading,
}) => {
  const userDetails = useSelector((state) => state.user?.userInfo);
  const [title, setTitle] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleShow, setTitleShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  console.log("modal record: ", id);
  const handleUpdate = async () => {
    setUpdating(true);
    let res;
    if (title) {
      const data = {
        title,
      };
      res = await updateCourseDetailById(id, data);
      setConfirmLoading(true);

      if (res.status === 201) {
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          setUpdating(false);
          message.success(res ? res?.message : "Successfully updated!");
        }, 500);
        setCourseListLoading(true);
        const courseResponse = await handleClientwiseCourseDetails(
          userDetails?.client_id
        );
        if (courseResponse?.status === 200) {
          setCourseListLoading(false);
          setCourses(courseResponse?.data);
        } else {
          setCourseListLoading(false);
        }
      } else {
        console.log("auth msg: ", res);
        message.warn(res ? res?.data?.message : "Something went wrong");
        setConfirmLoading(false);
        setUpdating(false);
      }
    } else {
      setTitleShow(true);
      setTimeout(() => {
        setTitleShow(false);
      }, 500);
    }

  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      console.log("rId: ", id);
      setLoading(true);
      const result = await getCourseDetailById(id);
      if (result) {
        setTitle(result?.data?.course_title);
        setLoading(false);
      } else {
        setLoading(true);
      }
    })();
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
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EditCourseDetails;

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
import Loading from "../../Components/Shared/Loader";
import "./courses.css"
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
  const [loading, setLoading] = useState(false);
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
        
        okText={!updating ? "Update" : "Updating"}
        visible={open}
        open={open}
        onOk={handleUpdate}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps
        className="courseModal"
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="p-0 m-0 text-lg border-b border-brand-color text-slate-300">Edit Course Details</h1>
            <Form onFinish={handleUpdate} layout="vertical">
              <Form.Item >
                <h1 className="!text-slate-300">Course Title</h1>
                <Input
                  value={title}
                  required
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

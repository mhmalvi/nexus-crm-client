import { Button, Input, Modal, message } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  handleAddCourse,
  handleClientwiseCourseDetails,
} from "../../Components/services/leads";

const AddCourseModal = ({
  addCourseOpen,
  setAddCourseOpen,
  setCourses,
  setCourseListLoading,
}) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDsc, setCourseDsc] = useState("");
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const userDetails = useSelector((state) => state.user?.userInfo);
  const onAdd = async () => {
    setIsAddingCourse(true);

    if (!courseCode && !courseName && !courseDsc) {
      message.warn("Course Code || Course Name || Course Description required");
    } else {
      const data = {
        course_code: courseCode.trim().split(" ").join(""),
        course_title: courseName,
        course_description: courseDsc,
      };
      const res = await handleAddCourse(data);
      if (res?.status === 201) {
        setIsAddingCourse(false);
        message.success("Course added successfully");
        setCourseCode("");
        setCourseName("");
        setCourseDsc("");
        setCourseListLoading(true);
        setAddCourseOpen(false);
        const courseResponse = await handleClientwiseCourseDetails(
          userDetails?.client_id
        );
        if (courseResponse?.status === 200) {
          setCourses(courseResponse?.data);
          setCourseListLoading(false);
        } else {
          setCourseListLoading(false);
        }
      } else {
        setIsAddingCourse(false);
        message.warn("Something went wrong try again");
      }
    }
  };

  const onClose = () => {
    setAddCourseOpen(false);
  };
  return (
    <>
      <Modal
        title="Add Course"
        visible={addCourseOpen}
        onCancel={onClose}
        footer={[
          <Button
            onClick={onClose}
            className="!bg-black !text-white !border-none !rounded"
          >
            Close
          </Button>,
          <Button
            loading={isAddingCourse}
            type="primary"
            onClick={onAdd}
            className=" !rounded"
          >
            Add
          </Button>,
        ]}
      >
        <div>
          <div>
            <label>Course Code: </label>
            <Input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Enter course code"
            />
          </div>
          <div className="my-4">
            <label>Course Name: </label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label>Course Description: </label>
            <Input
              value={courseDsc}
              onChange={(e) => setCourseDsc(e.target.value)}
              placeholder="Enter course description"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCourseModal;

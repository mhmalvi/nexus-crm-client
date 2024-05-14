import { Input, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  handleAddCourse,
  handleClientwiseCourseDetails,
} from "../../Components/services/leads";
import "./courses.css";
import { successNotification, warningNotification } from "../../Components/Shared/Toast";

const AddCourseModal = ({
  addCourseOpen,
  setAddCourseOpen,
  setCourses,
  setCourseListLoading,
}) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDsc, setCourseDsc] = useState("");
  const userDetails = useSelector((state) => state.user?.userInfo);
  const onAdd = async () => {

    if (!courseCode && !courseName && !courseDsc) {
      warningNotification("Course Code || Course Name || Course Description required");
    } else {
      const data = {
        course_code: courseCode.trim().split(" ").join(""),
        course_title: courseName,
        course_description: courseDsc,
        client_id: userDetails.client_id_in_courses_info,
      };
      const res = await handleAddCourse(data);
      if (res?.status === 201) {
        successNotification("Course added successfully");
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
        warningNotification("Something went wrong try again");
      }
    }
  };

  const onClose = () => {
    setAddCourseOpen(false);
  };
  return (
    <>
      <Modal
        visible={addCourseOpen}
        onCancel={onClose}
        className="courseModal"
        onOk={onAdd}
        okText={"Add"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="p-0 m-0 text-lg border-b border-brand-color text-slate-300">
            Add Course
          </h1>
          <div className="courseInputs">
            <label>Course Code: </label>
            <Input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Enter course code"
              className="!bg-transparent !rounded-md"
            />
          </div>
          <div className="courseInputs">
            <label>Course Name:</label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              className="!bg-transparent !rounded-md"
            />
          </div>
          <div className="courseInputs">
            <label>Course Description: </label>
            <Input
              value={courseDsc}
              onChange={(e) => setCourseDsc(e.target.value)}
              placeholder="Enter course description"
              className="!bg-transparent !rounded-md"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddCourseModal;

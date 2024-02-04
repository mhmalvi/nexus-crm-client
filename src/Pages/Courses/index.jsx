import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import CourseDetails from "./CourseDetails";
import CourseList from "./CourseList";
import "./courses.css";
import { CloseOutlined } from "@ant-design/icons";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseListLoading, setCourseListLoading] = useState(false);

  const userDetails = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    (async () => {
      setCourseListLoading(true);
      const courseResponse = await handleClientwiseCourseDetails(
        userDetails?.client_id
      );
      if (courseResponse?.status === 200) {
        setCourses(courseResponse?.data);
        setCourseListLoading(false);
      } else {
        setCourseListLoading(false);
      }
    })();
  }, [userDetails]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
        <Modal
          className="courseModal"
          visible={courseDetailsOpen}
          footer={null}
          onCancel={() => setCourseDetailsOpen(false)}
          width={900}
          closeIcon={<CloseOutlined  />}
        >
          <CourseDetails selectedCourse={selectedCourse} />
        </Modal>

        <CourseList
          courses={courses}
          setCourses={setCourses}
          setCourseDetailsOpen={setCourseDetailsOpen}
          setSelectedCourse={setSelectedCourse}
          courseListLoading={courseListLoading}
          setCourseListLoading={setCourseListLoading}
        />
      </div>
    </div>
  );
};

export default Courses;

import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import CourseDetails from "./CourseDetails";
import CourseList from "./CourseList";
import "./courses.css";
import { CloseOutlined } from "@ant-design/icons";
import Loading from "../../Components/Shared/Loader";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseListLoading, setCourseListLoading] = useState(false);

  const userDetails = useSelector((state) => state.user?.userInfo);
  const openSideBar = useSelector((state) => state?.user)?.openSideBar;
  const [showCourses, setShowCourses] = useState(true);
  useEffect(() => {
    setShowCourses(false);
    const timeoutId = setTimeout(() => {
      setShowCourses(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [openSideBar]);
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
    <div className="h-screen flex justify-center items-center py-8">
      {showCourses ? (
        <div className="flex flex-col flex-grow gap-4 w-full h-full mx-5 rounded-md p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
          <Modal
            className="courseModal"
            visible={courseDetailsOpen}
            footer={null}
            onCancel={() => setCourseDetailsOpen(false)}
            closeIcon={<CloseOutlined />}
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Courses;

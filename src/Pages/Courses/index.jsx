import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import CourseDetails from "./CourseDetails";
import CourseList from "./CourseList";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  const userDetails = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    (async () => {
      const courseResponse = await handleClientwiseCourseDetails(
        userDetails?.client_id
      );
      console.log("courseResponse", courseResponse);
      if (courseResponse?.status === 200) {
        setCourses(courseResponse?.data);
      }
    })();
  }, [userDetails]);

  return (
    <div className="w-full flex justify-center items-center pt-16 pb-6">
      <Modal
        visible={courseDetailsOpen}
        footer={null}
        onCancel={() => setCourseDetailsOpen(false)}
        width={900}
      >
        <CourseDetails selectedCourse={selectedCourse} />
      </Modal>

      <div className="w-10/12 mx-auto pb-10 pt-6 ">
        <div>
          <CourseList
            courses={courses}
            setCourseDetailsOpen={setCourseDetailsOpen}
            setSelectedCourse={setSelectedCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;

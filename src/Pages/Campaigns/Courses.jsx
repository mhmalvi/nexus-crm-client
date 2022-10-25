import { AutoComplete, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  handleCreateChecklist,
  handleDeleteChecklist,
  handleFetchCourseCheckList,
  handleFetchCourses,
} from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";

const Courses = () => {
  const options = [];

  const [courseId, setCourseId] = useState();
  const [checklist, setChecklist] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState("");

  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const courseResponse = await handleFetchCourses();
      if (courseResponse?.data) {
        (courseResponse?.data).forEach((course) => {
          options.push({
            id: course?.id,
            value: course?.course_title,
          });
        });
      }
    })();
  }, [options]);

  const handleCourseSearch = async (value) => {
    const courseId = options?.find(
      (course) => course?.value?.toLowerCase() === value?.toLowerCase()
    );
    setCourseId(courseId?.id);
    const courseCheckList = await handleFetchCourseCheckList(courseId?.id);
    if (courseCheckList?.data) {
      setChecklist(courseCheckList?.data);
    }
  };

  const handleDeleteChecklistReq = async (checkListId) => {
    const deleteCourseCheckList = await handleDeleteChecklist(checkListId);

    if (deleteCourseCheckList?.status) {
      const courseCheckList = await handleFetchCourseCheckList(courseId);
      if (courseCheckList?.data) {
        setChecklist(courseCheckList?.data);
      }
    }
  };

  const handleAddCheckList = async () => {
    if (checklistTitle.length) {
      console.log(
        userDetails?.userInfo?.client_id,
        userDetails?.userInfo?.id,
        courseId,
        checklistTitle
      );

      const addChecklistResponse = await handleCreateChecklist(
        userDetails?.userInfo?.client_id,
        userDetails?.userInfo?.id,
        courseId,
        checklistTitle
      );

      console.log("addChecklistResponse", addChecklistResponse);

      if (addChecklistResponse?.status) {
        const courseCheckList = await handleFetchCourseCheckList(courseId);
        if (courseCheckList?.data) {
          setChecklist(courseCheckList?.data);
        }

        console.log("courseCheckList", courseCheckList);
        // message.success("Checklist Added Successfully");
      }
    }

    setChecklistTitle("");
  };

  return (
    <div className="w-full flex justify-center items-center pt-16 pb-6">
      <div className="w-8/12 pb-10 pt-6 flex justify-center items-center">
        <div>
          <div className="flex items-center">
            <h1 className="px-2 bg-gray-100 py-1 mb-0 border">Course Code: </h1>
            <AutoComplete
              style={{
                width: 300,
              }}
              onSelect={handleCourseSearch}
              options={options}
              placeholder="Type your course code"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </div>
          <div className="mt-8 ml-28">
            {checklist.length ? (
              checklist?.map((list, i) => (
                <div key={i} className="flex items-center">
                  <li style={{ listStyleType: "circle" }}>{list?.title}</li>
                  <Icons.Cross
                    className="text-red-600 w-2.5 ml-3 cursor-pointer"
                    onClick={() => handleDeleteChecklistReq(list?.id)}
                  />
                </div>
              ))
            ) : (
              <h1>No Checklist Added Yet</h1>
            )}

            <div className="mt-10 -ml-8">
              <input
                id="checklist_title"
                type="text"
                value={checklistTitle}
                onChange={(e) => setChecklistTitle(e?.target?.value)}
                className="font-poppins px-3 py-1 border border-brand-color outline-none rounded-md mr-2"
                placeholder="Checklist Title"
              />
              <button
                className="bg-brand-color text-white px-4 py-1.5 shadow rounded-md"
                onClick={handleAddCheckList}
              >
                +Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

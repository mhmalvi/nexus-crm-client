import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  handleCoursewiseSalesAssign,
  handleCreateChecklist,
  handleDeleteChecklist,
  handleFetchCourseCheckList,
} from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";
import { useEffect } from "react";
import { handleFetchCompanyEmployees } from "../../Components/services/company";
import { Select, message } from "antd";
import Avatar from "react-avatar";

const CourseDetails = ({ selectedCourse }) => {
  const [checklist, setChecklist] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    (async () => {
      const courseCheckList = await handleFetchCourseCheckList(
        selectedCourse?.id
      );
      if (courseCheckList?.data) {
        setChecklist(courseCheckList?.data);
      }
    })();
  }, [selectedCourse]);

  useEffect(() => {
    (async () => {
      const fetchEmployees = await handleFetchCompanyEmployees(
        userDetails?.client_id
      );

      if (fetchEmployees?.status === true) {
        const options = [];
        const salesEmployee = fetchEmployees?.data?.filter(
          (employee) => employee?.role_id === 5
        );

        salesEmployee?.forEach((employee) => {
          options.push({
            key: employee?.user_id,
            value: employee?.full_name,
            label: employee?.full_name,
          });
        });

        setCompanyEmployeeList(options);
      }
    })();
  }, [userDetails]);

  const handleAddCheckList = async () => {
    if (checklistTitle.length) {
      const addChecklistResponse = await handleCreateChecklist(
        userDetails?.client_id,
        userDetails?.id,
        selectedCourse?.id,
        checklistTitle
      );

      if (addChecklistResponse?.status) {
        // const courseCheckList = await handleFetchCourseCheckList(
        //   selectedCourse?.id
        // );
        // if (courseCheckList?.data) {
        setChecklist([...checklist, addChecklistResponse?.data]);
        // }

        // message.success("Checklist Added Successfully");
      }
    }
    setChecklistTitle("");
  };

  const handleDeleteChecklistReq = async (checkListId) => {
    const deleteCourseCheckList = await handleDeleteChecklist(checkListId);

    if (deleteCourseCheckList?.status) {
      setChecklist(checklist?.filter((list) => list?.id !== checkListId));
    }
  };

  const handleEmployeeChange = (name, details) => {
    setSelectedEmployees([...selectedEmployees, details]);
    setCompanyEmployeeList(
      companyEmployeeList?.filter((e) => e?.key !== details?.key)
    );
  };

  const handleCoursewiseSalesAssignReq = async () => {
    const salesAssignResponse = await handleCoursewiseSalesAssign({
      course_id: selectedCourse?.id,
      sales_id: [selectedEmployees?.map((details) => details.key)].toString(),
      assigned_by: userDetails?.user_id,
      client_id: userDetails?.client_id,
    });

    if (salesAssignResponse?.status === 201) {
      message.success("Employee assigned successfully");
    } else {
      message.warn("Something went wrong. Please try again");
    }
  };

  return (
    <div className="w-8/12 mx-auto py-16">
      <div>
        <div className="text-lg font-semibold uppercase">
          {selectedCourse?.course_title}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div>
          <div className="text-base font-semibold mb-4">Check Lists</div>
          <div>
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
          </div>

          <div className="mt-10">
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

        <div className="min-h-full w-0.5 bg-gray-100">&nbsp;</div>

        <div>
          <div className="text-base font-semibold mb-4">
            Assign Sales Employee
          </div>

          <div className="mb-4">
            {selectedEmployees?.map((employee, i) => (
              <span key={i} className="mx-1">
                <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="30"
                  name={employee?.value}
                />
              </span>
            ))}
          </div>

          <div>
            <div>
              <h1 className="text-xs font-poppins text-opacity-50">
                Select Employee
              </h1>

              <div>
                <Select
                  defaultValue="All"
                  placeholder="Select Employee"
                  onChange={handleEmployeeChange}
                  style={{
                    width: 200,
                  }}
                  options={companyEmployeeList}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              className="bg-brand-color text-white px-4 py-1.5 shadow rounded-md"
              onClick={handleCoursewiseSalesAssignReq}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

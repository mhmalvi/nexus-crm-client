import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  handleCreateChecklist,
  handleDeleteChecklist,
  handleFetchCourseCheckList,
  handleFetchCoursewiseAssignedEmployees,
} from "../../Components/services/leads";
import Icons from "../../Components/Shared/Icons";
import { useEffect } from "react";
import { handleFetchCompanyEmployees } from "../../Components/services/company";
import {
  successNotification,
  warningNotification,
} from "../../Components/Shared/Toast";

const CourseDetails = ({ selectedCourse }) => {
  const [checklist, setChecklist] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  // const [employeeList, setEmployeeList] = useState([]);
  // const [assignedEmployees, setAssignedEmployees] = useState([]);
  // const [selectedEmployees, setSelectedEmployees] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    // setSelectedEmployees([]);
    (async () => {
      const courseCheckList = await handleFetchCourseCheckList(
        selectedCourse?.id
      );
      if (courseCheckList?.data) {
        setChecklist(courseCheckList?.data);
      }
    })();
  }, [selectedCourse, userDetails]);

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
        // setEmployeeList(options);
      }
    })();
  }, [userDetails]);

  useEffect(() => {
    const assignedSalesEmployees = [];

    (async () => {
      const assignedEmployeesresp =
        await handleFetchCoursewiseAssignedEmployees({
          course_id: selectedCourse?.id,
          client_id: userDetails?.client_id,
        });
      if (assignedEmployeesresp?.status === 200) {
        assignedEmployeesresp?.data?.forEach((emp) => {
          const selectedCompanyEmployees = companyEmployeeList.find(
            (employee) => employee?.key === emp?.sales_id
          );
          assignedSalesEmployees.push(selectedCompanyEmployees);
        });
      }
    })();
  }, [companyEmployeeList, selectedCourse, userDetails]);

  const handleAddCheckList = async () => {
    if (checklistTitle.length) {
      const addChecklistResponse = await handleCreateChecklist(
        userDetails?.client_id,
        userDetails?.id,
        selectedCourse?.id,
        checklistTitle
      );

      if (addChecklistResponse?.status === 201) {
        setChecklist([...checklist, addChecklistResponse?.data]);
        successNotification(
          addChecklistResponse ? addChecklistResponse?.message : "Inserted"
        );
      } else {
        warningNotification(
          addChecklistResponse
            ? addChecklistResponse?.data?.message
            : "Something went wrong"
        );
      }
    }
    setChecklistTitle("");
  };

  const handleDeleteChecklistReq = async (checkListId) => {
    const deleteCourseCheckList = await handleDeleteChecklist(checkListId);

    if (deleteCourseCheckList?.status === 201) {
      setChecklist(checklist?.filter((list) => list?.id !== checkListId));
    } else {
      warningNotification(
        deleteCourseCheckList ? deleteCourseCheckList?.data?.message : "Failed"
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="m-0 p-0 text-lg font-semibold uppercase text-slate-300 border-b border-brand-color">
        {selectedCourse?.course_title}
      </h1>

      <div className="flex gap-4 flex-col justify-between">
        <h1 className="m-0 p-0 text-base font-semibold text-slate-300">
          Check Lists
        </h1>
        <div>
          {checklist.length ? (
            checklist?.map((list, i) => (
              <div
                key={i}
                className="flex items-center gap-4 justify-between w-full border-b "
              >
                <li className="list-disc ">{list?.title}</li>
                <Icons.Cross
                  className="text-red-600 w-4 cursor-pointer"
                  onClick={() => handleDeleteChecklistReq(list?.id)}
                />
              </div>
            ))
          ) : (
            <h1 className="m-0 p-0 text-slate-300">No Checklist Added Yet</h1>
          )}
        </div>

        <div className="flex w-full gap-4">
          <input
            id="checklist_title"
            type="text"
            value={checklistTitle}
            onChange={(e) => setChecklistTitle(e?.target?.value)}
            className="w-full font-poppins px-3 py-1 border border-brand-color outline-none rounded-md bg-transparent placeholder:!text-slate-300"
            placeholder="Checklist Title"
          />
          <button
            className="w-1/3 bg-brand-color text-white px-4 py-1.5 shadow rounded-md"
            onClick={handleAddCheckList}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

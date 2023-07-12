import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  handleCoursewiseSalesAssign,
  handleCreateChecklist,
  handleDeleteChecklist,
  handleDeleteCoursewiseSalesAssign,
  handleFetchCourseCheckList,
  handleFetchCoursewiseAssignedEmployees,
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
  const [employeeList, setEmployeeList] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const userDetails = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    setSelectedEmployees([]);
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
        setEmployeeList(options);
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

        var uniqueEmployees = companyEmployeeList.filter(function (obj) {
          return assignedSalesEmployees.indexOf(obj) === -1;
        });

        setEmployeeList(uniqueEmployees);
        setAssignedEmployees(assignedSalesEmployees);
      } else {
        setAssignedEmployees([]);
        setEmployeeList(companyEmployeeList);
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
        // const courseCheckList = await handleFetchCourseCheckList(
        //   selectedCourse?.id
        // );
        // if (courseCheckList?.data) {
        setChecklist([...checklist, addChecklistResponse?.data]);
        message.success(
          addChecklistResponse ? addChecklistResponse?.message : "Inserted"
        );
        // }

        // message.success("Checklist Added Successfully");
      } else {
        console.log("auth check:", addChecklistResponse);
        message.warn(
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
      message.warn(
        deleteCourseCheckList ? deleteCourseCheckList?.data?.message : "Failed"
      );
    }
  };

  const handleEmployeeChange = (name, details) => {
    setSelectedEmployees([...selectedEmployees, details]);
    setEmployeeList(
      employeeList?.filter((employee) => employee?.key !== details?.key)
    );
  };

  const handleCoursewiseSalesAssignReq = async () => {
    if (!selectedEmployees?.length) {
      message.warning("Please Select an employee first");
      return;
    }
    const salesAssignResponse = await handleCoursewiseSalesAssign({
      course_id: selectedCourse?.id,
      sales_id: [selectedEmployees?.map((details) => details.key)].toString(),
      assigned_by: userDetails?.user_id,
      client_id: userDetails?.client_id,
    });

    if (salesAssignResponse?.status === 201) {
      setAssignedEmployees([...assignedEmployees, ...selectedEmployees]);
      setSelectedEmployees([]);
      // setSyncAssignedEmployees(!syncAssignedEmployees);

      message.success("Employee assigned successfully");
    } else {
      message.warn("Something went wrong. Please try again");
    }
  };

  console.log("selectedEmployees", selectedEmployees);

  const handleRemoveAssignedEmployee = async (userDetails) => {
    console.log("userID", userDetails);

    const deleteSalesAssign = await handleDeleteCoursewiseSalesAssign({
      sales_user_id: userDetails?.key,
      course_id: selectedCourse?.id,
    });

    if (deleteSalesAssign?.status === 200) {
      message.success("Assigned user has been removed");
      setAssignedEmployees(
        assignedEmployees.filter(
          (employee) => employee?.key !== userDetails?.key
        )
      );
      setEmployeeList([...employeeList, userDetails]);
    } else {
      message.warn("Something went wrong");
    }
  };

  const handleRemoveSelectedEmployee = (userDetails) => {
    setSelectedEmployees(
      selectedEmployees.filter((employee) => employee?.key !== userDetails?.key)
    );
    setEmployeeList([...employeeList, userDetails]);
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

          <div className="mb-4 flex items-center">
            {assignedEmployees?.map((aemployee, i) => (
              <span key={i} className="relative mx-1">
                <Avatar
                  className="rounded-full shadow-sm"
                  size="36"
                  name={aemployee?.value}
                />
                <Icons.Cross
                  className="cursor-pointer absolute -right-0.5 -top-1 w-3.5 font-bold text-red-600 bg-gray-50/80 px-0.5 rounded-full border border-red-600"
                  onClick={() => handleRemoveAssignedEmployee(aemployee)}
                />
              </span>
            ))}
            {selectedEmployees?.map((semployee, i) => (
              <span key={i} className="relative mx-1">
                <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="36"
                  name={semployee?.value}
                />
                <Icons.Cross
                  className="cursor-pointer absolute -right-0.5 -top-1 w-3.5 font-bold text-red-600 bg-gray-50/80 px-0.5 rounded-full border border-red-600"
                  onClick={() => handleRemoveSelectedEmployee(semployee)}
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
                  allowClear={true}
                  autoClearSearchValue={true}
                  placeholder="Select Employee"
                  onChange={handleEmployeeChange}
                  value={null}
                  style={{
                    width: 200,
                  }}
                  options={employeeList}
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

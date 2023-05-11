import { Badge, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUpdateUserStatus,
  handleUserSuspendStatus,
} from "../../../Components/services/auth";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import { setLoader } from "../../../features/user/userSlice";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";

const SalesAdmins = ({ clientId }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);

  const [activeAddSupervisor, setActiveAddSupervisor] = useState(false);
  const [activeAddSeals, setActiveAddSeals] = useState(false);
  const [companyAdminEmployee, setCompanyAdminEmployee] = useState();
  const [companyAdvisorEmployees, setCompanyAdvisorEmployees] = useState([]);
  const [syncEmployees, setSyncEmployees] = useState(false);
  const [inactiveAdminEmployees, setInactiveAdminEmployees] = useState([]);
  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);
  const [inactiveSalesEmployees, setInactiveSalesEmployees] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(clientId);

      if (employeeResponse?.status === true) {
        // console.log(employeeResponse?.data);

        if (employeeResponse?.data?.length) {
          const admins = (employeeResponse?.data).filter(
            (employee) => employee?.role_id === 4 && employee?.suspend === 0
          );

          const sales = (employeeResponse?.data).filter(
            (employee) =>
              (employee?.role_id === 2 || employee?.role_id === 5) &&
              employee?.suspend === 0
          );

          setCompanyAdvisorEmployees(admins);
          setCompanySalesEmployees(sales);

          // console.log("LLLLL", employeeResponse?.data);

          setCompanyAdminEmployee(
            (employeeResponse?.data).find(
              (employee) =>
                (employee?.role_id === 1 || employee?.role_id === 3) &&
                employee?.suspend === 0
            )
          );

          setInactiveAdminEmployees(
            (employeeResponse?.data).filter(
              (employee) =>
                (employee?.role_id === 3 || employee?.role_id === 4) &&
                employee?.suspend === 1
            )
          );

          setInactiveSalesEmployees(
            (employeeResponse?.data).filter(
              (employee) => employee?.role_id === 5 && employee?.suspend === 1
            )
          );
        }
        dispatch(setLoader(false));
      }
    })();
  }, [clientId, dispatch, syncEmployees]);

  // const handleActiveUser = async (userId) => {
  //   const statusUpdateResponse = await handleUpdateUserStatus(userId, 1);
  //   console.log(statusUpdateResponse);

  //   if (statusUpdateResponse?.data?.status === true) {
  //     message.success("User Added Successfully");
  //     setSyncEmployees(!syncEmployees);
  //   }
  // };

  const handleRemoveUser = async (userId) => {
    const statusUpdateResponse = await handleUpdateUserStatus(userId, 0);
    console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      setSyncEmployees(!syncEmployees);
      message.success("Employee Removed Successfully");
    }
  };

  const handleAddSuspendedEmployee = async (userId) => {
    const statusUpdateResponse = await handleUserSuspendStatus(userId, 0);
    console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      setSyncEmployees(!syncEmployees);
      message.success("Employee reassigned Successfully");
    }
  };

  const handleSuspendEmployee = async (userId) => {
    const statusUpdateResponse = await handleUserSuspendStatus(userId, 1);
    // console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      message.success("Employee suspended Successfully");
      setSyncEmployees(!syncEmployees);
    }
  };

  // console.log("companyAdminEmployee", companyAdminEmployee);
  // console.log("companyAdminEmployee", companyAdminEmployee);
  // console.log("companySalesEmployees", companySalesEmployees);
  // console.log("companyAdvisorEmployees", companyAdvisorEmployees);
  // console.log("inactiveSalesEmployees", inactiveSalesEmployees);

  return (
    <div className="flex justify-between 2xl:justify-evenly mt-12 pt-0.5">
      <div className="2xl:mr-32">
        <div>
          <hr />

          <Modal
            title="Add Admin Employee"
            visible={activeAddSupervisor}
            footer={null}
            onCancel={() => setActiveAddSupervisor(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              roleId={4}
              clientId={clientId}
              setActiveAddSupervisor={setActiveAddSupervisor}
              setActiveAddSeals={setActiveAddSeals}
              syncEmployees={syncEmployees}
              setSyncEmployees={setSyncEmployees}
            />
          </Modal>

          <Modal
            title="Add Sales Employee"
            visible={activeAddSeals}
            footer={null}
            onCancel={() => setActiveAddSeals(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              clientId={clientId}
              roleId={userDetails?.userInfo?.role_id === 1 ? 2 : 5}
              setActiveAddSupervisor={setActiveAddSupervisor}
              setActiveAddSeals={setActiveAddSeals}
              syncEmployees={syncEmployees}
              setSyncEmployees={setSyncEmployees}
            />
          </Modal>

          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-3 my-0">
              Admins
            </h1>
            {(parseInt(userDetails?.userInfo?.client_id) ===
              parseInt(clientId) &&
              userDetails?.userInfo?.role_id === 1) ||
            userDetails?.userInfo?.role_id === 3 ? (
              <div>
                <div>
                  <button
                    className="py-1 whitespace-nowrap px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color 2xl:ml-29"
                    onClick={() => setActiveAddSupervisor(true)}
                  >
                    Add Supervisor
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <hr />
        </div>

        <div className="ml-8 px-4 mt-5">
          {/* Admin of Company */}
          {companyAdminEmployee ? (
            <div className="flex mb-6">
              <Avatar
                className="rounded-full cursor-pointer mt-2"
                size="38"
                color={Avatar.getRandomColor("sitebase", [
                  "red",
                  "green",
                  "#728FCE",
                  "violet",
                  "#2B547E",
                  "black",
                  "#87AFC7",
                  "Lime",
                  "#D5D6EA",
                  "#77BFC7",
                  "orange",
                  "#FDD017",
                  "#665D1E",
                ])}
                name={companyAdminEmployee?.full_name}
              />
              <Badge.Ribbon
                style={{
                  fontSize: "16px",
                }}
                text="*"
                color="volcano"
                size="small"
              >
                <div className="ml-4 mt-4 w-52">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {companyAdminEmployee?.full_name}
                  </h1>
                  <p className="font-medium text-xs leading-5 mb-0 text-gray-600 text-opacity-75">
                    {companyAdminEmployee?.email}
                  </p>
                </div>
              </Badge.Ribbon>
            </div>
          ) : null}

          {companyAdvisorEmployees.length ? (
            companyAdvisorEmployees.map((employee, i) => (
              <div key={i} className="flex mb-6">
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
                  color={Avatar.getRandomColor("sitebase", [
                    "red",
                    "green",
                    "#728FCE",
                    "violet",
                    "#2B547E",
                    "black",
                    "#87AFC7",
                    "Lime",
                    "#D5D6EA",
                    "#77BFC7",
                    "orange",
                    "#FDD017",
                    "#665D1E",
                  ])}
                  name={employee?.full_name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.full_name}
                  </h1>
                  <p className="font-medium text-xs leading-5 mb-0 text-gray-600 text-opacity-75">
                    {employee?.email}
                  </p>
                  {userDetails?.userInfo?.role_id === 1 ||
                  userDetails?.userInfo?.role_id === 2 ||
                  userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4 ? (
                    <div>
                      {(userDetails?.userInfo?.role_id === 1 ||
                        userDetails?.userInfo?.role_id === 2) && (
                        // userDetails?.userInfo?.role_id === 3
                        <button
                          className="border border-black px-1 py-0.5 text-xs rounded-md font-semibold text-black mt-3 mr-2"
                          onClick={() => handleRemoveUser(employee?.id)}
                        >
                          Remove
                        </button>
                      )}
                      <button
                        className="border border-red-500 px-1 py-0.5 text-xs rounded-md font-semibold text-red-500 mt-3"
                        onClick={() => handleSuspendEmployee(employee?.id)}
                      >
                        Suspend
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-base">No Employee Added Yet</h1>
          )}
        </div>

        {inactiveAdminEmployees.length ? (
          <div className="mt-10">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0 text-red-500">
              Inactive Admins
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-6 px-4">
              {inactiveAdminEmployees.map((employee, i) => (
                <div key={i} className="flex ">
                  {/* <div
                    className={`${
                      avatarColor[Math.floor(Math.random() * 10) + 1]
                    } w-7.5 h-7.5 p-3 border-2 text-red-500 uppercase border-black border-opacity-40 rounded-full flex justify-center items-center font-semibold text-sm leading-7`}
                  >
                    {(employee?.full_name).slice(0, 2)}
                  </div> */}
                  <Avatar
                    className="rounded-full cursor-pointer"
                    size="38"
                    // color={Avatar.getRandomColor("sitebase", [
                    //   "red",
                    //   "green",
                    //   "#728FCE",
                    //   "violet",
                    //   "#2B547E",
                    //   "black",
                    //   "#87AFC7",
                    //   "Lime",
                    //   "#D5D6EA",
                    //   "#77BFC7",
                    //   "orange",
                    //   "#FDD017",
                    //   "#665D1E",
                    // ])}
                    name={employee?.full_name}
                  />
                  <div className="ml-4">
                    <h1 className="text-red-500 font-semibold text-lg leading-5">
                      {employee?.full_name}
                    </h1>
                    <p className="text-red-500 font-medium text-xs leading-5 mb-0 text-opacity-75">
                      {employee?.email}
                    </p>
                    <button
                      className="border border-black px-2 py-0.5 text-xs rounded-md font-semibold text-black mt-3"
                      onClick={() => handleAddSuspendedEmployee(employee?.id)}
                    >
                      Reassign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="ml-2.5">
        <div>
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Sales Admins
            </h1>

            {(parseInt(userDetails?.userInfo?.client_id) ===
              parseInt(clientId) &&
              userDetails?.userInfo?.role_id === 1) ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ? (
              <div>
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color ml-29"
                  onClick={() => setActiveAddSeals(true)}
                >
                  Add Sales
                </button>
              </div>
            ) : null}
          </div>
          <hr />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {companySalesEmployees.length ? (
            companySalesEmployees.map((employee, i) => (
              <div key={i} className="flex ">
                {/* <div
                  className={`${
                    avatarColor[Math.floor(Math.random() * 10) + 1]
                  } w-7.5 h-7.5 p-3 border-2 uppercase border-black border-opacity-40 rounded-full flex justify-center items-center font-semibold text-sm leading-7`}
                >
                  {(employee?.full_name).slice(0, 2)}
                </div> */}
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
                  // color={Avatar.getRandomColor("sitebase", [
                  //   "red",
                  //   "green",
                  //   "#728FCE",
                  //   "violet",
                  //   "#2B547E",
                  //   "black",
                  //   "#87AFC7",
                  //   "Lime",
                  //   "#D5D6EA",
                  //   "#77BFC7",
                  //   "orange",
                  //   "#FDD017",
                  //   "#665D1E",
                  // ])}
                  name={employee?.full_name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.full_name}
                  </h1>
                  <p className="font-medium text-xs leading-5 mb-0 text-gray-600 text-opacity-75">
                    {employee?.email}
                  </p>

                  {userDetails?.userInfo?.role_id === 1 ||
                  userDetails?.userInfo?.role_id === 2 ||
                  userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4 ? (
                    <div>
                      {(userDetails?.userInfo?.role_id === 1 ||
                        userDetails?.userInfo?.role_id === 2) && (
                        <button
                          className="border border-black px-1 py-0.5 text-xs rounded-md font-semibold text-black mt-3 mr-2"
                          onClick={() => handleRemoveUser(employee?.id)}
                        >
                          Remove
                        </button>
                      )}

                      <button
                        className="border border-red-500 px-1 py-0.5 text-xs rounded-md font-semibold text-red-500 mt-3"
                        onClick={() => handleSuspendEmployee(employee?.id)}
                      >
                        Suspend
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <h1 className="font-semibold text-base text-">
              No Employee Added Yet
            </h1>
          )}
        </div>

        {inactiveSalesEmployees.length ? (
          <div className="mt-10">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0 text-red-500">
              Inactive Sales Admins
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-6 px-4">
              {inactiveSalesEmployees.map((employee, i) => (
                <div key={i} className="flex ">
                  <Avatar
                    className="rounded-full cursor-pointer"
                    size="38"
                    // color={Avatar.getRandomColor("sitebase", [
                    //   "red",
                    //   "green",
                    //   "#728FCE",
                    //   "violet",
                    //   "#2B547E",
                    //   "black",
                    //   "#87AFC7",
                    //   "Lime",
                    //   "#D5D6EA",
                    //   "#77BFC7",
                    //   "orange",
                    //   "#FDD017",
                    //   "#665D1E",
                    // ])}
                    name={employee?.full_name}
                  />
                  <div className="ml-4">
                    <h1 className="text-red-500 font-semibold text-lg leading-5">
                      {employee?.full_name}
                    </h1>
                    <p className="text-red-500 font-medium text-xs leading-5 mb-0 text-opacity-75">
                      {employee?.email}
                    </p>
                    <button
                      className="border border-black px-2 py-0.5 text-xs rounded-md font-semibold text-black mt-3"
                      onClick={() => handleAddSuspendedEmployee(employee?.id)}
                    >
                      Reassign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SalesAdmins;

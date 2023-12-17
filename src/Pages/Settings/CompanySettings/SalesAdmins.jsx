import { Badge, message, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchB2BUser,
  handleSuspandB2BUser,
  handleUpdateUserStatus,
  handleUserSuspendStatus,
} from "../../../Components/services/auth";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import { setLoader } from "../../../features/user/userSlice";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import {
  handleGetSalesAdmin,
  handleRemoveSalesAdmin,
} from "../../../Components/services/utils";

const SalesAdmins = ({ clientId }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);

  const [activeAddSupervisor, setActiveAddSupervisor] = useState(false);
  const [activeAddSeals, setActiveAddSeals] = useState(false);
  const [activeAddStudentAdmin, setActiveAddStudentAdmin] = useState(false);
  const [activeAddStudentAccountants, setActiveAddStudentAccountants] =
    useState(false);
  const [activeAddStudentAgency, setActiveAddStudentAgency] = useState(false);
  const [companyAdminEmployee, setCompanyAdminEmployee] = useState();
  const [companyAdvisorEmployees, setCompanyAdvisorEmployees] = useState([]);
  const [syncEmployees, setSyncEmployees] = useState(false);
  const [inactiveAdminEmployees, setInactiveAdminEmployees] = useState([]);
  const [companySalesEmployees, setCompanySalesEmployees] = useState([]);
  const [inactiveSalesEmployees, setInactiveSalesEmployees] = useState([]);
  const [allStudnetAdmin, setAllStudentAdmin] = useState([]);
  const [allStudnetAccountants, setAllStudentAccountants] = useState([]);
  const [allStudnetAgencys, setAllStudentAgencys] = useState([]);
  const [isSuspandStatusStudentAdmin, setIsSuspandStatusStudentAdmin] =
    useState(false);
  const [isSuspandStatusAccountant, setIsSuspandStatusStudentAccountant] =
    useState(false);
  const [isSuspandStatusAgency, setIsSuspandStatusStudentAgency] =
    useState(false);
  // const [isFeatingSalesAdminLoading, setIsFeatingSalesAdminLoading] =
  //   useState(false);
  // const [isRemovingSalesLoading, setIsRemovingSalesLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const status = isSuspandStatusStudentAdmin ? 1 : 0;
      const res = await handleFetchB2BUser(7, status);
      if (res?.status === 200) {
        setAllStudentAdmin(res?.data);
      }
    })();
  }, [clientId, isSuspandStatusStudentAdmin]);

  useEffect(() => {
    (async () => {
      const status = isSuspandStatusAccountant ? 1 : 0;
      const res = await handleFetchB2BUser(8, status);
      if (res?.status === 200) {
        setAllStudentAccountants(res?.data);
      }
    })();
  }, [clientId, isSuspandStatusAccountant]);
  useEffect(() => {
    (async () => {
      const status = isSuspandStatusAgency ? 1 : 0;
      const res = await handleFetchB2BUser(9, status);
      if (res?.status === 200) {
        setAllStudentAgencys(res?.data);
      }
    })();
  }, [clientId, isSuspandStatusAgency]);
  useEffect(() => {
    (async () => {
      const res = await handleGetSalesAdmin();
      if (res?.status === 200) {
        setCompanySalesEmployees(res?.data);
      }
    })();
  }, []);
  const getSalesAdminsSync = async () => {
    const res = await handleGetSalesAdmin();
    if (res?.status === 200) {
      setCompanySalesEmployees(res?.data);
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const employeeResponse = await handleFetchCompanyEmployees(clientId);

      if (employeeResponse?.status === true) {
        console.log("employee res:", employeeResponse?.data);

        if (employeeResponse?.data?.length) {
          const admins = (employeeResponse?.data).filter(
            (employee) => employee?.role_id === 4 && employee?.suspend === 0
          );

          setCompanyAdvisorEmployees(admins);

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


  const handleRemoveUser = async (userId) => {
    const statusUpdateResponse = await handleUpdateUserStatus(userId, 0);
    console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      getSalesAdminsSync();
      setSyncEmployees(!syncEmployees);
      message.success("Employee Removed Successfully");
    }
  };

  const handleAddSuspendedEmployee = async (userId) => {
    const statusUpdateResponse = await handleUserSuspendStatus(userId, 0);
    console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      getSalesAdminsSync();
      setSyncEmployees(!syncEmployees);
      message.success("Employee reassigned Successfully");
    }
  };

  const handleSuspendEmployee = async (userId) => {
    const statusUpdateResponse = await handleUserSuspendStatus(userId, 1);
    // console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      message.success("Employee suspended Successfully");
      getSalesAdminsSync();
      setSyncEmployees(!syncEmployees);
    }
  };
  const handleSuspendB2BEmployee = async (userId) => {
    const status = isSuspandStatusStudentAdmin ? 0 : 1;
    const statusUpdateResponse = await handleUserSuspendStatus(userId, status);
    // console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      const status = isSuspandStatusStudentAdmin ? 1 : 0;
      const resep = await handleFetchB2BUser(7, status);
      if (resep?.status === 200) {
        setAllStudentAdmin(resep?.data);
      }
    }
  };
  const handleSuspendB2BEmployeeAccount = async (userId) => {
    const status = isSuspandStatusAccountant ? 0 : 1;
    const statusUpdateResponse = await handleUserSuspendStatus(userId, status);
    // console.log(statusUpdateResponse);

    if (statusUpdateResponse?.data?.status === true) {
      const status = isSuspandStatusAccountant ? 1 : 0;
      const resep = await handleFetchB2BUser(8, status);
      if (resep?.status === 200) {
        setAllStudentAccountants(resep?.data);
      }
    }
  };
  const handleSuspendB2BEmployeeAgency = async (userId) => {
    const status = isSuspandStatusAgency ? 0 : 1;
    const statusUpdateResponse = await handleUserSuspendStatus(userId, status);

    if (statusUpdateResponse?.data?.status === true) {
      const status = isSuspandStatusAgency ? 1 : 0;
      const resep = await handleFetchB2BUser(9, status);
      if (resep?.status === 200) {
        setAllStudentAgencys(resep?.data);
      }
    }
  };


  return (
    <div className="flex flex-wrap justify-between 2xl:justify-evenly mt-12 pt-0.5 w-full !grid !grid-cols-12 gap-2">
      <div className="2xl:mr-32 !h-[300px] relative crm-scroll-none overflow-y-auto w-[100%] w-full !col-span-12  lg:!col-span-6">
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
              flag={0}
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
              flag={0}
            />
          </Modal>
          <Modal
            title="Add Student Admin"
            visible={activeAddStudentAdmin}
            footer={null}
            onCancel={() => setActiveAddStudentAdmin(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              clientId={clientId}
              flag={1}
              setActiveAddStudentAdmin={setActiveAddStudentAdmin}
            />
          </Modal>
          <Modal
            title="Add Accountants"
            visible={activeAddStudentAccountants}
            footer={null}
            onCancel={() => setActiveAddStudentAccountants(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              clientId={clientId}
              flag={2}
              setActiveAddStudentAccountants={setActiveAddStudentAccountants}
            />
          </Modal>
          <Modal
            title="Add Agency"
            visible={activeAddStudentAgency}
            footer={null}
            onCancel={() => setActiveAddStudentAgency(false)}
            width={600}
          >
            <EmployeeRegistrationForm
              clientId={clientId}
              flag={3}
              setActiveAddStudentAccountants={setActiveAddStudentAccountants}
            />
          </Modal>

          <div className="flex items-center sticky top-0 w-full bg-slate-100">
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
                        userDetails?.userInfo?.role_id === 2 ||
                        userDetails?.userInfo?.role_id === 3) && (
                        // userDetails?.userInfo?.role_id === 3
                        <Popconfirm
                          title="Are you sure to remove this Admin"
                          okText="Yes"
                          onConfirm={() => handleRemoveUser(employee?.user_id)}
                        >
                          <button className="border border-black px-1 py-0.5 text-xs rounded-md font-semibold text-black mt-3 mr-2">
                            Remove
                          </button>
                        </Popconfirm>
                      )}
                      <button
                        className="border border-red-500 px-1 py-0.5 text-xs rounded-md font-semibold text-red-500 mt-3"
                        onClick={() => handleSuspendEmployee(employee?.user_id)}
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
                  <Avatar
                    className="rounded-full cursor-pointer"
                    size="38"
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
                      onClick={() =>
                        handleAddSuspendedEmployee(employee?.user_id)
                      }
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

      {/* Sales admins box */}
      <div className="!relative ml-2.5 h-[300px] overflow-y-auto  crm-scroll-none w-[100%] w-full !col-span-12  lg:!col-span-6">
        <div className=" sticky top-0 w-full bg-slate-100">
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
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
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
                        userDetails?.userInfo?.role_id === 2 ||
                        userDetails?.userInfo?.role_id === 3 ||
                        userDetails?.userInfo?.role_id === 4 ||
                        userDetails?.userInfo?.role_id === 5) && (
                        <Popconfirm
                          title="Are you sure to remove this Sales Admin"
                          onConfirm={() => handleRemoveUser(employee?.user_id)}
                          okText="Yes"
                        >
                          <button className="border border-black px-1 py-0.5 text-xs rounded-md font-semibold text-black mt-3 mr-2">
                            Remove
                          </button>
                        </Popconfirm>
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
      {/* Studnet Admin box */}
      <div className="!relative ml-2.5 h-[300px] overflow-y-auto  crm-scroll-none w-[100%] w-full !col-span-12  lg:!col-span-6">
        <div className=" sticky top-0 w-full bg-slate-100">
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Student Admin
            </h1>

            {(parseInt(userDetails?.userInfo?.client_id) ===
              parseInt(clientId) &&
              userDetails?.userInfo?.role_id === 1) ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ? (
              <div className="flex items-center gap-2">
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() => setActiveAddStudentAdmin(true)}
                >
                  Add Admin
                </button>
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() =>
                    setIsSuspandStatusStudentAdmin(!isSuspandStatusStudentAdmin)
                  }
                >
                  {isSuspandStatusStudentAdmin ? "Active" : "InActive"}
                </button>
              </div>
            ) : null}
          </div>
          <hr />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {allStudnetAdmin.length ? (
            allStudnetAdmin.map((employee, i) => (
              <div key={i} className="flex ">
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
                  name={employee?.student_admin_name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.student_admin_name}
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
                        className={`border px-1 py-0.5 text-xs rounded-md font-semibold  mt-3 ${
                          isSuspandStatusStudentAdmin
                            ? " border-green-500 text-green-500"
                            : " border-red-500 text-red-500"
                        }`}
                        onClick={() =>
                          handleSuspendB2BEmployee(employee?.id, 0)
                        }
                      >
                        {!isSuspandStatusStudentAdmin ? "Suspend" : "ReAssign"}
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
      </div>
      {/* Accountant box */}

      <div className="!relative ml-2.5 h-[300px] overflow-y-auto  crm-scroll-none w-[100%] w-full !col-span-12  lg:!col-span-6">
        <div className=" sticky top-0 w-full bg-slate-100">
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Accountants
            </h1>

            {(parseInt(userDetails?.userInfo?.client_id) ===
              parseInt(clientId) &&
              userDetails?.userInfo?.role_id === 1) ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ? (
              <div className="flex items-center gap-2">
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() => setActiveAddStudentAccountants(true)}
                >
                  Add Accountant
                </button>
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() =>
                    setIsSuspandStatusStudentAccountant(
                      !isSuspandStatusAccountant
                    )
                  }
                >
                  {isSuspandStatusAccountant ? "Active" : "InActive"}
                </button>
              </div>
            ) : null}
          </div>
          <hr />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {allStudnetAccountants.length ? (
            allStudnetAccountants.map((employee, i) => (
              <div key={i} className="flex ">
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
                  name={employee?.student_admin_name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.student_admin_name}
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
                        className={`border px-1 py-0.5 text-xs rounded-md font-semibold  mt-3 ${
                          isSuspandStatusAccountant
                            ? " border-green-500 text-green-500"
                            : " border-red-500 text-red-500"
                        }`}
                        onClick={() =>
                          handleSuspendB2BEmployeeAccount(employee?.id, 0)
                        }
                      >
                        {!isSuspandStatusAccountant ? "Suspend" : "ReAssign"}
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
      </div>

      {/* Agency Box */}

      <div className="!relative ml-2.5 h-[300px] overflow-y-auto  crm-scroll-none w-[100%] w-full !col-span-12  lg:!col-span-6">
        <div className=" sticky top-0 w-full bg-slate-100">
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Agency
            </h1>

            {(parseInt(userDetails?.userInfo?.client_id) ===
              parseInt(clientId) &&
              userDetails?.userInfo?.role_id === 1) ||
            userDetails?.userInfo?.role_id === 3 ||
            userDetails?.userInfo?.role_id === 4 ? (
              <div className="flex items-center gap-2">
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() => setActiveAddStudentAgency(true)}
                >
                  Add Agency
                </button>
                <button
                  className="py-1 px-2 text-xs leading-6 font-medium border border-brand-color rounded-md text-brand-color "
                  onClick={() =>
                    setIsSuspandStatusStudentAgency(!isSuspandStatusAgency)
                  }
                >
                  {isSuspandStatusAgency ? "Active" : "InActive"}
                </button>
              </div>
            ) : null}
          </div>
          <hr />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {allStudnetAgencys.length ? (
            allStudnetAgencys.map((employee, i) => (
              <div key={i} className="flex ">
                <Avatar
                  className="rounded-full cursor-pointer"
                  size="38"
                  name={employee?.student_admin_name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-lg leading-5 text-gray-600">
                    {employee?.student_admin_name}
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
                        className={`border px-1 py-0.5 text-xs rounded-md font-semibold  mt-3 ${
                          isSuspandStatusAgency
                            ? " border-green-500 text-green-500"
                            : " border-red-500 text-red-500"
                        }`}
                        onClick={() =>
                          handleSuspendB2BEmployeeAgency(employee?.id, 0)
                        }
                      >
                        {!isSuspandStatusAgency ? "Suspend" : "ReAssign"}
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
      </div>
    </div>
  );
};

export default SalesAdmins;

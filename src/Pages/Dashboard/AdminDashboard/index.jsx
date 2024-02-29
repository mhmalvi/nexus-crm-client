import { CloseOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Icons from "../../../Components/Shared/Icons";
import Notifications from "../../Notifications/index.jsx";
import NotifyModal from "../../Notifications/NotifyModal.jsx";

import { handleNotificationViewed } from "../../../Components/services/notification";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import {
  handleFetchLeads,
  handleSyncLeads,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import dayjs from "dayjs";
import Filters from "./Filters";
import { Button, Input, Modal, Space, Tooltip, message } from "antd";
import Highlighter from "react-highlight-words";
import UpdatedTable from "./UpdatedTable";
import AddLeadForm from "./AddLeadForm";
import {
  handleAssignLeadToSales,
  handleGetSalesAdmin,
  handleSalesRemoveLead,
} from "../../../Components/services/utils";
import { useNavigate } from "react-router-dom";
import ViewLeadCallDetails from "./ViewLeadCallDetails";
import SearchEmployee from "./SearchEmployee";
import CountryList from "./CountryList";
import UserLabel from "./UserLabel";
import NoticeForm from "./NoticeForm";
import CalendarSmall from "./CalendarSmall";
import ProfileSettings from "./ProfileSettings.jsx";
import "./dashboard.css";
import { io } from "socket.io-client";
import { setNotifications } from "../../../features/user/notificationSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const openSideBar = useSelector((state) => state?.user)?.openSideBar;
  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;
  const notifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const [activeFilter, setActiveFilter] = useState(
    userDetails?.userInfo?.role_id === 5 ? 8 : 0
  );
  const [activeStars, setActiveStars] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [syncLeads, setSyncLeads] = useState(false);
  const [isAddLeadFormOpen, setIsAddLeadFormOpen] = useState(false);

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  // For Search Table Data
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableSearchInput = useRef(null);

  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [tableHeaders, setTableHeaders] = useState([]);
  const [salesOptions, setSalesOptions] = useState([]);
  const [selectedSales, setSelectedSales] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  const [notificationLoading, setNotificationLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openCallCountDetailsModal, setOpenCallCountDetailsModal] =
    useState(false);
  let [clickedLeadId, setClickedLeadId] = useState("");
  const navigate = useNavigate();
  const [toggleNotification, setToggleNotification] = useState(false);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);

  const handleViewed = async () => {
    try {
      const res = await handleNotificationViewed(viewedData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedFetchLeads = useMemo(
    () => async () => {
      const response = await handleFetchLeads({
        client_id: userDetails?.userInfo?.client_id,
        user_id: userDetails?.userInfo?.user_id,
        role_id: userDetails?.userInfo?.role_id,
      });

      if (response?.data) {
        dispatch(addLeads(response.data));
      }

      const fetchEmployees = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.client_id
      );

      if (fetchEmployees?.status === true) {
        setCompanyEmployeeList(fetchEmployees?.data);
      }

      setLeadData(response.data);
    },
    [
      dispatch,
      userDetails?.userInfo?.client_id,
      userDetails?.userInfo?.role_id,
      userDetails?.userInfo?.user_id,
    ]
  );

  useEffect(() => {
    memoizedFetchLeads();
  }, [memoizedFetchLeads]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
        )
      );
    } else {
      setLeadData(leadList);
    }
  }, [leadList, selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    if (filterDate.length) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === filterDate?.toString()
        )
      );
    } else {
      setLeadData(leadList);
    }
  }, [filterDate, leadList]);

  useEffect(() => {
    (async () => {
      const res = await handleGetSalesAdmin();

      if (res?.status === 200) {
        const data = [{ value: "", label: "Select Sales" }];
        res?.data?.forEach((item, idx) => {
          data.push({ value: item?.user_id, label: item?.full_name });
        });
        setSalesOptions(data);
      }
    })();
  }, [userDetails?.userInfo?.client_id]);

  const onAssignLead = useCallback(
    async (lid, sid) => {
      setAssignLoading(true);

      if (sid) {
        const data = {
          lead_id: lid,
          sales_user_id: sid,
          assign_by: userDetails?.user_id,
          active_status: 1,
        };
        try {
          const res = await handleAssignLeadToSales(data);
          if (res?.status === 201) {
            setAssignLoading(false);
            message.success("Lead successfully assigned to sales");

            // Fetch leads without updating the state
            const response = await handleFetchLeads({
              client_id: userDetails?.userInfo?.client_id,
              user_id: userDetails?.userInfo?.user_id,
              role_id: userDetails?.userInfo?.role_id,
            });

            if (response?.status === 200) {
              setLeadData(response.data);
            }
          } else {
            setAssignLoading(false);
            message.warn("Failed/Something went wrong");
          }
        } catch (error) {
          console.error("Error assigning lead:", error);
          setAssignLoading(false);
          message.error("An error occurred while assigning lead");
        }
      } else {
        setAssignLoading(false);
        message.warn("Please select a sales to assign");
      }
    },
    [
      userDetails?.user_id,
      userDetails?.userInfo?.client_id,
      userDetails?.userInfo?.user_id,
      userDetails?.userInfo?.role_id,
    ]
  );

  const onRemoveSales = useCallback(
    async (lid, sid) => {
      const data = {
        lead_id: lid,
        sales_user_id: sid,
      };
      try {
        const res = await handleSalesRemoveLead(data);
        if (res?.status === 201) {
          message.success("Removed Sales Successfully");
          const response = await handleFetchLeads({
            client_id: userDetails?.userInfo?.client_id,
            user_id: userDetails?.userInfo?.user_id,
            role_id: userDetails?.userInfo?.role_id,
          });

          if (response?.status === 200) {
            setLeadData(response.data);
          }
        } else {
          message.warn("Failed/Something went wrong");
        }
      } catch (error) {
        console.error("Error removing sales:", error);
        message.error("An error occurred while removing sales");
      }
    },
    [userDetails?.userInfo, setLeadData]
  );

  const getColumnSearchProps = useMemo(
    () => (dataIndex) => {
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters, confirm, selectedKeys, dataIndex) => {
        setSearchText("");
        clearFilters();
      };
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          close,
        }) => (
          <div className="searchModals" onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={tableSearchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              className="focus:!border-brand-color active:!border-brand-color focus:!outline-none active:!ring-red-300"
            />
            <div className="w-full gap-2 flex items-center justify-between">
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                className="!flex !flex-grow !items-center !justify-around !bg-brand-color !border-none !rounded-md "
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm({ closeDropdown: false });
                  handleReset(clearFilters, selectedKeys, dataIndex);
                }}
                size="small"
                className="!flex !flex-grow !items-center !justify-around !bg-slate-300 !border-none !rounded-md hover:!text-brand-color"
              >
                Clear
              </Button>
            </div>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? "#1890ff" : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => tableSearchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: "#8250FF",
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text?.toString() : ""}
            />
          ) : (
            text
          ),
      };
    },
    [searchText, searchedColumn]
  );

  useEffect(() => {
    const assignButton = {
      title: "Assign Lead",
      dataIndex: "assign_lead",
      key: "assign_lead",
      width: 100,
      render: (id, record, idx) => {
        return (
          <>
            <button
              loading={assignLoading}
              type="primary"
              size="small"
              onClick={() => {
                const sid = localStorage.getItem("sales_id");
                onAssignLead(record?.lead_id, sid);
              }}
              className={`rounded-md px-2 py-1 border ${
                colorMode ? "border-slate-300" : "border-gray-800"
              } flex items-center justify-center w-full hover:scale-95`}
            >
              <p
                className={`p-0 m-0 text-xs ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Assign
              </p>
            </button>
          </>
        );
      },
    };
    const assignTO = {
      title: "Assigned to",
      dataIndex: "sales_user_id",
      key: "sales_user_id",
      width: 100,
      render: (_, record, idx) => {
        return (
          <div className="flex gap-4 w-full items-center justify-center">
            <div className="flex items-center ">
              {
                companyEmployeeList?.find(
                  (employee) => employee?.user_id === record?.sales_user_id
                )?.full_name
              }
            </div>
            <div className="flex items-center">
              {/* {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) &&
              record?.sales_user_id !== 0 ? (
                <div className=""></div>
              ) : null} */}
              {companyEmployeeList?.find(
                (employee) => employee?.user_id === record?.sales_user_id
              ) && (
                <CloseOutlined
                  className="cursor-pointer"
                  title="Remove Sales"
                  onClick={() => {
                    onRemoveSales(record?.lead_id, record?.sales_user_id);
                  }}
                />
              )}
            </div>
          </div>
        );
      },
    };
    const headers = [
      {
        title: "View",
        dataIndex: "view",
        key: "view",
        align: "center",
        render: (_, record, idx) => {
          return (
            <>
              <Tooltip title="View Lead Details">
                <EyeOutlined
                  className="!p-1 text-[25px] bg-gray !w-[5vw]"
                  onClick={() => {
                    navigate(`/lead/${record?.lead_id}`);
                  }}
                />
              </Tooltip>
            </>
          );
        },
        width: 100,
      },
      ...(userDetails?.userInfo?.role_id === 1 ||
      userDetails?.userInfo?.role_id === 3
        ? [assignButton]
        : []),
      ...(userDetails?.userInfo?.role_id === 1 ||
      userDetails?.userInfo?.role_id === 3
        ? [assignTO]
        : []),
      {
        title: "Date",
        dataIndex: "lead_apply_date",
        key: "lead_apply_date",
        render: (lead_apply_date) => (
          <h4 className="cursor-pointer">
            {new Date(new Date(lead_apply_date).getTime() + 6 * 60 * 60 * 1000)
              ?.toString()
              ?.slice(0, 24)}
          </h4>
        ),
        width: 150,
      },
      {
        title: "No. of calls",
        dataIndex: "call_count",
        render: (_, record, idx) => (
          <h4 key={idx} className="cursor-pointer uppercase">
            <button
              onClick={() => {
                setClickedLeadId(record?.lead_id);
                setOpenCallCountDetailsModal(true);
              }}
              className={`rounded-md px-2 py-1 flex items-center justify-center w-full hover:scale-95`}
            >
              <div
                className={`flex flex-row m-auto justify-between ${
                  colorMode ? "text-blue-300" : "text-blue-800"
                } underline underline-offset-2 cursor-pointer hover:text-blue-700`}
              >
                <p className={`text-xs m-0`}>
                  {record.call_count != null ? record.call_count : 0} Call
                  Details
                </p>
              </div>
            </button>
          </h4>
        ),
        width: 150,
      },
      {
        title: "Course Code",
        dataIndex: "course_code",
        key: "course_code",
        ...getColumnSearchProps("title"),
        ...getColumnSearchProps("course_code"),
        render: (_, record, idx) => (
          <h4 className="cursor-pointer uppercase">{record?.course_code}</h4>
        ),
        width: 150,
      },
      {
        title: "Course Name",
        dataIndex: "course_title",
        key: "course_title",
        ...getColumnSearchProps("course_title"),
        render: (title) => (
          <h4 className="cursor-pointer uppercase">{title}</h4>
        ),
        width: 300,
      },
      {
        title: "Customer Name",
        dataIndex: "full_name",
        key: "full_name",
        ...getColumnSearchProps("full_name"),
        render: (_, record, idx) => (
          <h4 className="cursor-pointer">{record.full_name}</h4>
        ),
        width: 150,
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        ...getColumnSearchProps("phone_number"),
        render: (phone_number) => (
          <h4 className="cursor-pointer">{phone_number}</h4>
        ),
        width: 150,
      },
      {
        title: "From",
        dataIndex: "lead_from",
        key: "work_location",
        ...getColumnSearchProps("work_location"),
        render: (_, record, idx) => (
          <h4 className="cursor-pointer uppercase">{record.lead_from}</h4>
        ),
        width: 100,
      },
      {
        title: "Location",
        dataIndex: "work_location",
        key: "work_location",
        ...getColumnSearchProps("work_location"),
        render: (location) => (
          <h4 className="cursor-pointer uppercase">{location}</h4>
        ),
        width: 100,
      },
      {
        title: "Campaign ID",
        dataIndex: "campaign_id",
        key: "campaign_id",
        ...getColumnSearchProps("campaign_id"),
        render: (campaign_id) => (
          <h4 className="cursor-pointer">{campaign_id}</h4>
        ),
        width: 150,
      },
      {
        title: "Lead Status",
        dataIndex: "lead_details_status",
        key: "lead_details_status",
        render: (lead_details_status) => (
          <div className="flex items-center justify-center">
            {statusColor
              .filter((status) => status.id === lead_details_status)
              .map((lead_status, i) => (
                <div
                  key={i}
                  className=" flex gap-4 items-center py-1 px-4 rounded-md shadow-md bg-[#ffffff11]"
                >
                  <div
                    className={`w-2 h-2 ${lead_status.color} rounded-full`}
                  ></div>
                  <div>{lead_status.title}</div>
                </div>
              ))}
          </div>
        ),
        width: 120,
      },
    ];
    setTableHeaders([...headers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    companyEmployeeList,
    userDetails?.userInfo,
    assignLoading,
    onAssignLead,
    onRemoveSales,
    navigate,
    colorMode,
  ]);

  const handleFilterLeadList = useMemo(
    () => (filterId) => {
      setActiveFilter(filterId);
      if (filterId === 0 || filterId === 7) {
        setLeadData(
          leadList?.filter((lead) => parseInt(lead?.lead_details_status) !== 0)
        );
      } else if (filterId === 8) {
        setLeadData(
          leadList
            .filter(
              (lead) =>
                parseInt(lead.sales_user_id) ===
                  parseInt(userDetails?.userInfo?.user_id) ||
                (lead?.assignedHistory?.includes(
                  userDetails?.userInfo?.user_id
                ) &&
                  lead.sales_user_id === 0)
            )
            ?.sort(
              (date1, date2) =>
                new Date(date2.updated_at) - new Date(date1.updated_at)
            )
        );
      } else if (filterId === 9) {
        setLeadData(
          leadList
            .filter((lead) => parseInt(lead.lead_details_status) === 0)
            ?.sort(
              (date1, date2) =>
                new Date(date2.updated_at) - new Date(date1.updated_at)
            )
        );
      } else {
        setLeadData(
          leadList.filter(
            (lead) => parseInt(lead.lead_details_status) === filterId
          )
        );
      }
    },
    [setActiveFilter, setLeadData, leadList, userDetails?.userInfo]
  );

  useEffect(() => {
    const handlePageReload = () => {
      localStorage.removeItem("sales_id");
    };
    window.addEventListener("beforeunload", handlePageReload);

    return () => {
      window.removeEventListener("beforeunload", handlePageReload);
    };
  });

  const handleStaredLeadsFilter = useMemo(
    () => (starFilterId) => {
      setActiveFilter(starFilterId);
      setLeadData(
        leadList.filter(
          (lead) => parseInt(lead.star_review) === starFilterId - 9
        )
      );
    },
    [leadList]
  );

  const handleSyncLeadsReq = async () => {
    message.success("Sync in progress...");
    const syncResponse = await handleSyncLeads(
      userDetails?.userInfo?.client_id,
      userDetails?.userInfo?.ac_k
    );
    if (syncResponse?.status) {
      setSyncLeads(!syncLeads);
      window.location.reload();
    }
  };

  const handleFilterAssignedEmployee = useCallback(
    (userName) => {
      if (userName !== "All") {
        const employee = companyEmployeeList?.find(
          (employee) => employee?.full_name === userName
        );

        setLeadData(
          leadList?.filter((lead) => lead?.sales_user_id === employee?.user_id)
        );
      } else {
        setLeadData(leadList);
      }
    },
    [companyEmployeeList, leadList, setLeadData]
  );
  const handleCancelProfile = () => {
    setOpenProfile(false);
  };
  const [viewedData, setViewedData] = useState({
    user_id: userDetails.userInfo.id,
    id: [null],
  });
  const socket = io("https://crmnotification.queleadscrm.com");

  socket.connect();
  useEffect(() => {
    socket.emit("message", { user_id: userDetails.userInfo.id });
    const handleMessage = (e) => {
      dispatch(setNotifications(e));
      setViewedData((prevData) => ({
        ...prevData,
        id: e.map((item) => item.id),
      }));
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [dispatch, socket, userDetails.userInfo.id, setViewedData]);
  return (
    <div className="w-full max-h-screen flex flew-wrap gap-4 h-[90vh] ">
      <div className="w-4/5 border-black rounded-md p-4 max-h-[90vh] shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-y-hidden">
        <Modal
          visible={isAddLeadFormOpen}
          onCancel={() => setIsAddLeadFormOpen(false)}
          footer={false}
        >
          <AddLeadForm setIsAddLeadFormOpen={setIsAddLeadFormOpen} />
        </Modal>
        <Modal
          className="CallModal"
          visible={openCallCountDetailsModal}
          onCancel={() => setOpenCallCountDetailsModal(false)}
          footer={false}
        >
          <ViewLeadCallDetails
            lead_id={clickedLeadId}
            setOpenCallCountDetailsModal={setOpenCallCountDetailsModal}
          />
        </Modal>
        <div className="relative flex flex-col justify-start h-full">
          <div className="w-full flex justify-between gap-4">
            <div className="">
              <Filters
                layout="Dashboard"
                handleFilterLeadList={handleFilterLeadList}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                activeStars={activeStars}
                filterOptions={
                  userDetails?.userInfo?.role_id === 3 ||
                  userDetails?.userInfo?.role_id === 4
                    ? adminFilterOptions
                    : salesEmployeesFilterOptions
                }
                ratings={ratings}
                handleStaredLeadsFilter={handleStaredLeadsFilter}
                setActiveStars={setActiveStars}
                setSearchInput={setSearchInput}
                companyEmployeeList={companyEmployeeList}
                handleFilterAssignedEmployee={handleFilterAssignedEmployee}
              />
            </div>
            <div className="w-2/5">
              <CountryList table_title="Lead List" />
            </div>
          </div>
          <div className="w-full">
            <UpdatedTable
              table_title="Lead List"
              tableHeaders={tableHeaders}
              data={leadData}
              companyEmployeeList={companyEmployeeList}
              filterOptions={
                userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4
                  ? adminFilterOptions
                  : salesEmployeesFilterOptions
              }
              ratings={ratings}
              activeFilter={activeFilter}
              searchInput={searchInput}
              handleSyncLeadsReq={handleSyncLeadsReq}
              setIsAddLeadFormOpen={setIsAddLeadFormOpen}
              setSyncLeads={setSyncLeads}
              syncLeads={syncLeads}
              selectedSales={selectedSales}
              setSelectedSales={setSelectedSales}
              salesOptions={salesOptions}
              setSalesOptions={setSalesOptions}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-1/5 flex flex-col items-center justify-between h-full`}
      >
        <div className="relative w-full flex items-center justify-between p-3 rounded-md h-[6vh] shadow-md backdrop-blur-2xl bg-[#ffffff11] z-50">
          <div
            className={` realtive  m-0 p-2 cursor-pointer flex hover:scale-105 `}
            onClick={(e) => {
              setToggleNotification(!toggleNotification);
              setNotificationLoading(true);
              e.stopPropagation();
              handleViewed();
            }}
          >
            <Icons.Bell
              className={`${
                toggleNotification
                  ? "text-black"
                  : colorMode
                  ? "text-white"
                  : "text-gray-800"
              } w-4 `}
            />
            {notifications?.filter((notifi) => notifi?.status)?.length !== 0 ? (
              <div className="fixed flex justify-center items-center">
                <div className="bg-[#FF3B30] rounded-full text-white text-[10px] font-poppins px-2 mt-[-8px] ml-3">
                  {notifications?.filter((notifi) => notifi?.status)?.length}
                </div>
              </div>
            ) : null}
          </div>
          <UserLabel
            setOpenProfile={setOpenProfile}
            openProfile={openProfile}
          />
        </div>
        {toggleNotification && (
          <div className="absolute w-screen h-screen flex justify-end left-0 top-0 z-10">
            <div className="relative w-screen h-screen">
              <div
                className="absolute w-screen h-screen bg-[#ffffff11] backdrop-blur-sm"
                onClick={() => {
                  setToggleNotification(false);
                  setIsNotifyOpen(false);
                }}
              ></div>
              <div
                className={`absolute ${
                  openSideBar ? "right-32" : "right-80"
                } top-32`}
              >
                <Notifications
                  viewedData={viewedData}
                  toggleNotification={toggleNotification}
                  setToggleNotification={setToggleNotification}
                  notificationLoading={notificationLoading}
                  setNotificationLoading={setNotificationLoading}
                  setIsNotifyOpen={setIsNotifyOpen}
                  setNotificationData={setNotificationData}
                />
              </div>
              <div
                className="absolute right-[30vw] top-32 flex items-center justify-center"
                onClick={() => {
                  setIsNotifyOpen(false);
                  setToggleNotification(false);
                }}
              >
                {isNotifyOpen && (
                  <NotifyModal
                    notificationData={notificationData}
                    isNotifyOpen={isNotifyOpen}
                    setIsNotifyOpen={setIsNotifyOpen}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <Modal
          visible={openProfile}
          onCancel={() => {
            handleCancelProfile();
            setOpenProfile(false);
            setToggleEditDetails(false);
          }}
          footer={null}
          closable={handleCancelProfile}
          className={
            colorMode ? "profileSettingsModalDark" : "profileSettingsModalLight"
          }
        transitionName=""
          closeIcon={" "}
          mask={() => setOpenProfile(false)}
          width="21%"
        >
          <ProfileSettings
            openProfile={openProfile}
            setToggleEditDetails={setToggleEditDetails}
            toggleEditDetails={toggleEditDetails}
          />
        </Modal>

        <>
          <div className="w-full">
            <SearchEmployee
              layout="Dashboard"
              companyEmployeeList={companyEmployeeList}
              handleFilterAssignedEmployee={handleFilterAssignedEmployee}
            />
          </div>
          <div className="w-full">
            <NoticeForm />
          </div>
          <div className="w-full">
            <CalendarSmall
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default AdminDashboard;

const adminFilterOptions = [
  {
    id: 0,
    title: "All",
  },
  {
    id: 1,
    title: "New Lead",
  },
  {
    id: 2,
    title: "Skilled",
  },
  {
    id: 3,
    title: "Called",
  },
  {
    id: 4,
    title: "Paid",
  },
  {
    id: 5,
    title: "Verified",
  },
  {
    id: 6,
    title: "Completed",
  },
  {
    id: 9,
    title: "Suspended",
  },
];

const salesEmployeesFilterOptions = [
  {
    id: 1,
    title: "New Lead",
  },
  {
    id: 8,
    title: "My Leads",
  },
];

const ratings = [
  {
    id: 10,
    title: "1 Star",
  },
  {
    id: 11,
    title: "2 Stars",
  },
  {
    id: 12,
    title: "3 Stars",
  },
  {
    id: 13,
    title: "4 Stars",
  },
  {
    id: 14,
    title: "5 Stars",
  },
];

const statusColor = [
  {
    id: 0,
    title: "Suspended",
    color: "bg-black",
  },
  {
    id: 1,
    title: "New Lead",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Skilled",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Called",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Paid",
    color: "bg-teal-500",
  },
  {
    id: 5,
    title: "Verified",
    color: "bg-violet-500",
  },
  {
    id: 6,
    title: "Completed",
    color: "bg-red-500",
  },
];

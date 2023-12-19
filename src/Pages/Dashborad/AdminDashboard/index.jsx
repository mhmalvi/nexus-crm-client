import { CloseOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import {
  handleFetchLeads,
  handleSyncLeads,
} from "../../../Components/services/leads";
import { addLeads } from "../../../features/Leads/leadsSlice";
import { setLoader } from "../../../features/user/userSlice";
import Calendar from "./Calendar";
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

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;

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

  // For Search Table Data
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableSearchInput = useRef(null);

  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [tableHeaders, setTableHeaders] = useState([]);
  const [salesOptions, setSalesOptions] = useState([]);
  const [selectedSales, setSelectedSales] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [openCallCountDetailsModal, setOpenCallCountDetailsModal] =
    useState(false);
  let [clickedLeadId, setClickedLeadId] = useState("");
  const navigate = useNavigate();

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
        console.log(fetchEmployees?.data);
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

  useEffect(() => {
    const assignButton = {
      title: "Assign Lead",
      dataIndex: "assign_lead",
      key: "assign_lead",
      width: 100,
      render: (id, record, idx) => {
        return (
          <>
            <Button
              loading={assignLoading}
              type="primary"
              size="small"
              onClick={() => {
                const sid = localStorage.getItem("sales_id");
                onAssignLead(record?.lead_id, sid);
              }}
              className="rounded-lg !bg-green-500 border-none "
            >
              Assign
            </Button>
          </>
        );
      },
    };
    const assignTO = {
      title: "Assigned to",
      dataIndex: "sales_user_id",
      key: "sales_user_id",
      width: 150,
      render: (_, record, idx) => {
        return (
          <div className="flex gap-4 items-center ">
            <div className="flex items-center">
              {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) &&
              record?.sales_user_id !== 0 ? (
                <div className="ml-3"></div>
              ) : null}
              {
                companyEmployeeList?.find(
                  (employee) => employee?.user_id === record?.sales_user_id
                )?.full_name
              }
            </div>
            <div className="flex items-center">
              {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) &&
              record?.sales_user_id !== 0 ? (
                <div className="ml-3"></div>
              ) : null}
              {companyEmployeeList?.find(
                (employee) => employee?.user_id === record?.sales_user_id
              ) && (
                <CloseOutlined
                  className="cursor-pointer"
                  title="Remove Sales"
                  onClick={() => {
                    const sid = localStorage.getItem("sales_id");
                    onRemoveSales(record?.lead_id, sid);
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
                  className="!p-1 text-[25px] bg-gray "
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
              className=" btn btn-block w-[100px] h-[28px] bg-indigo-700 text-white rounded-full hover:bg-purple-900 flex flex-row m-auto "
            >
              <div className="flex flex-row m-auto justify-between">
                <p className="m-auto p-1">
                  {record.call_count != null ? record.call_count : 0}
                </p>
                <p className="m-auto p-1">Call Details</p>
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
          <div className="flex items-center">
            {statusColor
              .filter((status) => status.id === lead_details_status)
              .map((lead_status, i) => (
                <div
                  key={i}
                  className="w-24 flex items-center py-1.5 px-2 rounded-lg shadow-md"
                >
                  <div
                    className={`w-2 h-2 ${lead_status.color} rounded-full`}
                  ></div>
                  <div className="ml-1">{lead_status.title}</div>
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

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList.filter((lead) => parseInt(lead.star_review) === starFilterId - 9)
    );
  };

  const handleSyncLeadsReq = useCallback(async () => {
    dispatch(setLoader(true));
    const syncResponse = await handleSyncLeads(
      userDetails?.userInfo?.client_id,
      userDetails?.userInfo?.ac_k
    );
    if (syncResponse?.status) {
      setSyncLeads(!syncLeads);
      dispatch(setLoader(false));
    }
  }, [
    dispatch,
    setSyncLeads,
    userDetails?.userInfo?.client_id,
    userDetails?.userInfo?.ac_k,
    syncLeads,
  ]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm, selectedKeys, dataIndex) => {
    // confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    clearFilters();
    setSearchText("");
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={tableSearchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
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
            style={{
              width: 90,
            }}
          >
            Clear
          </Button>
        </Space>
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
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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
  });

  return (
    <div>
      {/* Add Lead Modal */}
      <Modal
        visible={isAddLeadFormOpen}
        onCancel={() => setIsAddLeadFormOpen(false)}
        footer={false}
      >
        <AddLeadForm setIsAddLeadFormOpen={setIsAddLeadFormOpen} />
      </Modal>
      <Modal
        className=""
        visible={openCallCountDetailsModal}
        onCancel={() => setOpenCallCountDetailsModal(false)}
        footer={false}
      >
        <ViewLeadCallDetails
          lead_id={clickedLeadId}
          setOpenCallCountDetailsModal={setOpenCallCountDetailsModal}
        />
      </Modal>

      <Calendar
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
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
        salesOptions={salesOptions}
        setSalesOptions={setSalesOptions}
        selectedSales={selectedSales}
        setSelectedSales={setSelectedSales}
      />
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

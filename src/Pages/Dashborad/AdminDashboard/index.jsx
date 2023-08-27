import { CloseOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
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
// import Table from "./Table";
import { Button, Input, Modal, Select, Space, message } from "antd";
import Avatar from "react-avatar";
import Highlighter from "react-highlight-words";
import UpdatedTable from "./UpdatedTable";
import AddLeadForm from "./AddLeadForm";
import {
  handleAssignLeadToSales,
  handleFetchSales,
  handleSalesRemoveLead,
} from "../../../Components/services/utils";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;

  const [activeFilter, setActiveFilter] = useState(
    userDetails?.userInfo?.role_id === 5 ? 1 : 0
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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
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

      console.log("fetchEmployees......", fetchEmployees);

      if (fetchEmployees?.status === true) {
        setCompanyEmployeeList(fetchEmployees?.data);
      }

      setLeadData(response.data);
    })();
  }, [dispatch, syncLeads, userDetails?.userInfo?.client_id]);

  // dispatch, userDetails, syncLeads;

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    // console.log(seletedDate);

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList.filter(
          (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
        )
      );
      // console.log(
      //   "SELECTED DATE",
      //   leadList.filter(
      //     (lead) => lead.lead_apply_date.slice(0, 10) === seletedDate
      //   )
      // );
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
      const res = await handleFetchSales(userDetails?.userInfo?.client_id);
      console.log("my res: ", res);
      if (res?.status === 200) {
        const data = [{ value: "", label: "Select Sales" }];
        res?.data?.forEach((item, idx) => {
          data.push({ value: item?.id, label: item?.full_name });
        });
        setSalesOptions(data);
      }
    })();
  }, [userDetails?.userInfo?.client_id]);

  console.log("selected sales: ", selectedSales);
  async function onAssignLead(lid, sid) {
    console.log("selected salessssss: ", sid);
    setAssignLoading(true);
    if (sid) {
      const data = {
        lead_id: lid,
        sales_user_id: sid,
        assign_by: userDetails?.user_id,
        active_status: 1,
      };
      const res = await handleAssignLeadToSales(data);
      if (res?.status === 201) {
        setAssignLoading(false);
        message.success("Lead successfully assigned to sales");
        // localStorage.setItem("sales_id", "");
        // sid = "";
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
    } else {
      setAssignLoading(false);
      message.warn("Please select a sales to assign");
    }
  }
  const onRemoveSales = async (lid, sid) => {
    const data = {
      lead_id: lid,
      sales_user_id: sid,
    };
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
      message.warn("faild/Something went wrong");
    }
  };

  useEffect(() => {
    const assignButton = {
      title: "Assign Lead",
      dataIndex: "assign_lead",
      key: "assign_lead",
      width: 100,
      render: (id, record, idx) => {
        return (
          <Button
            loading={assignLoading}
            type="primary"
            size="small"
            onClick={() => {
              const sid = localStorage.getItem("sales_id");
              onAssignLead(record?.lead_id, sid);
            }}
            className="!rounded !bg-green-500"
          >
            Assign
          </Button>
        );
      },
      // ...getColumnSearchProps("lead_id"),
    };
    const assignTO = {
      // title: () => {
      //   return (
      //     <div className="flex items-center justify-center gap-2">
      //       <h1>Assign to</h1>
      //       {/* <div className="mr-4">
      //         <Select
      //           defaultValue={""}
      //           onChange={(v) => {
      //             localStorage.setItem("sales_id", v);
      //           }}
      //           options={salesOptions || []}
      //           placeholder="Select Sales"
      //         />
      //       </div> */}
      //     </div>
      //   );
      // },
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
                <div className="ml-3">
                  {/* <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="30"
                  color="#1f262a"
                  name={
                    companyEmployeeList?.find(
                      (employee) => employee?.id === sales_user_id
                    )?.full_name
                  }
                /> */}
                </div>
              ) : null}
              {
                companyEmployeeList?.find(
                  (employee) => employee?.id === record?.sales_user_id
                )?.full_name
              }
            </div>
            <div className="flex items-center">
              {(userDetails?.userInfo?.role_id === 3 ||
                userDetails?.userInfo?.role_id === 4 ||
                userDetails?.userInfo?.role_id === 5) &&
              record?.sales_user_id !== 0 ? (
                <div className="ml-3">
                  {/* <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="30"
                  color="#1f262a"
                  name={
                    companyEmployeeList?.find(
                      (employee) => employee?.id === sales_user_id
                    )?.full_name
                  }
                /> */}
                </div>
              ) : null}
              {companyEmployeeList?.find(
                (employee) => employee?.id === record?.sales_user_id
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
      // {
      //   title: "Lead ID",
      //   dataIndex: "lead_id",
      //   key: "lead_id",
      //   fixed: true,
      //   render: (lead_id) => <h4 className="cursor-pointer">{lead_id}</h4>,
      //   width: 150,
      //   ...getColumnSearchProps("lead_id"),
      // },
      {
        title: "View",
        dataIndex: "view",
        key: "view",
        align: "center",
        render: (_, record, idx) => {
          return (
            <>
              <EyeOutlined
                onClick={() => {
                  navigate(`/lead/${record?.lead_id}`);
                }}
              />
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
        // ...getColumnSearchProps("lead_apply_date"),
        render: (lead_apply_date) => (
          <h4 className="cursor-pointer">
            {/* {new Date(lead_apply_date)
              ?.toString()
              .slice(4, 33)
              ?.replace("GMT", "")} */}
            {new Date(new Date(lead_apply_date).getTime() + 6 * 60 * 60 * 1000)
              ?.toString()
              ?.slice(0, 24)}
          </h4>
        ),
        width: 150,
      },
      {
        title: "Course Code",
        dataIndex: "course_code",
        key: "course_code",
        ...getColumnSearchProps("course_code"),
        render: (code) => <h4 className="cursor-pointer uppercase">{code}</h4>,
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
        render: (full_name) => <h4 className="cursor-pointer">{full_name}</h4>,
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
  }, [companyEmployeeList, userDetails?.userInfo, assignLoading]);

  const handleFilterLeadList = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 0 || filterId === 7) {
      setLeadData(
        leadList?.filter((lead) => parseInt(lead?.lead_details_status) !== 0)
      );
    } else if (filterId === 8) {
      console.log(leadList);

      console.log(
        "My Leads",
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
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList.filter((lead) => parseInt(lead.star_review) === starFilterId - 9)
    );
  };

  const handleSyncLeadsReq = async () => {
    dispatch(setLoader(true));

    const syncResponse = await handleSyncLeads(
      userDetails?.userInfo?.client_id,
      userDetails?.fbToken
    );

    console.log("leadSyncResponse", syncResponse);

    if (syncResponse?.status) {
      setSyncLeads(!syncLeads);
      dispatch(setLoader(false));
    }
  };

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

  const handleFilterAssignedEmployee = (userName) => {
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
  };

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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button> */}
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

      {/* <Table
        title="Lead List"
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
      /> */}
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
  // {
  //   id: 0,
  //   title: "All",
  // },
  {
    id: 8,
    title: "My Leads",
  },
  // {
  //   id: 7,
  //   title: "Today's Task",
  // },
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

// const tableHeaders = [
//   "ID",
//   "Date",
//   "Course Code",
//   "Course Name",
//   "Customer Name",
//   "Phone Number",
//   "Location",
//   "Campaign ID",
//   "Lead Status",
// ];

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

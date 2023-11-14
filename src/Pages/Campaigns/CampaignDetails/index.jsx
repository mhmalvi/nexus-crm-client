import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleFetchCompanyEmployees } from "../../../Components/services/company";
import {
  handleFetchCampaigns,
  handleFetchLeads,
} from "../../../Components/services/leads";
import activeImg from "../../../assets/Images/active.png";
import campaignBg from "../../../assets/Images/campaign_bg.jpg";
import inactiveImg from "../../../assets/Images/inactive.png";
import { addCampaigns } from "../../../features/Leads/campaignSlice";
import { addLeads } from "../../../features/Leads/leadsSlice";
import Calendar from "../../Dashborad/AdminDashboard/Calendar";
import Filters from "../../Dashborad/AdminDashboard/Filters";
import UpdatedTable from "../../Dashborad/AdminDashboard/UpdatedTable";
import data from "../../Dashborad/AdminDashboard/leadData.json";

const CampaignDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const leadList = useSelector((state) => state.leads)?.leads;
  const campaignList = useSelector((state) => state.campaigns)?.campaigns;

  // const [campaignList, setCampaignDetails] = useState();

  const [campaignDetails, setCampaignDetails] = useState();
  const [campaignCourses, setCampaignCourses] = useState([]);
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeStars, setActiveStars] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [tableHeaders, setTableHeaders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableSearchInput = useRef(null);

  // For Yearwise Filter
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    (async () => {
      const response = await handleFetchLeads({
        client_id: userDetails?.userInfo?.client_id,
      });
      if (response?.data) {
        dispatch(addLeads(response?.data));
        setLeadData(
          (response?.data).filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(id)
          )
        );
      } else {
        setLeadData(data);
        dispatch(addLeads(data));
      }
    })();

    (async () => {
      const response = await handleFetchCampaigns(
        userDetails?.userInfo?.client_id
      );
      if (response?.data) {
        dispatch(addCampaigns(response?.data));
        // setCampaignList(response?.data);
      }
    })();
  }, [dispatch, id, userDetails?.userInfo?.client_id]);

  useEffect(() => {
    const seletedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    if (selectedDay && selectedMonth && selectedYear) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .filter((lead) => lead.lead_apply_date.slice(0, 10) === seletedDate)
      );
    } else {
      setLeadData(
        leadList?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
      );
    }
  }, [id, leadList, selectedDay, selectedMonth, selectedYear]);


  useEffect(() => {
    setCampaignDetails(
      campaignList?.find(
        (campaign) => parseInt(campaign.campaign_id) === parseInt(id)
      )
    );

    const unique = [
      ...new Set(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .map((item) => item.course_description)
      ),
    ];

    if (unique[0] !== null) {
      setCampaignCourses(unique);
    } else {
      setCampaignCourses([]);
    }

    if (filterDate?.length) {
      setLeadData(
        leadList
          .filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          .filter(
            (lead) =>
              lead.lead_apply_date.slice(0, 10) === filterDate?.toString()
          )
      );
    } else {
      setLeadData(
        leadList?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
      );
    }
  }, [campaignList, filterDate, id, leadList]);

  console.log("campaignCourses", campaignCourses);

  useEffect(() => {
    (async () => {
      const fetchEmployees = await handleFetchCompanyEmployees(
        userDetails?.userInfo?.client_id
      );

      if (fetchEmployees?.status === true) {
        setCompanyEmployeeList(fetchEmployees?.data);
      }
    })();
  }, [userDetails?.userInfo?.client_id]);

  useEffect(() => {
    const headers = [
      {
        title: "Lead ID",
        dataIndex: "lead_id",
        key: "lead_id",
        fixed: true,
        render: (lead_id) => <h4 className="cursor-pointer">{lead_id}</h4>,
        width: 150,
        ...getColumnSearchProps("lead_id"),
      },
      {
        title: "Date",
        dataIndex: "lead_apply_date",
        key: "lead_apply_date",
        // ...getColumnSearchProps("lead_apply_date"),
        render: (lead_apply_date) => (
          <h4 className="cursor-pointer">
            {new Date(lead_apply_date)?.toGMTString()?.replace("GMT", "")}
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
      {
        title: "Assigned To",
        dataIndex: "sales_user_id",
        key: "sales_user_id",
        render: (sales_user_id) => (
          <div className="flex items-center">
            {(userDetails?.userInfo?.role_id === 3 ||
              userDetails?.userInfo?.role_id === 4 ||
              userDetails?.userInfo?.role_id === 5) &&
            sales_user_id !== 0 ? (
              <div className="ml-3">
                <Avatar
                  className="rounded-full shadow-sm cursor-pointer"
                  size="30"
                  color="#1f262a"
                  name={
                    companyEmployeeList?.find(
                      (employee) => employee?.id === sales_user_id
                    )?.full_name
                  }
                />
              </div>
            ) : null}
          </div>
        ),
        width: 120,
      },
    ];

    setTableHeaders([...headers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyEmployeeList, userDetails?.userInfo]);

  const handleFilterLeadList = (filterId) => {
    
    console.log("filterId....", filterId);

    setActiveFilter(filterId);
    if (filterId === 0 || filterId === 7) {
      (async () => {
        // const response = await handleFetchLeads(
        //   userDetails?.userInfo?.client_id
        // );
        setLeadData(
          leadList?.filter(
            (lead) => parseInt(lead.campaign_id) === parseInt(id)
          )
        );
        // dispatch(addLeads(response.data));
      })();
    } else if (filterId === 8) {
      setLeadData(
        leadList
          ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          ?.filter(
            (lead) => lead.sales_user_id === userDetails?.userInfo?.user_id
          )
      );
    } else {
      setLeadData(
        leadList
          ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
          ?.filter((lead) => parseInt(lead.lead_details_status) === filterId)
      );
    }
  };

  const handleStaredLeadsFilter = (starFilterId) => {
    setActiveFilter(starFilterId);
    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
        ?.filter((lead) => parseInt(lead.star_review) === starFilterId - 8)
    );
  };

  const handleCourseWiseLeads = (course) => {
    setLeadData(
      leadList
        ?.filter((lead) => parseInt(lead.campaign_id) === parseInt(id))
        ?.filter((lead) => lead.course_description === course)
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
              handleReset(clearFilters);
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
          </Button> */}
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
              confirm();
            }}
          >
            Close
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
    <div className="bg-white mt-18 2xl:mt-25 pt-1 mx-6 font-poppins">
      {/* Campaign Details */}
      <div
        className="rounded-xl mb-16"
        style={{
          backgroundImage: `url(${campaignBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 backdrop-blur-sm flex justify-between items-start p-16 rounded-xl">
          <div className="border rounded-2xl p-6 bg-white bg-opacity-75 mr-4">
            <div>
              <h1 className="text-xl leading-8 font-poppins font-semibold">
                {campaignDetails?.campaign_name}
              </h1>
              <h1 className="text-base leading-8 font-poppins font-medium">
                Campaign ID: {campaignDetails?.campaign_id}
              </h1>
              <div className="mt-8">
                <h1 className="text-base leading-8 font-poppins font-medium">
                  Started Time: {campaignDetails?.start_time}
                </h1>
                <h1 className="text-base leading-8 font-poppins font-medium">
                  End Time: {campaignDetails?.stop_time}
                </h1>

                <div className="flex items-center">
                  <span className="text-base leading-8 font-poppins font-medium mr-2">
                    Status:
                  </span>
                  {campaignDetails?.campaign_status === "ACTIVE" ? (
                    <img className="w-6" src={activeImg} alt="" />
                  ) : (
                    <img className="w-6" src={inactiveImg} alt="" />
                  )}
                  <h1 className="block text-base leading-8 font-poppins font-medium ml-1 mb-0">
                    {campaignDetails?.campaign_status}
                  </h1>
                </div>

                <h1 className="block text-lg text-brand-color leading-8 font-poppins font-semibold pt-6">
                  Total Leads:{" "}
                  {
                    leadList?.filter(
                      (lead) => parseInt(lead.campaign_id) === parseInt(id)
                    )?.length
                  }
                </h1>
              </div>
            </div>
          </div>
          {campaignCourses?.length > 0 ? (
            <div className="border rounded-2xl p-6 bg-white bg-opacity-75 ml-4">
              {campaignCourses?.map((course) => (
                <div onClick={() => handleCourseWiseLeads(course)}>
                  <li className="list-disc rounded-lg font-poppins uppercase text-base font-semibold px-2 py-1 my-1 hover:bg-gray-50 hover:bg-opacity-50 transition-all delay-150 cursor-pointer">
                    <span>{course}</span>
                    <span className="text-brand-color ml-12 float-right italic">
                      {
                        leadList
                          ?.filter(
                            (lead) =>
                              parseInt(lead.campaign_id) === parseInt(id)
                          )
                          ?.filter((lead) => lead.course_description === course)
                          ?.length
                      }
                    </span>
                  </li>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

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
        layout="Campaign"
        handleFilterLeadList={handleFilterLeadList}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeStars={activeStars}
        filterOptions={filterOptions}
        ratings={ratings}
        handleStaredLeadsFilter={handleStaredLeadsFilter}
        setActiveStars={setActiveStars}
        setSearchInput={setSearchInput}
      />

      <UpdatedTable
        table_title="Leads"
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
        handleSyncLeadsReq={null}
        setIsAddLeadFormOpen={null}
        setSyncLeads={null}
        syncLeads={null}
      />

      {/* <Table
        title="Lead List"
        tableHeaders={tableHeaders}
        data={leadData}
        filterOptions={filterOptions}
        companyEmployeeList={companyEmployeeList}
        ratings={ratings}
        activeFilter={activeFilter}
        searchInput={searchInput}
      /> */}
    </div>
  );
};

export default CampaignDetails;

const filterOptions = [
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
    id: 8,
    title: "My Leads",
  },
];

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
    id: 9,
    title: "1 Star",
  },
  {
    id: 10,
    title: "2 Stars",
  },
  {
    id: 11,
    title: "3 Stars",
  },
  {
    id: 12,
    title: "4 Stars",
  },
  {
    id: 13,
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

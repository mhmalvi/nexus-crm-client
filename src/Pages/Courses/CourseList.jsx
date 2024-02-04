import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Highlighter from "react-highlight-words";
import EditCourseDetails from "./EditCourseDetails";
import AddCourseModal from "./AddCourseModal";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Loading from "../../Components/Shared/Loader";

const CourseList = ({
  courses,
  setCourses,
  setCourseDetailsOpen,
  setSelectedCourse,
  courseListLoading,
  setCourseListLoading,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [courseId, setCourseId] = useState(0);
  // edit course details modal funtionality
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [addCourseOpen, setAddCourseOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState();
  const showModal = () => {
    setOpen(true);
  };

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const tableSearchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  //get data from localStorage to hide the edit button
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user_info"));
    if (userDetails) {
      setUserData(userDetails);
    }
  }, []);
  console.log("udata: ", userData);
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
            color: "white",
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

  const courseLinstTableHeaders = [
    {
      title: "Course Code",
      dataIndex: "course_code",
      key: "course_code",
      render: (course_code, i) => (
        <h4
          key={i}
          className="cursor-pointer uppercase"
          style={{
            textTransform: "uppercase",
          }}
        >
          {course_code?.toUpperCase()}
        </h4>
      ),
      ...getColumnSearchProps("course_code"),
    },
    {
      title: "Course Title",
      dataIndex: "course_title",
      key: "course_title",
      ...getColumnSearchProps("course_title"),
      render: (course_title, i) => (
        <h4 key={i} className="cursor-pointer uppercase">
          {course_title}
        </h4>
      ),
    },

    {
      title: "Action",
      dataIndex: "course_title",
      key: "course_title",
      align: "center",
      render: (_, record, i) => {
        console.log("record", record);
        return (
          <div key={i} className="flex gap-2 justify-center">
            <Button
              key={i}
              icon={<EyeOutlined style={{}} />}
              onClick={() => {
                setCourseDetailsOpen(true);
                setSelectedCourse(record);
              }}
              className="!rounded-md !bg-[#ffffff7f]"
            ></Button>
            {userData?.role_id === 1 ||
              (userData?.role_id === 3 && (
                <Button
                  key={i}
                  icon={<EditOutlined />}
                  onClick={() => {
                    showModal();
                    setCourseId(record?.id);
                  }}
                  className="!rounded-md !bg-[#ffffff7f]"
                ></Button>
              ))}
          </div>
        );
      },
    },
  ];
  let locale = {
    emptyText: (
      <div className="min-h-[50vh] mt-24">
        <Loading />
      </div>
    ),
  };
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-5 ">
        <div
          className={`text-xl ${
            colorMode ? "text-white" : "text-gray-800"
          } font-semibold`}
        >
          All Courses
        </div>
        <Button
          type="primary"
          onClick={() => setAddCourseOpen(true)}
          className={` !rounded  ${
            colorMode
              ? "!bg-slate-300 !text-gray-800"
              : "!bg-gray-800 !text-slate-300"
          }`}
        >
          Add Course
        </Button>
      </div>
      {/* Courses */}
      <div>
        <Table
          locale={locale}
          className={`${colorMode ? "updatedTableDark" : "updatedTableLight"}`}
          // loading={locale}
          columns={courseLinstTableHeaders}
          dataSource={courses}
          pagination={{
            defaultPageSize: 20,
            onChange: (pageNum) => {
              setCurrentPage(pageNum);
            },
            current: currentPage,
          }}
          showSorterTooltip={true}
          scroll={{
            y: "calc(75vh - 5em)",
          }}
          // Do not need to use on row view course detais by onClick in onRow it is used in Clicked by view button on colum list
        />
      </div>
      <EditCourseDetails
        open={open}
        setOpen={setOpen}
        id={courseId}
        setCourses={setCourses}
        courseListLoading={courseListLoading}
        setCourseListLoading={setCourseListLoading}
      />
      <AddCourseModal
        addCourseOpen={addCourseOpen}
        setAddCourseOpen={setAddCourseOpen}
        setCourses={setCourses}
        setCourseListLoading={setCourseListLoading}
      />
    </div>
  );
};

export default CourseList;

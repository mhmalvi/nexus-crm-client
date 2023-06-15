import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Highlighter from "react-highlight-words";
import EditCourseDetails from "./EditCourseDetails";

const CourseList = ({ courses, setCourseDetailsOpen, setSelectedCourse }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [courseId, setCourseId] = useState(0);
  // edit course details modal funtionality
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const showModal = () => {
    setOpen(true);
  };

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
  //get daat from localStorage for hide te edit button
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
      // width: 150,
    },

    {
      title: "Action",
      dataIndex: "course_title",
      key: "course_title",
      align: "center",
      // ...getColumnSearchProps("course_title"),
      render: (_, record, i) => {
        console.log("record", record);
        return (
          <div key={i} className="flex gap-2 justify-center">
            <Button
              key={i}
              icon={<EyeOutlined />}
              onClick={() => {
                setCourseDetailsOpen(true);
                setSelectedCourse(record);
              }}
            ></Button>
            {userData?.last_name === "Admin" && (
              <Button
                key={i}
                icon={<EditOutlined />}
                onClick={() => {
                  showModal();
                  setCourseId(record?.id);
                }}
              ></Button>
            )}
          </div>
        );
      },
      // width: 150,
    },
  ];

  // useEffect(() => {
  //   document
  //     .getElementsByClassName("ant-table-cell")
  //     ?.classList?.add("uppercase");
  // }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-12">
        <div className="text-xl font-semibold">All Courses</div>
        {/* <div className="flex items-center">
              <h1 className="px-2 bg-gray-100 py-1 mb-0 border">
                Course Name:{" "}
              </h1>
              <AutoComplete
                style={{
                  width: 300,
                }}
                onSelect={handleCourseSearch}
                options={options}
                placeholder="Type your course title"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div> */}
      </div>
      {/* Courses */}
      <div>
        <Table
          style={{
            textTransform: "uppercase",
          }}
          columns={courseLinstTableHeaders}
          dataSource={courses}
          pagination={false}
          // loading
          showSorterTooltip={true}
          scroll={{
            x: 600,
            y: 600,
          }}
          // Do not need to use on row view course detais by onClick in onRow it is used in Clicked by view button on colum list
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       setCourseDetailsOpen(true);
          //       setSelectedCourse(record);
          //     },
          //   };
          // }}
        />
      </div>
      <EditCourseDetails open={open} setOpen={setOpen} id={courseId} />
    </div>
  );
};

export default CourseList;

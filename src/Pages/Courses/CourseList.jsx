import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

const CourseList = ({ courses, setCourseDetailsOpen, setSelectedCourse }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
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

  const tableHeaders = [
    {
      title: "Course Code",
      dataIndex: "course_code",
      key: "course_code",
      render: (course_code) => (
        <h4 className="cursor-pointer uppercase">{course_code}</h4>
      ),
      // width: 150,
      ...getColumnSearchProps("course_code"),
    },
    {
      title: "Course Title",
      dataIndex: "course_title",
      key: "course_title",

      render: (course_title) => (
        <h4 className="cursor-pointer uppercase">{course_title}</h4>
      ),
      // width: 150,
      ...getColumnSearchProps("course_title"),
    },
  ];

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
          columns={tableHeaders}
          dataSource={courses}
          pagination={false}
          // loading
          showSorterTooltip={true}
          scroll={{
            x: 600,
            y: 600,
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setCourseDetailsOpen(true);
                setSelectedCourse(record);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default CourseList;

import { Button, Form, Input, Popconfirm, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  handleCourseCheckListInsert,
  handleCourseCheckLists,
  handleDeleteCourse,
  handleUpdateCourse,
  handleGetCourseEdit,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { environment_dev } from "../../Components/services/environment";
import { successNotification, warningNotification } from "../../Components/Shared/Toast";

const CourseMangemnet = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  const [form] = useForm();
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [isCourseListLoading, setIsCourseListLoading] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  function handleFile(event) {
    setFile(event.target.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }

  const onInsertCourseChecklist = async () => {
    const formData = new FormData();
    formData.append("user_id", userDetails?.user_id);
    formData.append("course_code", courseCode);
    formData.append("course_title", courseTitle);
    formData.append("course_description", courseDesc);
    if(file){
      formData.append("checklist", file );
    }

    setIsLoading(true);
    let res;
    if (isUpdate) {
      res = await handleUpdateCourse(courseId, formData);
    } else {
      res = await handleCourseCheckListInsert(formData);
    }
    if (res?.status === 200 || res?.status === 201) {
      form.resetFields();
      setFile(false);
      setFileName("");
      successNotification("Saved");
      setIsCourseListLoading(true);
      const resFetch = await handleCourseCheckLists();
      if (resFetch?.status === 200) {
        setIsCourseListLoading(false);
        setData(resFetch?.data);
      } else {
        setIsCourseListLoading(false);
      }
      setIsLoading(false);
      setIsCreate(false);
      setIsUpdate(false);
      setCourseCode("");
      setCourseTitle("");
      setCourseDesc("");
    } else {
      warningNotification(res?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  const onCancle = () => {
    form.resetFields();
    setFile(false);
    setFileName("");
    setIsCreate(false);
    setIsUpdate(false);
    setCourseCode("");
    setCourseTitle("");
    setCourseDesc("");
  };
  useEffect(() => {
    (async () => {
      setIsCourseListLoading(true);
      const res = await handleCourseCheckLists();
      if (res?.status === 200) {
        setIsCourseListLoading(false);
        setData(res?.data);
      } else {
        setIsCourseListLoading(false);
      }
    })();
  }, []);
  const syncCourse = async () => {
    setIsCourseListLoading(true);
    const res = await handleCourseCheckLists();
    if (res?.status === 200) {
      setIsCourseListLoading(false);
      setData(res?.data);
    } else {
      setIsCourseListLoading(false);
    }
  };
  const onDeleteCourse = async (id) => {
    const res = await handleDeleteCourse(id);
    if (res?.status === 200) {
      syncCourse();
    } else {
      warningNotification(res?.data?.message || "Failed/Something went wrong");
    }
  };
  const getEditCourseDetails = async (id) => {
    const res = await handleGetCourseEdit(id);
    if (res?.status === 200) {
      setCourseCode(res?.data?.course_code);
      setCourseTitle(res?.data?.course_title);
      setCourseDesc(res?.data?.course_description);
    }
  };

  const column = [
    {
      title: "Course Code",
      dataIndex: "course_code",
      key: "course_code",
    },
    {
      title: "Course Title",
      dataIndex: "course_title",
      key: "course_title",
    },
    {
      title: "Pdf",
      dataIndex: "pdf",
      key: "pdf",
      render: (_, record, idx) => {
        return (
          <>
            {record?.checklist_path ? (
              <FilePdfOutlined
                className="!text-red-500"
                onClick={() => {
                  window.open(
                    `${environment_dev}/public/${record?.checklist_path}`,
                    "_blank"
                  );
                }}
              />
            ) : (
              <p className="text-red-500">NO PDF AVAILABLE</p>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record, idx) => {
        return (
          <div className="flex items-center gap-6">
            <Tooltip title="Edit Course" color="blue">
              <div className="!course-pointer ">
                <EditOutlined
                  className="text-[25px]"
                  onClick={() => {
                    getEditCourseDetails(record?.id);
                    setCourseId(record?.id);
                    setIsUpdate(true);
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip title="Delete Course" color="red">
              <Popconfirm
                title="Are you sure to delete this course"
                onConfirm={() => {
                  onDeleteCourse(record?.id);
                }}
              >
                <DeleteOutlined className="course-pointer text-[25px]" />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className=" md:px-40 mt-20">
        <Form
          layout="vertical"
          form={form}
          onFinish={onInsertCourseChecklist}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-[25px] font-mono font-semibold">
              Course And CheckList Update
            </h1>
            {isCreate || isUpdate ? (
              <div className="flex gap-2 items-center">
                <Button
                  onClick={onCancle}
                  className="!bg-black !border !border-none !text-white !rounded"
                >
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  type="primary"
                  className="!bg-purple-500 !border !border-none !text-white !rounded"
                >
                  {isUpdate
                    ? isLoading
                      ? "Updating..."
                      : "Update"
                    : isLoading
                    ? "Creating..."
                    : "Create"}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsCreate(true)}
                className="!bg-purple-500 !border !border-none !text-white !rounded"
              >
                Create Course
              </Button>
            )}
          </div>
          {(isCreate || isUpdate) && (
            <div>
              <div className="mb-3">
                <label htmlFor="" className="mb-1">
                  Course code
                </label>
                <Input
                  required
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="write course code"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="mb-1">
                  Course Title
                </label>
                <Input
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="write course title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="mb-1">Course Description</label>
                <Input.TextArea
                  required
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="write course description"
                />
              </div>

              <input
                type="file"
                name="file"
                id="mail-upload"
                onChange={handleFile}
                hidden
              />
              <div className="flex gap-3 items-center">
                <label
                  htmlFor="mail-upload"
                  className="flex justify-center items-center gap-2 py-[5px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer mb-4 text-white border-none"
                  style={{ border: "1px solid gray" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="m-0 p-0">Attach CheckList</p>
                </label>
                <p className="text-[green] text-[16px] mt-2">{fileName}</p>
              </div>

            </div>
          )}
          {!isCreate && !isUpdate && (
            <div>
              <Table
                loading={isCourseListLoading}
                columns={column || []}
                dataSource={data || []}
                pagination
              />
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default CourseMangemnet;

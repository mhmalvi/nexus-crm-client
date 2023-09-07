import { Button, Form, Input, Popconfirm, Table, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import plus from "../../assets/Images/plus.png";
import { useForm } from "antd/lib/form/Form";
import {
  handleCourseCheckListInsert,
  handleCourseCheckLists,
  handleDeleteCourse,
  handleUpdateCourse,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { environment_dev } from "../../Components/services/environment";

const CourseMangemnet = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  const [form] = useForm();
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [isCourseListLoading, setIsCourseListLoading] = useState(false);
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log("fdatas: ", event?.target?.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }

  const onInsertCourseChecklist = async () => {
    const values = form.getFieldsValue(true);
    const formData = new FormData();
    formData.append("user_id", userDetails?.user_id);
    formData.append("course_code", values?.course_code);
    formData.append("course_title", values?.course_title);
    formData.append("course_description", values?.course_description);
    formData.append("checklist", file);
    formData.append("file_names", JSON.stringify(inputFields));
    // formData.append("file_names", inputFields);

    setIsLoading(true);
    let res;
    if (isUpdate) {
      res = await handleUpdateCourse(courseId, formData);
    } else {
      res = await handleCourseCheckListInsert(formData);
    }
    if (res?.status === 200 || res?.status === 201) {
      form.resetFields();
      setInputFields([{ value: "" }]);
      setFile({});
      setFileName("");
      message.success("Course Saved");
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
    } else {
      message?.warning(res?.data?.message || "Failed/ Something went wrong");
      setIsLoading(false);
    }
  };

  const handleAddInput = () => {
    const newInputFields = [...inputFields, { value: "" }];
    setInputFields(newInputFields);
  };

  const handleRemoveInput = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };
  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = event.target.value;
    setInputFields(newInputFields);
  };
  const onCancle = () => {
    form.resetFields();
    setInputFields([{ value: "" }]);
    setFile({});
    setFileName("");
    setIsCreate(false);
    setIsUpdate(false);
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
      message.warn(res?.data?.message || "Failed/Something went wrong");
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
        <Form layout="vertical" form={form} onFinish={onInsertCourseChecklist}>
          <div className="flex items-center justify-between">
            <h1 className="text-[25px] font-mono font-semibold">
              Course And CheckList Insert
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
              <Form.Item label="Course Code" name="course_code" required>
                <Input required />
              </Form.Item>
              <Form.Item label="Course Title" name="course_title" required>
                <Input required />
              </Form.Item>
              <Form.Item
                label="Course Description"
                name="course_description"
                required
              >
                <Input.TextArea required />
              </Form.Item>

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

              {inputFields.map((inputField, index) => {
                return (
                  <Form.Item
                    className=" gap-2 w-full  "
                    label={`Required CheckList Items Name ${index + 1}`}
                    key={index}
                  >
                    <div className="flex gap-2 items-center justify-end !w-full ">
                      <Input
                        className="m-0 !w-full"
                        type="text"
                        value={inputField.value}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      {inputFields.length > 1 && (
                        <Button
                          className=" !rounded !bg-red-600 !border-none !text-white !float-right "
                          onClick={() => handleRemoveInput(index)}
                        >
                          -
                        </Button>
                      )}
                      {index === inputFields.length - 1 && (
                        <div
                          className=" w-[50px]  cursor-pointer rounded-[50%]"
                          onClick={handleAddInput}
                        >
                          <img src={plus} alt="" className="w-full h-full" />
                        </div>
                      )}
                    </div>
                  </Form.Item>
                );
              })}
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

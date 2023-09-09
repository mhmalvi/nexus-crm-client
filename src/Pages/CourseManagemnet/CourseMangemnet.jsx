import { Button, Form, Input, Popconfirm, Table, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import plus from "../../assets/Images/plus.png";
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

const CourseMangemnet = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  const [form] = useForm();
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editCourseDetails, setEditCourseDetails] = useState();
  const [data, setData] = useState([]);
  const [isCourseListLoading, setIsCourseListLoading] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [checklistItem,setCheckListItem] = useState("");
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log("fdatas: ", event?.target?.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }

  const onInsertCourseChecklist = async () => {
    const values = form.getFieldsValue(true);
    const formData = new FormData();
    formData.append("user_id", userDetails?.user_id);
    formData.append("course_code", courseCode);
    formData.append("course_title", courseTitle);
    formData.append("course_description", courseDesc);
    // formData.append("checklist", file);
    if(file){
      formData.append("checklist", file );
    }
    // formData.append("file_names", JSON.stringify(inputFields));
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
      setFile(false);
      setFileName("");
      message.success("Saved");
      setIsCourseListLoading(true);
      const resFetch = await handleCourseCheckLists();
      if (resFetch?.status === 200) {
        setIsCourseListLoading(false);
        setData(resFetch?.data);
      } else {
        setIsCourseListLoading(false);
      }
      setEditCourseDetails({});
      setIsLoading(false);
      setIsCreate(false);
      setIsUpdate(false);
      setCourseCode("");
      setCourseTitle("");
      setCourseDesc("");
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
    setFile(false);
    setFileName("");
    setIsCreate(false);
    setIsUpdate(false);
    setEditCourseDetails({});
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
      message.warn(res?.data?.message || "Failed/Something went wrong");
    }
  };
  const getEditCourseDetails = async (id) => {
    const res = await handleGetCourseEdit(id);
    if (res?.status === 200) {
      // message.warn("if you see empty or defferent data please cancle and click again  edit button")
      setCourseCode(res?.data?.course_code);
      setCourseTitle(res?.data?.course_title);
      setCourseDesc(res?.data?.course_description);
      setCheckListItem(res?.data?.checklist_path)
      setEditCourseDetails(res?.data);
    }
  };

  console.log("edit course detail: ", editCourseDetails);
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
  console.log("course_code show:", courseCode);
  return (
    <>
      <div className=" md:px-40 mt-20">
        <Form
          layout="vertical"
          form={form}
          onFinish={onInsertCourseChecklist}
          // initialValues={editCourseDetails && {
          //   course_code: editCourseDetails?.course_code ?editCourseDetails?.course_code:"",
          //   course_title: editCourseDetails?.course_title ? editCourseDetails?.course_title : "",
          //   course_description: editCourseDetails?.course_description ? editCourseDetails?.course_description : "",
          // }}
        >
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
              {/* <Form.Item label="Course Code" name="course_code" required> */}
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
              {/* </Form.Item> */}
              {/* <Form.Item label="Course Title" name="course_title" required> */}
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
              {/* </Form.Item> */}

              {/* <Form.Item
                label="Course Description"
                name="course_description"
                required
              > */}
              <div className="mb-3">
                <label htmlFor="" className="mb-1">Course Description</label>
                <Input.TextArea
                  required
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="write course description"
                />
              </div>
              {/* </Form.Item> */}

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

              {/* {inputFields.map((inputField, index) => {
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
              })} */}
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

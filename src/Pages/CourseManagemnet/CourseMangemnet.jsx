import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import plus from "../../assets/Images/plus.png";
import { useForm } from "antd/lib/form/Form";
import { handleCourseCheckListInsert } from "../../Components/services/utils";

const CourseMangemnet = () => {
  const [form] = useForm();
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [files, setFile] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log("fdatas: ", event?.target?.files[0]);
    setFileName(event?.target?.files[0]?.name);
  }

  const onInsertCourseChecklist = async () => {
    const values = form.getFieldsValue(true);
    const data = {
      ...values,
      file_names: inputFields,
    };
    setIsLoading(true);
    const res = await handleCourseCheckListInsert(data);
    if (res?.status === 201) {
      message.success("Course Saved");
      setIsLoading(false);
    } else {
      message?.warning(res?.data?.message || "Failed/ Something went wrong");
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
  return (
    <>
      <div className=" md:px-40 mt-20">
        <Form layout="vertical" form={form} onFinish={onInsertCourseChecklist}>
          <div className="flex items-center justify-between">
            <h1 className="text-[25px] font-mono font-semibold">
              Course And CheckList Insert
            </h1>
            <Button
              htmlType="submit"
              type="primary"
              className="!bg-purple-500 !border !border-none !text-white !rounded"
            >
              Create
            </Button>
          </div>
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
        </Form>
      </div>
    </>
  );
};

export default CourseMangemnet;

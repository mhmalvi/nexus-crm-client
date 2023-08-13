import { Button, Form, Input, Select, message } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleGetStudentCompleteDetailsCheck,
  handleSendStudentDetails,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import CreateStudentModal from "./CreateStudentModal";
import StudentdetailsAgency from "./StudentdetailsAgency";

const SendStudentDetails = ({
  data,
  setData,
  fileName,
  setFileName,
  files,
  setFiles,
  setListData,
  setStudentListLoading,
  setCreateOpen,
}) => {
  const navigate = useNavigate();
  // const [files, setFiles] = useState([]);
  // const [fileName, setFileName] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  // const [data, setData] = useState({
  //   student_name: "",
  //   course_name: "",
  // });
  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
  };
  const handleCheckListFile = (e) => {
    // e.preventDefault();
    console.log("I entered file");

    const files = Object.values(e?.target?.files);
    setFiles(files);
    setFileName(files);
    console.log("fdatas: ", files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append("student_file[]", file));
    formData.append("student_name", data.student_name);
    formData.append("course_name", data.course_name);
    formData.append("institute_name", data.institute_name);
    formData.append("user_id", userDetails?.user_id);

    if (files.length <= 0) {
      message.error("Please select files");
    } else {
      setUploadLoading(true);
      const res = await handleSendStudentDetails(formData);
      if (res?.status === 201 && res) {
        setFiles([]);
        setFileName([]);
        setUploadLoading(false);
        setData({});
        message.success("Send successfully");

        setStudentListLoading(true);
        setCreateOpen(false);
        const respons = await handleGetStudentCompleteDetailsCheck(
          userDetails?.user_id
        );
        if (respons?.status === 200) {
          setListData(respons?.data);
          setStudentListLoading(false);
        } else {
          setStudentListLoading(false);
        }
      } else {
        setUploadLoading(false);
        message.warn("Send failed/ Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="p-10 w-[90%] mx-auto mt-12">
        <h1 className="text-[30px] font-bold">Student Details</h1>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-6 font-poppins">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Student Name
            </label>
            <Input
              // type="password"
              size="large"
              name="student_name"
              id="student_name"
              value={data.student_name}
              placeholder="Enter Student name"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="mb-6 font-poppins">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Course Name
            </label>
            <Input
              // type="password"
              size="large"
              name="course_name"
              id="course_name"
              value={data.course_name}
              placeholder="Enter course name"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="mb-6 font-poppins">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Institute Name
            </label>
            <Input
              // type="password"
              size="large"
              name="institute_name"
              id="institute_name"
              value={data.institute_name}
              placeholder="Enter institute name"
              className="w-full px-6 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-brand-color"
              onChange={userData}
              required
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap mb-6">
            <input
              type="file"
              name="file"
              multiple
              id="student-file-upload"
              onChange={handleCheckListFile}
              style={{ display: "none" }}
            />
            <div className="flex gap-3 items-center mt-[5px] w-full flex-wrap">
              <label
                htmlFor="student-file-upload"
                className="py-[5px] px-[15px] cursor-pointer bg-slate-700 text-white text-center border border-slate-700 rounded w-[29%]"
                style={{ border: "1px solid gray" }}
              >
                Attach Student File
              </label>
              {fileName.length > 0 ? (
                <ul className="w-[69%] h-[70px] overflow-auto">
                  {fileName?.map((item, idx) => {
                    return (
                      <li key={idx} className="text-[green] text-[16px] mt-2">
                        {item?.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-6">
            <button
              disabled={uploadLoading ? true : false}
              type="submit"
              loading={uploadLoading}
              className="!w-full !py-3 !text-white font-medium !bg-brand-color !bg-opacity-80 hover:bg-primary-800 !rounded-md focus:outline-none font-poppins"
            >
              {uploadLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SendStudentDetails;

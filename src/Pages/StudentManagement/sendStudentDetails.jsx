import { Button, Form, Input, Select, message } from "antd";
import { Document, Page } from "react-pdf";
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
import { useEffect } from "react";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import { environment_dev } from "../../Components/services/environment";

const SendStudentDetails = ({
  data,
  setData,
  files,
  setFiles,
  photoFile,
  setPhotoFIle,
  resumeFile,
  setResumeFIle,
  letterFile,
  setLetterFIle,
  visaFile,
  setVisaFIle,
  academicFile,
  setAcademicFIle,
  photoVidoeFile,
  setPhotoVideoFIle,
  usiFile,
  setUsiFIle,
  payFile,
  setpayFIle,
  setListData,
  setStudentListLoading,
  setCreateOpen,
  course,
  setCourse,
  courseList,
  setCourseList,
}) => {
  const navigate = useNavigate();
  // const [files, setFiles] = useState([]);
  // const [fileName, setFileName] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [courseListLoading, setCourseListLoading] = useState(false);

  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
  // const [data, setData] = useState({
  //   student_name: "",
  //   course_name: "",
  // });
  useEffect(() => {
    (async () => {
      setCourseListLoading(true);
      const res = await handleClientwiseCourseDetails();
      if (res?.status === 200) {
        setCourseListLoading(false);
        const data = [];
        res?.data?.map((item, idx) =>
          data.push({
            value: item?.id,
            label: item?.course_title,
            path: item?.checklist_path,
          })
        );
        setCourseList(data);
      } else {
        setCourseListLoading(false);
      }
    })();
  }, [setCourseList]);
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
    console.log("fdatas: ", files);
  };
  function handlePhotoUpload(e) {
    setPhotoFIle(e.target.files[0]);
  }
  function handleResumeUpload(e) {
    setResumeFIle(e.target.files[0]);
  }
  function handleLetterUpload(e) {
    setLetterFIle(e.target.files[0]);
  }
  function handleVisaUpload(e) {
    setVisaFIle(e.target.files[0]);
  }
  function handleAcademicUpload(e) {
    setAcademicFIle(e.target.files[0]);
  }
  function handlePhotoVideoUpload(e) {
    setPhotoVideoFIle(e.target.files[0]);
  }
  function handleUsiUpload(e) {
    setUsiFIle(e.target.files[0]);
  }
  function handlePayUpload(e) {
    setpayFIle(e.target.files[0]);
  }

  const handleChange = (value, option) => {
    setCourse(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("student_name", data.student_name);
    formData.append("institute_name", data.institute_name);
    formData.append("course", JSON.stringify(course));
    formData.append("agency", JSON.stringify(userDetails));
    formData.append("photo_id", photoFile);
    formData.append("resume", resumeFile);
    formData.append("reference_letter", letterFile);
    formData.append("visa_copy", visaFile);
    formData.append("academic_qualification", academicFile);
    formData.append("photo_video", photoVidoeFile);
    formData.append("usi_number", usiFile);
    formData.append("pay_slip", payFile);
    files?.map((item, idx) => formData.append("student_file[]", item));

    if (
      !photoFile &&
      !resumeFile &&
      !letterFile &&
      !visaFile &&
      !academicFile &&
      !photoVidoeFile &&
      !usiFile &&
      !payFile
    ) {
      message.error("Please select files");
    } else {
      setUploadLoading(true);
      const res = await handleSendStudentDetails(formData);
      if (res?.status === 201 && res) {
        setPhotoFIle({});
        setResumeFIle({});
        setLetterFIle({});
        setVisaFIle({});
        setAcademicFIle({});
        setPhotoVideoFIle({});
        setUsiFIle({});
        setpayFIle({});
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
        window.location.reload();
      } else {
        setUploadLoading(false);
        message.warn("Send failed/ Something went wrong");
      }
    }
  };
  console.log("course lists: ", courseList);
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
              RTO Name
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
          <div className="mb-6 font-poppins">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Select Course
            </label>
            <Select
              loading={courseListLoading}
              // value={role}
              className="w-full"
              onChange={handleChange}
              showSearch
              placeholder="Select Course"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={courseList || []}
            />

            {course && (
              <div>
                {course?.path ? (
                  <h1
                    title={course?.label || "PDF"}
                    className="text-green-500 font-bold cursor-pointer"
                    onClick={() => {
                      window.open(
                        `${environment_dev}/public/${course?.path}`,
                        "_blank"
                      );
                    }}
                  >
                    Checklist available for this course please check it
                  </h1>
                ) : (
                  <h1 className="text-red-500 font-bold">
                    No Checklist available
                  </h1>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {/* <input
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
            </div> */}
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="file"
                name="file"
                id="photo-upload"
                onChange={handlePhotoUpload}
                hidden
              />
              <div className="">
                <label
                  htmlFor="photo-upload"
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
                  <p className="m-0 p-0">Upload 100 Points Photo ID</p>
                </label>
                <p className="text-[green] text-[16px]">{photoFile?.name}</p>
              </div>
              <input
                type="file"
                name="file"
                id="resume-upload"
                onChange={handleResumeUpload}
                hidden
              />
              <div className="">
                <label
                  htmlFor="resume-upload"
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
                  <p className="m-0 p-0">Upload Resume</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {resumeFile?.name}
                </p>
              </div>
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="letter-upload"
                  onChange={handleLetterUpload}
                  hidden
                />
                <label
                  htmlFor="letter-upload"
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
                  <p className="m-0 p-0">Upload Reference Letter/Details</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {letterFile?.name}
                </p>
              </div>
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="visa-upload"
                  onChange={handleVisaUpload}
                  hidden
                />
                <label
                  htmlFor="visa-upload"
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
                  <p className="m-0 p-0">Upload Visa Copy</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {visaFile?.name}
                </p>
              </div>
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="academic-upload"
                  onChange={handleAcademicUpload}
                  hidden
                />
                <label
                  htmlFor="academic-upload"
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
                  <p className="m-0 p-0">Upload Academic Qualification</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {academicFile?.name}
                </p>
              </div>
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="photo-video-upload"
                  onChange={handlePhotoVideoUpload}
                  hidden
                />
                <label
                  htmlFor="photo-video-upload"
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
                  <p className="m-0 p-0">
                    Upload Photo Video While Performing Works
                  </p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {photoVidoeFile?.name}
                </p>
              </div>
              <div className="">
                <input
                  type="file"
                  name="file"
                  id="usi-upload"
                  onChange={handleUsiUpload}
                  hidden
                />
                <label
                  htmlFor="usi-upload"
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
                  <p className="m-0 p-0">Upload USI Number</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {usiFile?.name}
                </p>
              </div>
              {/* <div className="">
                <input
                  type="file"
                  name="file"
                  id="pay-upload"
                  onChange={handlePayUpload}
                  hidden
                />
                <label
                  htmlFor="pay-upload"
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
                  <p className="m-0 p-0">Upload Pay Slip</p>
                </label>
                <p className="text-[green] text-[16px] m-0 p-0">
                  {payFile?.name}
                </p>
              </div> */}
            </div>
            <div>
              <input
                type="file"
                name="file"
                multiple
                id="student-file-upload"
                onChange={handleCheckListFile}
                style={{ display: "none" }}
              />
              <div className="">
                <label
                  htmlFor="student-file-upload"
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
                  <p className="m-0 p-0">Attach Other files</p>
                </label>
                {files.length > 0 ? (
                  <ul className="w-[69%] h-[70px] overflow-auto">
                    {files?.map((item, idx) => {
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

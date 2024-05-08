import { Input, Select } from "antd";
import React from "react";
import { useState } from "react";
import {
  handleGetStudentCompleteDetailsCheck,
  handleSendStudentDetails,
} from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleClientwiseCourseDetails } from "../../Components/services/leads";
import { environment_dev } from "../../Components/services/environment";
import { successNotification, warningNotification } from "../../Components/Shared/Toast";

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
  setpayFIle,
  setListData,
  setStudentListLoading,
  setCreateOpen,
  course,
  setCourse,
  courseList,
  setCourseList,
  allSelectedStudentFiles,
  setAllSelectedStudentFiles,
}) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [courseListLoading, setCourseListLoading] = useState(false);
  const [selectedStudentFileOption, setSelectedStuendtFileOption] = useState(
    {}
  );

  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );
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

    const files = Object.values(e?.target?.files);
    setFiles(files);
  };
  function handlePhotoUpload(e) {
    setPhotoFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handleResumeUpload(e) {
    setResumeFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handleLetterUpload(e) {
    setLetterFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handleVisaUpload(e) {
    setVisaFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handleAcademicUpload(e) {
    setAcademicFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handlePhotoVideoUpload(e) {
    setPhotoVideoFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
  }
  function handleUsiUpload(e) {
    setUsiFIle(e.target.files[0]);
    setAllSelectedStudentFiles((prev) => [...prev, e.target.files[0]?.name]);
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
    files?.map((item, idx) => formData.append("student_file[]", item));

    if (
      !photoFile ||
      !resumeFile ||
      !letterFile ||
      !visaFile ||
      !academicFile ||
      !photoVidoeFile ||
      !usiFile
      
    ) {
      warningNotification("Please select all files.");
    } else {
      setUploadLoading(true);
      const res = await handleSendStudentDetails(formData);
      if (res?.status === 201 ) {
        setPhotoFIle(false);
        setResumeFIle(false);
        setLetterFIle(false);
        setVisaFIle(false);
        setAcademicFIle(false);
        setPhotoVideoFIle(false);
        setUsiFIle(false);
        setpayFIle(false);
        setUploadLoading(false);
        setData({});
        successNotification("Sent successfully.");

        setStudentListLoading(true);
        setCreateOpen(false);
        const respons = await handleGetStudentCompleteDetailsCheck(
          userDetails?.user_id
        );
        if (respons?.status === 200) {
          setListData(respons?.data);
          setStudentListLoading(false);
          setAllSelectedStudentFiles([]);
        } else {
          setStudentListLoading(false);
        }
        window.location.reload();
      } else {
        setUploadLoading(false);
        warningNotification(res?.data?.message || "Sending failed.");
      }
    }
  };
  const selectFileOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "1",
      label: "100 Points Photo ID",
    },
    {
      value: "2",
      label: "Resume",
    },
    {
      value: "3",
      label: "Reference Letter/Details",
    },
    {
      value: "4",
      label: "Visa Copy",
    },
    {
      value: "5",
      label: "Academic Qualification",
    },
    {
      value: "6",
      label: "Photo Video While Performing Works",
    },
    {
      value: "7",
      label: "USI Number",
    },
  ];
  const handleFileChange = (v, options) => {
    setSelectedStuendtFileOption({ ...options });
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
              Select Course
            </label>
            <Select
              loading={courseListLoading}
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

            {course ? (
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
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-4 flex-wrap mb-10">
            <div className="mb-6 font-poppins">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-600"
              >
                Select upload student file
              </label>
              <Select
                className="w-full"
                onChange={handleFileChange}
                showSearch
                placeholder="Select upload file"
                optionFilterProp="children"
                options={selectFileOptions || []}
              />
              <div className="mt-1">
                <label
                  htmlFor="name"
                  className="block  text-sm text-gray-600 font-bold font-serif"
                >
                  Selected student files
                </label>
                {allSelectedStudentFiles?.map((item, idx) => {
                  return (
                    <p key={idx} className="text-green-500 m-0 p-0">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start translate-y-7">
              {selectedStudentFileOption.value === "1" && (
                <div className="">
                  <input
                    type="file"
                    name="file"
                    id="photo-upload"
                    onChange={handlePhotoUpload}
                    hidden
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer  text-white border-none"
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
                      Upload 100 Points Photo ID{" "}
                      {`(${
                        photoFile?.name ? photoFile?.name : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}

              {selectedStudentFileOption.value === "2" && (
                <div className="">
                  <input
                    type="file"
                    name="file"
                    id="resume-upload"
                    onChange={handleResumeUpload}
                    hidden
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer  text-white border-none"
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
                      Upload Resume{" "}
                      {`(${
                        resumeFile?.name ? resumeFile?.name : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}
              {selectedStudentFileOption?.value === "3" && (
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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer  text-white border-none"
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
                      Upload Reference Letter/Details{" "}
                      {`(${
                        letterFile?.name ? letterFile?.name : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}
              {selectedStudentFileOption?.value === "4" && (
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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer text-white border-none"
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
                      Upload Visa Copy{" "}
                      {`(${
                        visaFile?.name ? visaFile?.name : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}
              {selectedStudentFileOption?.value === "5" && (
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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer  text-white border-none"
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
                      Upload Academic Qualification{" "}
                      {`(${
                        academicFile?.name
                          ? academicFile?.name
                          : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}
              {selectedStudentFileOption?.value === "6" && (
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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer text-white border-none"
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
                      Upload Photo Video While Performing Works{" "}
                      {`(${
                        photoVidoeFile?.name
                          ? photoVidoeFile?.name
                          : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}
              {selectedStudentFileOption?.value === "7" && (
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
                    className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-gradient-to-l from-purple-400 to-purple-700 cursor-pointer  text-white border-none"
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
                      Upload USI Number{" "}
                      {`(${
                        usiFile?.name ? usiFile?.name : "Nothing selected"
                      })`}
                    </p>
                  </label>
                </div>
              )}

            </div>
            <div className=" self-start translate-y-7">
              <input
                type="file"
                name="file"
                multiple
                id="student-file-upload"
                onChange={handleCheckListFile}
                style={{ display: "none" }}
              />
              <div className="flex items-center ">
                <label
                  htmlFor="student-file-upload"
                  className="flex justify-center items-center gap-2 py-[3px] px-[15px] rounded bg-purple-700 cursor-pointer text-white border-none"
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

          <div className="mb-6 flex justify-center">
            <button
              disabled={uploadLoading ? true : false}
              type="submit"
              loading={uploadLoading}
              className="w-1/4 !py-3 !text-white font-medium !bg-brand-color !bg-opacity-80 hover:bg-primary-800 !rounded-md focus:outline-none font-poppins"
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

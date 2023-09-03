import { Button, Modal } from "antd";
import React from "react";
import SendStudentDetails from "./sendStudentDetails";
import { useState } from "react";

const CreateStudentModal = ({
  createOpen,
  setCreateOpen,
  setListData,
  setStudentListLoading,
}) => {
  const [course, setCourse] = useState(0);
  const [files, setFiles] = useState([]);
  const [photoFile, setPhotoFIle] = useState({});
  const [resumeFile, setResumeFIle] = useState({});
  const [letterFile, setLetterFIle] = useState({});
  const [visaFile, setVisaFIle] = useState({});
  const [academicFile, setAcademicFIle] = useState({});
  const [photoVidoeFile, setPhotoVideoFIle] = useState({});
  const [usiFile, setUsiFIle] = useState({});
  const [payFile, setpayFIle] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [allSelectedStudentFiles, setAllSelectedStudentFiles] = useState([]);
  const [data, setData] = useState({
    student_name: "",
    institute_name: "",
  });
  const handleClose = () => {
    setCreateOpen(false);
    setPhotoFIle({});
    setResumeFIle({});
    setLetterFIle({});
    setVisaFIle({});
    setAcademicFIle({});
    setPhotoVideoFIle({});
    setUsiFIle({});
    setpayFIle({});
    setData({});
    setCourseList([]);
    setCourse(0);
    setAllSelectedStudentFiles([])
  };
  return (
    <>
      <div>
        <Modal
          width={"85%"}
          onCancel={handleClose}
          visible={createOpen}
          footer={[
            <Button type="primary" onClick={handleClose}>
              Close
            </Button>,
          ]}
        >
          <SendStudentDetails
            data={data}
            setData={setData}
            files={files}
            setFiles={setFiles}
            photoFile={photoFile}
            setPhotoFIle={setPhotoFIle}
            resumeFile={resumeFile}
            setResumeFIle={setResumeFIle}
            letterFile={letterFile}
            setLetterFIle={setLetterFIle}
            visaFile={visaFile}
            setVisaFIle={setVisaFIle}
            academicFile={academicFile}
            setAcademicFIle={setAcademicFIle}
            photoVidoeFile={photoVidoeFile}
            setPhotoVideoFIle={setPhotoVideoFIle}
            usiFile={usiFile}
            setUsiFIle={setUsiFIle}
            payFile={payFile}
            setpayFIle={setpayFIle}
            setListData={setListData}
            setStudentListLoading={setStudentListLoading}
            setCreateOpen={setCreateOpen}
            setCourse={setCourse}
            courseList={courseList}
            setCourseList={setCourseList}
            course={course}
            allSelectedStudentFiles={allSelectedStudentFiles}
            setAllSelectedStudentFiles={setAllSelectedStudentFiles}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateStudentModal;

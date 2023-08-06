import { Button, Form, Input, Select, message } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSendStudentDetails } from "../../Components/services/utils";
import { shallowEqual, useSelector } from "react-redux";
import SendStudentDetails from "./sendStudentDetails";
import StudentList from "./StudentList";
import StudentdetailsAgency from "./StudentdetailsAgency";

const MangeStudent = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );

  return (
    <>
      <div>{userDetails?.role === 1 && <StudentdetailsAgency />}</div>
      <div>{userDetails?.role === 2 && <StudentList />}</div>
    </>
  );
};

export default MangeStudent;

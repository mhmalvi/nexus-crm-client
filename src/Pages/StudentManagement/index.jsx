import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import StudentList from "./StudentList";
import StudentdetailsAgency from "./StudentdetailsAgency";

const MangeStudent = () => {
  const userDetails = useSelector(
    (state) => state?.user?.userInfo,
    shallowEqual
  );

  return (
    <>
      <div>{userDetails?.role_id === 9 && <StudentdetailsAgency />}</div>
      <div>{userDetails?.role_id === 7 && <StudentList />}</div>
    </>
  );
};

export default MangeStudent;

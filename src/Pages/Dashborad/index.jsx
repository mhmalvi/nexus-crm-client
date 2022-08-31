import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  return (
    <div className="lg:px-8 2xl:ml-12 2xl:mr-16 py-24">
      <UserDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;

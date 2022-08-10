import React from "react";
import Table from "./Table";
import data from "./leadData.json";
import Filters from "./Filters";
import Calendar from "./Calendar";

const Dashboard = () => {
  return (
    <div className="lg:mx-4 2xl:ml-10 2xl:mr-16 py-36">
      <Calendar />
      <Filters />
      <Table data={data} />
    </div>
  );
};

export default Dashboard;

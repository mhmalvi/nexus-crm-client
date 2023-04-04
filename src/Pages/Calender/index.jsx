import React from "react";
import BigCalendar from "./BigCalender";

const Calender = () => {
  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-16 font-poppins">
      <h1 className="text-2xl font-semibold">Add Reminders</h1>

      <div>
        <BigCalendar />
      </div>
    </div>
  );
};

export default Calender;

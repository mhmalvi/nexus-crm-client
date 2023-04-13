import React from "react";
import BigCalendar from "./BigCalender";

const Calender = () => {
  return (
    <div className="relative lg:mx-6 2xl:ml-12 2xl:mr-16 py-16 font-poppins">
      <h1 className="text-2xl font-semibold">Add Reminders</h1>
      <div className="w-full">
        {/* <TuiCalendar /> */}
        <BigCalendar />
      </div>

      {/* <div className="h-full w-full bg-black/50 backdrop-blur-sm absolute top-10 -bottom-10 z-50 flex items-center justify-center">
        <div className="text-xl text-white">Feature Coming Soon</div>
      </div> */}
    </div>
  );
};

export default Calender;

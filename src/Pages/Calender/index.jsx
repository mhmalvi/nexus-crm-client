import React from "react";
import BigCalendar from "./BigCalender";

const Calender = () => {

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-xl backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
     
        <div className="relative font-poppins">
          <h1 className="text-2xl font-semibold text-white">Add Reminders</h1>
          <div className="w-full">
            <BigCalendar />
          </div>

          {/* <div className="h-full w-full bg-black/50 backdrop-blur-sm absolute top-10 -bottom-10 z-50 flex items-center justify-center">
        <div className="text-xl text-white">Feature Coming Soon</div>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default Calender;

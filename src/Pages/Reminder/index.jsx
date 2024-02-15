import React, { useState } from "react";
import BigCalendar from "./BigCalender";
import { useSelector } from "react-redux";
import Loading from "../../Components/Shared/Loader";
const Reminder = () => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;

  const [loading, setLoading] = useState(false);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
        <div className="relative font-poppins">
          <h1
            className={`text-2xl font-semibold ${
              colorMode ? "text-white" : "text-gray-800"
            }`}
          >
            Add Reminders
          </h1>
          <div className="w-full">
            {loading ? <Loading /> : <BigCalendar setLoading={setLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;

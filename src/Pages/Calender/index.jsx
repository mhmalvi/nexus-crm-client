import React from "react";
import BigCalendar from "./BigCalender";
import Loading from "../../Components/Shared/Loader";
import { useSelector } from "react-redux";

const Calender = () => {
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  return (
    <div>
      <div>
        {loadingDetails && (
          <div className="w-full h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}
      </div>
      <div className="relative lg:mx-6 2xl:ml-12 2xl:mr-16 py-16 font-poppins">
        <h1 className="text-2xl font-semibold">Add Reminders</h1>
        <div className="w-full">
          <BigCalendar />
        </div>

        {/* <div className="h-full w-full bg-black/50 backdrop-blur-sm absolute top-10 -bottom-10 z-50 flex items-center justify-center">
        <div className="text-xl text-white">Feature Coming Soon</div>
      </div> */}
      </div>
    </div>
  );
};

export default Calender;

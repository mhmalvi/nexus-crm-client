import React, { useState } from "react";
import { useEffect } from "react";

const Email = ({
  emailId,
  expeditor,
  messageSubject,
  messageSnippet,
  timestamp,
}) => {
  const [dayNum, setDayNum] = useState()

  useEffect(() => {
    const convert = new Date(timestamp)
    const weekday = convert.getDay();
    setDayNum(weekday);
  }, [])
  
  
  return (
    <>
      <div
        key={emailId}
        /* onClick={showModal} */
        className="flex justify-between items-center border-b py-1.5 px-6 hover:bg-zinc-50 hover:shadow duration-300 cursor-pointer"
      >
        <p className="w-[12rem] font-semibold whitespace-nowrap truncate">
          {" "}
          {expeditor}
        </p>
        <div className="flex items-center w-[16rem] sm:w-[30rem] truncate lg:w-[40rem]">
          <p className="font-semibold">
            {messageSubject} {messageSubject && "-"}
          </p>
          <p className="pl-1 text-gray-500 truncate"> {messageSnippet}</p>
        </div>

        <p className="text-gray-500 text-end text-xs">
          {dayNum === 0 && "Sunday, "}
          {dayNum === 1 && "Monday, "}
          {dayNum === 2 && "Tuesday, "}
          {dayNum === 3 && "Wednesday, "}
          {dayNum === 4 && "Thursday, "}
          {dayNum === 5 && "Friday, "}
          {dayNum === 6 && "Saturday, "}
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default Email;
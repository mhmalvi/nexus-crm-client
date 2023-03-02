import React from 'react';
import guy from "../../assets/Images/guy.jpg";

const EmailDetail = ({ selectedEmail }) => {
     console.log("in details", selectedEmail);
  return (
    <div>
      <div className="text-2xl font-semibold mt-10">
        {selectedEmail?.subject}
      </div>
      <div className="flex justify-between pt-5">
        <div className="flex items-center p-[2px] rounded-full">
          <img
            src={guy}
            alt=""
            className="object-cover rounded-full w-[40px] h-[40px] "
          />
          <div className="flex-col pl-2">
            <div className="font-semibold">Daily Star </div>
            <a href="#" className="text-sm">
              {selectedEmail?.to}
            </a>
          </div>
        </div>
        <div>{selectedEmail?.time.split("G", 1)}</div>
      </div>

      <div className="pt-5">{selectedEmail?.body}</div>
    </div>
  );
};

export default EmailDetail
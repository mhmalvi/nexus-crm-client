import React from "react";
import Icons from "../../Components/Shared/Icons";
import messages from "./messages.json";

const Message = () => {
  return (
    <div
      className="fixed top-28 -mt-2  pt-13 pb-4 bg-white"
      style={{
        width: "341px",
        left: "300px",
        boxShadow: "4px 0px 10px rgba(112, 55, 255, 0.05)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4">
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Massages
        </h1>
      </div>

      <div
        className="mt-7.5 overflow-y-auto px-4"
        style={{
          height: "65vh",
        }}
      >
        {messages.map((message) => (
          <div className="mt-5 pt-0.5 cursor-pointer">
            <div className="flex justify-between items-start">
              <h1 className="text-lg leading-7 font-poppins font-semibold">
                {message.user}
              </h1>
              {/* Date & Time */}
              <div>
                <span
                  className="font-medium text-opacity-50 leading-4 mr-1.5"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {message.time}
                </span>
                <span
                  className="font-medium text-opacity-50 leading-4"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {message.date}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-sm leading-6 font-medium font-poppins mb-0">
                  {message.message}
                </p>
              </div>
              <div>
                <Icons.Read
                  className={`${
                    message.read
                      ? "text-brand-color"
                      : "text-black text-opacity-25"
                  }`}
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;

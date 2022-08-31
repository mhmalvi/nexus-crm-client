import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../Components/Shared/Icons";
import messages from "./messages.json";

const Message = () => {
  const navigate = useNavigate();
  const handleMessageNavigation = () => {
    navigate("/lead/112");
  };

  return (
    <div
      className="fixed top-28 -ml-2 -mt-2 pb-6 bg-white border rounded-md"
      style={{
        width: "341px",
        left: "300px",
        boxShadow: "4px 2px 10px rgba(112, 55, 255, 0.05)",
      }}
    >
      <div className="px-4 pt-13" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Massages
        </h1>
      </div>

      <div
        className="mt-7.5 overflow-y-auto "
        style={{
          height: "65vh",
        }}
      >
        {messages.map((message, i) => (
          <div
            onClick={handleMessageNavigation}
            key={i}
            className="pt-5 px-4 cursor-pointer hover:bg-gray-50 hover:delay-200"
          >
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
            <hr onClick={(e) => e.stopPropagation()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;

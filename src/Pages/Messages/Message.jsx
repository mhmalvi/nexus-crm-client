import React from "react";
import Icons from "../../Components/Shared/Icons";

const Message = ({ messages, handleMessageNavigation }) => {
  return (
    <div>
      <div
        className="mt-7.5 overflow-y-auto "
        style={{
          maxHeight: "65vh",
        }}
      >
        {!messages.length && (
          <div className="text-lg font-poppins text-center my-6">
            No Message Yet
          </div>
        )}
        {messages.map((message, i) => (
          <div
            onClick={() =>
              handleMessageNavigation({
                id: message.id,
                receiver_id: message.receiver_id,
              })
            }
            key={i}
            className="pt-5 px-4 cursor-pointer hover:bg-gray-50 hover:delay-200"
          >
            <div className="flex justify-between items-start">
              <h1 className="text-lg leading-7 font-poppins font-semibold">
                {message.sender_name}
              </h1>

              {/* Date & Time */}
              <div>
                <span
                  className="font-medium text-opacity-50 leading-4 mr-1.5"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {message.date_time}
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
                    message.status
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

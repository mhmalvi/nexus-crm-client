import React from "react";
import { useSelector } from "react-redux";
import Icons from "../../Components/Shared/Icons";
import Filter from "bad-words";

const Message = ({ handleMessageNavigation }) => {
  const messages = useSelector((state) => state.messages.messages);
  // const userDetails = useSelector((state) => state.user.userInfo);
  const filter = new Filter();

  return (
    <div>
      <div
        className="mt-7.5 overflow-y-auto "
        style={{
          maxHeight: "65vh",
        }}
      >
        {!messages?.length && (
          <div className="text-lg font-poppins text-center my-6">
            No Message Yet
          </div>
        )}
        {messages?.map((message, i) => (
          <div
            onClick={() =>
              handleMessageNavigation({
                id: message.id,
                room_id: message.room,
                receiver_id: message.receiver_id,
              })
            }
            key={i}
            className="pt-5 px-4 cursor-pointer hover:bg-gray-50 hover:delay-200"
          >
            <div className="flex justify-between items-start">
              <h1 className="text-base leading-7 font-poppins font-semibold">
                {/* {message.receiver_name ===
                userDetails.firstName + userDetails.lastName
                  ? message.receiver_name
                  : message.sender_name} */}
                Lead {message.room}
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
                  {filter?.clean(message?.message)}
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

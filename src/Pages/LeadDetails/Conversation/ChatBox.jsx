import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Filter from "bad-words";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const ChatBox = ({ messageList, setMessageList, socket }) => {
  const filter = new Filter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("history", (message) => {
      console.log(message);
      setMessages(message);
    });
  }, []);

  return (
    <div className="h-100 relative mr-auto mb-2 border py-5 px-2 rounded-2xl font-poppins flex flex-col justify-between">
      <ScrollToBottom className="message-container ">
        {!messages?.length && (
          <div className="text-2xl text-center mt-16">No Conversation Yet</div>
        )}
        {messages?.map((message, i) => (
          <div className="px-4" key={i}>
            {parseInt(localStorage.getItem("userId")) === message.sender_id ? (
              <>
                <div
                  className="flex ml-auto justify-end mb-2.5"
                  style={{
                    maxWidth: "85%",
                  }}
                >
                  <div className="text-xs">
                    <p className="rounded-md font-normal mb-1 text-sm">
                      {filter.clean(message?.message)}
                    </p>
                    <div className="float-right">
                      <span className="text-gray-400 text-xs">
                        {message.date_time}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="text-xs mb-2.5"
                  style={{
                    maxWidth: "85%",
                  }}
                >
                  <p className="rounded-md font-normal mb-0.5 text-sm">
                    {filter.clean(message?.message)}
                  </p>
                  <div>
                    <span className="text-gray-400 text-xs">
                      {message.date_time}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBox;

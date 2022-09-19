import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Filter from "bad-words";
import { useEffect } from "react";
import axios from "axios";

const ChatBox = ({ messageList, setMessageList, socket }) => {
  const filter = new Filter();

  useEffect(() => {
    console.log("Last 100 messages:");

    const fetchData = async () => {
      return await socket.emit("room_messages", 123);
      //   console.log(res);
    };

    fetchData()
      .then((data) => console.log(data))
      .catch(console.error);

    // socket.on("room_messages", (last100Messages) => {
    //   console.log("Last 100 messages:", JSON.parse(last100Messages));
    //   last100Messages = JSON.parse(last100Messages);
    //   setMessageList((state) => [...last100Messages, ...state]);
    // });
  }, []);

  //   useEffect(() => {
  //     socket.on("last_messages", (message) => {
  //       console.log("Last 100 messages:", JSON.parse(message));
  //       message = JSON.parse(message);
  //       setMessageList((state) => [...message, ...state]);
  //     });

  //     return () => socket.off("last_100_messages");
  //   }, []);

  //   useEffect(() => {
  //     axios
  //       .get(`${process.env?.REACT_APP_CHAT_SERVER_URL}/get-message/123`)
  //       .then(function (response) {
  //         setMessageList(response?.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <div className="h-100 relative mr-auto mb-2 border py-5 px-2 rounded-2xl font-poppins flex flex-col justify-between">
      <ScrollToBottom className="message-container ">
        {!messageList?.length && (
          <div className="text-2xl text-center mt-16">No Conversation Yet</div>
        )}
        {messageList?.map((message, i) => (
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

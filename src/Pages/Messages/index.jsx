import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";


const Messages = () => {
  const navigate = useNavigate();

  const handleMessageNavigation = async (message) => {


    navigate(`/lead/${message?.room_id}`);
  };


  return (
    <div
      className="fixed top-28 -ml-2 -mt-2 pb-6 bg-white border rounded-md"
      style={{
        width: "341px",
        left: "290px",
        boxShadow: "4px 2px 10px rgba(112, 55, 255, 0.05)",
      }}
    >
      <div className="px-4 pt-13" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl leading-8 font-poppins font-semibold">
          Massages
        </h1>
      </div>

      <Message handleMessageNavigation={handleMessageNavigation} />
    </div>
  );
};

export default Messages;

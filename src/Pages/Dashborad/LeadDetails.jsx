import React from "react";
import { useParams } from "react-router-dom";

const LeadDetails = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div className="h-screen w-full bg-red-50">
      <h1>LeadDetails</h1>
    </div>
  );
};

export default LeadDetails;

import React from "react";

const EventDetails = ({ handleEventDetailsCancel, eventDetails }) => {
  return <div>{eventDetails?.title} -Details</div>;
};

export default EventDetails;

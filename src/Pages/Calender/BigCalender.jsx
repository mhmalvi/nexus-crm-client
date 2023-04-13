import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events1";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "antd";
import DayDetails from "./DayDetails";
import { useEffect } from "react";
import EventDetails from "./EventDetails";
moment.locale("en-GB");

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [openDayDetails, setOpenDayDetails] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [selectedEventTime, setSelectedEventTime] = useState();
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    setEventsData(events);
    // console.log(selectedEventTime);
  }, [selectedEventTime]);

  const handleSelect = ({ start, end }) => {
    // console.log(start);
    // console.log(end);

    setOpenDayDetails(true);
    setSelectedEventTime({
      start: start,
      end: end,
    });
    setEventDetails({});
  };

  const handleUpdateEvent = (e) => {
    setEventDetails(e);
    setOpenEventDetails(true);
  };

  const handleOpenDayDetailsCancel = () => {
    setOpenDayDetails(false);
  };

  const handleEventDetailsCancel = () => {
    setOpenDayDetails(false);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "90vh" }}
        onSelectEvent={(e) => handleUpdateEvent(e)}
        onSelectSlot={handleSelect}
      />
      <Modal
        className="cross_btn"
        centered
        visible={openDayDetails}
        onOk={() => setOpenDayDetails(false)}
        onCancel={() => setOpenDayDetails(false)}
        footer={false}
        width="50%"
      >
        <DayDetails
          handleOpenDayDetailsCancel={handleOpenDayDetailsCancel}
          selectedEventTime={selectedEventTime}
          eventDetails={eventDetails}
        />
      </Modal>

      {/* For A Single Event */}
      <Modal
        className="cross_btn"
        centered
        visible={openEventDetails}
        onOk={() => setOpenEventDetails(false)}
        onCancel={() => setOpenEventDetails(false)}
        footer={false}
        width="50%"
      >
        <EventDetails
          handleEventDetailsCancel={handleEventDetailsCancel}
          eventDetails={eventDetails}
        />
      </Modal>
    </div>
  );
};
export default BigCalendar;

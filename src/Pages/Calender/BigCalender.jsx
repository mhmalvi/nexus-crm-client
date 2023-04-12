import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "antd";
import DayDetails from "./DayDetails";
import { useEffect } from "react";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [open, setOpen] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [selectedEventTime, setSelectedEventTime] = useState();

  useEffect(() => {
    setEventsData(events);
  }, []);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);

    setOpen(true);
    setSelectedEventTime({
      start: `${start}`,
      end: `${end}`,
    });
  };

  const handleUpdateEvent = (e) => {
    console.log("e", e);
  };

  const handleCancel = () => {
    setOpen(false);
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
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={false}
        width="50%"
      >
        <DayDetails handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};
export default BigCalendar;

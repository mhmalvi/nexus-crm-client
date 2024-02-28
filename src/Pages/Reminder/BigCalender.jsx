import { Modal } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import DayDetails from "./DayDetails";
import EventDetails from "./EventDetails";
import "./reminder.css";
import { handleFetchReminders } from "../../Components/services/reminder";
moment.locale("en-GB");

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const userDetails = useSelector((state) => state.user.userInfo);
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const [openDayDetails, setOpenDayDetails] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [selectedEventTime, setSelectedEventTime] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  const [synEvents, setSynEvents] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState("Select Time");
  const [showReminder, setShowReminder] = useState([
    {
      id: null,
      title: "",
      start: null,
      end: null,
    },
  ]);

  useEffect(() => {
    fetchingReminders();
  }, []);

  const fetchingReminders = () => {
    (async () => {
      const data = {
        user_id: userDetails.id,
      };
      const res = await handleFetchReminders(data);

      // Manipulate the data to update the notification_time
      const updatedReminders = res.data.map((reminder) => {
        const utcDate = new Date(reminder.notification_time);
        const year = utcDate.getUTCFullYear();
        const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
        const day = String(utcDate.getUTCDate()).padStart(2, "0");
        const hours = String(utcDate.getUTCHours()).padStart(2, "0");
        const minutes = String(utcDate.getUTCMinutes()).padStart(2, "0");
        const seconds = String(utcDate.getUTCSeconds()).padStart(2, "0");
        const milliseconds = String(utcDate.getUTCMilliseconds()).padStart(
          3,
          "0"
        );
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

        return {
          ...reminder,
          notification_time: formattedDate,
        };
      });

      console.log(updatedReminders);
      setShowReminder(updatedReminders);
    })();
  };

  // useEffect(() => {
  //   dispatch(setLoader(true));
  //   setInterval(() => {
  //     (async () => {
  //       const featFollowUp = await handleFetchFollowUp(userDetails?.user_id);

  //       if (featFollowUp.status === 200) {
  //         featFollowUp?.data?.forEach((event) => {
  //           event.start = new Date(event.start);
  //           event.end = new Date(event.end);
  //         });
  //         setEventsData(featFollowUp?.data);

  //         dispatch(setLoader(false));
  //       } else {
  //         setTimeout(() => {
  //           dispatch(setLoader(false));
  //         }, 2000);
  //       }
  //     })();
  //   }, 1500);
  // }, [dispatch, selectedEventTime, userDetails, synEvents]);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2500);
  // }, []);

  const handleSelect = ({ start, end }) => {
    setSelectedEventTime({});
    setOpenDayDetails(true);
    setSelectedEventTime({
      start: start,
      end:
        Math.ceil(
          (new Date(end).getTime() - new Date(start).getTime()) /
            (1000 * 3600 * 24)
        ) === 0
          ? end
          : new Date(end.setDate(end.getDate() - 1)),
    });
    setEventDetails({});
  };

  const handleUpdateEvent = (e) => {
    setEventDetails(e);
    setOpenEventDetails(true);
  };

  const handleOpenDayDetailsCancel = () => {
    setOpenDayDetails(false);
    setTime("Select Time");
  };

  const handleEventDetailsCancel = () => {
    setIsEdit(false);
    setOpenEventDetails(false);
  };
  return (
    <div>
      <Calendar
        views={["day", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={showReminder}
        onSelectEvent={(e) => handleUpdateEvent(e)}
        onSelectSlot={handleSelect}
        className={colorMode ? "reminderBodyDark" : "reminderBodyWhite"}
      />

      <Modal
        className="cross_btn reminderModal"
        centered
        visible={openDayDetails}
        onOk={() => {
          setOpenDayDetails(false);
          setTime("Select Time");
        }}
        onCancel={() => {
          setOpenDayDetails(false);
          setTime("Select Time");
        }}
        footer={false}
        width="50%"
      >
        <DayDetails
          handleOpenDayDetailsCancel={handleOpenDayDetailsCancel}
          selectedEventTime={selectedEventTime}
          setSelectedEventTime={setSelectedEventTime}
          eventDetails={eventDetails}
          eventsData={eventsData}
          setEventsData={setEventsData}
          time={time}
          setTime={setTime}
          userDetails={userDetails}
          fetchingReminders={fetchingReminders}
        />
      </Modal>

      {/* For A Single Event */}
      <Modal
        className="cross_btn reminderModal"
        centered
        visible={openEventDetails}
        onOk={() => setOpenEventDetails(false)}
        onCancel={() => {
          setIsEdit(false);
          setOpenEventDetails(false);
        }}
        footer={false}
        width="50%"
      >
        <EventDetails
          handleEventDetailsCancel={handleEventDetailsCancel}
          eventDetails={eventDetails}
          isEdit={isEdit}
          setEventsData={setEventsData}
          eventsData={eventsData}
          setOpenEventDetails={setOpenEventDetails}
          setIsEdit={setIsEdit}
          synEvents={synEvents}
          setSynEvents={setSynEvents}
          fetchingReminders={fetchingReminders}
        />
      </Modal>
    </div>
  );
};
export default BigCalendar;

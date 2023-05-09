import { Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchFollowUp } from "../../Components/services/reminder";
import { setLoader } from "../../features/user/userSlice";
import DayDetails from "./DayDetails";
import EventDetails from "./EventDetails";
moment.locale("en-GB");

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userInfo);
  const [openDayDetails, setOpenDayDetails] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventsData, setEventsData] = useState();
  const [selectedEventTime, setSelectedEventTime] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  // const [synEvents, setSynEvents] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState("Select Time");

  useEffect(() => {
    dispatch(setLoader(true));
    (async () => {
      const featFollowUp = await handleFetchFollowUp(userDetails?.user_id);

      if (featFollowUp.status === 200) {
        featFollowUp?.data?.forEach((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        });
        setEventsData(featFollowUp?.data);
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, selectedEventTime, userDetails]);

  console.log("eventsData", eventsData);

  const handleSelect = ({ start, end }) => {
    console.log("{ start, end }", { start, end });
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
        events={eventsData}
        // events={events}
        style={{ height: "90vh" }}
        onSelectEvent={(e) => handleUpdateEvent(e)}
        onSelectSlot={handleSelect}
      />
      <Modal
        className="cross_btn"
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
          // synEvents={synEvents}
          // setSynEvents={setSynEvents}
          time={time}
          setTime={setTime}
          userDetails={userDetails}
        />
      </Modal>

      {/* For A Single Event */}
      <Modal
        className="cross_btn"
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
        />
      </Modal>
    </div>
  );
};
export default BigCalendar;

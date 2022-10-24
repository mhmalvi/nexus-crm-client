import { DatePicker, Dropdown, Menu, Modal, Space } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { io } from "socket.io-client";
import { handleAddNotification } from "../../../Components/services/auth";
import {
  handleAddNotice,
  handleDeleteNotices,
  handleFetchNotices,
} from "../../../Components/services/company";
import { handleMessageAudio } from "../../../Components/Shared/utils/sounds";
import { addNotifications } from "../../../features/user/notificationSlice";
import Notice from "./Notice";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER_URL);

const Calendar = ({
  filterDate,
  setFilterDate,
  selectedDay,
  setSelectedDay,
  selectedMonth,
  setSelectedMonth,
  setSelectedYear,
  selectedYear,
  // layout,
}) => {
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState("day");
  const [currentDate, setCurrentDate] = useState();
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [monthPicker, setMonthPicker] = useState(false);
  const [yearPicker, setYearPicker] = useState(false);
  const [syncNotifications, setSyncNotifications] = useState(false);
  // const [selectedDay, setSelectedDay] = useState("");
  // const [selectedMonth, setSelectedMonth] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");
  // const [notifications, setNotifications] = useState([]);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDescription, setNoticeDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [showNotices, setShowNotices] = useState(false);
  const [syncNotices, setSyncNotices] = useState(true);

  const userDetails = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    //   if (userDetails.role !== "admin") {
    //     const textAreaInput = document.getElementById("notice_input");
    //     textAreaInput.setAttribute("disabled", "");
    //     textAreaInput.placeholder = "No Notice Yet";
    //   } else {
    //     const textAreaInput = document.getElementById("notice_input");
    //     textAreaInput.placeholder = "Write notice here";
    //   }

    console.log(userDetails?.client_id);

    (async () => {
      const response = await handleFetchNotices(userDetails?.client_id);
      console.log(response.data);
      if (response?.data) {
        setNotices(response?.data?.filter((notice) => notice.status));
      }
    })();
  }, [userDetails, syncNotices]);

  const slideMonthRef = useRef();
  const slideDateRef = useRef();

  const februaryDate = dayjs().$y % 4 === 0 ? 29 : 28;
  const datesInMonth = [
    { key: 1, month: "Januyary", dates: 31 },
    { key: 2, month: "February", dates: februaryDate },
    { key: 3, month: "March", dates: 31 },
    { key: 4, month: "April", dates: 30 },
    { key: 5, month: "May", dates: 31 },
    { key: 6, month: "June", dates: 30 },
    { key: 7, month: "July", dates: 31 },
    { key: 8, month: "August", dates: 31 },
    { key: 9, month: "September", dates: 30 },
    { key: 10, month: "October", dates: 31 },
    { key: 11, month: "November", dates: 30 },
    { key: 12, month: "December", dates: 31 },
  ];

  useEffect(() => {
    slideMonthRef.current.slickGoTo(dayjs().month());
    slideDateRef.current.slickGoTo(dayjs().date());
    setCurrentDate(dayjs().date() - 1);
  }, []);

  useEffect(() => {
    socket.on("receive_notification", (data) => {
      if (data) {
        handleMessageAudio();
        dispatch(() => addNotifications(data));
        // setNotifications(data);
      }
    });
  }, [dispatch, syncNotifications]);

  // const dates = [
  //   dayjs().date() - 7 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 6
  //     : dayjs().date() - 7,
  //   dayjs().date() - 6 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 5
  //     : dayjs().date() - 6,
  //   dayjs().date() - 5 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 4
  //     : dayjs().date() - 5,
  //   dayjs().date() - 4 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 3
  //     : dayjs().date() - 4,
  //   dayjs().date() - 3 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 2
  //     : dayjs().date() - 3,
  //   dayjs().date() - 2 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates - 1
  //     : dayjs().date() - 2,
  //   dayjs().date() - 1 < 0
  //     ? datesInMonth[dayjs().month() + 1].dates
  //     : dayjs().date() - 1,
  //   dayjs().date(),
  //   dayjs().date() + 1,
  //   dayjs().date() + 2,
  //   dayjs().date() + 3,
  //   dayjs().date() + 4,
  //   dayjs().date() + 5,
  //   dayjs().date() + 6,
  // ];

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 600,
    arrows: false,
  };

  const dateSettings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 10,
    speed: 900,
    arrows: false,
  };

  // handeled changing months
  const handleMonths = (id) => {
    setFilterDate(
      `${dayjs()?.$y}-${id < 10 ? "0" + id : id}-${
        currentDate + 1 < 10 ? "0" + (currentDate + 1) : currentDate + 1
      }`
    );
    slideMonthRef.current.slickGoTo(id - 1);
    setCurrentMonth(id);
  };

  // handeled date click
  const handleDates = (id) => {
    setFilterDate(
      `${dayjs()?.$y}-${
        currentMonth < 10 ? "0" + currentMonth : currentMonth
      }-${id + 1 < 10 ? "0" + parseInt(id + 1) : id + 1}`
    );
    slideDateRef.current.slickGoTo(id + 1);
    setCurrentDate(id);
  };

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayPickerDays = [];

  for (let i = 0; i < 31; i++) {
    dayPickerDays.push({
      label: i + 1,
      key: i,
    });
  }

  const dayMenu = (
    <Menu
      className="grid grid-cols-4 gap-2"
      onClick={(e) => onDayChange(e)}
      items={dayPickerDays}
    />
  );

  const onDayChange = (e) => {
    const date = parseInt(e?.key) + 1;
    setSelectedDay(date < 10 ? `0` + date : date);
  };

  const onYearChange = (date, dateString) => {
    setSelectedYear(dateString);
  };

  const onMonthChange = (date, dateString) => {
    setSelectedMonth(dateString.slice(5));
  };

  const handleSendNotice = async (e) => {
    e.preventDefault();
    if (noticeDescription !== "") {
      const notificationData = {
        user_id: 1,
        client_id: 2,
        lead_id: "",
        email: "",
        contact: "",
        details: noticeDescription,
        trigg_time: new Date().toISOString().slice(0, 19).replace("T", " "),
        notification_type: "notice",
        status: 0,
      };
      handleAddNotification(notificationData);

      const handleAddNotile = await handleAddNotice(
        userDetails?.client_id,
        noticeTitle,
        noticeDescription
      );

      if (handleAddNotile?.status) {
        setSyncNotices(!syncNotices);
      }
      // await socket.emit("send_notification", notificationData);
      setSyncNotifications(!syncNotifications);
      setNoticeTitle("");
      setNoticeDescription("");
    }
  };

  const handleClearDate = () => {
    setFilterDate("");
    setSelectedDay("");
    setSelectedMonth("");
    setSelectedYear("");
    slideMonthRef.current.slickGoTo(dayjs().month());
    slideDateRef.current.slickGoTo(dayjs().date());
    setCurrentDate(dayjs().date() - 1);
  };

  const handleDeleteNoticeReq = async (id) => {
    const response = await handleDeleteNotices(id);
    if (response?.status) setSyncNotices(!syncNotices);
  };

  return (
    <div
      className="flex justify-between"
      onClick={() => {
        setMonthPicker(false);
        setYearPicker(false);
      }}
    >
      <div
        className="border py-3 px-7 mt-4"
        style={{
          borderRadius: "20px",
        }}
      >
        <div>
          <h1 className="text-xl font-semibold mb-7 leading-8 font-poppins">
            {weekDays[dayjs().day()]}, {datesInMonth[dayjs().month()].month}{" "}
            {dayjs().year()}
          </h1>
        </div>

        <div
          className="relative flex justify-center items-center"
          style={{
            width: "42vw",
          }}
        >
          <div className="flex items-center rounded-full bg-gray-100 mb-5">
            <Dropdown overlay={dayMenu} trigger={["click"]}>
              <div
                className={`px-3 py-2 text-xs leading-4 font-medium font-poppins ${
                  activeSection === "day" ? "bg-black text-white" : "text-black"
                } rounded-full cursor-pointer`}
                onClick={() => {
                  setActiveSection("day");
                  setMonthPicker(false);
                }}
              >
                <Space>{selectedDay ? selectedDay : "Day"}</Space>
              </div>
            </Dropdown>
            <div
              className={`relative w-17 px-3 py-2 text-xs leading-4 font-light font-poppins ${
                activeSection === "month" ? "bg-black text-white" : "text-black"
              } rounded-full cursor-pointer mx-2`}
              onClick={(e) => {
                setActiveSection("month");
                setYearPicker(false);
                setMonthPicker(!monthPicker);
                e.stopPropagation();
              }}
            >
              <div className="absolute top-0.5 left-0 w-17 h-full flex justify-center items-center">
                <h1
                  className={`${
                    activeSection === "month"
                      ? " bg-black text-white"
                      : "text-black"
                  }`}
                >
                  {selectedMonth
                    ? datesInMonth[parseInt(selectedMonth) - 1]?.month
                    : "Month"}
                </h1>
              </div>
              <DatePicker
                suffixIcon=""
                className="custom-picker text-white"
                picker="month"
                open={monthPicker}
                bordered={false}
                onChange={onMonthChange}
              />
            </div>
            <div
              className={`relative px-3 py-2 text-xs leading-4 font-light font-poppins ${
                activeSection === "year" ? "bg-black" : "text-black"
              } rounded-full cursor-pointer`}
              onClick={(e) => {
                setActiveSection("year");
                setMonthPicker(false);
                setYearPicker(!yearPicker);
                e.stopPropagation();
              }}
            >
              <div className="absolute top-0.5 -left-2.5 w-17 h-full flex justify-center items-center">
                <h1
                  className={`${
                    activeSection === "year" ? " text-white" : "text-black"
                  }`}
                >
                  {selectedYear ? selectedYear : "Year"}
                </h1>
              </div>
              <DatePicker
                suffixIcon=""
                className="text-white"
                picker="year"
                open={yearPicker}
                bordered={false}
                onChange={onYearChange}
              />
            </div>
          </div>
          <div className="absolute right-0 bottom-4">
            {filterDate?.length |
            selectedDay?.length |
            selectedMonth?.length |
            selectedYear?.length ? (
              <h1
                className="text-brand-color font-semibold text-base cursor-pointer p-0.5"
                onClick={handleClearDate}
              >
                Clear
              </h1>
            ) : (
              <h1> </h1>
            )}
          </div>
        </div>

        <div
          className="relative calender-carousel"
          style={{
            width: "42vw",
          }}
        >
          <Slider {...settings} ref={slideMonthRef}>
            {datesInMonth.map((date) => (
              <div
                key={date.key}
                className="py-5 -ml-2 cursor-pointer text-base leading-6 font-poppins"
                onClick={() => handleMonths(date.key)}
              >
                <h1
                  className={`mb-0 text-sm xl:text-base text-center ${
                    currentMonth === date.key ? "font-semibold" : "font-normal"
                  }`}
                  onClick={() => setCurrentMonth(date.key)}
                >
                  {date.month}
                </h1>
              </div>
            ))}
          </Slider>
          <div className="calendar-fader-left"></div>
          <div className="calendar-fader-right"></div>
        </div>

        <div
          className="relative"
          style={{
            width: "42vw",
          }}
        >
          <div className="ml-14 mb-5">
            {/* <div className=" flex justify-between items-center">
              {dates.map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    onClick={() => handleDates(i)}
                    className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer ${
                      currentDate === i ? "bg-black" : "bg-gray-100"
                    }`}
                  >
                    <h1
                      className={`text-base text-center leading-6 font-poppins font-normal mb-0 ${
                        currentDate === i && "text-white rounded-full"
                      }`}
                    >
                      {i + 1}
                    </h1>
                  </div>
                  <div className="mt-3">
                    <h1
                      className="leading-4 font-normal font-poppins"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {weekDays[`${dayjs()?.day(i + 1)?.$W}`].slice(0, 3)}
                    </h1>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Creating the dates aray to map */}
            <Slider {...dateSettings} ref={slideDateRef}>
              {Array.from(
                Array(datesInMonth[currentMonth - 1]?.dates).keys()
              ).map((i) => (
                <div
                  key={i}
                  onClick={() => handleDates(i)}
                  className="cursor-pointer flex  justify-center items-center"
                >
                  {/* <div
                    onClick={() => handleDates(i)}
                    className={`w-8 h-8 mx-auto flex justify-center items-center rounded-full ${
                      currentDate === i ? "border border-black" : "bg-gray-100"
                    }`}
                  > */}
                  <h1
                    className={`w-8 h-8 mb-0 mx-auto flex justify-center items-center rounded-full ${
                      currentDate === i ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </h1>
                  {/* </div> */}
                  <div className="mt-3">
                    <h1
                      className="leading-4 text-center font-normal font-poppins"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {weekDays[
                        dayjs(`${dayjs().$y}-${currentMonth}-${i + 1}`).$W
                      ]?.slice(0, 3)}
                    </h1>
                  </div>
                </div>
              ))}
            </Slider>

            <div className="calendar-fader-right"></div>
            <div className="calendar-fader-left"></div>
          </div>
        </div>
      </div>

      <Modal
        visible={showNotices}
        onCancel={() => setShowNotices(false)}
        footer={null}
        width="1000px"
      >
        <div className="">
          <div className="font-poppins text-base font-semibold mb-6">
            Notices
          </div>
          {notices.length ? (
            <div>
              {notices?.map((notice) => (
                <Notice
                  key={notice.id}
                  notice={notice}
                  handleDeleteNoticeReq={handleDeleteNoticeReq}
                />
              ))}
            </div>
          ) : (
            <h1 className="font-poppins text-center">No Notices</h1>
          )}
        </div>
      </Modal>

      {userDetails.role_id === 3 ? (
        <div
          className="lg:w-64 xl:w-84 mx-0.5 py-2.5 px-6 border mt-6"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="py-2.5 border-b flex flex-col justify-center items-center">
            <h1 className="text-xl text-center font-semibold leading-8 font-poppins">
              Notice Board
            </h1>
            <button
              onClick={() => {
                setShowNotices(true);
                console.log(showNotices);
              }}
              className="bg-black px-4 py-2 text-white rounded-lg"
            >
              Preview Notices
            </button>
          </div>
          <div>
            <form
              onSubmit={(e) => handleSendNotice(e)}
              className="flex items-start flex-col"
            >
              <input
                className="w-full px-2 py-1 rounded-md bg-transparent outline-none border mb-3"
                type="text"
                placeholder="Notice Title"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
              />
              <span className="text-xs font-normal font-poppins mb-0.5 ml-1.5">
                Notice Details
              </span>
              <textarea
                className="w-full outline-none border px-2 py-1 rounded-md bg-transparent"
                name=""
                style={{ resize: "none" }}
                id="notice_input"
                value={noticeDescription}
                onChange={(e) => setNoticeDescription(e.target.value)}
                rows="3"
              ></textarea>
              <input
                className="px-2.5 py-1 mt-2 font-poppins font-semibold text-xs leading-5 cursor-pointer border text-white bg-black rounded-md"
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="lg:w-64 h-60 xl:w-84 mx-0.5 py-2.5 px-6 border mt-6"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="py-2.5 border-b">
              <h1 className="text-xl text-center font-semibold leading-8 font-poppins">
                Notice Board
              </h1>
            </div>
            <div className="mt-14 flex items-center justify-center">
              <button
                onClick={() => setShowNotices(true)}
                className="bg-black px-4 py-2 text-white rounded-lg"
              >
                Preview Notices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

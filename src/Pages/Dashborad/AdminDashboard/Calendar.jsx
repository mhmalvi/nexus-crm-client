import { DatePicker, Dropdown, Menu, Space } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const Calendar = () => {
  const [activeSection, setActiveSection] = useState("day");
  const [currentDate, setCurrentDate] = useState();
  const [monthPicker, setMonthPicker] = useState(false);
  const [yearPicker, setYearPicker] = useState(false);

  const slideMonthRef = useRef();

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
    setCurrentDate(dayjs().date() - 1);
  }, []);

  const dates = [
    dayjs().date() - 8,
    dayjs().date() - 7,
    dayjs().date() - 6,
    dayjs().date() - 5,
    dayjs().date() - 4,
    dayjs().date() - 3,
    dayjs().date() - 2,
    dayjs().date() - 1,
    dayjs().date(),
    dayjs().date() + 1,
    dayjs().date() + 2,
    dayjs().date() + 3,
    dayjs().date() + 4,
    dayjs().date() + 5,
    dayjs().date() + 6,
    dayjs().date() + 7,
    dayjs().date() + 8,
  ];

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 600,
    arrows: false,
  };

  // handeled changing months
  const handleMonths = (id) => {
    slideMonthRef.current.slickGoTo(id - 1);
  };

  // handeled date click
  const handleDates = (id) => {
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
    <Menu className="grid grid-cols-4 gap-2" items={dayPickerDays} />
  );

  return (
    <div
      className="flex justify-between items-center"
      onClick={() => {
        setMonthPicker(false);
        setYearPicker(false);
      }}
    >
      <div>
        <div>
          <h1 className="text-xl font-semibold mb-7 leading-8 font-poppins">
            {weekDays[dayjs().day()]}, {datesInMonth[dayjs().month()].month}{" "}
            {dayjs().year()}
          </h1>
        </div>
        <div
          className="flex justify-center items-center"
          style={{
            width: "46rem",
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
                <Space>Day</Space>
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
                  Month
                </h1>
              </div>
              <DatePicker
                suffixIcon=""
                className="custom-picker text-white"
                picker="month"
                open={monthPicker}
                bordered={false}
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
                  Year
                </h1>
              </div>
              <DatePicker
                suffixIcon=""
                className="text-white"
                picker="year"
                open={yearPicker}
                bordered={false}
              />
            </div>
          </div>
        </div>
        <div
          className="relative calender-carousel"
          style={{
            width: "46rem",
          }}
        >
          <Slider {...settings} ref={slideMonthRef}>
            {datesInMonth.map((date) => (
              <div
                key={date.key}
                className="py-5 cursor-pointer text-base font-normal leading-6 font-poppins "
                onClick={() => handleMonths(date.key)}
              >
                <h1 className="mb-0 text-center">{date.month}</h1>
              </div>
            ))}
          </Slider>
          <div className="calendar-fader-left"></div>
          <div className="calendar-fader-right"></div>
        </div>
        <div
          className="relative"
          style={{
            width: "48rem",
          }}
        >
          <div className="ml-14 mb-5">
            <div className=" flex justify-between items-center">
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
            </div>

            {/* <Slider {...dateSettings} ref={slideDateRef}> */}
            {/* Creating the dates aray to map */}
            {/* <div className="grid grid-cols-12"> */}
            {/* {Array.from(Array(datesInMonth[currentMonth - 1]?.dates).keys()).map(
            (i) => (
              <div
                key={i}
                onClick={() => handleDates(i)}
                className="cursor-pointer"
              >
                <div
                  onClick={() => handleDates(i)}
                  className={`w-8 h-8 rounded-full ${
                    currentDate === i ? "bg-black" : "bg-gray-100"
                  }`}
                >
                  <h1
                    // key={i}
                    className={`text-base leading-6 font-poppins font-normal mb-0 ${
                      currentDate === i && "text-white rounded-full"
                    }`}
                  >
                    {i + 1}
                  </h1>
                </div>
                <div>
                  <h1>{dayjs().day()}</h1>
                </div>
              </div>
            )
          )} */}
          </div>

          <div className="calendar-fader-right"></div>
          <div className="calendar-fader-left"></div>
        </div>
      </div>

      <div
        className="w-84 h-52 mx-0.5 py-2.5 px-6 border"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="py-2.5 border-b">
          <h1 className="text-xl text-center font-semibold leading-8 font-poppins">
            Notice Board
          </h1>
        </div>
        <div>
          <p className="mt-4 text-base leading-6 font-medium font-poppins">
            ll months have 30 or 31 days, except for February which has 28 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

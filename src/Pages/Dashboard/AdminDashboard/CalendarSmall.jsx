import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { Calendar, Radio, Select } from "antd";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
dayjs.extend(dayLocaleData);
const CalendarSmall = ({
  // filterDate,
  selectedDay,
  selectedMonth,
  selectedYear,
  setFilterDate,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
}) => {
  const februaryDate = dayjs().$y % 4 === 0 ? 29 : 28;
  const datesInMonth = [
    { key: 1, month: "January", dates: 31 },
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

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const onYearChange = (value) => {
    setSelectedYear(value.format("YYYY"));
  };

  const onMonthChange = (value) => {
    setSelectedMonth(value.format("YYYY-MM").slice(5));
  };

  const handleClearDate = () => {
    const currentDate = dayjs();
    setFilterDate("");
    setSelectedDay("");
    setSelectedYear(currentDate.year());
    setSelectedMonth(currentDate.month());
  };

  const handlePanelChange = (value, mode) => {
    if (mode === "year" && value.month) {
      const selectedYear = value.format("YYYY");
      const selectedMonth = value.month() + 1;
      console.log(
        `Selected Year: ${selectedYear}, Selected Month: ${selectedMonth}`
      );
    }
  };

  const colorMode = useSelector((state) => state?.user)?.colorMode;
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  return (
    <div>
      <Calendar
        className={colorMode ? "calendarBodyDark" : "calendarBodyWhite"}
        fullscreen={false}
        locale={{
          lang: {
            locale: "en",
            weekdaysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          },
        }}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];

          for (let i = 0; i <= 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i + 1} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }
          const year = value.year();
          const month = value.month();
          const yearOptions = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            yearOptions.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div>
              <h1
                level={4}
                className={`3xl:text-xl 2xl:text-base text-sm ${
                  colorMode ? " text-slate-300" : "text-gray-800"
                }`}
              >
                {weekDays[dayjs().day()]}, {dayjs()?.$D}{" "}
                {datesInMonth[dayjs().month()].month} {dayjs().year()}
              </h1>
              <div
                className={`${
                  colorMode ? "calendarHeadDark" : "calendarHeadWhite"
                } flex flex-col items-center gap-2 border-b border-brand-color`}
              >
                <div className="flex w-full justify-between ">
                  <Radio.Group
                    size="small"
                    onChange={(e) => {
                      onTypeChange(e.target.value);
                    }}
                    value={type}
                  >
                    <Radio.Button value="month">Days</Radio.Button>
                    <Radio.Button value="year">Months</Radio.Button>
                  </Radio.Group>
                  <div
                    className={
                      colorMode
                        ? "calendarDropHeadDark"
                        : "calendarDropHeadWhite"
                    }
                  >
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={selectedYear}
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                        onYearChange(now);
                        setSelectedYear(newYear);
                      }}
                    >
                      {yearOptions}
                    </Select>
                  </div>
                  <div
                    className={
                      colorMode
                        ? "calendarDropHeadDark"
                        : "calendarDropHeadWhite"
                    }
                  >
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={selectedMonth}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth);
                        onChange(now);
                        onMonthChange(now);
                        setSelectedMonth(newMonth);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </div>
                </div>
                <button
                  className={`text-sm m-0 p-0 ${
                    colorMode ? "text-slate-300" : "text-gray-800"
                  }`}
                  onClick={handleClearDate}
                >
                  Clear Date
                </button>
              </div>
            </div>
          );
        }}
        onPanelChange={handlePanelChange}
        onChange={(value) => {
          const date = value.date();
          setSelectedDay(date < 10 ? `0${date}` : `${date}`);
        }}
      />
    </div>
  );
};
export default CalendarSmall;

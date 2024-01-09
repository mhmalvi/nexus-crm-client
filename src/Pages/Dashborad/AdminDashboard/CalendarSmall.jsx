import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { Calendar, Col, Radio, Row, Select, Typography } from "antd";
dayjs.extend(dayLocaleData);
const CalendarSmall = ({
  // filterDate,
  selectedDay,
  // selectedMonth,
  // selectedYear,
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
    console.log(value.format("YYYY-MM"));
    setSelectedMonth(value.format("YYYY-MM").slice(5));
  };

  const handleClearDate = () => {
    setFilterDate("");
    setSelectedDay("");
    setSelectedMonth("");
    setSelectedYear("");
  };

  return (
    <>
      <Calendar
        className="calendarBody"
        fullscreen={false}
        locale={{
          lang: {
            locale: 'en',
            weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          }
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
              <Select.Option key={i} value={i} className="month-item">
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
              <h1 level={4} className="text-xl text-white">
                {weekDays[dayjs().day()]}, {dayjs()?.$D}{" "}
                {datesInMonth[dayjs().month()].month} {dayjs().year()}
              </h1>
              <div className="calendarHead mb-2">
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}
                >
                  <Radio.Button value="month">Month</Radio.Button>
                  <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                <div className="calendarDropHead">
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                      onYearChange(now);
                    }}
                  >
                    {yearOptions}
                  </Select>
                </div>
                <div className="calendarDropHead">
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                      onMonthChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </div>

                <button
                  className="text-white"
                  size="small"
                  onClick={handleClearDate}
                >
                  Clear Date
                </button>
              </div>
            </div>
          );
        }}
        // onPanelChange={onPanelChange}
        onChange={(value) => {
          const date = parseInt(value.format("DD"));
          setSelectedDay(date < 10 ? `0${date}` : `${date}`);
          console.log("This is the selectedDay: ", selectedDay);
        }}
      />
    </>
  );
};
export default CalendarSmall;

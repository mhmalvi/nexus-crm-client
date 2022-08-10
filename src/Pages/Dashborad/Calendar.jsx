import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState();
  const februaryDate = dayjs().$y % 4 === 0 ? "29" : "28";
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
    setCurrentMonth(dayjs().month());
  }, []);

  //   var d = new Date(2018, 8, 18);
  //   var day = dayjs(d);

  const d = new Date();
  d.getMonth();
  d.getDate();
  d.getFullYear();

  //   console.log(dayjs().startOf("month").day());
  // console.log(dayjs().$y);
  // console.log(dayjs().month());

  console.log(currentMonth);
  const settings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 4,
    speed: 600,
    arrows: false,
  };

  const dateSettings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    arrows: false,
  };

  return (
    <div>
      <h1>Calendar</h1>
      {/* <div className='calendar-wrapper flex items-center'> */}
      <div className='relative calender-carousel w-6/12'>
        <Slider {...settings}>
          {datesInMonth.map((date) => (
            <div
              key={date.key}
              className={`itemss mr-7.5 cursor-pointer leading-6 font-poppins ${
                currentMonth == date.key &&
                "slick-slide slick-active slick-center slick-current"
              }`}
              // dataIndex={`${currentMonth == date.key && "0"}`}
              onClick={() => setCurrentMonth(date.key)}
            >
              {date.month}
            </div>
          ))}
        </Slider>
        <div className='calendar-fader-left'></div>
        <div className='calendar-fader-right'></div>
      </div>
      <div>
        <Slider {...dateSettings}>
          {datesInMonth.map((date) => (
            <div key={date.key} className='mr-7.5 cursor-pointer'>
              <div className='flex items-center justify-between'>
                {(() => {
                  let td = [];
                  for (let i = 1; i <= date.dates; i++) {
                    td.push(
                      <h1
                        className='text-base leading-6 font-poppins font-normal felx items-center'
                        key={i}
                      >
                        {i}
                      </h1>
                    );
                  }
                  return td;
                })()}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* </div> */}
      {/* <div className='calendar-wrapper flex items-center'>
        {datesInMonth.map((date) => (
          <div className='mr-7.5 cursor-pointer'>
            <h1 className='text-base leading-6 font-poppins font-normal'>
              {(() => {
                let td = [];
                for (let i = 1; i <= date.dates; i++) {
                  td.push(<td key={i}>{i}</td>);
                }
                return td;
              })()}
            </h1>
          </div>
        ))}
        <div className='calendar-fader'></div>
      </div> */}
    </div>
  );
};

export default Calendar;

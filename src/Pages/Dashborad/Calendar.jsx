import dayjs from "dayjs";
import React from "react";

const Calendar = () => {
  const februaryDate = dayjs().$y % 4 === 0 ? "29" : "28";

  const datesInMonth = [
    { month: "Januyary", dates: 31 },
    { month: "February", dates: februaryDate },
    { month: "March", dates: 31 },
    { month: "April", dates: 30 },
    { month: "May", dates: 31 },
    { month: "June", dates: 30 },
    { month: "July", dates: 31 },
    { month: "August", dates: 31 },
    { month: "September", dates: 30 },
    { month: "October", dates: 31 },
    { month: "November", dates: 30 },
    { month: "December", dates: 31 },
  ];

  //   var d = new Date(2018, 8, 18);
  //   var day = dayjs(d);

  const d = new Date();
  d.getMonth(); // Month    [mm]    (1 - 12)
  d.getDate(); // Day      [dd]    (1 - 31)
  d.getFullYear(); // Year     [yyyy]

  //   console.log(dayjs().startOf("month").day());
  console.log(dayjs().$y);
  //   console.log(dayjs.weekdaysMin());
  return (
    <div>
      <h1>Calendar</h1>
      <div className="calendar-wrapper flex items-center">
        {datesInMonth.map((date) => (
          <div className="mr-7.5 cursor-pointer">
            <h1 className="text-base leading-6 font-poppins font-normal">
              {date.month}
            </h1>
          </div>
        ))}
      </div>
      <div className="calendar-wrapper flex items-center">
        {datesInMonth.map((date) => (
          <div className="mr-7.5 cursor-pointer">
            <h1 className="text-base leading-6 font-poppins font-normal">
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
        <div className="calendar-fader"></div>
      </div>
    </div>
  );
};

export default Calendar;

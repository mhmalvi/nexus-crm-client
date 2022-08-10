import React, { useState } from "react";

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  const filterOptions = [
    {
      id: 0,
      title: "All",
    },
    {
      id: 1,
      title: "Today Task",
    },
    {
      id: 2,
      title: "New Lead",
    },
    {
      id: 3,
      title: "Called",
    },
    {
      id: 4,
      title: "Skilled",
    },
    {
      id: 5,
      title: "Verified",
    },
    {
      id: 6,
      title: "Paid",
    },
    {
      id: 7,
      title: "Comleted",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
          Filters
        </h1>
        <div className="flex items-center">
          {/* Filters */}
          {filterOptions.map((option) => (
            <div key={option.id} onClick={() => setActiveFilter(option.id)}>
              <h1
                className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 ${
                  activeFilter === option.id
                    ? "text-white bg-black"
                    : "text-black bg-white"
                }  rounded-full`}
                style={{
                  border: "1px solid rgba(124, 141, 181, 0.5)",
                }}
              >
                {option.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;

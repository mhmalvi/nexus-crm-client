import React from "react";
import Icons from "../../Components/Shared/Icons";
import { useSelector } from "react-redux";

const Filter = ({ activeFilter, setActiveFilter, setSearchCampaign }) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const filterOptions = [
    {
      id: 0,
      title: "All",
    },
    {
      id: 1,
      title: "Running",
    },
    {
      id: 2,
      title: "Closed",
    },
  ];

  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h1
          className={`text-2xl ${
            colorMode ? "text-slate-300" : "text-gray-800"
          } font-poppins`}
        >
          Filters
        </h1>
        <div className="flex items-center">
          {/* Filters */}
          {filterOptions.map((option) => (
            <div key={option.id} onClick={() => setActiveFilter(option.id)}>
              <h1
                className={`text-base font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 ${
                  activeFilter === option.id
                    ? "text-white bg-brand-color"
                    : "text-black bg-white"
                }  rounded-md`}
              >
                {option.title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Search Option */}
      <div className="">
        <h1
          className={`text-base ${
            colorMode ? "text-slate-300" : "text-gray-800"
          } font-normal font-poppins`}
        >
          Search Campaign
        </h1>
        <div className="flex justify-between items-center rounded-md gap-x-5 pr-5 shadow-md backdrop-blur-2xl bg-[#ffffff44]">
          <div>
            <input
              className="appearance-none active:outline-none focus:outline-none outline-none text-xs bg-transparent border-0 font-medium font-poppins ml-4"
              type="search"
              name="search-code"
              id=""
              placeholder="Search Campaign"
              onChange={(e) => setSearchCampaign(e.target.value)}
            />
          </div>
          <div>
            <Icons.Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

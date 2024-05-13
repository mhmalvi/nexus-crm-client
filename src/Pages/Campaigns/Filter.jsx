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
        <div className="flex items-center gap-4">
          {/* Filters */}
          {filterOptions.map((option) => (
            <div key={option.id} onClick={() => setActiveFilter(option.id)}>
              <h1
                className={`text-sm font-normal font-poppins px-3 py-2 cursor-pointer ${
                  activeFilter === option.id
                    ? "text-white bg-brand-color"
                    : ` ${colorMode ? "bg-slate-300 text-gray-800":"bg-gray-800 text-slate-300"} `
                } rounded-md`}
              >
                {option.title}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Search Option */}
      <div className="">
        <div className="flex justify-between items-center rounded-md gap-x-5 pr-5 shadow-md backdrop-blur-2xl bg-[#ffffff44]">
          <div>
            <input
              className={`${
                colorMode
                  ? "placeholder:!text-slate-300"
                  : "placeholder:!text-black"
              } border-none focus:ring-0 text-xs bg-transparent font-medium font-poppins ml-4 `}
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

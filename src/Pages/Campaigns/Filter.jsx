import React from "react";
import Icons from "../../Components/Shared/Icons";

const Filter = ({ activeFilter, setActiveFilter, setSearchCampaign }) => {
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
        <h1 className="text-lg text-white font-normal font-poppins ">
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

      {/* Search Option */}
      <div className="">
        <h1 className="text-lg text-white font-normal font-poppins ">
          Search Campaign
        </h1>
        <div className="flex justify-between items-center rounded-xl gap-x-5 pr-5 shadow-xl backdrop-blur-2xl bg-[#ffffff44]">
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

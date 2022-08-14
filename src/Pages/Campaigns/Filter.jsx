import React from "react";
import Icons from "../../Components/Shared/Icons";

const Filter = ({
  activeFilter,
  setActiveFilter,
//   searchCampaign,
  setSearchCampaign,
}) => {
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
    <div className="flex justify-between items-center">
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

      {/* Search Option */}
      <div>
        <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
          Search Lead
        </h1>
        <div
          className="w-58 px-4 py-2.5 mx-0.5 flex items-center bg-gray-100"
          style={{
            borderRadius: "10px",
          }}
        >
          <div>
            <Icons.Search />
          </div>
          <div>
            <input
              className="outline-none text-xs bg-gray-100 leading-5 font-medium font-poppins ml-4"
              type="text"
              name="search-code"
              id=""
              placeholder="Search Campaign"
              onChange={(e) => setSearchCampaign(e.target.value)}
            />
          </div>
          <div>
            <Icons.Send />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

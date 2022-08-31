import React from "react";
import Icons from "../../../Components/Shared/Icons";

const Filters = ({
  activeFilter,
  setActiveFilter,
  layout,
  activeStars,
  setActiveStars,
  setSearchInput,
}) => {
  const filterOptions = [
    {
      id: 0,
      title: "All",
    },
    {
      id: 1,
      title: "Today's Task",
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
      title: "Completed",
    },
  ];

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex justify-between ">
      <div>
        {layout !== "Payment" && (
          <div
            className="border py-3 px-7 mt-5"
            style={{
              borderRadius: "20px",
            }}
          >
            <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
              Filters
            </h1>
            <div className="flex flex-wrap items-center">
              {/* Status Filters */}
              {filterOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setActiveFilter(option.title)}
                >
                  <h1
                    className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 whitespace-nowrap ${
                      activeFilter === option.title
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
            <div className="flex items-center mt-2">
              {/* Star Filters */}
              {ratings.map((rate) => (
                <div key={rate} onClick={() => setActiveStars(rate)}>
                  <h1
                    className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 ${
                      activeStars === rate
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }  rounded-full`}
                    style={{
                      border: "1px solid rgba(124, 141, 181, 0.5)",
                    }}
                  >
                    {rate} {rate > 1 ? "Stars" : "Star"}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Option */}
      <div
        className="border px-7 py-8 mt-5 ml-6"
        style={{
          borderRadius: "20px",
        }}
      >
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
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Code"
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

export default Filters;

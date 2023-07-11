import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../../../Components/Shared/Icons";
// import Icons from "../../../Components/Shared/Icons";

const Filters = ({
  activeFilter,
  filterOptions,
  ratings,
  layout,
  setSearchInput,
  companyEmployeeList,
  handleFilterLeadList,
  handleStaredLeadsFilter,
  handleFilterAssignedEmployee,
}) => {
  const userDetails = useSelector((state) => state.user?.userInfo);

  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    const options = [
      {
        key: null,
        value: "All",
        label: "All",
      },
    ];

    if (companyEmployeeList?.length) {
      companyEmployeeList?.map((employee) =>
        options.push({
          key: employee?.user_id,
          value: employee?.full_name,
          label: employee?.full_name,
        })
      );
    }

    setEmployeeOptions(options);
  }, [companyEmployeeList]);

  const handleEmployeeChange = (name) => {
    handleFilterAssignedEmployee(name);
  };

  return (
    <div className="flex justify-between ">
      <div>
        {layout !== "Payment" && (
          <div
            className="py-3 px-7 mt-5 bg-[#c7e9ff]"
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
                  onClick={() => handleFilterLeadList(option.id)}
                >
                  <h1
                    className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 whitespace-nowrap ${
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
            {userDetails?.role_id === 1 ||
            userDetails?.role_id === 3 ||
            userDetails?.role_id === 4 ? (
              <div className="flex items-center mt-2">
                {/* Star Filters */}
                {ratings.map((rate) => (
                  <div
                    key={rate?.id}
                    onClick={() => handleStaredLeadsFilter(rate?.id)}
                  >
                    <h1
                      className={`text-xs leading-4 font-normal font-poppins px-3 p-2 cursor-pointer mr-2.5 ${
                        activeFilter === rate?.id
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }  rounded-full`}
                      style={{
                        border: "1px solid rgba(124, 141, 181, 0.5)",
                      }}
                    >
                      {rate?.title}
                    </h1>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Search Option */}
      {layout.toLowerCase()?.includes("payment") ? (
        <div>&nbsp;</div>
      ) : (
        // <div
        //   className="border px-7 py-8 mt-5 ml-6"
        //   style={{
        //     borderRadius: "20px",
        //   }}
        // >
        //   <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
        //     Search Lead
        //   </h1>
        //   <div
        //     className="w-58 px-4 py-2.5 mx-0.5 flex items-center bg-gray-100"
        //     style={{
        //       borderRadius: "10px",
        //     }}
        //   >
        //     <div>
        //       <Icons.Search />
        //     </div>
        //     <div>
        //       <input
        //         className="outline-none text-xs bg-gray-100 leading-5 font-medium font-poppins ml-4"
        //         type="text"
        //         name="search-code"
        //         id=""
        //         onChange={(e) => setSearchInput(e.target.value)}
        //         placeholder="Search Code"
        //       />
        //     </div>
        //     <div>
        //       <Icons.Send />
        //     </div>
        //   </div>
        // </div>
        <div>
          {(userDetails?.role_id === 1 ||
            userDetails?.role_id === 2 ||
            userDetails?.role_id === 3 ||
            userDetails?.role_id === 4) && (
            <div
              className="px-7 py-8 mt-5 ml-6 bg-[#ffecd2]"
              style={{
                borderRadius: "20px",
              }}
            >
              <h1 className="text-lg leading-7 font-normal font-poppins text-opacity-50">
                Search with Assigned Employee
              </h1>

              <div>
                <Select
                  defaultValue="All"
                  placeholder="Select Employee"
                  onChange={handleEmployeeChange}
                  style={{
                    width: 200,
                  }}
                  options={employeeOptions}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;

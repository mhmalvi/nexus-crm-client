import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { useMediaQuery } from "react-responsive";
import "./dashboard.css";

const SearchEmployee = ({
  layout,
  handleFilterAssignedEmployee,
  companyEmployeeList,
}) => {
  const colorMode = useSelector((state) => state?.user)?.colorMode;
  const userDetails = useSelector((state) => state.user?.userInfo);
  const handleEmployeeChange = (name) => {
    handleFilterAssignedEmployee(name);
  };
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

  return (
    <div>
      {/* Search Option */}
      {layout.toLowerCase()?.includes("payment") ? (
        <div>&nbsp;</div>
      ) : (
        <div>
          {(userDetails?.role_id === 1 ||
            userDetails?.role_id === 2 ||
            userDetails?.role_id === 3 ||
            userDetails?.role_id === 4) && (
            <div className="px-3 py-3 rounded-md shadow-md backdrop-blur-2xl bg-[#ffffff11]">
              <h1
                className={`3xl:text-xl 2xl:text-base text-sm font-normal font-poppins ${
                  colorMode ? "text-slate-300" : "text-gray-800"
                }`}
              >
                Search with Assigned Employee
              </h1>

              <div
                className={`${
                  colorMode ? "filterEmployeeDark" : "filterEmployeeLight"
                }`}
              >
                <Select
                  defaultValue={`All`}
                  placeholder="Select Employee"
                  onChange={handleEmployeeChange}
                  options={employeeOptions}
                  dropdownStyle={{
                    borderRadius: "0px 0px 8px 8px",
                    backgroundColor: "#cbd5e1",
                    borderLeft: "1px solid #7037ff",
                    borderRight: "1px solid #7037ff",
                    borderBottom: "1px solid #7037ff",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchEmployee;

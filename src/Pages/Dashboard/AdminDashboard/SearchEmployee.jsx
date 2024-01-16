import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { useMediaQuery } from "react-responsive";
import { DownCircleTwoTone } from '@ant-design/icons'

const SearchEmployee = ({
  layout,
  handleFilterAssignedEmployee,
  companyEmployeeList,
}) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

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
            <div className="px-3 py-3 rounded-xl shadow-md backdrop-blur-2xl bg-[#ffffff11]">
              <h1
                className={`text-${
                  isBigScreen ? "xl" : "base"
                } font-normal font-poppins text-${
                  colorMode ? "slate-300" : "gray-800"
                }`}
              >
                Search with Assigned Employee
              </h1>

              <div className="filterEmployee">
                <Select
                p
                suffixIcon={<DownCircleTwoTone />}
                  defaultValue={`All`}
                  placeholder="Select Employee"
                  onChange={handleEmployeeChange}
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

export default SearchEmployee;

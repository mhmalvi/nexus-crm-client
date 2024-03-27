import { Select } from "antd";
import React, { useState } from "react";
import { handleCreatePackage } from "../../Components/services/crmAdmin";
import "./package.css";
import {
  successNotification,
  warningNotification,
} from "../../Components/Shared/Toast";

const PackageForm = ({
  syncPackages,
  setSyncPackages,
  setTogglePackageCreate,
}) => {
  const [Data, setData] = useState({
    package_name: "",
    package_type: 2,
    package_type_limit: 30,
    business_type: 1,
    package_details: "",
    price: 0,
  });

  const [packageLimit, setPackageLimit] = useState(
    packageTypeData[packageType[1]]
  );
  const [secondPackageLimit, setSecondPackageLimit] = useState(
    packageTypeData[packageType[1]][0]
  );

  const handlePackageTypeChange = (value) => {
    console.log(value);
    setPackageLimit(packageTypeData[value]);
    setSecondPackageLimit(packageTypeData[value][0]);

    const packageData = { ...Data };

    if (value === "Monthly") {
      packageData.package_type = 2;
    } else if (value === "Storage Limit") {
      packageData.package_type = 3;
    } else if (value === "User Limit") {
      packageData.package_type = 1;
    }
    setData(packageData);
  };

  const onPackageLimitChange = (value) => {
    setSecondPackageLimit(value);
    const packageData = { ...Data };

    if (value === "Free(1 Month)") {
      packageData.package_type_limit = 30;
    } else {
      packageData.package_type_limit = parseInt(value?.split(" ")[0]) * 30;
    }
    setData(packageData);
  };

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageCreateResponse = await handleCreatePackage(Data);

    if (packageCreateResponse?.status === 201) {
      setSyncPackages(!syncPackages);
      setTogglePackageCreate(false);
      setData({
        package_name: "",
        package_type: "",
        package_type_limit: "",
        business_type: 1,
        package_details: "",
        price: 0,
      });
      successNotification("Package added successfully.");
    } else {
      warningNotification(validate(Data));
    }
  };

  console.log(Data);

  return (
    <>
      <div className="font-poppins relative flex flex-col justify-center overflow-hidden py-18">
        <div className="w-10/12 p-6 m-auto">
          <h1 className="text-2xl font-semibold text-left text-[#7E4BFF] uppercase tracking-wide">
            Create Package
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Package Name
                </span>
                <input
                  type="text"
                  name="package_name"
                  placeholder="Package Name"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-400 focus:border-b focus:border-indigo-400 sm:text-sm"
                  onChange={handleChange}
                  value={Data.package_name}
                />
              </label>
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide mb-1">
                  Package Type
                </span>
                <Select
                  className="requisition_package"
                  defaultValue={packageType[1]}
                  style={{
                    width: "100%",
                  }}
                  onChange={handlePackageTypeChange}
                  options={packageType.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide mb-1">
                Package Type Limit
                <Select
                  className="requisition_package"
                  style={{
                    width: "100%",
                  }}
                  value={secondPackageLimit}
                  onChange={onPackageLimitChange}
                  options={packageLimit.map((city) => ({
                    label: city,
                    value: city,
                  }))}
                />
              </label>
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Business Type
                </span>
                <Select
                  className="requisition_package"
                  defaultValue="RTO"
                  style={{
                    width: "100%",
                  }}
                  options={[]}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Details
                <input
                  name="package_details"
                  type="text"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Package Details"
                  value={Data.package_details}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Price
                <input
                  name="price"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Package Price"
                  value={Data.price}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex justify-center my-10">
              <button
                type="submit"
                className="h-10 px-5 w-full text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-gray-800 tracking-wide"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PackageForm;

const packageType = ["User Limit", "Monthly", "Storage Limit"];
// const packageType = ["Monthly"];

const packageTypeData = {
  "User Limit": ["10", "20", "50", "100"],
  Monthly: ["Free(1 Month)", "3 Months", "6 Months", "12 Months"],
  "Storage Limit": ["5GB", "10GB", "20GB", "50GB", "1TB"],
};

const validate = (values) => {
  if (!values.package_name) {
    return "package name is required!";
  }
  if (!values.package_type) {
    return "package type is required!";
  }
  if (!values.package_type_limit) {
    return "package type is required!";
  }
  if (!values.business_type) {
    return "Business type is  required!";
  }
  if (!values.package_details) {
    return "Package Details is  required!";
  }
  if (!values.price) {
    return "Price type is  required!";
  }
};

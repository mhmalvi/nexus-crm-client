import { message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { handleUpdatePackage } from "../../Components/services/crmAdmin";
import "./package.css";

const PackageUpdate = ({
  setTogglePackageUpdate,
  updatePackageDate,
  setSyncPackages,
  syncPackages,
}) => {
  console.log(updatePackageDate);

  const getPackageTypeLimit = (typeLimit) => {
    if (typeLimit === 30) {
      return 0;
    } else if (typeLimit === 90) {
      return 1;
    } else if (typeLimit === 180) {
      return 2;
    } else if (typeLimit === 360) {
      return 3;
    }
  };

  // console.log(getPackageTypeLimit(updatePackageDate.package_type_limit));

  const [Data, setData] = useState({});
  //   {
  //   id: updatePackageDate?.id,
  //   package_name: updatePackageDate.package_name,
  //   package_type: updatePackageDate.package_type,
  //   package_type_limit: getPackageTypeLimit(
  //     updatePackageDate.package_type_limit
  //   ),
  //   business_type: updatePackageDate.business_type,
  //   package_details: updatePackageDate.package_details,
  //   price: updatePackageDate.price,
  // }

  const [packageLimit, setPackageLimit] = useState(
    packageTypeData[packageType[updatePackageDate.package_type - 1]]
  );
  const [secondPackageLimit, setSecondPackageLimit] = useState(
    packageTypeData[packageType[updatePackageDate.package_type - 1]][
      getPackageTypeLimit(updatePackageDate.package_type_limit)
    ]
  );

  useEffect(() => {
    setData({
      id: updatePackageDate?.id,
      package_name: updatePackageDate.package_name,
      package_type: updatePackageDate.package_type,
      package_type_limit: getPackageTypeLimit(
        updatePackageDate.package_type_limit
      ),
      business_type: updatePackageDate.business_type,
      package_details: updatePackageDate.package_details,
      price: updatePackageDate.price,
    });
  }, [updatePackageDate]);

  const handlePackageTypeChange = (value) => {
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
    console.log(e.target.name, e.target.value);
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageUpdateResponse = await handleUpdatePackage(Data);

    console.log("packageCreateResponse", packageUpdateResponse);

    if (packageUpdateResponse?.status === 201) {
      setSyncPackages(!syncPackages);
      setTogglePackageUpdate(false);
      setData({
        id: null,
        package_name: "",
        package_type: null,
        package_type_limit: null,
        business_type: 1,
        package_details: "",
        price: 0,
      });

      message.success("Package Updated Successfully");
    } else {
      message.warn(validate(Data));
    }
  };

  useEffect(() => {
    document.getElementById("package_name").value =
      updatePackageDate.package_name;
    // document.getElementById("package_type_limit").value =
    //   updatePackageDate.package_type_limit;
    // document.getElementById("business_type").value =
    //   updatePackageDate.package_type;
    document.getElementById("package_details").value =
      updatePackageDate.package_details;
    document.getElementById("price").value = updatePackageDate.price;
  }, [updatePackageDate]);

  // const handleUpdate = async (e) => {
  //   const data = {
  //     id: updatePackageDate?.id,
  //     package_name: document.getElementById("package_name").value,
  //     package_type_limit: document.getElementById("package_type_limit").value,
  //     business_type: document.getElementById("business_type").value,
  //     package_details: document.getElementById("package_details").value,
  //     price: document.getElementById("price").value,
  //   };

  //   e.preventDefault();
  //   await Axios.post(
  //     `${process.env.REACT_APP_COMPANY_URL}/api/update/package`,
  //     data
  //   )
  //     .then((res) => {
  //       console.log("res.data", res.data);
  //       message.success(res.data.message);
  //       setSyncPackages(!syncPackages);
  //       setTogglePackageUpdate(false);
  //       document.getElementById("package_name").value = "";
  //       document.getElementById("package_type_limit").value = "";
  //       document.getElementById("business_type").value = "";
  //       document.getElementById("package_details").value = "";
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleChange=(e)=>{

  // }

  console.log("Data", Data);

  return (
    <>
      <div className="relative ">
        {/*         {Object.keys(DataErr).length === 0 && Show && !error && (
          <div className="w-[30%] p-6 m-auto shadow-lg text-lg text-[#7E4BFF] text-center shadow-indigo-100 border-2 border-slate-200 rounded-lg">
            Package updated successfully!
          </div>
        )} */}
        <div className="w-11/12 px-6 py-10 m-auto border-slate-200 rounded-lg">
          <h1 className="text-2xl font-semibold text-left text-[#7E4BFF] uppercase tracking-wide">
            Update package
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Package Name
                </span>
                <input
                  id="package_name"
                  type="text"
                  name="package_name"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-400 focus:border-b focus:border-indigo-400 sm:text-sm"
                  defaultValue={updatePackageDate.package_name}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Type
              </label>
              {/* <input
                id="package_type_limit"
                name="package_type_limit"
                type="number"
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                defaultValue={updatePackageDate.package_type_limit}
              /> */}
              <Select
                className="requisition_package"
                defaultValue={
                  packageType[parseInt(updatePackageDate?.package_type) - 1]
                }
                style={{
                  width: "100%",
                }}
                onChange={handlePackageTypeChange}
                options={packageType.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Type Limit
              </label>
              {/* <input
                id="package_type_limit"
                name="package_type_limit"
                type="number"
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                defaultValue={updatePackageDate.package_type_limit}
              /> */}
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
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Business Type
                </span>
                {/* <input
                  id="business_type"
                  name="business_type"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  defaultValue={updatePackageDate.business_type}
                /> */}

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
              </label>
              <div className="flex justify-start gap-1 my-2">
                <input
                  id="package_details"
                  name="package_details"
                  type="text"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  defaultValue={updatePackageDate?.package_details}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Price
                <input
                  id="price"
                  name="price"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Package Price"
                  defaultValue={updatePackageDate?.price}
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

export default PackageUpdate;

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

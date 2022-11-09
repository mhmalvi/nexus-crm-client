import { message } from "antd";
import Axios from "axios";
import React, { useEffect } from "react";
import "./package.css";

const PackageUpdate = ({
  setTogglePackageUpdate,
  updatePackageDate,
  setSyncPackages,
  syncPackages,
}) => {
  useEffect(() => {
    document.getElementById("package_name").value =
      updatePackageDate.package_name;
    document.getElementById("package_type_limit").value =
      updatePackageDate.package_type_limit;
    document.getElementById("business_type").value =
      updatePackageDate.package_type;
    document.getElementById("package_details").value =
      updatePackageDate.package_details;
  }, [updatePackageDate]);

  const handleUpdate = async (e) => {
    const data = {
      id: updatePackageDate?.id,
      package_name: document.getElementById("package_name").value,
      package_type_limit: document.getElementById("package_type_limit").value,
      business_type: document.getElementById("business_type").value,
      package_details: document.getElementById("package_details").value,
      package_price: document.getElementById("package_price").value,
    };

    e.preventDefault();
    await Axios.post(
      `${process.env.REACT_APP_COMPANY_URL}/api/update/package`,
      data
    )
      .then((res) => {
        console.log("res.data", res.data);
        message.success(res.data.message);
        setSyncPackages(!syncPackages);
        setTogglePackageUpdate(false);
        document.getElementById("package_name").value = "";
        document.getElementById("package_type_limit").value = "";
        document.getElementById("business_type").value = "";
        document.getElementById("package_details").value = "";
      })
      .catch((err) => console.log(err));
  };

  // const handleChange=(e)=>{

  // }

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
            Update package: {updatePackageDate.package_type}
          </h1>
          <form onSubmit={handleUpdate} className="mt-6">
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
                  // onChange={handleChange}
                  defaultValue={updatePackageDate.package_name}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Type Limit
              </label>
              <input
                id="package_type_limit"
                name="package_type_limit"
                type="number"
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                defaultValue={updatePackageDate.package_type_limit}
                // onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-gray-700 tracking-wide">
                  Business Type
                </span>
                <input
                  id="business_type"
                  name="business_type"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  defaultValue={updatePackageDate.business_type}
                  // onChange={handleChange}
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
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 tracking-wide">
                Package Price
                <input
                  id="package_price"
                  name="package_price"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Package Price"
                  value={updatePackageDate?.package_price}
                />
              </label>
            </div>

            <div className="flex justify-center my-10">
              <button
                type="submit"
                className="h-10 px-5 w-full text-white bg-black rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-[#723bff] tracking-wide"
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

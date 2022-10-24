import React, { useState, useEffect } from "react";
import Axios from "axios";

function UpdateDialog({ user_id, onDialog }) {
  const [msg, setmsg] = useState(false);

  const [Data, setData] = useState({
    package_name: "",
    package_type_limit: "",
    business_type: "",
    package_details: "",
  });

  useEffect(() => {
    const editUserData = async () => {
      await Axios.get(`http://192.168.0.126/api/edit/package/${user_id}`).then(
        (res) => {
          console.log(res);
          setData(res.data.package);
          console.log(Data);
        }
      );
    };
    editUserData();
  });

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await Axios.post(`http://192.168.0.126/api/update/package`, Data)
      .then((res) => {
        setmsg(res.data.message);
        //console.log(res.data.key);
        onDialog(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="fixed inset-0 z-50"
      /*       onClick={() => onDialog(false)} */
    >
      <div
        className="flex flex-col justify-center min-h-screen overflow-hidden mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/*         {Object.keys(DataErr).length === 0 && Show && !error && (
          <div className="w-[30%] p-6 m-auto shadow-lg text-lg text-[#7E4BFF] text-center shadow-indigo-100 border-2 border-slate-200 rounded-lg">
            Package updated successfully!
          </div>
        )} */}
        {/*         <div className="flex justify-center my-10">
        </div> */}
        {msg && (
          <div className="w-[30%] p-4 m-auto shadow-lg text-lg text-[#7E4BFF] text-center shadow-indigo-100 border-2 border-slate-200 rounded-lg">
            {msg}
          </div>
        )}
        <div className="w-[30%] px-6 m-auto border shadow-lg bg-white opacity-100 rounded-sm">
          <div className="flex justify-end my-4">
            <button
              className="bg-slate-200 text-lg text-black font-bold rounded-full px-4 py-2 hover:bg-slate-300"
              onClick={() => onDialog(false)}
            >
              X
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-left text-[#7E4BFF] uppercase tracking-wide">
              Update package: {Data.package_type}
            </h1>
          </div>
          <form onSubmit={handleUpdate} className="mt-6">
            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-black tracking-wide">
                  Package Name
                </span>
                <input
                  type="text"
                  name="package_name"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none sm:text-sm"
                  onChange={handleChange}
                  value={Data.package_name}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-black tracking-wide">
                Package Type Limit
              </label>
              <input
                name="package_type_limit"
                type="number"
                className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                value={Data.package_type_limit}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label>
                <span className="block text-sm font-medium text-black tracking-wide">
                  Business Type
                </span>
                <input
                  name="business_type"
                  type="number"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  value={Data.business_type}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-black tracking-wide">
                Package Details
              </label>
              <div className="flex justify-start gap-1 my-2">
                <input
                  name="package_details"
                  type="text"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  value={Data.package_details}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-center my-10">
              <button
                type="submit"
                className="h-10 px-5 w-full text-indigo-100 bg-[#7E4BFF] rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-[#723bff] tracking-wide"
              >
                Submit Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateDialog;

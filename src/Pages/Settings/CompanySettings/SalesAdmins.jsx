import React, { useState } from "react";

const SalesAdmins = ({ admin }) => {
  const [activeAddSeals, setActiveAddSeals] = useState(false);

  return (
    <div className="flex justify-between 2xl:justify-evenly mt-12 pt-0.5">
      <div className="2xl:mr-32">
        <div>
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Admins
            </h1>
            <div>
              {activeAddSeals && admin ? (
                <div className="flex items-center ml-29">
                  <input
                    className="outline-none py-1.5 px-3 bg-gray-100 rounded-md"
                    type="email"
                    name=""
                    placeholder="User email"
                    id=""
                  />
                  <button
                    className="py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white ml-3"
                    style={{
                      width: "75px",
                    }}
                    onClick={() => setActiveAddSeals(false)}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div>
                  {admin && (
                    <button
                      className="py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white ml-29"
                      style={{
                        width: "75px",
                      }}
                      onClick={() => setActiveAddSeals(true)}
                    >
                      Add
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <hr />
        </div>

        <div className="ml-10 px-4 mt-5">
          <div className="flex mb-6">
            <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
              1
            </div>
            <div className="ml-4">
              <h1 className="font-semibold text-xl leading-5 text-gray-600">
                Nishat Ahmed
              </h1>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                CEO
              </p>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                ahmed@gmail.com
              </p>
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
              2
            </div>
            <div className="ml-4">
              <h1 className="font-semibold text-xl leading-5 text-gray-600">
                Nishat Ahmed
              </h1>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                CEO
              </p>
              <p className="font-medium text-sm leading-5 mb-0 text-gray-600 text-opacity-75">
                ahmed@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-2.5">
        <div>
          <hr />
          <div className="flex items-center">
            <h1 className="font-semibold text-xl leading-8 py-5 px-4 my-0">
              Sales Admins
            </h1>

            {activeAddSeals && !admin ? (
              <div className="flex items-center ml-29">
                <input
                  className="outline-none py-1.5 px-3 bg-gray-100 rounded-md"
                  type="email"
                  name=""
                  placeholder="User email"
                  id=""
                />
                <button
                  className="py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white ml-3"
                  style={{
                    width: "75px",
                  }}
                  onClick={() => setActiveAddSeals(false)}
                >
                  Send
                </button>
              </div>
            ) : (
              <div>
                {!admin && (
                  <button
                    className="py-1 text-base leading-6 font-medium bg-blue-500 rounded-md text-white ml-29"
                    style={{
                      width: "75px",
                    }}
                    onClick={() => setActiveAddSeals(true)}
                  >
                    Add
                  </button>
                )}
              </div>
            )}
          </div>
          <hr />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-6 px-4">
          {Array.from({ length: 8 }, () => Math.random()).map((arr, i) => (
            <div key={i} className="flex">
              <div className="w-7.5 h-7.5 border border-black border-opacity-30 rounded-full flex justify-center items-center font-semibold text-lg leading-7">
                {i + 1}
              </div>
              <div className="w-64 2xl:w-72 ml-4 flex justify-between items-center">
                <h1 className="font-semibold text-sm leading-5 mb-0 text-gray-600">
                  Nishat Ahmed
                </h1>
                <button className="px-1 border border-red-600 text-red-600 text-xs font-semibold leading-6 font-poppins rounded-md">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesAdmins;

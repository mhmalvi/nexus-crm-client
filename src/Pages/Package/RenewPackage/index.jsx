import React, { useState } from "react";

const RenewPackage = () => {
  //   const [Plans, setPlans] = useState([]);
  //   const [activePackages, setActivePackages] = useState([]);
  //   const [inActivePackages, setInActivePackages] = useState([]);
  //   const [updatePackageDate, setUpdatePackageDate] = useState({});
  const [selected1, setSelected1] = useState([]);
  //   const [togglePackageUpdate, setTogglePackageUpdate] = useState(false);
  //   const [togglePackageCreate, setTogglePackageCreate] = useState(false);
  //   const [syncPackages, setSyncPackages] = useState(false);

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          Current Package
        </h1>
        <div>
          <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-20 my-4">
            {/* {activePackages.length ? (
              activePackages?.map((plan, i) => ( */}
            <div>
              <div
              // className={`cursor-pointer ${
              //   selected1.includes(plan.id)
              //     ? "flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-8 rounded-xl text-center"
              //     : "flex flex-col border-2 border-slate-200 shadow p-8 bg-white rounded-xl text-center hover:border-[#5625dc] hover:shadow-md hover:transition ease-in-out delay-160"
              // }`}
              // className={`cursor-pointer ${
              //   selected1.includes(plan.id)
              //     ? "flex flex-col border-4 border-[#966dff] shadow bg-[#f3efff] text-white p-8 rounded-xl text-center"
              //     : "flex flex-col border-2 border-slate-200 shadow p-8 bg-white rounded-xl text-center hover:border-[#5625dc] hover:shadow-md hover:transition ease-in-out delay-160"
              // }`}
              // onClick={() => updateSelected1(plan.id)}
              >
                {/* {(userDetails?.userInfo?.role_id === 1 ||
                      userDetails?.userInfo?.role_id === 2) && ( */}
                <div className="flex justify-between gap-2">
                  <div className="border-brand-color border rounded-full w-20 h-6 my-2">
                    <span className="text-brand-color text-sm font-bold">
                      active
                    </span>
                  </div>
                  {/* <div className="flex gap-1">
                          <div
                            className="flex items-center py-1.5 px-2 shadow-sm border border-slate-100 justify-center hover:border-slate-200 h-10"
                            onClick={() => handleUpdate(plan.id)}
                          >
                            <button title="Edit">
                              <Icons.Edit />
                            </button>
                          </div>
                          <Popconfirm
                            title="Are you sure to delete this Package?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <div
                              className="flex items-center py-1.5 px-2 shadow-sm border border-slate-100 justify-center hover:border-slate-200 h-10"
                            //   onClick={() => handleDelete(plan.id)}
                            >
                              <Icons.Bin />
                            </div>
                          </Popconfirm>
                        </div> */}
                </div>
                {/* )} */}

                <h3 className="font-bold py-10 text-[20px]">Winter</h3>
                <h1 className="ml-3 text-xl text-brand-color mb-0">
                  $100
                  <span className="text-xs text-black">/ Month</span>
                  <br />
                </h1>

                <div className="flex-1 text-slate-500 text-xs py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="my-4">
                  <div
                    className="w-48 mx-auto bg-slate-50 text-brand-color font-bold hover:bg-brand-color transition-colors hover:delay-50 hover:text-slate-50 hover:shadow-sm hover:transition ease-in-out delay-150 my-3 rounded-full py-3"
                    // onClick={() => setShowRequisitionForm(true)}
                  >
                    Get Started
                  </div>
                </div>
              </div>
            </div>
            {/* )) ) : ( */}
            <div className="font-poppins text-lg text-center">
              No Active Package
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          Other Packages
        </h1>
      </div>
    </div>
  );
};

export default RenewPackage;

import React from "react";

const RenewPackage = () => {

  return (
    <div className="mx-6 2xl:ml-12 2xl:mr-16 py-24">
      <div>
        <h1 className="text-xl leading-8 font-semibold font-poppins text-black text-opacity-50">
          Current Package
        </h1>
        <div>
          <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-20 my-4">
            <div>
              <div
              >
                <div className="flex justify-between gap-2">
                  <div className="border-brand-color border rounded-full w-20 h-6 my-2">
                    <span className="text-brand-color text-sm font-bold">
                      active
                    </span>
                  </div>
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
                  >
                    Get Started
                  </div>
                </div>
              </div>
            </div>
            <div className="font-poppins text-lg text-center">
              No Active Package
            </div>
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

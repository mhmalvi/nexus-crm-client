import React from "react";
import Icons from "../../Components/Shared/Icons";
//mport Vector from "../../assets/Images/Vector.svg";

function DiscoverMoreSection() {
  return (
    <div className="w-full pb-40">
      <div className="items-center m-auto z-50">
        <div className="items-center m-auto">
          <div className="flex font-poppins text-black p-4">
            <div className="w-3/5 flex-col justify-start">
              <div className="text-xl px-4 py-4 font-semibold">
                Discover More
              </div>
              <div className="text-5xl font-bold px-4">
                Analyze your sales and marketing leads
              </div>
              <div className="text-sm px-4 pr-18 py-4">
                Tracking your sales and leads can be a daunting task. We make
                this process easier and more convenient for you with our
                feature-rich data analysis tools.
              </div>
            </div>
            <div className="flex-col">
              <div className="flex">
                <div>
                  <Icons.SalesCircle width={50} />
                </div>
                <div className="flex-col py-3">
                  <div className="text-xl px-4 font-semibold">
                    Lead Generation
                  </div>
                  <div className="text-sm px-4">
                    Search by specific lead/vendor/merchant
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <Icons.ProjectCircle width={50} />
                </div>
                <div className="flex-col py-3">
                  <div className="text-xl px-4 font-semibold">
                    Lead Management
                  </div>
                  <div className="text-sm px-4">
                    Update the status of leads/vendors/merchants
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <Icons.ActivityCircle width={50} />
                </div>
                <div className="flex-col py-3">
                  <div className="text-xl px-4 font-semibold">
                    Payment Management
                  </div>
                  <div className="text-sm px-4">
                    Maintain invoices and payment collections
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <Icons.ActivityCircle width={50} />
                </div>
                <div className="flex-col py-3">
                  <div className="text-xl px-4 font-semibold">
                    Payment Management
                  </div>
                  <div className="text-sm px-4">
                    Maintain invoices and payment collections
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverMoreSection;

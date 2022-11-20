import React from "react";
import Icons from "../../Components/Shared/Icons";
//mport Vector from "../../assets/Images/Vector.svg";

function DiscoverMoreSection() {
  return (
    <div className="w-full pb-40">
      <div className="items-center m-auto z-50">
        <div className="items-center m-auto">
          <div className="flex font-poppins text-black p-4">
            <div className="w-1/2 flex-col justify-start">
              <div className="text-xl px-4 py-4 font-semibold">
                Discover More
              </div>
              <div className="text-5xl font-bold px-4">
                Analyze your sales and marketing leads
              </div>
              <div className="text-sm px-4 py-4">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua invidunt ut labore.
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start">
              <div className="flex py-2">
                <div>
                  <Icons.SalesCircle width={50} />
                </div>
                <div className="flex-col">
                  <div className="text-xl px-4 font-semibold">
                    Sales Tracking
                  </div>
                  <div className="text-sm px-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore.
                  </div>
                </div>
              </div>
              <div className="flex py-2">
                <div>
                  <Icons.ProjectCircle width={50} />
                </div>
                <div className="flex-col">
                  <div className="text-xl px-4 font-semibold">
                  Project Management
                  </div>
                  <div className="text-sm px-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore.
                  </div>
                </div>
              </div>
              <div className="flex py-2">
                <div>
                  <Icons.ActivityCircle width={50} />
                </div>
                <div className="flex-col">
                  <div className="text-xl px-4 font-semibold">
                  Activity Report
                  </div>
                  <div className="text-sm px-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore.
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

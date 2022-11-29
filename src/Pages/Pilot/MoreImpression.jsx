import React from "react";
import background from "../../assets/Images/Background-blur.png";
import impressions from "../../assets/Images/impressions.png";

function MoreImpressionSection() {
  return (
    <div className="w-full m-auto">
      <div className="w-full m-auto absolute">
        <img src={background} className="w-3/4 h-full m-auto" alt="" />
      </div>
      <div className="items-center m-auto relative pb-30">
        <div className="w-2/3 items-center m-auto">
          <div className="flex justify-center font-poppins text-black p-6">
            <div className="w-1/2 flex-col justify-start m-auto">
              <div className="text-5xl px-4 py-4 font-semibold">
                More high-quality leads, more conversions
              </div>
              <div className="text-md px-4">
                Regarding actual conversions, it’s the quality of leads that
                truly matter. Generate better leads and increase the conversion
                rate with our CRM.
              </div>
              <div className="w-2/5 bg-black rounded-xl text-center py-4 my-6">
                <a className="text-md text-white" href="">
                  Get Free Trial
                </a>
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start">
              <div className="text-xl px-4 py-4 font-semibold">
                <img src={impressions} className="w-full m-auto" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreImpressionSection;

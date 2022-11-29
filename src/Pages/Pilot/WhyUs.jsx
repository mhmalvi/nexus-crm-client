import React from "react";
import Torch from "../../assets/Gif/growth-level.gif";
import NumberOne from "../../assets/Gif/number-one.gif";
import NumberTwo from "../../assets/Gif/number-two.gif";
import Numberthree from "../../assets/Gif/number-three.gif";

function WhyUsSectionSection() {
  return (
    <div className="w-full pb-30">
      <div className="items-center">
        <div className="items-center m-auto">
          {/* w-2/3  */}
          <div className="flex font-poppins text-black p-4">
            <div className="w-1/2 flex-col justify-start relative px-5">
              <div className="w-[100px] absolute -top-4 -left-0"><img src={Torch} alt="" /></div>
              <div className="text-xl px-4 py-4 font-semibold text-center">
                Why Should You Choose Us?
              </div>
              <div className="text-5xl font-bold px-4 relative">
                Revamp your business to elevate it to the next level
              </div>
              <div className="text-sm px-4 py-4">
                A powerful CRM package can significantly impact the overall
                business performance. You can create a significant positive
                impact on your business processes by using our CRM solutions.
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start pr-20">
            <div className="flex py-4">
                <div className="pr-4">
                  <img src={NumberOne} width={60} alt="" />
                </div>
                <div className="text-xl font-semibold pr-10">
                Increase your overall sales and nurture your leads  
                </div>
              </div>
              <div className="flex py-4">
                <div className="pr-6">
                  <img src={NumberTwo} width={60} alt="" />
                </div>
                <div className="text-xl font-semibold">
                  Simplify the communication process with the prospective leads
                </div>
              </div>
              <div className="flex py-4">
                <div className="pr-6">
                  <img src={Numberthree} width={60} alt="" />
                </div>
                <div className="text-xl font-semibold">
                  Maintain an accurate and secure information database and
                  reports
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUsSectionSection;

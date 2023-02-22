import React from "react";
import Torch from "../../assets/Gif/growth-level.gif";
import NumberOne from "../../assets/Gif/number-one.gif";
import NumberTwo from "../../assets/Gif/number-two.gif";
import Numberthree from "../../assets/Gif/number-three.gif";

function WhyUsSectionSection() {
  return (
    <div className="w-full pb-20 md:pb-30 md:px-20">
      <div className="items-center">
        <div className="items-center m-auto">
          {/* w-2/3  */}
          <div className="flex flex-col md:flex-row font-poppins text-black p-4">
            <div className="w-full md:w-1/2 flex-col justify-start relative px-5">
              <div className="w-[100px] absolute top-4 md:-top-4 -left-1 md:-left-0">
                <img src={Torch} alt="" />
              </div>
              <div className="text-xl px-4 py-4 font-semibold pl-24">
                Why Should You Choose Us?
              </div>
              <div className="text-3xl md:text-5xl font-bold px-4 relative">
                Revamp your business to elevate it to the next level
              </div>
              <div className="text-sm px-4 py-4">
                A powerful CRM package can significantly impact the overall
                business performance. You can create a significant positive
                impact on your business processes by using our CRM solutions.
              </div>
            </div>
            <div className="w-full md:w-1/2 flex-col justify-start pl-6 md:pl-0">
              <div className="flex py-4">
                <div className="pr-4">
                  <img src={NumberOne} width={60} alt="" />
                </div>
                <div className="md:text-xl font-semibold pr-4">
                  Increase your overall sales and nurture your leads
                </div>
              </div>
              <div className="flex py-4">
                <div className="pr-6">
                  <img src={NumberTwo} width={60} alt="" />
                </div>
                <div className="md:text-xl font-semibold pr-4">
                  Simplify the communication process with the prospective leads
                </div>
              </div>
              <div className="flex py-4">
                <div className="pr-6">
                  <img src={Numberthree} width={60} alt="" />
                </div>
                <div className="md:text-xl font-semibold pr-4">
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

import React from "react";
import Icons from "../../Components/Shared/Icons";
import Vector from "../../assets/Images/Vector.svg";
import group268 from "../../assets/Images/group268.svg";
import group269 from "../../assets/Images/group269.svg";
import group277 from "../../assets/Images/group277.svg";
import group278 from "../../assets/Images/group278.svg";

function QualitySection() {
  return (
    <div className="w-full pb-30">
      <div className="items-center m-auto z-50 lg:pt-32  xl:pt-44 2xl:pt-96 mt-14">
        <div className="items-center m-auto pt-40 mx-8">
          <div className="text-center m-auto pb-8">
            <span className="font-poppins text-4xl text-black font-bold justify-center text-center">
              The Most Effective CRM <br /> Features for Your Business
            </span>
          </div>
          <div className="bg-home-color rounded-lg p-4 mx-auto">
            {/* particles row */}
            <div className="grid grid-cols-4 font-poppins text-white">
              <div className="flex">
                <div className="m-auto"></div>
                <div className="m-auto">
                  <img
                    src={group269}
                    className="relative left-2 animate-bounce"
                    alt=""
                  />
                </div>
              </div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div className="grid grid-cols-2 justify-start">
                <div className="m-auto">
                  <img
                    src={group268}
                    className="w-full ml-auto animate-pulse"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
            {/* contents row */}
            <div className="flex justify-evenly font-poppins text-white p-4">
              <div className="w-1/3 flex-col justify-start">
                <div className="px-4">
                  <Icons.Shield width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Strong security to protect your data
                </div>
                <div className="text-xs px-4">
                  Our multi-layered security features will protect your
                  information and privacy from any threats
                </div>
              </div>
              <div className="w-1/3 flex-col justify-start">
                <div className="px-4">
                  <Icons.Thumbs width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Superb performance
                </div>
                <div className="text-xs px-4">
                  Experience premium results with an amazing level of efficiency
                  with our CRM
                </div>
              </div>
              <div className="w-1/3 flex-col justify-between">
                <div className="px-4">
                  <Icons.Headphone width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  24/7 customer support
                </div>
                <div className="text-xs px-4">
                  An expert team to give you full-time support at any stage of
                  your operation
                </div>
              </div>
            </div>
            {/* particles row */}
            <div className="grid grid-cols-6 font-poppins text-white p-4">
              <div className="flex justify-between gap-10">
                <div className=""></div>
                <div className="m-auto">
                  <img src={group277} className="animate-pulse" alt="" />
                </div>
              </div>
              <div className="flex justify-between gap-10">
                <div className=""></div>
                <div className="m-auto">
                  <img src={Vector} className="relative top-14" alt="" />
                </div>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div className="grid grid-cols-2 justify-start">
                <div></div>
                <div>
                  <img
                    src={group278}
                    className="w-full animate-bounce"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualitySection;

import React from "react";
import Icons from "../../Components/Shared/Icons";
import Vector from "../../assets/Images/Vector.svg";
import group268 from "../../assets/Images/group268.svg";
import group269 from "../../assets/Images/group269.svg";
import group277 from "../../assets/Images/group277.svg";
import group278 from "../../assets/Images/group278.svg";

function QualitySection() {
  return (
    <div className="w-full pb-20 md:pb-30 md:px-20">
      <div className="items-center m-auto z-50 lg:pt-32  xl:pt-44 2xl:pt-96 mt-14">
        <div className="items-center m-auto pt-27 md:pt-40 mx-8">
          <div className="text-center m-auto pb-8">
            <span className="font-poppins text-2xl md:text-4xl text-black font-bold justify-center text-center">
              The Most Effective CRM <br /> Features for Your Business
            </span>
          </div>
          <div className="bg-home-color rounded-lg p-4 mx-auto relative">
            <img
              src={group269}
              className="relative top-0 md:left-2 animate-bounce"
              alt=""
            />
            <img src={group268} className="ml-auto animate-pulse" alt="" />
            <div className="flex flex-col md:flex-row justify-evenly font-poppins text-white p-4">
              <div className="w-full md:w-1/3 flex-col justify-start pt-5">
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
              <div className="w-full md:w-1/3 flex-col justify-start pt-5">
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
              <div className="w-full md:w-1/3 flex-col justify-start pt-5">
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
            <div>

            <img
              src={group277}
              className="relative -top-32 animate-pulse"
              alt=""
              />
            <img src={Vector} className="absolute -bottom-10 md:left-[50%]" alt="" />
            <img
              src={group278}
              className="absolute -right-4 bottom-0 animate-bounce"
              alt=""
              />
              </div>
            {/* <div className="grid grid-cols-6 font-poppins text-white p-4">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualitySection;

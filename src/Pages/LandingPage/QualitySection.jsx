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
      <div className="items-center m-auto z-50 pt-80">
        <div className="items-center m-auto pt-40 mx-8"> {/* w-2/3  */}
          <div className="text-center m-auto pb-8">
            <span className="font-poppins text-4xl text-black font-bold justify-center text-center">
              We have the Best Solution
              <br /> for your Business
            </span>
          </div>
          <div className="bg-home-color rounded-lg p-4">
            <div className="grid grid-cols-4 font-poppins text-white">
              <div className="flex">
                <div className="m-auto"></div>
                <div className="m-auto">
                  <img src={group269} className="" alt="" />
                </div>
              </div>
              <div></div>
              <div></div>
              <div className="grid grid-cols-2 justify-start">
                <div className="m-auto">
                  <img src={group268} className="w-full" alt="" />
                </div>
                <div></div>
              </div>
            </div>
            <div className="flex justify-evenly font-poppins text-white p-4">
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.Shield width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  High security to protect from piracy
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.Thumbs width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Premium quality performance
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-between">
                <div className="px-4">
                  <Icons.Headphone width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Full time customer support - 24/7
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 font-poppins text-white p-4">
              <div className="flex justify-between gap-10">
                <div className="m-auto">
                  <img src={group277} className="" alt="" />
                </div>
                <div className="m-auto">
                  <img src={Vector} className="" alt="" />
                </div>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="grid grid-cols-2 justify-start">
                <div></div>
                <div>
                  <img src={group278} className="w-full" alt="" />
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

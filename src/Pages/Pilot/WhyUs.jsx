import React from "react";
//import Icons from "../../Components/Shared/Icons";
//mport Vector from "../../assets/Images/Vector.svg";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../assets/Gif/growth-level.json";

function WhyUsSectionSection() {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true
  };
  const { View } = useLottie(options);

  return (
    <div className="w-full pb-30">
      <div className="items-center">
        <div className="items-center m-auto">
          {/* w-2/3  */}
          <div className="flex font-poppins text-black p-4">
            <div className="w-1/2 flex-col justify-start relative">
              <div className="w-[100px]">{View}</div>
              <div className="text-xl px-4 py-4 font-semibold text-center">
                Why should you work with us?
              </div>
              <div className="text-5xl font-bold px-4">
                To upscale your business to the next level
              </div>
              <div className="text-sm px-4 py-4">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua invidunt ut labore.
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start">
              <div className="flex">
                <div></div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </div>
              </div>
              <div className="flex">
                <div></div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </div>
              </div>
              <div className="flex">
                <div></div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
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

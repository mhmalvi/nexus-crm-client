import React from "react";
import Icons from "../../Components/Shared/Icons";
import Vector from "../../assets/Images/Vector.svg";
import group259 from "../../assets/Images/group259.svg";

function AboutUsSection() {
  return (
    <div className="w-full pb-36">
      <div className="items-center m-auto z-50">
        <div className="items-center m-auto mx-8">
          {" "}
          {/* w-2/3  */}
          <div className="text-center m-auto pb-8">
            <div className="font-poppins text-6xl text-black font-bold justify-center text-center pb-6">
              About Us
            </div>
            <div className="font-poppins text-5xl text-black font-bold justify-center text-center pb-6">
              We are here for your convenience
            </div>
            <div className="text-lg pb-16">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor <br /> invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam <br />
              et justo duo dolores et ea rebum.
            </div>
          </div>
          <div className="bg-home-color rounded-lg p-4">
            <div className="grid grid-cols-4 font-poppins text-white">
              <div className="flex">
                <div className="m-auto"></div>
                <div className="m-auto absolute">
                  <img src={Vector} className="" alt="" />
                </div>
              </div>
              <div></div>
              <div></div>
              <div className="grid grid-cols-2 justify-end">
                <div className="">
                  <img src={group259} className="w-full" alt="" />
                </div>
                <div></div>
              </div>
            </div>
            <div className="flex justify-evenly font-poppins text-white px-16 pb-16">
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.Thumbs width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Best in interaction
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.Authenticity width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Authenticity
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-between">
                <div className="px-4">
                  <Icons.EmailSupport width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Email Support
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
            </div>
            <div className="flex justify-evenly font-poppins text-white px-16 pb-16">
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.Discount width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Discounts Available
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-start">
                <div className="px-4">
                  <Icons.PowerMkt width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Powerful Marketing
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
              <div className="flex-col justify-between">
                <div className="px-4">
                  <Icons.InventoryMgt width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Inventory management
                </div>
                <div className="text-xs px-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;

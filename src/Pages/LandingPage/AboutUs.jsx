import React from "react";
import Icons from "../../Components/Shared/Icons";
import Vector from "../../assets/Images/Vector.svg";
import group259 from "../../assets/Images/group259.svg";
import img46 from "../../assets/Images/img46.png";

function AboutUsSection() {
  return (
    <div className="w-full pb-36 md:px-20">
      <div className="items-center m-auto z-50">
        <div className="items-center m-auto mx-8">
          {" "}
          {/* w-2/3  */}
          <div className="text-center m-auto">
            <div className="font-poppins text-3xl md:text-6xl text-black font-bold justify-center text-center pb-6">
              About Us
            </div>
            <div className="font-poppins text-2xl md:text-5xl text-black font-bold justify-center text-center pb-6">
              We will help you to reach your <br /> business goals
            </div>
            <div className="text-sm md:text-lg">
              We understand that affordability is key, which is why we offer
              competitive and affordable pricing for all our services. Our
              services are backed by impactful metrics. You can rest assured
              that our team will always be there to assist you with any
              questions or concerns you may have.
            </div>
          </div>
          <div className="grid grid-cols-4 font-poppins text-white">
            <div className="flex">
              <div></div>
              <div></div>
            </div>
            <div>
              <img
                src={Vector}
                className="relative top-10 md:top-28 animate-pulse"
                alt=""
              />
            </div>
            <div></div>
            <div className="grid grid-cols-2 justify-end">
              <div></div>
              <div>
                <img
                  src={group259}
                  className="relative top-30 -left-6 animate-bounce"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="bg-home-color rounded-lg p-4 pt-16">
            <div className="flex flex-col md:flex-row justify-evenly font-poppins text-white px-6 md:px-16 pb-6 md:pb-16">
              <div className="flex-col justify-start pb-6 md:pb-0">
                <div className="px-4">
                  <Icons.Thumbs width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Full-time support
                </div>
                <div className="text-xs px-4">
                  A dedicated and passionate team to solve any issues
                </div>
              </div>
              <div className="flex-col justify-start pb-6 md:pb-0">
                <div className="px-4">
                  <Icons.Authenticity width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Affordable pricing
                </div>
                <div className="text-xs px-4">
                  Affordable pricing plans according to your budget
                </div>
              </div>
              <div className="flex-col justify-between">
                <div className="px-4">
                  <Icons.EmailSupport width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Intuitive features
                </div>
                <div className="text-xs px-4">
                  User-friendly features that get the job done
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-evenly font-poppins text-white px-6 md:px-16 pb-16">
              <div className="flex-col justify-start pb-6 md:pb-0">
                <div className="px-4">
                  <Icons.Discount width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Impactful Metrics
                </div>
                <div className="text-xs px-4">
                  Useful metrics for a clear representation of your data
                </div>
              </div>
              <div className="flex-col justify-start pb-6 md:pb-0">
                <div className="px-4">
                  <Icons.PowerMkt width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Powerful Technology
                </div>
                <div className="text-xs px-4">
                  Built on the latest and most updated technology
                </div>
              </div>
              <div className="flex-col justify-between">
                <div className="px-4">
                  <Icons.InventoryMgt width={40} />
                </div>
                <div className="text-xl px-4 py-4 font-semibold">
                  Strong Security
                </div>
                <div className="text-xs px-4">
                  Powerful security measures for your information
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <img
              src={img46}
              className="relative float-right -top-24 left-6 md:left-10"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;

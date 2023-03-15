import "antd/dist/antd.css";
import React from "react";
import { useState, useRef } from "react";
import Icons from "../../Components/Shared/Icons";
import "./PricingSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PricingSectionMobile = () => {
  const [tooglePkg, setTooglePkg] = useState();
  const CaseSlider = useRef(null);

  const TooglePackage = (index) => {
    setTooglePkg(index);
    console.log(tooglePkg);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <div className="pb-20">
      <div className="background-shadow-left-mob"></div>
      <div className="background-shadow-right-mob"></div>
      <div className="text-center m-auto">
        <div className="font-poppins text-2xl text-black font-bold justify-center text-center">
          Pricing plans to suit <br /> your specific needs
        </div>{" "}
        <br />
        <div className="text-base px-4">
          Please take a look at the range of plans that we are offering
        </div>
      </div>
      {/* <div className="w-full pb-10 m-auto">
        <div className="flex items-center bg-[#E0E4FC] font-semibold rounded-3xl p-2 mx-4">
          <p className="w-full text-center p-2 m-auto">Monthly</p>
          <p className="w-full bg-black text-white text-center rounded-2xl py-4 m-auto">
            Yearly
          </p>
        </div>
      </div> */}
      <div className="service-capbility">
        <Slider ref={CaseSlider} arrows={false} {...settings} className="mb-10">
          <div className="p-8">
            <div className="mobile-card-fatness bg-brand-color border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 mb-5 mx-auto">
              <div className=" flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
                {tooglePkg === 1 && <div></div>}
                <div className="flex justify-evenly gap-6">
                  <div>
                    <Icons.Regularpkg width={40} />
                  </div>
                  <div className="flex-col">
                    <div className="font-poppins text-4xl text-black font-bold textShadow">
                      Regular
                    </div>
                    <div className="text-md font-semibold pb-8">
                      Starter Plan
                    </div>
                  </div>
                </div>
                <div className="w-full border"></div>
                <div className="pt-8">
                  <ul>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Limited Projects</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Regular Support Business</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">1 month Free Trial</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">3GB storage</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Ads Preview</strong>
                    </li>
                  </ul>
                </div>
                <div className="text-sm text-center pb-18">
                  Basic features at an affordable rate
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mobile-card-fatness bg-brand-color border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 mb-5 mx-auto">
              <div className=" flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
                {tooglePkg === 2 && <div></div>}
                <div className="flex justify-evenly gap-6">
                  <div>
                    <Icons.Regularpkg width={40} />
                  </div>
                  <div className="flex-col">
                    <div className="font-poppins text-4xl text-black font-bold textShadow">
                      Platinum
                    </div>
                    <div className="text-md font-semibold pb-8">
                      For the best results
                    </div>
                  </div>
                </div>

                <div className="w-full border"></div>
                <div className="pt-8">
                  <ul>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Limited Projects</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Regular Support Business</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">1 month Free Trial</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">3GB storage</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Ads Preview</strong>
                    </li>
                  </ul>
                </div>
                <div className="text-sm text-center pb-18">
                  A premium plan for top-notch results
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mobile-card-fatness bg-brand-color border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 mb-5 mx-auto">
              <div className=" flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
                {tooglePkg === 3 && <div></div>}
                <div className="flex justify-evenly gap-6">
                  <div>
                    <Icons.Regularpkg width={40} />
                  </div>
                  <div className="flex-col">
                    <div className="font-poppins text-4xl text-black font-bold textShadow">
                      Standard
                    </div>
                    <div className="text-md font-semibold pb-8">
                      Most popular
                    </div>
                  </div>
                </div>
                <div className="w-full border"></div>
                <div className="pt-8">
                  <ul>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Limited Projects</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Regular Support Business</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">1 month Free Trial</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">3GB storage</strong>
                    </li>
                    <li className="flex p-2">
                      <Icons.Tick />
                      <strong className="px-4">Ads Preview</strong>
                    </li>
                  </ul>
                </div>
                <div className="text-sm text-center pb-18">
                  The most popular pricing plan
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      {/* <div className="w-1/2 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a
          className="text-md text-white font-semibold whitespace-nowrap"
          href="/"
        >
          Explore More
        </a>
      </div> */}
    </div>
  );
};
export default PricingSectionMobile;

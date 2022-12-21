import "antd/dist/antd.css";
import React from "react";
import { useState } from "react";
import Icons from "../../Components/Shared/Icons";
import "./PricingSection.css"

/* const contentStyle = {
  margin: 0,
  width: "200px",
  height: "60px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  margin: "auto"
};
 */

const handleOnMouseMove = e => {
    const { currentTarget : target } = e;

    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    console.log(x);
    target.style.setProperty("--mouse-y", `${y}px`);
    console.log(y);
}

for(const card of document.querySelectorAll(".card")){
    card.onmousemove = e => handleOnMouseMove(e);
}

const PricingSection = () => {
  /*   const onChange = (currentSlide) => {
    console.log(currentSlide);
  }; */
  const [tooglePkg, setTooglePkg] = useState();

  const TooglePackage = (index) => {
    setTooglePkg(index);
    console.log(tooglePkg);
  }

  return (
    <div className="pb-40">
      <div className="background-shadow-left"></div>
      <div className="background-shadow-right"></div>
      <div className="text-center m-auto pb-10">
        <div className="font-poppins text-4xl text-black font-bold justify-center text-center">
          Pricing plans to suit <br /> your specific needs  
        </div>{" "}
        <br />
        <div className="text-base">
          Please take a look at the range of plans that we are offering  
        </div>
      </div>
      <div className="w-1/4 pb-10 m-auto">
        <div className="hidden lg:flex items-center bg-[#E0E4FC] font-semibold rounded-3xl p-2">
          <p className="w-1/2 text-center p-2 m-auto">Monthly</p>
          <p className="w-1/2 bg-black text-white text-center rounded-2xl py-4 m-auto">
            Yearly
          </p>
        </div>
      </div>
      <div className="flex justify-evenly px-18 gap-6 pb-18">
        {/* Card */}
        <div onClick={() => TooglePackage(1)} onMouseEnter className={`border rounded-3xl pl-0.5 pb-0.5 z-10 ${tooglePkg === 1 ? "card-background duration-700":"bg-white"} `}>
          <div onClick={() => TooglePackage(1)} className={`card flex-col bg-white rounded-3xl pt-12 px-12 duration-300 z-50 ${tooglePkg === 1 ? "bg-[#E6EBFA] backdrop:filter backdrop-blur-sm": ""}`}>
          {tooglePkg === 1 &&
            <div></div>
          }
            <div className="w-2/3 flex justify-evenly gap-6">
              <div>
                <Icons.Regularpkg width={40} />
              </div>
              <div className="flex-col">
                <div className="font-poppins text-4xl text-black font-bold">
                  Regular
                </div>
                <div className="text-md font-semibold pb-8">Starter Plan</div>
              </div>
            </div>
            <div className="w-full border"></div>
            <div className="mx-4  pt-8">
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
        {/* Card2 */}
        <div onClick={() => TooglePackage(2)} className={`border rounded-3xl pl-0.5 pb-0.5 z-10 ${tooglePkg === 2 ? "bg-[#B395FF]":"bg-white"} `}>
          <div onClick={() => TooglePackage(2)} className={`flex-col bg-white z-50 rounded-3xl pt-12 px-12 duration-300 ${tooglePkg === 2 ? "bg-[#E6EBFA] backdrop:filter backdrop-blur-sm": ""}`}>
            <div className="w-2/3 flex justify-evenly gap-6">
              <div>
                <Icons.Platinumpkg width={40} />
              </div>
              <div className="flex-col">
                <div className="font-poppins text-4xl text-black font-bold">
                  Plantinum
                </div>
                <div className="text-md font-semibold pb-8">For the best results</div>
              </div>
            </div>
            <div className="w-full border"></div>
            <div className="mx-4  pt-8">
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
        {/* Card3 */}
        <div onClick={() => TooglePackage(3)} className={`border rounded-3xl pl-0.5 pb-0.5 z-10 ${tooglePkg === 3 ? "bg-[#B395FF]":"bg-white"}`}>
          <div onClick={() => TooglePackage(3)} className={`flex-col bg-white z-50 rounded-3xl pt-12 px-12 duration-300 ${tooglePkg === 3 ? "bg-[#E6EBFA] backdrop:filter backdrop-blur-sm": ""}`}>
            <div className="w-2/3 flex justify-evenly gap-6">
              <div>
                <Icons.Standardpkg width={40} />
              </div>
              <div className="flex-col">
                <div className="font-poppins text-4xl text-black font-bold">
                  Standard
                </div>
                <div className="text-md font-semibold pb-8">Most popular</div>
              </div>
            </div>
            <div className="w-full border"></div>
            <div className="mx-4  pt-8">
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
      <div className="w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold" href="/">
          Explore More
        </a>
      </div>
    </div>
  );
};
export default PricingSection;

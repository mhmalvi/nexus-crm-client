import "antd/dist/antd.css";
import React from "react";
import { useState, useEffect } from "react";
import Icons from "../../Components/Shared/Icons";
import "./PricingSection.css";

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

const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  setTimeout(() => {
    target.style.setProperty("--mouse-x", `${x}px`);
    console.log(x);
    target.style.setProperty("--mouse-y", `${y}px`);
    console.log(y);
  }, 0);
};

const PricingSection = () => {
  /*   const onChange = (currentSlide) => {
    console.log(currentSlide);
  }; */
  const [tooglePkg, setTooglePkg] = useState();

  const TooglePackage = (index) => {
    setTooglePkg(index);
    console.log(tooglePkg);
  };

  useEffect(() => {
    for (const card of document.querySelectorAll(".card")) {
      card.onmousemove = (e) => handleOnMouseMove(e);
    }
  }, []);

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
      {/* <div className="service-capbility flex justify-evenly px-18 gap-6 pb-18">
        
        <div className="border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 card-background">
          <div className="card flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
            {tooglePkg === 1 && <div></div>}
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
        
        <div className="border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 card-background">
          <div className="card flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
            {tooglePkg === 2 && <div></div>}
            <div className="w-2/3 flex justify-evenly gap-6">
              <div>
                <Icons.Platinumpkg width={40} />
              </div>
              <div className="flex-col">
                <div className="font-poppins text-4xl text-black font-bold">
                  Plantinum
                </div>
                <div className="text-md font-semibold pb-8">
                  For the best results
                </div>
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
        
        <div className="border shadow-lg rounded-3xl z-10 pl-0.5 pb-0.5 duration-300 card-background">
          <div className="card flex-col rounded-3xl pt-12 px-12 duration-300 z-50 bg-[#E6EBFA] backdrop:filter backdrop-blur-sm">
            {tooglePkg === 3 && <div></div>}
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
      </div> */}

      <div className="service-capbility flex justify-evenly px-18 gap-6 pb-18">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lg border">
            <div className="w-[350px] h-[460px] card-background absolute rounded-3xl z-30"></div>

            <div className="card w-[350px] h-[460px] grid grid-cols-2 rounded-3xl relative z-40">
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>

              <div className="absolute top-12 left-10 z-[100]">
                <Icons.Standardpkg width={40} />
              </div>
              <div className="flex-col absolute top-12 left-20 z-[100]">
                <div className=" text-4xl text-black font-bold">Regular</div>
                <div className="text-md font-semibold pb-8">Starter Plan</div>
              </div>
              <div className="w-64 border absolute top-36 left-12 z-[100]"></div>
              <li className="flex absolute bottom-[239px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Limited Projects</strong>
              </li>
              <li className="flex absolute bottom-[202px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Regular Support Business</strong>
              </li>
              <li className="flex absolute bottom-[166px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">1 Month Free Trial</strong>
              </li>
              <li className="flex absolute bottom-32 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">3GB storage</strong>
              </li>
              <li className="flex absolute bottom-22 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Ads Preview</strong>
              </li>
              <div className="absolute bottom-16 left-16 z-[100] bg-transparent text-sm text-center">
                The most popular pricing plan
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lg border">
            <div className="w-[350px] h-[460px] card-background absolute rounded-3xl z-30"></div>

            <div className="card w-[350px] h-[460px] grid grid-cols-2 rounded-3xl relative z-40">
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>

              <div className="absolute top-12 left-10 z-[100]">
                <Icons.Standardpkg width={40} />
              </div>
              <div className="flex-col absolute top-12 left-20 z-[100]">
                <div className=" text-4xl text-black font-bold">Plantinum</div>
                <div className="text-md font-semibold pb-8">
                  For the best results
                </div>
              </div>
              <div className="w-64 border absolute top-36 left-12 z-[100]"></div>
              <li className="flex absolute bottom-[239px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Limited Projects</strong>
              </li>
              <li className="flex absolute bottom-[202px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Regular Support Business</strong>
              </li>
              <li className="flex absolute bottom-[166px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">1 Month Free Trial</strong>
              </li>
              <li className="flex absolute bottom-32 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">3GB storage</strong>
              </li>
              <li className="flex absolute bottom-22 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Ads Preview</strong>
              </li>
              <div className="absolute bottom-16 left-16 z-[100] bg-transparent text-sm text-center">
                The most popular pricing plan
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lg border">
            <div className="w-[350px] h-[460px] card-background absolute rounded-3xl z-30"></div>

            <div className="card w-[350px] h-[460px] grid grid-cols-2 rounded-3xl relative z-40">
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>
              <div className="card grid-row-3"></div>

              <div className="absolute top-12 left-10 z-[100]">
                <Icons.Standardpkg width={40} />
              </div>
              <div className="flex-col absolute top-12 left-20 z-[100]">
                <div className=" text-4xl text-black font-bold">Standard</div>
                <div className="text-md font-semibold pb-8">Most popular</div>
              </div>
              <div className="w-64 border absolute top-36 left-12 z-[100]"></div>
              <li className="flex absolute bottom-[239px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Limited Projects</strong>
              </li>
              <li className="flex absolute bottom-[202px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Regular Support Business</strong>
              </li>
              <li className="flex absolute bottom-[166px] left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">1 Month Free Trial</strong>
              </li>
              <li className="flex absolute bottom-32 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">3GB storage</strong>
              </li>
              <li className="flex absolute bottom-22 left-16 z-[100] bg-transparent">
                <Icons.Tick />
                <strong className="px-4">Ads Preview</strong>
              </li>
              <div className="absolute bottom-16 left-16 z-[100] bg-transparent text-sm text-center">
                The most popular pricing plan
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold whitespace-nowrap" href="/">
          Explore More
        </a>
      </div>
    </div>
  );
};
export default PricingSection;

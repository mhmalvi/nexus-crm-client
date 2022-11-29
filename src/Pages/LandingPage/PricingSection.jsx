import "antd/dist/antd.css";
import React from "react";
import Icons from "../../Components/Shared/Icons";

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
const PricingSection = () => {
  /*   const onChange = (currentSlide) => {
    console.log(currentSlide);
  }; */
  return (
    <div className="pb-40">
      <div className="text-center m-auto pb-10">
        <div className="font-poppins text-4xl text-black font-bold justify-center text-center">
          We have the Best Solution
          <br /> for your Business
        </div>{" "}
        <br />
        <div className="text-sm">
          Lorem ipsum dolor sit amet, consetetur <br /> sadipscing elitr, sed
          diam nonumy eirmod tempor <br /> invidunt ut labore et dolore magna
          aliquyam erat.
        </div>
      </div>
      <div className="w-1/4 pb-10 m-auto">
        <div className="hidden lg:flex items-center bg-[#E0E4FC] rounded-3xl p-2 text-[14px]">
          <p className="w-1/2 text-center p-2 m-auto">Monthly</p>
          <p className="w-1/2 bg-black text-white text-center rounded-2xl py-4 m-auto">
            Yearly
          </p>
        </div>
      </div>
      <div className="flex justify-evenly px-18 gap-6 pb-18">
        {/* Card */}
        <div className="flex-col pt-12 px-12 border rounded-3xl">
          <div className="w-2/3 flex justify-evenly gap-6">
            <div>
              <Icons.Regularpkg width={40} />
            </div>
            <div className="flex-col">
              <div className="font-poppins text-4xl text-black font-bold">
                Regular
              </div>
              <div className="text-md pb-8">Starter Plan</div>
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </div>
        </div>
        {/* Card2 */}
        <div className="flex-col pt-12 px-12 border-4 border-[#B395FF] rounded-3xl">
          <div className="w-2/3 flex justify-evenly gap-6">
            <div>
              <Icons.Platinumpkg width={40} />
            </div>
            <div className="flex-col">
              <div className="font-poppins text-4xl text-black font-bold">
                Plantinum
              </div>
              <div className="text-md pb-8">For the best results</div>
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </div>
        </div>
        {/* Card3 */}
        <div className="flex-col pt-12 px-12 border rounded-3xl">
          <div className="w-2/3 flex justify-evenly gap-6">
            <div>
              <Icons.Standardpkg width={40} />
            </div>
            <div className="flex-col">
              <div className="font-poppins text-4xl text-black font-bold">
                Standard
              </div>
              <div className="text-md pb-8">Most popular</div>
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </div>
        </div>
      </div>
      <div className="w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold" href="">
          Explore More
        </a>
      </div>
    </div>
  );
};
export default PricingSection;

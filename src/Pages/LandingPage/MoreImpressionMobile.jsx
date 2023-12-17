import React from "react";
import AnimatedText from "react-animated-text-content";
import CountUp from "react-countup";
import "./MoreImpression.css";


function MoreImpressionMobileSection() {

  return (
    <div className=" w-11/12 mx-auto rounded-3xl pb-20 md:pb-30">
      <div className="items-center m-auto p-6 MobileStableBackground">
        <div className="flex flex-col justify-center font-poppins text-black">
          <div className="w-full flex-col justify-start m-auto">
            <div className="text-2xl text-center px-4 py-4 font-semibold">
              <AnimatedText
                type="chars"
                interval={0.08}
                duration={0.75}
                animation={{
                  ease: "ease-in",
                  scale: 2,
                }}
              >
                More high-quality leads, more conversions
              </AnimatedText>
            </div>
            <div className="text-center px-4">
              Regarding actual conversions, it’s the quality of leads that truly
              matter. Generate better leads and increase the conversion rate
              with our CRM.
            </div>
          </div>

          <div className="w-full flex-col justify-start">
            <div className="px-4 py-4">
              {/* Progress Bar */}
              <div className="relative w-56 bg-white bg-opacity-70 backdrop:filter backdrop-blur-[1px] m-auto rounded-xl z-[100] py-10 px-5 border shadow-lg">
                <div className="relative flex justify-center">
                  <div className="progressBarMobile"></div>
                  <div className="absolute top-6 text-center font-semibold">
                    90%
                    <div className="text-[8px] leading-0 text-center pb-2">
                      Customer <br /> Satisfaction
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly pt-5 gap-6">
                  <div className="flex">
                    <div className="w-6 h-6 bg-[#6B7CFF] rounded-md m-auto animate-pulse"></div>
                    <span className="m-auto pl-2 font-semibold">
                      {" "}
                      {<CountUp start={0} end={50} duration={2} />}%
                    </span>
                  </div>
                  <div className="flex">
                    <div className="w-6 h-6 bg-[#CFCFCF] rounded-md m-auto animate-pulse"></div>
                    <span className="m-auto pl-2 font-semibold">
                      {" "}
                      {<CountUp start={0} end={200} duration={2} />}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-evenly pt-1 pb-5 gap-2">
                  <div className="text-[8px] pb-2 whitespace-nowrap">
                    Cycle-time decreased
                  </div>
                  <div className="text-[8px] pb-2 whitespace-nowrap">
                    Increased productivity
                  </div>
                </div>
                <div className="text-[10px] text-center">
                  Get the best out of your customer support
                </div>
                {/* PIE CHART */}
                <div className="hidden md:block absolute top-5 left-[-40%] w-28 bg-white p-2 rounded-xl border shadow-lg">
                  <div className="text-[8px] pb-2">Leads Generated</div>
                  <div className="custom_svg">
                    <svg viewBox="0 0 20.6619772368 20.6619772368" width={50}>
                      <circle
                        className="custom_circle pie1"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie2"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie3"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie4"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold py-3 pl-12 relative -bottom-4 left-4">
                    32K
                  </div>
                </div>
                {/* PIE CHART */}
                <div className="hidden md:block absolute top-14 right-[-40%] w-28 bg-white p-2 rounded-xl border shadow-lg">
                  <div className="text-[8px] pb-2">Conversion Rate</div>
                  <div className="custom_svg">
                    <svg viewBox="0 0 20.6619772368 20.6619772368" width={50}>
                      <circle
                        className="custom_circle pie1"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie2"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie3"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                      <circle
                        className="custom_circle pie4"
                        cx="31.8309886184"
                        cy="31.8309886184"
                        r="15.9154943092"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold py-3 pl-12 relative -bottom-4 left-4">
                    98%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreImpressionMobileSection;


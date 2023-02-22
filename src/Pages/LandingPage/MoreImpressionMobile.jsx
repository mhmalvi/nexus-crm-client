import React from "react";
import background from "../../assets/Images/Background-blur.png";
import impressions from "../../assets/Images/impressions.png";
import AnimatedText from "react-animated-text-content";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from "recharts";
import Lottie from "react-lottie";
import CountUp from "react-countup";
import graph_diagram from "../../assets/Images/impression_graph.json";
import "./MoreImpression.css";
import { useState, useEffect } from "react";


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
            <div className="w-2/5 bg-black rounded-xl text-center py-4 my-6 mx-auto md:mx-0">
              <a className="text-white" href="/">
                Get Free Trial
              </a>
            </div>
          </div>

          <div className="w-full flex-col justify-start">
            <div className="px-4 py-4">
              {/* Progress Bar */}
              <div className="relative w-56 bg-white m-auto rounded-xl z-[100] p-10 border shadow-lg">
                <div className="relative flex justify-center">
                  <div className="progressBarMobile"></div>
                  <div className="absolute top-9 text-xl font-semibold">
                    {
                      <CountUp
                        delay={7.5}
                        start={80}
                        end={0}
                        duration={2}
                        onEnd={({ pauseResume, reset, start, update }) =>
                          start()
                        }
                      />
                    }
                    %
                  </div>
                </div>
                <div className="flex justify-evenly py-5 gap-4">
                  <div className="flex">
                    <div className="w-6 h-6 bg-[#6B7CFF] rounded-md m-auto animate-pulse"></div>
                    <span className="m-auto pl-2 text-xl md:text-3xl font-semibold">
                      {" "}
                      {<CountUp start={0} end={30} duration={2} />}%
                    </span>
                  </div>
                  <div className="flex">
                    <div className="w-6 h-6 bg-[#CFCFCF] rounded-md m-auto animate-pulse"></div>
                    <span className="m-auto pl-2 text-xl md:text-3xl font-semibold">
                      {" "}
                      {<CountUp start={0} end={68} duration={2} />}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-center">
                  Get the best out of your customer support Finsweet
                </div>
                {/* PIE CHART */}
                {/* <div className="absolute top-5 left-[-30%] xl:left-[-40%] w-24 bg-white p-2 xl:p-6 rounded-xl border shadow-lg">
                    <div className="">
                        <svg
                          viewBox="0 0 20.6619772368 20.6619772368"
                          width={50}
                        >
                          <circle
                            className="pie1"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie2"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie3"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie4"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                        </svg>
                    </div>
                      <div className="font-semibold py-3 pl-12 relative -bottom-4 left-2">
                        32K
                      </div>
                  </div> */}
                {/* PIE CHART */}
                {/* <div className="absolute top-10 right-[-35%] xl:right-[-40%] w-32 xl:w-44 h-28 xl:h-32 bg-white p-2 xl:p-6 rounded-xl border shadow-lg">
                    <div className="text-xs pb-2">Impression</div>
                    <div className="flex">
                      <figure>
                        <svg
                          viewBox="0 0 20.6619772368 20.6619772368"
                          width={100}
                        >
                          <circle
                            className="pie1"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie2"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie3"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                          <circle
                            className="pie4"
                            cx="31.8309886184"
                            cy="31.8309886184"
                            r="15.9154943092"
                          />
                        </svg>
                      </figure>
                      <div className="text-xl xl:text-3xl font-semibold py-3 pl-12">
                        32K
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreImpressionMobileSection;

const data = [
  { name: "Group A", value: 98 },
  { name: "Group A", value: 2 },
];
const data1 = [
  { name: "Group A", value: 75 },
  { name: "Group A", value: 25 },
];

const data2 = [
  {
    name: "Page Z",
    pv: 1400,
  },
  {
    name: "Page A",
    pv: 7400,
  },
  {
    name: "Page B",
    pv: 5098,
  },
  {
    name: "Page C",
    pv: 9800,
  },
];

const data3 = [
  {
    name: "Page A",
    pv: 7200,
  },
  {
    name: "Page B",
    pv: 9998,
  },
  {
    name: "Page C",
    pv: 4000,
  },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: graph_diagram,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

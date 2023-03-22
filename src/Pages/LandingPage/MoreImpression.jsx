import React, { useEffect } from "react";
import AnimatedText from "react-animated-text-content";
import CountUp from "react-countup";
import graph_diagram from "../../assets/Images/impression_graph.json";
import "./MoreImpression.css";


const handleOnMouseMove = e => {
    const { currentTarget : target } = e;

    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    setTimeout(() => {

      target.style.setProperty("--mouse-x", `${x}px`);
      // console.log(x);
      target.style.setProperty("--mouse-y", `${y}px`);
      // console.log(y);
    }, 100);
}

for(const card of document.querySelectorAll(".background")){
    card.onmousemove = e => handleOnMouseMove(e);
}

function MoreImpressionSection() {
  useEffect(() => {
    for(const card of document.querySelectorAll(".background")){
        card.onmousemove = e => handleOnMouseMove(e);
    }
}, [])

  return (
    <div className="impression-effects w-full m-auto rounded-3xl pb-30">
      {/* <div className="background-effect shadow-md">
        <div className="items-center m-auto p-6 background">
          <div className="flex justify-center font-poppins text-black p-6">
            <div className="w-1/2 flex-col justify-start m-auto">
              <div className="text-5xl px-4 py-4 font-semibold">
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
              <div className="px-4">
                Regarding actual conversions, it’s the quality of leads that
                truly matter. Generate better leads and increase the conversion
                rate with our CRM.
              </div>
              <div className="w-2/5 bg-black rounded-xl text-center py-4 my-6">
                <a className="text-white" href="/">
                  Get Free Trial
                </a>
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start">
              <div className="px-4 py-4">
                Progress Bar
                <div className="relative w-72 xl:w-86 bg-white m-auto rounded-xl z-[100] p-10 border shadow-lg">
                  <div className="relative flex justify-center">
                    <div className="test"></div>
                    <div className="absolute top-20 text-3xl font-semibold">
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

                  <div className="flex justify-evenly py-5">
                    <div className="flex">
                      <div className="w-6 h-6 bg-[#6B7CFF] rounded-md m-auto animate-pulse"></div>
                      <span className="m-auto pl-2 text-3xl font-semibold">
                        {" "}
                        {<CountUp start={0} end={30} duration={2} />}%
                      </span>
                    </div>
                    <div className="flex">
                      <div className="w-6 h-6 bg-[#CFCFCF] rounded-md m-auto animate-pulse"></div>
                      <span className="m-auto pl-2  text-3xl font-semibold">
                        {" "}
                        {<CountUp start={0} end={68} duration={2} />}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    Get the best out of your customer support Finsweet
                  </div>

                  PIE CHART
                  <div className="absolute top-10 left-[-35%] xl:left-[-40%] w-32 xl:w-44 h-28 xl:h-32 bg-white p-2 xl:p-6 rounded-xl border shadow-lg">
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
                      <div className="text-2xl xl:text-3xl font-semibold py-3">
                        32K
                      </div>
                    </div>
                  </div>
                  PIE CHART
                  <div className="absolute bottom-1/4 right-[-35%] xl:right-[-40%] w-32 xl:w-44 h-28 xl:h-32 bg-white p-2 xl:p-6 rounded-xl border shadow-lg">
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
                      <div className="text-2xl xl:text-3xl font-semibold py-3">
                        32K
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative mt-20">
        <div className="w-[960px] xl:w-[1300px] 2xl:w-[1500px] overflow-hidden rounded-3xl shadow-lg mx-auto">
          <div className="w-[960px] xl:w-[1300px] 2xl:w-[1500px] h-[700px] background-effect absolute rounded-3xl z-30"></div>
          <div className="card w-full h-[700px] grid grid-cols-6 rounded-3xl relative m-auto z-40 background duration-300">
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>
            <div className="card grid-row-2"></div>

            <AnimatedText
              className="w-1/3 absolute top-32 left-16 z-[100] text-4xl font-semibold"
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
            <div className="w-1/3 absolute top-56 left-16 z-[100] text-lg pt-8">
              Regarding actual conversions, it’s the quality of leads that truly
              matter. Generate better leads and increase the conversion rate
              with our CRM.
            </div>
            {/* <div className="w-1/5 bg-black rounded-xl text-center py-4 my-6 absolute top-[60%] left-16 z-[100]">
              <a className="text-white" href="/">
                Get Free Trial
              </a>
            </div> */}

            <div className="w-1/2 flex-col justify-start absolute top-[20%] right-10 z-[100]">
              <div className="px-4 py-4">
                {/* Progress Bar */}
                <div className="relative w-73 xl:w-86 bg-white bg-opacity-70 backdrop:filter backdrop-blur-[1px] m-auto rounded-xl z-[100] p-10 border shadow-lg">
                  <div className="relative flex justify-center">
                    <div className="progressBar"></div>
                    <div className="absolute top-16 text-center text-3xl font-semibold">
                      {/* {
                        <CountUp
                          delay={3}
                          start={90}
                          end={0}
                          duration={2}
                          onEnd={({ pauseResume, reset, start, update }) =>
                            start()
                          }
                        />
                      } */}
                      90%
                      <div className="text-xs text-center pb-2">
                        Customer <br /> Satisfaction
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-evenly pt-5 gap-5">
                    <div className="flex">
                      <div className="w-6 h-6 bg-[#6B7CFF] rounded-md m-auto animate-pulse"></div>
                      <span className="m-auto pl-2 text-3xl font-semibold">
                        {" "}
                        {<CountUp start={0} end={50} duration={2} />}%
                      </span>
                    </div>
                    <div className="flex">
                      <div className="w-6 h-6 bg-[#CFCFCF] rounded-md m-auto animate-pulse"></div>
                      <span className="m-auto pl-2 text-3xl font-semibold">
                        {" "}
                        {<CountUp start={0} end={200} duration={2} />}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-evenly pb-5">
                    <div className="text-xs pb-2">Cycle-time decreased</div>
                    <div className="text-xs pb-2">Increased productivity</div>
                  </div>
                  <div className="text-xs text-center">
                    Get the best out of your customer support
                  </div>

                  {/* PIE CHART */}
                  <div className="animate-float absolute top-10 left-[-35%] xl:left-[-40%] w-32 xl:w-44 h-28 xl:h-32 bg-white bg-opacity-70 backdrop:filter backdrop-blur-[1px] p-2 xl:p-6 rounded-xl border shadow-lg">
                    <div className="text-xs pb-2">Leads Generated</div>
                    <div className="custom_svg grid grid-cols-2">
                      <svg viewBox="0 0 20.6619772368 20.6619772368">
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
                      <div className="text-2xl xl:text-3xl font-semibold py-3 pl-2">
                        32K
                      </div>
                    </div>
                  </div>
                  {/* PIE CHART */}
                  <div className="animate-float absolute bottom-1/4 right-[-35%] xl:right-[-40%] w-32 xl:w-44 h-28 xl:h-32 bg-white bg-opacity-70 backdrop:filter backdrop-blur-[1px] p-2 xl:p-6 rounded-xl border shadow-lg">
                    <div className="text-xs pb-2">Conversion Rate</div>
                    <div className="custom_svg grid grid-cols-2">
                      <svg
                        viewBox="0 0 20.6619772368 20.6619772368"
                        width={100}
                      >
                        <circle
                          className="custom_circle22 pie11"
                          cx="31.8309886184"
                          cy="31.8309886184"
                          r="15.9154943092"
                        />
                        {/* <circle
                          className="custom_circle22 pie22"
                          cx="31.8309886184"
                          cy="31.8309886184"
                          r="15.9154943092"
                        />
                        <circle
                          className="custom_circle22 pie33"
                          cx="31.8309886184"
                          cy="31.8309886184"
                          r="15.9154943092"
                        />
                        <circle
                          className="custom_circle22 pie44"
                          cx="31.8309886184"
                          cy="31.8309886184"
                          r="15.9154943092"
                        /> */}
                      </svg>
                      <div className="text-2xl xl:text-3xl font-semibold py-3 pl-2">
                        98%
                      </div>
                    </div>
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

export default MoreImpressionSection;

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

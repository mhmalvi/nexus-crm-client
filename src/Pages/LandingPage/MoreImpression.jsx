import React from "react";
import background from "../../assets/Images/Background-blur.png";
import impressions from "../../assets/Images/impressions.png";
import AnimatedText from "react-animated-text-content";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from "recharts";
import Lottie from "react-lottie";
import graph_diagram from "../../assets/Images/impression_graph.json";
import "./MoreImpression.css";

function MoreImpressionSection() {
  return (
    <div className="w-full m-auto rounded-3xl background_img">
      {/* <div className="w-11/12 m-auto absolute">
        <img src={background} className="h-full m-auto" alt="" />
      </div> */}
      <div className=" m-auto pb-30">
        <div className="w-11/12 items-center m-auto p-6">
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
              <div className="text-md px-4">
                Regarding actual conversions, it’s the quality of leads that
                truly matter. Generate better leads and increase the conversion
                rate with our CRM.
              </div>
              <div className="w-2/5 bg-black rounded-xl text-center py-4 my-6">
                <a className="text-md text-white" href="/">
                  Get Free Trial
                </a>
              </div>
            </div>
            <div className="w-1/2 flex-col justify-start">
              <div className="text-xl px-4 py-4 font-semibold">
                <Lottie
                  options={defaultOptions}
                  isClickToPauseDisabled={true}
                  width={"60%"}
                  height={500}
                />
                {/* <img src={impressions} className="w-full m-auto" alt="" /> */}

                {/* <div>
                  <div className="p-6 bg-white rounded-2xl">
                    <div>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={data}
                          cx={100}
                          cy={100}
                          startAngle={-220}
                          // endAngle={20}
                          radius={60}
                          innerRadius={40}
                          outerRadius={60}
                          dataKey="value"
                          fill="#E0E4FC"
                        >
                          <Cell fill="#6B7CFF" />
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                  <div>
                    <div>
                      <PieChart width={1600} height={1600}>
                        <Pie
                          data={data1}
                          cx={220}
                          cy={400}
                          startAngle={-180}
                          // endAngle={0}
                          radius={60}
                          innerRadius={0}
                          outerRadius={80}
                          fill="#6B7CFF"
                          dataKey="value"
                        >
                          <Cell fill="#E0E4FC" />
                        </Pie>
                      </PieChart>
                    </div>
                    <div>
                      <LineChart width={100} height={100} data={data2}>
                        <Line
                          type="monotone"
                          legendType="none"
                          dot={false}
                          dataKey="pv"
                          stroke="#6B7CFF"
                          strokeWidth={4}
                        />
                      </LineChart>
                    </div>
                    <div>
                      <BarChart width={40} height={40} data={data3}>
                        <Bar dataKey="pv" barSize={6} fill="#8884d8" />
                      </BarChart>
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

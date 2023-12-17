import React from "react";
import Dashboard from "../../assets/Images/Dashboard2.png";
import flareBottom from "../../assets/Images/firework.png";
import flareTop from "../../assets/Images/firework2.png";
import headerGroup from "../../assets/Images/header-group.png";
import AnimatedText from "react-animated-text-content";
import "./Header.css";

function Header() {
  return (
    <div>
      <div className="min-h-[100vh] min-w-full">
        <div className="header-backbround min-w-full bg-home-color">&nbsp;</div>
        <div className="min-w-full bg-white">&nbsp;</div>
      </div>
      <div className="min-w-full overflow-x-hidden bg-transparent absolute top-0">
        <img
          src={headerGroup}
          className="w-full rounded-2xl xl:h-full z-0 absolute top-64 md:top-0 animate-slowbounce"
          alt="Cover_Image"
        />
        <div className="items-center m-auto z-50">
          <div className="w-11/12 md:w-9/12 items-center m-auto pt-40">
            <div className="text-center mx-auto mb-4">
              <span className="font-poppins text-2xl md:text-4xl text-white font-bold justify-center text-center">
                <AnimatedText
                  type="words"
                  interval={0.08}
                  duration={0.8}
                  animation={{
                    x: "0px",
                    y: "-100px",
                    ease: "ease-in-out",
                    scale: 3,
                  }}
                >
                  The Best CRM Solutions to Accelerate Your
                </AnimatedText>
                <AnimatedText
                  type="words"
                  interval={0.08}
                  duration={0.8}
                  animation={{
                    x: "0px",
                    y: "100px",
                    ease: "ease-in-out",
                    scale: 3,
                  }}
                >
                  Sales and Ensure High-Quality Performance
                </AnimatedText>
                {/* The Best CRM Solutions to Accelerate Your <br /> Sales and
                Ensure High-Quality Performance */}
              </span>
            </div>
            <div className="w-full md:w-1/2 text-center m-auto py-4">
              <span className="font-poppins text-white text-xs lg:text-sm justify-center text-center">
                An intuitive platform to effectively handle your leads and
                payment management, our CRM system has other useful features to
                take your business to the next level.
              </span>
            </div>
            <div className="w-full md:w-1/2 m-auto mb-8 lg:my-8 lg:py-10 relative flex flex-col justify-center items-center">
              <div className="w-10/12 bg-white rounded-xl flex justify-between items-center px-1 xl:px-2 m-auto">
                <input
                  className="w-full md:w-[70%] bg-transparent focus:outline-none text-sm lg:text-lg py-2 xl:py-4 px-4"
                  type="text"
                  placeholder="Enter your email..."
                />
                <button className="bg-black font-poppins text-white whitespace-nowrap text-sm hidden md:flex items-end rounded-xl pl-6 px-4 py-2 xl:py-4 sm:text-sm">
                  Get Free Trial
                </button>
              </div>
              <div className="md:hidden">
                <button className="bg-black font-poppins text-white whitespace-nowrap text-sm md:flex justify-center items-center text-center rounded-xl pl-6 px-4 py-2 xl:py-4 mt-4 sm:text-sm">
                  Get Free Trial
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={flareTop}
                className="w-[60px] md:w-[140px] absolute -top-10 md:-top-24 -right-10 md:-right-24 animate-pulse"
                alt="flare"
              />
              <div className="bg-white p-2 lg:p-4 rounded-lg z-60 bg-opacity-10 backdrop:filter backdrop-blur-sm">
                <div className="bg-white p-2 lg:p-4 rounded-lg z-70 bg-opacity-20 backdrop:filter backdrop-blur-sm">
                  <div className="bg-white lg:p-4 rounded-lg z-80 bg-opacity-30 backdrop:filter backdrop-blur-sm">
                      <img
                        src={Dashboard}
                        className="w-full rounded-tl rounded-tr"
                        alt=""
                      />
                  </div>
                </div>
              </div>
              <img
                src={flareBottom}
                className="w-[130px] md:w-[300px] relative -top-16 md:-top-44 -left-14 md:-left-36 animate-pulse"
                alt="flare"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

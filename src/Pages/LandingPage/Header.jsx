import React from "react";
import Dashboard from "../../assets/Images/Dashboard.png";
import flare from "../../assets/Images/firework.png";
import headerGroup from "../../assets/Images/header-group.png";
import AnimatedText from "react-animated-text-content";

function Header() {
  return (
    <div className="w-full max-h-[850px] bg-home-color">
      <img
        src={headerGroup}
        className="w-full rounded-2xl h-full z-0 absolute animate-slowbounce "
        alt="Cover_Image"
      />
      <div className="items-center m-auto z-50">
        <div className="w-2/3 items-center m-auto pt-40">
          <div className="text-center mx-auto mb-4">
            <span className="font-poppins text-4xl text-white font-bold justify-center text-center">
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
          <div className="w-1/2 text-center m-auto py-4">
            <span className="font-poppins text-white text-sm justify-center text-center">
              An intuitive platform to effectively handle your leads and payment
              management, our CRM system has other useful features to take your
              business to the next level.
            </span>
          </div>
          <div className="w-1/2 m-auto my-8 py-10 relative">
            <div className="bg-white rounded-xl flex justify-between items-center px-1 xl:px-2 m-0">
              {/* <AiOutlineSearch size={25}/> */}
              <input
                className="w-[70%] bg-transparent focus:outline-none text-lg py-2 xl:py-4 px-4"
                type="text"
                placeholder="Enter your email..."
              />
              <button className="bg-black font-poppins text-white whitespace-nowrap text-sm hidden md:flex items-end rounded-xl pl-6 px-4 py-2 xl:py-4 sm:text-sm">
                Get Free Trial
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-4 rounded-lg z-60 bg-opacity-10">
              <div className="bg-white p-4 rounded-lg z-70 bg-opacity-20">
                <div className="bg-white p-4 rounded-lg z-80 bg-opacity-30">
                  <div className="-z-10">
                    <img
                      src={Dashboard}
                      className="w-full rounded-tl rounded-tr"
                      alt=""
                    />
                  </div>
                  {/* <div className="inline-block animate-pulse z-50"> */}
                  {/* <div className="inline-block animate-pulse z-50">
                    <img
                      src={flare}
                      className="inline-block w-1/4 mr-30 right-20"
                      alt="flare"
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <img
              src={flare}
              className="relative -top-44 -left-36 animate-pulse"
              width={303}
              alt="flare"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

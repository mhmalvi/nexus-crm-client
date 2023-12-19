import React from "react";
import "./section1.css";
// import crm_show from "../../../assets/Gif/crm_show.gif";
// import backgroundphoto from "../../../assets/BackgroundPhotos/Background-01.png";
import HeroSVG from "./HeroSVG";
import Button from "../Components/Button";
const SectionOne = () => {
  return (
    <div className="lg:min-h-[87vh] min-h-[95vh] w-full bg-[#180432] flex items-center justify-center">
      <div className="lg:grid lg:grid-cols-2 flex flex-col flex-col-reverse lg:w-[75vw] w-[90vw] min-h-[87vh] lg:mt-0 mt-[-10vh]">
        <div className="min-h-full flex flex-col lg:items-start items-center justify-center ">
          <h1 className="lg:text-[5rem] text-[3rem] font-[700] lg:leading-[10px] leading-[5vh] text-white lg:text-start text-center lg:mb-[24px] mb-0">
            Easiest Way to
          </h1>
          <h1 className="lg:text-[3.5rem] text-[1.8rem] font-[400] text-[#4D8CFC] lg:text-start text-center">
            Skyrocketing Conversions
          </h1>
          <p className="text-white lg:w-3/5 w-[90vw] lg:text-[1.2rem] text-[1rem] font-[400] lg:text-start text-center">
            Leads from Campaigns, Assign and Manage, Communicate & Update,
            Payment and Beyond.
          </p>
          <div className="mt-[5vh] w-full h-[15vh] ">
            <form className="flex flex-col lg:items-start justify-between h-full">
              <div className="w-full flex flex-col">
                <label className="text-[#c5c5c5] text-[1rem] font-[100] m-0 p-0 text-center lg:text-start">
                  Just begin with a simple step 
                </label>
                <input type="email" className="lg:w-1/2 w-[90vw] lg:rounded-r-[12px] rounded-[12px]" placeholder="Enter your email address"/>
              </div>
              <Button title="Let's get started ->" variant={1}/>
            </form>
          </div>
        </div>
        <div className="lg:min-h-full flex lg:items-center items-start justify-center min-h-1/2 lg:mt-0 ">
          <HeroSVG />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;

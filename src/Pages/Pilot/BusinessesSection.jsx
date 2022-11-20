import { Carousel } from "antd";
import React from "react";
import businessLogos from "../../assets/Images/partner-logos.png";
import "antd/dist/antd.css";

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
const BusinessSection = () => {
  /*   const onChange = (currentSlide) => {
    console.log(currentSlide);
  }; */
  return (
    <>
      <div className="text-center m-auto pb-10">
        <span className="font-poppins text-4xl text-black font-bold justify-center text-center">
          We have the Best Solution
          <br /> for your Business
        </span>
      </div>
      <div className="pb-30">
      <img src={businessLogos} className="m-auto" alt="" />
      </div>
      {/*       <Carousel afterChange={onChange}>
        <div>
          <img src={impressions} style={contentStyle} className="m-auto" alt="" />
        </div>
        <div>
          <img src={impressions} style={contentStyle} className="m-auto" alt="" />
        </div>
        <div>
          <img src={impressions} style={contentStyle} className=" m-auto" alt="" />
        </div>
        <div>
          <img src={impressions} style={contentStyle} className=" m-auto" alt="" />
        </div>
      </Carousel> */}
    </>
  );
};
export default BusinessSection;

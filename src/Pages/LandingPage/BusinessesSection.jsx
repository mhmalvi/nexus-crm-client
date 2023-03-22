import { Carousel } from "antd";
import React, { useRef } from "react";
import businessLogos from "../../assets/Images/partner-logos.png";
import "antd/dist/antd.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import client1 from "../../assets/Images/atr.png";
import client2 from "../../assets/Images/01-10.png";
import client3 from "../../assets/Images/01-11.png";
import client4 from "../../assets/Images/01-22.png";
import client5 from "../../assets/Images/01-23.png";
import client6 from "../../assets/Images/01-25.png";
import client7 from "../../assets/Images/01-26.png";
import client8 from "../../assets/Images/01-31.png";

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
  const CaseSlider = useRef(null);

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    slidesToShow: 7,
    slidesToScroll: 7,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  /*   const onChange = (currentSlide) => {
    console.log(currentSlide);
  }; */
  return (
    <div className="pb-10 md:pb-30">
      <div className="text-center m-auto pb-10">
        <span className="font-poppins text-2xl md:text-4xl text-black font-bold justify-center text-center">
          We have the Best Solution
          <br /> for your Business
        </span>
      </div>

      <Slider ref={CaseSlider} arrows={false} {...settings} className="mb-16">
        <div>
          <img
            src={client1}
            alt=""
            className="w-20 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client2}
            alt=""
            className="w-16 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client3}
            alt=""
            className="w-36 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client4}
            alt=""
            className="w-26 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client5}
            alt=""
            className="w-16 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client6}
            alt=""
            className="w-16 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client7}
            alt=""
            className="w-16 m-auto flex items-center justify-center"
          />
        </div>
        <div>
          <img
            src={client8}
            alt=""
            className="w-26 m-auto flex items-center justify-center"
          />
        </div>
      </Slider>
    </div>
  );
};
export default BusinessSection;

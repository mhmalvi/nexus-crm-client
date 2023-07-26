import React from "react";
// import Nav from "./Nav/Nav";
import SectionOne from "./Section1/SectionOne";
import SectionTwo from "./Section2/SectionTwo";
import SectionThree from "./Section3/SectionThree";
import SectionFour from "./Section4/SectionFour";
import SectionFive from "./Section5/SectionFive";
import SectionSix from "./Section6/SectionSix";
import SectionSeven from "./Section7/SectionSeven";
import FooterSection from "./FooterSection/FooterSection";
import Nav from "./Nav/Nav";

const Landing = () => {
  return (
    <>
      <div className="">
        <Nav />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        {/* <SectionSeven /> */}
        <FooterSection />
      </div>
    </>
  );
};

export default Landing;

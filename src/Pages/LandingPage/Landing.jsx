  import React, { useEffect, useState } from "react";
  import SectionOne from "./Section1/SectionOne";
  import SectionTwo from "./Section2/SectionTwo";
  import SectionThree from "./Section3/SectionThree";
  import SectionFour from "./Section4/SectionFour";
  import SectionFive from "./Section5/SectionFive";
  import SectionSix from "./Section6/SectionSix";
  import FooterSection from "./FooterSection/FooterSection";
  import Nav from "./Nav/Nav";
  import ResNav from "./ResNav/ResNav";
  import Topbar from "./Nav/Topbar";

  const Landing = () => {
    const [resNav, setResNav] = useState(false);
    useEffect(() => {
      if (window.innerWidth < 1000) {
        setResNav(true);
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth < 1000) {
          setResNav(true);
        } else if (window.innerWidth >= 1000) {
          setResNav(false);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <div>
          {resNav ? (
            <ResNav />
          ) : (
            <>
              <Topbar />
              <Nav />
            </>
          )}

          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          <SectionFive />
          <SectionSix />
          <FooterSection />
        </div>
      </>
    );
  };

  export default Landing;

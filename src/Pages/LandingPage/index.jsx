import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Header from "./Header";
import QualitySection from "./QualitySection";
import WhyUsSection from "./WhyUs";
import MoreImpressionSection from "./MoreImpression";
import MoreImpressionMobileSection from "./MoreImpressionMobile";
import BusinessSection from "./BusinessesSection";
import DiscoverMoreSection from "./DiscoverMore";
import PricingSection from "./PricingSection";
import PricingSectionMobile from "./PricingSectionMobile";
import AboutUsSection from "./AboutUs";
import BlogsSection from "./BlogsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <QualitySection />
      <WhyUsSection />
      <div>
        <div className="hidden lg:block">
          <MoreImpressionSection />
        </div>
        <div className="lg:hidden">
          <MoreImpressionMobileSection />
        </div>
      </div>
      <BusinessSection />
      <DiscoverMoreSection />
      <div>
        <div className="hidden lg:block">
          <PricingSection />
        </div>
        <div className="lg:hidden">
          <PricingSectionMobile />
        </div>
      </div>
        <AboutUsSection />
        <BlogsSection />
        <ContactSection />
        <Footer />
    </>
  );
}

export default HomePage;

import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import QualitySection from "./QualitySection";
import WhyUsSection from "./WhyUs";
import MoreImpressionSection from "./MoreImpression";
import BusinessSection from "./BusinessesSection";
import DiscoverMoreSection from "./DiscoverMore";
import PricingSection from "./PricingSection";
import AboutUsSection from "./AboutUs";
import BlogsSection from "./BlogsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Header />
      </div>
      <div className="px-20 mx-0.5">
        <QualitySection />
      </div>
      <div className="px-20 mx-0.5">
        <WhyUsSection />
      </div>
      <div className="px-20 mx-0.5">
        <MoreImpressionSection />
      </div>
      <div className="px-8">
        <BusinessSection />
      </div>
      <div className="px-8">
        <DiscoverMoreSection />
      </div>
      <div className="px-8">
        <PricingSection />
      </div>
      <div className="px-8">
        <AboutUsSection />
      </div>
      <div className="px-8">
        <BlogsSection />
      </div>
      <div className="px-8">
        <ContactSection />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

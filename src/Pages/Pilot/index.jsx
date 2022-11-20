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
      <div>
        <QualitySection />
      </div>
      <div>
        <WhyUsSection />
      </div>
      <div>
        <MoreImpressionSection />
      </div>
      <div>
        <BusinessSection />
      </div>
      <div>
        <DiscoverMoreSection />
      </div>
      <div>
        <PricingSection />
      </div>
      <div>
        <AboutUsSection />
      </div>
      <div>
        <BlogsSection />
      </div>
      <div>
        <ContactSection />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

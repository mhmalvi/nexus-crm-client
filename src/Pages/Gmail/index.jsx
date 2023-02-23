import React from "react";
import Emails from "./Emails";
import Footer from "./Footer";
import Inbox from "./Inbox";
import LeftSide from "./LeftSide";
import GmailNavbar from "./GmailNavbar";

const GmailModule = () => {
  return (
    <div className="App">
      {/* Navbar */}
      <GmailNavbar />
      <div className="flex">
        {/* LeftSidebar */}
        <LeftSide />
        <div className="w-full">
          {/* Inbox */}
          <Inbox />
          {/* Emails */}
          <Emails />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default GmailModule;

import React from "react";
import { useSelector } from "react-redux";
import Compose from "./Compose";
import Emails from "./Emails";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectMailUser } from "./features/mailUserSlice";
import GmailLogin from "./GmailLogin";
import GmailNavbar from "./GmailNavbar";
import Inbox from "./Inbox";
import LeftSide from "./LeftSide";

const GmailModule = () => {
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  console.log(useSelector(selectSendMessageIsOpen));
  const user = useSelector(selectMailUser);
  return (
    <>
    {user ? (
      <div className="pt-16">
        <GmailNavbar />
        <div className="flex">
          <LeftSide />
          <div className="w-full">
            <Inbox />
            <Emails />
            {/* <Footer /> */}
            {isMessageOpen && <Compose />}
          </div>
        </div>
      </div>
        ) : (
        <GmailLogin/>
        )}
    </>
  );
};

export default GmailModule;

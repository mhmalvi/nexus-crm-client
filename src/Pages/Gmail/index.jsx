import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compose from "./Compose";
import Emails from "./Emails";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectMailUser, signin } from "./features/mailUserSlice";
/* import Footer from "./Footer"; */
import GmailLogin from "./GmailLogin";
import GmailNavbar from "./GmailNavbar";
import Inbox from "./Inbox";
import LeftSide from "./LeftSide";
import { auth } from "./Firebase/firebase";

const GmailModule = () => {
  const dispatch = useDispatch();
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  console.log(useSelector(selectSendMessageIsOpen));
  const user = useSelector(selectMailUser);
/* 
  useEffect(() => {
  auth.onAuthStateChanged((authUser)=>{
  if (authUser) {
    dispatch(signin({
      
    }))
  }
  console.log(authUser);
})
  }, [dispatch]) */
  
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

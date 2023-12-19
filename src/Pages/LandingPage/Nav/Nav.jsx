/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./nav.css";
import Button from "../Components/Button";

const qqCrmLogo = require("../../../assets/Icons/Queleads_Logo.png");

const Nav = () => {
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Define the scroll position where you want the menu to become fixed
      const scrollThreshold = 47; // Adjust this value based on your needs
      setIsMenuFixed(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div
          className={`crm-menu-desktop w-[95vw] h-[8vh] grid grid-cols-8 gap-4 ${
            isMenuFixed ? "crm-fixed rounded-b-[12px]" : ""
          }`}
        >
          <div className="col-span-1  w-full flex items-center">
            <a href="/">
              <img className="w-full" alt="Openthread" src={qqCrmLogo || ""} />
            </a>
          </div>
          <div className="col-span-3  w-full flex items-center justify-center">
            <Button title={"⚪ Live Product Demo"} variant={1} />
            <Button title={"Free Forever"} variant={1} />
          </div>
          <div className="col-span-2">
            <ul className="grid grid-cols-4 gap-2 h-full">
              <li className="flex items-center justify-center cursor-pointer hover:scale-[0.95] ease-in-out duration-200 font-[400]">Pricing</li>
              <li className="flex items-center justify-center cursor-pointer hover:scale-[0.95] ease-in-out duration-200 font-[400]">Contact Us</li>
              <li className="flex items-center justify-center cursor-pointer hover:scale-[0.95] ease-in-out duration-200 font-[400]">Resources</li>
              <li className="flex items-center justify-center cursor-pointer hover:scale-[0.95] ease-in-out duration-200 font-[400]">Book a Demo</li>
            </ul>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <Button title={"Register"} navigateTo={"/register"}/>
            <Button title={"Login"} navigateTo={"/login"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

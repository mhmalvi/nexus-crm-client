import React from "react";
import Icons from "../../Components/Shared/Icons";

export default function Footer() {
  return (
    <div className="bg-[#1D2130]">
      <div className="w-full flex flex-col-reverse md:flex-row font-poppins px-6 md:px-20 pt-13 pb-10">
        <div className="w-full lg:w-3/5">
          {/* Column 1 */}
          <div className="flex flex-wrap justify-evenly">
            <ul>
              <li className="flex p-2">
                <a className="text-white font-bold px-4">Company</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">About Us</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Why Choose us</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Pricing</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Testimonial</a>
              </li>
            </ul>
            {/* Column 2 */}
            <ul>
              <li className="flex p-2">
                <a className="text-white font-bold px-4">Resources</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Privacy Policy</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">
                  Terms and <br /> Condition
                </a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Blog</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Contact Us</a>
              </li>
            </ul>
            {/* Column 3 HIDDEN IN MOBILE VIEW*/}
            <ul className="hidden md:block">
              <li className="flex p-2">
                <a className="text-white font-bold px-4">CRM tutorial</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Project managment</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Time tracker</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Time schedule</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Lead generate</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Remote Collaboration</a>
              </li>
            </ul>
          </div>

          {/* Column 3 FOR MOBILE VIEW */}
          <div className="w-full flex justify-center md:hidden">
            <ul>
              <li className="flex p-2">
                <a className="text-white font-bold px-4">CRM tutorial</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Project managment</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Time tracker</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Time schedule</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Lead generate</a>
              </li>
              <li className="flex p-2">
                <a className="text-xs text-white px-4">Remote Collaboration</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-2/5 font-poppins">
          <div className="text-4xl text-white pb-1">LOGO</div>
          <div className="text-base text-white pb-4">Go To Free Trial</div>
          <div className="pb-10 m-auto">
            <div className=" md:flex items-center bg-[#2B2E3C] rounded-xl text-[14px]">
              <input
                className="bg-transparent focus:outline-none text-white w-2/3 px-5 py-2 m-auto"
                type="text"
              />
              <button className="w-1/3 bg-white text-black text-center font-semibold rounded-xl py-4 m-auto">
                Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* copyright section */}
      <div className="flex justify-evenly md:pb-16">
        <div className="w-2/12 md:w-1/3 h-1 bg-white my-2"></div>
        <div className="w-full md:w-1/3 flex justify-evenly flex-col-reverse md:flex-row px-4">
          <div className="text-white text-center px-2">
            © Copyright Quadque Technologies 2022
          </div>
          <div className="flex justify-evenly m-auto pb-6 md:pb-0">
            <a title="Facebook" className="px-2">
              <Icons.Facebook />
            </a>
            <a title="Twitter" className="px-2">
              <Icons.Twitter />
            </a>
            <a title="Instagram" className="px-2">
              <Icons.Instagram />
            </a>
            <a title="LinkedIn" className="px-2">
              <Icons.LinkedIn />
            </a>
          </div>
        </div>
        <div className="w-2/12 md:w-1/3 h-1 bg-white my-2"></div>
      </div>
    </div>
  );
}

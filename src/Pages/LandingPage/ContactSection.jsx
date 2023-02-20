import React from "react";
import Icons from "../../Components/Shared/Icons";
import CurvyArrow from "../../assets/Images/curvy-arrow.png";
import "./PricingSection.css"

function ContactSection() {
  return (
    <div className="pb-40 font-poppins">
      <div className="relative flex text-5xl text-black font-bold justify-center text-center pb-16">
        Get in touch with us
        <img src={CurvyArrow} alt="" className="absolute -top-20 right-52" />
      </div>
      {/* first row */}
      <div className="flex gap-6 mx-20 pb-16 p-16 bg-[#F0F2FE] rounded-2xl">
        {/* card1 */}
        <div className="w-3/5 flex-col text-black">
          <div className="pb-8"></div>
          <div className="text-3xl font-bold pb-4">Drop us a message</div>
          <div className="text-lg pb-12">
            We will get back to you as soon as possible.
          </div>
          <div className="font-poppins text-black">
            <div className="w-full flex justify-evenly gap-4 py-2">
              <div className="w-full">
                <input
                  className="w-full focus:outline-none text-lg p-4 rounded-lg"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full focus:outline-none text-lg p-4 rounded-lg"
                  type="text"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div className="w-full py-2">
              <input
                className="w-full focus:outline-none text-lg p-4 rounded-lg"
                type="text"
                placeholder="Work Email"
              />
            </div>
            <div className="w-full py-2">
              <input
                className="w-full focus:outline-none text-lg p-4 rounded-lg"
                type="text"
                placeholder="Subject"
              />
            </div>
            <div className="w-full py-2">
              <textarea
                className="w-full focus:outline-none text-lg p-4 rounded-lg"
                type="text"
                placeholder="Message"
              />
            </div>
            <div className="w-full m-auto bg-black rounded-xl text-center py-4 my-6">
              <a className="text-md text-white font-semibold" href="">
                Send
              </a>
            </div>
          </div>
        </div>
        {/* card2 */}
        <div className="w-1/5 text-start text-black m-auto">
          <div className="flex text-black pb-9">
            <div className="my-auto">
              <Icons.Phone className="bg-black" />
            </div>
            <div className="flex-col">
              <div className="lg:text-xl px-4 py-2 font-semibold whitespace-nowrap">
                +614 0589 9496
              </div>
              <div className="text-base px-4">Free support</div>
            </div>
          </div>
          <div className="flex text-black pb-9">
            <div className="my-auto">
              <Icons.Email className="bg-black" />
            </div>
            <div className="flex-col">
              <div className="lg:text-xl px-4 py-2 font-semibold">
                info@quadque.tech
              </div>
              <div className="text-base px-4">Help Email support</div>
            </div>
          </div>
          <div className="flex text-black pb-9">
            <div className="my-auto">
              <Icons.Envelope className="bg-black" />
            </div>
            <div className="flex-col">
              <div className="lg:text-xl px-4 py-2 font-semibold">
                sales@quadque.com
              </div>
              <div className="text-base px-4">Sales Enquiry</div>
            </div>
          </div>
        </div>
      </div>
      {/*       <div className="w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold" href="">
          More Blog
        </a>
      </div> */}
    </div>
  );
}

export default ContactSection;

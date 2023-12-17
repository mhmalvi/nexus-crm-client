import React from "react";
import successBlower from "../../assets/Images/req_success.gif";

const Dialog = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-10 md:mx-auto rounded-md">
        <div className="flex justify-center items-center">
          <img className="w-8/12 mb-10" src={successBlower} alt="" />
        </div>

        <div className="text-center">
          <h3 className="md:text-2.5xl text-base text-gray-900 font-semibold text-center uppercase">
            Thank You
          </h3>
          <p className="text-gray-600 my-2">
            We will reach you shortly for further enquiry.
          </p>
          <p className="text-xl font-semibold text-brand-color italic">
            Have a great day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

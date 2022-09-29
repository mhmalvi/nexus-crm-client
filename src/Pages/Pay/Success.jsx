import React from "react";
import { Link } from "react-router-dom";
import successBlower from "../../assets/Images/success_blower.gif";

const Success = () => {
  return (
    <div className="lg:px-4 2xl:px-6 pt-25 pt-1 pb-10 flex justify-center items-center bg-gray-100 h-screen">
      <div
        className="bg-gray-100 shadow-lg"
        style={{
          width: "45%",
        }}
      >
        <div className="bg-white p-10 md:mx-auto rounded-md">
          <div className="flex justify-center items-center">
            <img src={successBlower} alt="" />
          </div>

          <div className="text-center">
            <h3 className="md:text-2.5xl text-base text-gray-900 font-semibold text-center">
              You Payment Has Done Successfully!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p className="text-xl font-semibold text-brand-color italic">
              Have a great day!
            </p>
            <div className="py-10 text-center">
              <Link
                to={"/lead/113256"}
                className="px-12 bg-brand-color hover:bg-opacity-90 text-white hover:text-white rounded-full font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

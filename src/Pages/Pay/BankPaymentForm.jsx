import React from "react";
import bankLogo from "../../assets/Images/bank.png";

const BankPaymentForm = () => {
  return (
    <div>
      <div className="relative">
        <img className="w-8" src={bankLogo} alt="" />
        <div className="absolute w-full h-full top-0"></div>
      </div>
      <form action="">
        <div className="mt-4">
          <p className="font-poppins font-light text-black mb-1 ml-6">Pay to</p>
          <div>
            <input
              className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
              type="text"
              name="card_number"
              id=""
              placeholder="Account No"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="font-poppins font-light text-black mb-1 ml-6">
            Password
          </p>
          <div>
            <input
              className="w-66 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
              type="password"
              name="pass"
              id=""
              placeholder="Password"
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="font-poppins font-light text-black mb-1 ml-6">Amount</p>
          <div>
            <input
              className="w-44 px-6 py-2.5 text-base font-normal leading-6 font-poppins bg-gray-100 rounded-2xl outline-none border-none text-black"
              type="text"
              name="amount"
              id=""
              placeholder="Amount"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button
            type="submit"
            className="mx-auto w-68 text-black bg-white px-8 py-3 rounded-full cursor-pointer font-semibold font-poppins border border-black"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankPaymentForm;

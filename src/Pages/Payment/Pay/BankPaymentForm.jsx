import React from "react";

const BankPaymentForm = () => {
  return (
    <div>
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
        <p className="font-poppins font-light text-black mb-1 ml-6">Password</p>
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
    </div>
  );
};

export default BankPaymentForm;
